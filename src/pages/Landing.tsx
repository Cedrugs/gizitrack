import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Landing() {
    return (
        <>
            <Navbar />
            <header className="flex flex-col relative bg-cover bg-center justify-center items-center text-center h-screen gap-12 p-8" style={{ backgroundImage: 'url("/assets/images/hero.png")' }}>
                <h1 className="text-5xl sm:text-7xl font-bold text-white">GiziTrack</h1>
                <h2 className="text-3xl sm:text-4xl font-semibold text-white opacity-80">"No Child Hungry, Every Child Healthy."</h2>
                <p className="text-white font-light max-w-lg sm:max-w-4xl"> 
                    GiziTrack memastikan setiap makanan dalam program makan gratis sampai tepat waktu dan berkualitas. 
                    Dengan fitur pelacakan real-time, laporan akurat, serta analisis berbasis AI, kami membantu pemerintah, 
                    penyedia makanan, dan sekolah mengelola distribusi dengan lebih efisien.
                </p>
                <a href="#" className="flex items-center rounded-lg w-full max-w-xs py-2 justify-center bg-[#435C72] hover:bg-opacity-80 transition-all ease-in-out duration-300" role="button">
                    <span className="font-medium text-[#FFFFFF]">Get Started</span>
                </a>
            </header>
            <section id="Fitur" className="flex flex-col justify-center items-center h-auto lg:h-[100vh] py-12">
                <div className="flex flex-col bg-white rounded-lg shadow-lg w-full h-auto lg:h-[100vh] max-w-[97%] justify-center items-center text-center gap-8 py-12">
                    <h1 className="text-[#1F364A] text-2xl sm:text-3xl font-semibold">Fitur - Fitur<br/>Yang Disediakan Website</h1>
                    <div className="flex flex-col sm:flex-row gap-5 flex-wrap justify-center">
                        {[
                            {
                                imgSrc: "/assets/icons/barchart.png",
                                title: "Pelacakan Distribusi Makanan",
                                description: "Masyarakat melaporkan keterlambatan dan kualitas makanan secara real-time."
                            },
                            {
                                imgSrc: "/assets/icons/truck-light.png",
                                title: "Laporan & Feedback Realtime",
                                description: "Mengelola jenis makanan, jumlah, harga, dan pengeluaran."
                            },
                            {
                                imgSrc: "/assets/icons/money-bill.png",
                                title: "Manajemen Data & Anggaran",
                                description: "Memantau status pengiriman makanan: diproses, dikirim, atau tertunda."
                            },
                            {
                                imgSrc: "/assets/icons/robot.png",
                                title: "Analisis & Rekomendasi AI",
                                description: "AI menganalisis data untuk meningkatkan efisiensi distribusi."
                            }
                        ].map((feature, index) => (
                            <div key={index} className="flex flex-col bg-white rounded-lg p-6 max-w-xs text-left max-md:text-center gap-5 hover:shadow-lg transition-all ease-in-out duration-300 max-md:items-center">
                                <img src={feature.imgSrc} alt={feature.title} className="max-w-16" />
                                <div className="flex flex-col gap-2">
                                    <h2 className="text-[#1F364A] font-medium text-lg">{feature.title}</h2>
                                    <h3 className="text-[#1F364A] font-normal text-sm">{feature.description}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section id="Testimoni" className="flex flex-col justify-center items-center max-md:h-auto lg:h-[100vh] py-12">
                <div className="flex flex-col bg-white rounded-lg shadow-lg w-full max-md:h-auto lg:h-[100vh] max-w-[97%] justify-center items-center text-center gap-8 py-12 px-6 sm:px-12">
                    <div className="flex flex-col w-full gap-2">
                        <h1 className="text-[#1F364A] text-2xl sm:text-3xl font-semibold">Testimoni</h1>
                        <hr className="bg-[#E0F7FA] h-0.5 w-full" />
                    </div>
                    <div className="flex flex-col sm:flex-row bg-[#E0F7FA] rounded-lg w-full h-auto max-w-[98%] justify-evenly items-center text-center mb-4 gap-8 p-8">
                        {[
                            {
                                imgSrc: 'assets/images/testimoni-1.png',
                                name: 'Budi Sutono',
                                status: 'Siswa SDN Lampung Kelas 4',
                                testimony: 'Aku senang banget bisa mendapatkan makanan gratis di sekolah setiap hari. Makanannya enak dan sehat, jadi aku bisa belajar dengan semangat. Terima kasih sudah peduli dengan kami!'
                            },
                            {
                                imgSrc: 'assets/images/testimoni-2.png',
                                name: 'Siti Nuryani',
                                status: 'Kepala Sekolah SDN 01 Rinjani',
                                testimony: 'Aku senang banget bisa mendapatkan makanan gratis di sekolah setiap hari. Makanannya enak dan sehat, jadi aku bisa belajar dengan semangat. Terima kasih sudah peduli dengan kami!'
                            }
                        ].map((i) => (
                            <div className="flex flex-row max-md:flex-wrap rounded-lg bg-[#435C72] h-auto max-h-[85%] w-full max-w-[90%] justify-around items-center p-8 gap-8">
                                <img src={i.imgSrc} alt={i.imgSrc} className="lg:w-1/4" />
                                <div className="flex flex-col text-left text-white gap-2">
                                    <h2 className="text-base">{i.name}</h2>
                                    <h3 className="text-xs">{i.status}</h3>
                                    <p className="text-xs text-justify italic font-light">{i.testimony}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col sm:flex-row bg-[#E0F7FA] rounded-lg w-full h-auto max-w-[98%] justify-evenly items-center text-center mb-4 gap-8 p-8">
                        {[
                            {
                                imgSrc: 'assets/images/testimoni-3.png',
                                name: 'Rudi',
                                status: 'SPPG Daerah Banyumas',
                                testimony: 'Program distribusi makanan gratis ini adalah langkah nyata dalam memastikan anak-anak mendapatkan asupan gizi yang cukup. Dengan sistem yang terorganisir, distribusi makanan berjalan lancar dan tepat sasaran. Kami berharap program ini terus berlanjut dan menginspirasi banyak pihak!'
                            },
                            {
                                imgSrc: 'assets/images/testimoni-4.png',
                                name: 'Aisyah Putri',
                                status: 'Siswi SDN 01 Takalar',
                                testimony: 'Seneng banget karena tiap hari bisa dapet makanan gratis. Menu favorit aku ikan goreng dan sayur bayem. Terima kasih untuk SPPG yang setiap hari udah anterin makanan, pemerintah, dan GiziTrack yang membantu pengiriman makanan ga telat lagi!'
                            }
                        ].map((i) => (
                            <div className="flex flex-row max-md:flex-wrap bg-[#435C72] h-auto max-h-[85%] w-full max-w-[90%] justify-around items-center p-8 gap-8">
                                <img src={i.imgSrc} alt={i.imgSrc} className="lg:w-1/4" />
                                <div className="flex flex-col text-left text-white gap-2">
                                    <h2 className="text-base">{i.name}</h2>
                                    <h3 className="text-xs">{i.status}</h3>
                                    <p className="text-xs text-justify italic font-light">{i.testimony}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}