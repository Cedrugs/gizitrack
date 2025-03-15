import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import apiClient from '@/Services/apiService';
import { School, Supplier } from '@/types/types';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import SecondaryButton from '@/Components/SecondaryButton';
import InputLabel from '@/Components/InputLabel';
import NumberInput from '@/Components/NumberInput';
import RadioInput from '@/Components/RadioInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { Pie, Line } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale);

const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

interface MonthData {
    name: string;
    days: number[];
    firstDayOfMonth: number;
}

const Calendar = ({ currentYear, data }: { currentYear: number, data: School | null}) => {

    const daysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();

    const isCurrentMonth = (monthName: string) => {
        const currentDate = new Date();
        const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
        return monthName === currentMonth;
    };

    const calendarData: MonthData[] = [];
    for (let month = 0; month < 12; month++) {
        const totalDays = daysInMonth(month, currentYear);
        const firstDayOfMonth = new Date(currentYear, month, 1).getDay();

        const monthData: MonthData = {
            name: monthNames[month],
            days: Array.from({ length: totalDays }, (_, i) => i + 1),
            firstDayOfMonth: firstDayOfMonth === 0 ? 7 : firstDayOfMonth
        };

        calendarData.push(monthData);
    }

    return (
        <div id="calendar-grid" className="grid grid-cols-3 gap-4">
            {calendarData.map((month, index) => {
                return (
                    <div key={index} className='p-6 rounded-lg bg-[#E0F7FA]'>
                        <div className="flex justify-center">
                            <div className={`inline-block p-2 rounded-md ${isCurrentMonth(month.name) ? 'bg-[#1270B0] text-white' : 'text-black'}`}>
                                <h3 className='font-medium text-lg mb-0'>{month.name}</h3>
                            </div>
                        </div>
                        <div className='grid grid-cols-7 text-xs text-center font-bold my-4'>
                            {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
                                <div key={day} className='py-1'>{day}</div>
                            ))}
                        </div>
                        <div className='grid grid-cols-7 gap-2'>
                            {Array.from({ length: month.firstDayOfMonth - 1 }).map((_, i) => (
                                <div key={`empty-${i}`} className="h-10"></div>
                            ))}

                            {/* bg-[#8DEE9F] */}
                            {month.days.map(day => {
                                const sentDetails = data?.distributions
                                    ?.filter(distribution => distribution && distribution.feedback)
                                    .map(distribution => {
                                        const dateSent = new Date(distribution.delivery.date_sent);
                                        const sentMonth = dateSent.getMonth();
                                        const sentDay = dateSent.getDate();
                                        const isProblem = distribution.feedback.problem;
                                        return { sentMonth, sentDay, isProblem };
                                    })
                                    .filter(({ sentMonth }) => sentMonth === index);

                                const isSent = sentDetails?.some(({ sentDay }) => sentDay === day);
                                
                                let colorClass = '';
                                if (isSent) {
                                    const isCurrentDayOnTime = sentDetails?.some(({ sentDay, isProblem }) => sentDay === day && isProblem == "");
                                    colorClass = isCurrentDayOnTime ? 'bg-[#8DEE9F]' : 'bg-[#D29A9B]';
                                }

                                return (
                                    <div key={day} className={`text-center rounded cursor-pointer h-10 ${colorClass} pt-2`}>
                                        {day}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default function Dashboard() {
    const user = usePage().props.auth.user;
    const [loading, setLoading] = useState(true);
    
    if (user.role == 'kepala_sekolah') {
        const [data, setData] = useState<School | null>(null);

        const [menu, setMenu] = useState('');
        const [numPortion, setNumPortion] = useState(1);
        const [onTime, setOnTime] = useState(true);
        const [latenessTime, setLatenessTime] = useState(1);
        const [isProblem, setIsProblem] = useState(false);
        const [problem, setProblem] = useState('');
        const [message, setMessage] = useState('');
        const [rating, setRating] = useState('');

        const [addingFeedback, setAddingFeedback] = useState(false);
    
        let distributionId: number | null = null;

        const reset = () => {
            setMenu('');
            setNumPortion(1);
            setOnTime(true);
            setLatenessTime(1);
            setIsProblem(false);
            setProblem('');
            setRating('');
            setMessage('');
        };
    
        const closeModal = () => {
            setAddingFeedback(false);
            reset();
        };
    
        const openModal = () => {
            setAddingFeedback(true);
        };
    
        useEffect(() => {
            apiClient
                .get(`/api/school/${user.id}`)
                .then((response) => {
                    setData(response.data.data);
                    setLoading(false);
                });
        }, [user.id]);
    
        if (loading) {
            return <p>Loading...</p>;
        }
    
        const isTodayDeliveryAvailable = () => {
            const today = new Date().toISOString().split('T')[0];
            return data?.distributions.some(distribution => {
                const deliveryDate = distribution.delivery.date_sent;
                if (deliveryDate === today && distribution.feedback === null) {
                    distributionId = distribution.id;
                    return true;
                } else {
                    return false;
                }
            });
        };
    
        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
    
            if (!isTodayDeliveryAvailable()) {
                alert("Today's delivery data is not available.");
                return;
            }
    
            const data = {
                'menu': menu,
                'num_portion': numPortion,
                'distribution_id': distributionId,
                'rating': rating,
                'on_time': onTime,
                'message': message || "",
                'lateness_time': latenessTime,
                'problem': problem || "",
            }
    
            const response = apiClient.post('http://127.0.0.1:8000/api/school', data);
            closeModal();
    
            alert("Success!");
        };

        return (
            <AuthenticatedLayout 
                user={user}
                header={
                    <h2 className="text-3xl font-semibold leading-tight text-[#27445D]">
                        {data?.name}
                    </h2>
                }
            >
                <Head title="Dashboard" />
                <main className="flex justify-center p-4 space-x-4">
                    <div className="w-1/3 bg-white p-4 rounded-lg shadow-lg overflow-y-auto h-full">
                        <h2 className="text-[#435C72] text-lg font-bold mb-4">Report Verification</h2>
                        <div className="flex items-center mb-4 space-x-2">
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-2/3 p-2 rounded-lg bg-[#435C72] placeholder-white text-white"
                            />
                            <button className="w-1/3 bg-[#435C72] text-white p-2 rounded-lg disabled:cursor-not-allowed disabled:opacity-60" onClick={openModal} disabled={!isTodayDeliveryAvailable()}>
                                Add
                            </button>
                        </div>
                        <div className="space-y-4 overflow-y-auto max-h-[80vh] drop-shadow-md">
                            {data?.distributions.reverse().map(distribution => {
                                if (!distribution.feedback) return null;
    
                                const date = new Date(distribution.delivery.date_sent);
    
                                return (
                                    <div className={`rounded-lg flex shadow-md ${distribution.feedback.problem == "" ? 'bg-[#8DEE9F]' : 'bg-[#D29A9B]'}`}>
                                        <div className="w-1/3 bg-[#435C72] text-white text-center text-sm flex justify-center items-center flex-col rounded-lg">
                                            <div className="font-bold text-lg">{date.getDate()}</div>
                                            <div>{monthNames[date.getMonth()].slice(0, 3)} {date.getFullYear()}</div>
                                        </div>
                                        <div className="w-2/3 p-4 text-center text-sm flex flex-col gap-2">
                                            <div className="font-semibold text-lg">{`${distribution.feedback.num_portion} ${distribution.feedback.menu}`}</div>
                                            <div className='flex flex-row justify-evenly items-center'>
                                                <div>{distribution.feedback.rating[0].toUpperCase() + distribution.feedback.rating.slice(1)}</div>
                                                <div>{distribution.delivery.time_sent.split(':').slice(0, 2).join(':')} WIB</div>
                                            </div>
                                            <div className='flex flex-row justify-evenly items-center'>
                                                <div>{distribution.supplier.name}</div>
                                                <div>{distribution.feedback.on_time ? 'Tidak Telat' : 'Telat'}</div>
                                            </div>
                                            <div>{distribution.feedback.message}</div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="w-2/3 bg-white p-4 rounded-lg shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-[#435C72] text-lg font-bold">Report Calendar 2025</h2>
                            <div className="flex items-center space-x-2">
                                <button className="p-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                                    </svg>                          
                                </button>
                                <button className="p-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <Calendar currentYear={2025} data={data} />
                    </div>
                </main>
                <Modal show={addingFeedback} onClose={closeModal}>
                    <form className="p-6" onSubmit={handleSubmit}>
                        <h2 className="text-lg font-medium text-gray-900">
                            Add new Feedback
                        </h2>
                        <div className="mt-4">
                            <InputLabel htmlFor="menu" value="Menu makanan yang diterima" />
                            <TextInput id="menu" type="text" name="menu" className="mt-1 block w-3/4" isFocused placeholder="Nasi Uduk" onChange={(e) => setMenu(e.target.value)} value={menu}/>
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="numPortion" value="Jumlah porsi yang diterima" />
                            <NumberInput id='numPortion' name='numPortion' value={numPortion} onChange={(value) => setNumPortion(Number(value))}/>
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="numPortion" value="Apakah makanan sampai tepat waktu?" />
                            <RadioInput
                                label=''
                                options={[
                                    { label: 'Tepat Waktu', value: '1' },
                                    { label: 'Tidak Tepat Waktu', value: '0' }
                                ]}
                                name="onTime"
                                value={onTime ? '1' : '0'}
                                onChange={(value) => setOnTime(value === '1')}
                            />
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="latenessTime" value="Masukkan keterlambatan makanan dalam menit" />
                            <NumberInput id='latenessTime' name='latenessTime' value={latenessTime} onChange={(value) => setLatenessTime(Number(value))} min={0}/>
                        </div>
                        <div className="mt-4">
                                <InputLabel htmlFor="isProblem" value="Apakah ada masalah dalam makanan?" />
                                <RadioInput
                                    label=''
                                    options={[
                                        { label: 'Ya', value: '1' },
                                        { label: 'Tidak', value: '0' }
                                    ]}
                                    name="isProblem"
                                    value={isProblem ? '1' : '0'}
                                    onChange={(value) => setIsProblem(value === '1')}
                                />
                        </div>
                        {isProblem && (
                            <div className="mt-4">
                                <InputLabel htmlFor="isProblem" value="Apakah ada masalah dalam makanan?" />
                                <RadioInput
                                    label=''
                                    options={[
                                        { label: 'Porsi Kurang', value: 'Porsi Kurang' },
                                        { label: 'Makanan Tidak Sesuai', value: 'Makanan Tidak Sesuai' },
                                        { label: 'Makanan Basi', value: 'Makanan Basi' }
                                    ]}
                                    name="problem"
                                    value={problem}
                                    onChange={(value) => setProblem(value)}
                                />
                            </div>
                        )}
                        <div className="mt-4">
                            <InputLabel htmlFor="rating" value="Apakah ada masalah dalam makanan?" />
                            <RadioInput
                                label=''
                                options={[
                                    { label: 'Baik', value: 'baik' },
                                    { label: 'Cukup', value: 'cukup' },
                                    { label: 'Buruk', value: 'buruk' }
                                ]}
                                name="rating"
                                value={rating}
                                onChange={(value) => setRating(value)}
                            />
                        </div>
    
                        <div className="mt-4">
                            <TextInput id="message" type="text" name="message" className="mt-1 block w-3/4" isFocused placeholder="Masukkan saran dan kritik" onChange={(e) => setMessage(e.target.value)} value={message}/>
                        </div>
    
                        <div className="mt-6 flex justify-end gap-4">
                            <SecondaryButton onClick={closeModal}>
                                Cancel
                            </SecondaryButton>
                            <PrimaryButton type='submit' disabled={!isTodayDeliveryAvailable()}>
                                Submit
                            </PrimaryButton>
                        </div>
                    </form>
                </Modal>
            </AuthenticatedLayout>
        );
    } else if (user.role == 'sppg') {
        const user = usePage().props.auth.user;
        const [loading, setLoading] = useState(true);
        const [data, setData] = useState<Supplier | null>(null);
        const [formData, setFormData] = useState<any[]>([]);

        useEffect(() => {
            apiClient
                .get(`/api/supplier/${user.id}`)
                .then((response) => {
                    setData(response.data.data);
                    const initialFormData = response.data.data.eligible_schools.map((school: School) => ({
                        menu: '',
                        num_portion: 1,
                        date_sent: '',
                        time_sent: '',
                        price: 1,
                        school_id: school.id,
                        supplier_id: response.data.data.id,
                    }));
                    setFormData(initialFormData);
                    setLoading(false);
                });
        }, [user.id]);

        const handleInputChange = (index: number, key: string, value: any) => {
            setFormData((prevData) => {
                const newData = [...prevData];
                newData[index] = {
                    ...newData[index],
                    [key]: value,
                };
                return newData;
            });
        };

        const handleSubmit = (index: number) => {
            const currentData = formData[index];
            console.log("Submitting form data for school index", index, currentData);
            
            apiClient.post('http://localhost:8000/api/supplier', currentData);
        };

        function getProblemCounts(data: Supplier | null) {
            const problemCounts: { [key: string]: number } = {};
            
            data?.distributions.forEach(distribution => {
                if (distribution.feedback != null) {
                    const problem = distribution.feedback.problem;
                    if (problem) {
                        problemCounts[problem] = (problemCounts[problem] || 0) + 1;
                    }
                }
            });
        
            return problemCounts;
        }

        const getLatenessCounts = (supplierData: Supplier | null) => {
            const counts = Array(12).fill(0);
            
            supplierData?.distributions.forEach(distribution => {
                const feedback = distribution.feedback;
                const month = new Date(distribution.delivery.date_sent).getMonth();
                if (feedback?.on_time === 0) {
                    counts[month] += 1;
                }
            });
            
            return counts;
        };

        const latenessCounts = getLatenessCounts(data);

        const problemCounts = getProblemCounts(data);

        const options = {
            scales: {
                y: {
                    min: 0,
                    max: Math.max(2, Math.max(...latenessCounts) + 1),
                    ticks: {
                        stepSize: 1,
                    },
                },
            }
        };

        const pieChartData = {
            labels: Object.keys(problemCounts),
            datasets: [{
                data: Object.values(problemCounts),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#FF9F40',
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#FF9F40',
                ],
            }],
        };

        const lineChartData = {
            labels: [
                'January', 'February', 'March', 'April', 'May', 
                'June', 'July', 'August', 'September', 'October', 
                'November', 'December'
            ],
            datasets: [{
                label: 'Lateness Count',
                data: latenessCounts,
                fill: false,
                backgroundColor: '#36A2EB',
                borderColor: '#36A2EB',
                tension: 0.1,
                pointRadius: 0.5,
            }],
        };

        return (
            <AuthenticatedLayout 
                user={user}
                header={
                    <h2 className="text-3xl font-semibold leading-tight text-[#27445D]">
                        {data?.name}
                    </h2>
                }
            >
                <Head title="Dashboard" />
                <main className="p-4 space-y-4 max-w-6xl mx-auto">
                        <div className="bg-white p-4 rounded-lg shadow-lg">
                        <h2 className="font-bold text-xl text-gray-800">
                            Lateness Count per Month ({new Date().getFullYear()})
                        </h2>
                        <Line data={lineChartData} options={options} height={50}/>
                    </div>
                    <div className="flex space-x-4">
                        <div className="w-1/3 bg-white p-4 rounded-lg shadow-lg">
                            <h2 className="font-bold text-xl text-gray-800 mb-2">
                                Notifikasi Masalah
                            </h2>
                            <Pie data={pieChartData} />
                        </div>
                        <div className="w-2/3 bg-white p-4 rounded-lg shadow-lg">
                            <h2 className="font-bold text-xl text-gray-800 mb-2">
                            Notes untuk Kepala Sekolah
                            </h2>
                            <div className="flex space-x-4 overflow-x-auto max-w-full whitespace-nowrap">
                                {data?.eligible_schools?.map((school, index) => (
                                    <div key={school.id} className="min-w-[300px] bg-white shadow-lg p-4 rounded-lg border border-gray-300">
                                        <h3 className="text-lg font-bold text-center mb-4">{school.name}</h3>
                                        <div className="mb-4 w-full">
                                            <label className="block mb-2">Masukkan Menu yang akan dikirim</label>
                                            <div className="flex items-center space-x-2 w-full">
                                                <input
                                                    type="text"
                                                    placeholder="Enter a menu"
                                                    value={formData[index]?.menu || ''}
                                                    onChange={(e) => handleInputChange(index, 'menu', e.target.value)}
                                                    className="flex-grow p-2 border rounded"
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block mb-2">Total makanan yang dikirim</label>
                                            <div className="flex items-center space-x-2 number-box">
                                                <input
                                                    type="number"
                                                    value={formData[index]?.num_portion || 1}
                                                    onChange={(e) => handleInputChange(index, 'num_portion', parseInt(e.target.value))}
                                                    className="w-16 p-2 border rounded"
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block mb-2">Tanggal & Jam Perkiraan Tiba</label>
                                            <div className="flex space-x-2">
                                                <input
                                                    type="date"
                                                    value={formData[index]?.date_sent || ''}
                                                    onChange={(e) => handleInputChange(index, 'date_sent', e.target.value)}
                                                    className="p-2 border rounded"
                                                />
                                                <input
                                                    type="time"
                                                    value={formData[index]?.time_sent || ''}
                                                    onChange={(e) => handleInputChange(index, 'time_sent', e.target.value)}
                                                    className="p-2 border rounded"
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block mb-2">Total Harga Makanan</label>
                                            <div className="flex items-center space-x-2 number-box">
                                                <input
                                                    type="number"
                                                    value={formData[index]?.price || 1}
                                                    onChange={(e) => handleInputChange(index, 'price', parseInt(e.target.value))}
                                                    className="w-20 p-2 border rounded"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-center mt-6">
                                            <button
                                                onClick={() => handleSubmit(index)}
                                                className="bg-gray-800 text-white p-2 rounded-lg"
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-lg overflow-y-auto max-h-96">
                        <table className="w-full table-fixed text-left">
                            <thead className="bg-gray-200 sticky top-0 z-10">
                            <tr>
                                <th className="p-2 border-2 border-black">No.</th>
                                <th className="p-2 border-2 border-black">Menu Name</th>
                                <th className="p-2 border-2 border-black">Destination</th>
                                <th className="p-2 border-2 border-black">Portion</th>
                                <th className="p-2 border-2 border-black">Date</th>
                                <th className="p-2 border-2 border-black">Price</th>
                                <th className="p-2 border-2 border-black">Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data?.distributions?.map((distribution, index) => {
                                type DeliveryStatus = 'proses' | 'perjalanan' | 'terkirim';
                                
                                const deliveryStatus: DeliveryStatus = distribution.delivery.delivery_status as DeliveryStatus;

                                const statusColor: Record<DeliveryStatus, string> = {
                                    'proses': '#F90002',
                                    'perjalanan': '#B77D36',
                                    'terkirim': '#32A734'
                                };

                                const color = statusColor[deliveryStatus] || '#000000';

                                return (
                                    <tr className="odd:bg-white even:bg-gray-100" key={index}>
                                        <td className="p-2 border-2 border-black">{index + 1}</td>
                                        <td className="p-2 border-2 border-black">{distribution.delivery.menu}</td>
                                        <td className="p-2 border-2 border-black">{distribution.school.name}</td>
                                        <td className="p-2 border-2 border-black">{distribution.delivery.num_portion}</td>
                                        <td className="p-2 border-2 border-black">{distribution.delivery.date_sent}</td>
                                        <td className="p-2 border-2 border-black">Rp{distribution.delivery.price.toLocaleString('id')}</td>
                                        <td 
                                            className="p-2 border-2 border-black"
                                            style={{ color }}
                                        >
                                            {deliveryStatus[0].toUpperCase() + deliveryStatus.slice(1)}
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                </main>
            </AuthenticatedLayout>
        )
    } else if (user.role == 'pemerintah') {
        return (
            <AuthenticatedLayout user={user}>
                <h1>Hello</h1>
            </AuthenticatedLayout>
        )
    }

}