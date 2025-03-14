import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import apiClient from '@/Services/apiService';
import { School } from '@/types/types';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import SecondaryButton from '@/Components/SecondaryButton';
import InputLabel from '@/Components/InputLabel';
import NumberInput from '@/Components/NumberInput';
import RadioInput from '@/Components/RadioInput';
import PrimaryButton from '@/Components/PrimaryButton';

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
    const [data, setData] = useState<School | null>(null);
    const [loading, setLoading] = useState(true);
    
    if (user.role == 'kepala_sekolah') {
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
                <main></main>
            </AuthenticatedLayout>
        )
    }

}