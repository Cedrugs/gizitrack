import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

export default function Landing() {
    return (
        <>
            <Navbar/>
            <header className="flex flex-col relative bg-cover bg-center justify-center items-center text-center h-screen gap-12" style={{ backgroundImage: 'url("/assets/images/hero.png")', height: 'calc(100vh - 4rem'}}>
                <h1 className="text-7xl font-bold text-white">GiziTrack</h1>
                <h2 className="text-4xl font-semibold text-white opacity-80">"No Child Hungry, Every Child Healthy."</h2>
                <p className="text-white font-light max-w-4xl"> 
                    GiziTrack memastikan setiap makanan dalam program makan gratis sampai tepat waktu dan berkualitas. 
                    Dengan fitur pelacakan real-time, laporan akurat, serta analisis berbasis AI, kami membantu pemerintah, 
                    penyedia makanan, dan sekolah mengelola distribusi dengan lebih efisien.
                </p>
                <a href="#" className="flex items-center rounded-lg w-32 py-[6px] justify-center bg-[#435C72] hover:bg-opacity-80 transition-all ease-in-out duration-300" role="button">
                    <span className="font-medium text-[#FFFFFF]">Get Started</span>
                </a>
            </header>
            <section id="Fitur" className="flex flex-col justify-center items-center h-[100vh]">
                <div className="flex flex-col bg-white rounded-lg shadow-lg w-full h-[92vh] max-w-[97%] justify-center items-center text-center gap-8 px-12">
                    <h1 className="text-[#1F364A] text-3xl font-semibold">Fitur - Fitur<br/>Yang Disediakan Website</h1>
                    <div className="flex flex-row gap-5">
                        <div className="flex flex-col bg-white rounded-lg p-8 max-w-72 text-left gap-5 hover:shadow-lg transition-all ease-in-out duration-300">
                            <img src="/assets/icons/barchart.png" alt="Barchart Icon" className="max-w-20" />
                            <div className="flex flex-col gap-2">
                                <h2 className="text-[#1F364A] font-medium text-lg">Pelacakan Distribusi Makanan</h2>
                                <h3 className="text-[#1F364A] font-normal text-sm">Masyarakat melaporkan keterlambatan dan kualitas makanan secara real-time.</h3>
                            </div>

                        </div>
                        <div className="flex flex-col bg-white rounded-lg p-8 max-w-72 text-left gap-5 hover:shadow-lg transition-all ease-in-out duration-300">
                            <img src="/assets/icons/truck-light.png" alt="Truck Light Icon" className="max-w-20" />
                            <div className="flex flex-col gap-2">                                
                                <h2 className="text-[#1F364A] font-medium text-lg">Laporan & Feedback Realtime</h2>
                                <h3 className="text-[#1F364A] font-normal text-sm">Mengelola jenis makanan, jumlah, harga, dan pengeluaran.</h3>
                            </div>
                        </div>
                        <div className="flex flex-col bg-white rounded-lg p-8 max-w-72 text-left gap-5 hover:shadow-lg transition-all ease-in-out duration-300">
                            <img src="/assets/icons/money-bill.png" alt="Money Bill Icon" className="max-w-20" />
                            <div className="flex flex-col gap-2">
                                <h2 className="text-[#1F364A] font-medium text-lg">Manajemen Data & Anggaran</h2>
                                <h3 className="text-[#1F364A] font-normal text-sm">Memantau status pengiriman makanan: diproses, dikirim, atau tertunda.</h3>
                            </div>
                        </div>
                        <div className="flex flex-col bg-white rounded-lg p-8 max-w-72 text-left gap-5 hover:shadow-lg transition-all ease-in-out duration-300">
                            <img src="/assets/icons/robot.png" alt="Robot Icon" className="max-w-20" />
                            <div className="flex flex-col gap-2">
                                <h2 className="text-[#1F364A] font-medium text-lg">Analisis & Rekomendasi AI</h2>
                                <h3 className="text-[#1F364A] font-normal text-sm">AI menganalisis data untuk meningkatkan efisiensi distribusi.</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="Testimoni" className="flex flex-col justify-center items-center h-[100vh]">
                <div className="flex flex-col bg-white rounded-lg shadow-lg w-full h-[92vh] max-w-[97%] justify-center items-center text-center gap-8">
                    <div className="flex flex-col w-3/12 gap-2">
                        <h1 className="text-[#1F364A] text-3xl font-semibold">Testimoni</h1>
                        <hr className="bg-[#E0F7FA] h-0.5 w-full"/>
                    </div>
                    <div className="flex flex-row bg-[#E0F7FA] rounded-lg w-full h-[35vh] max-w-[90%] justify-evenly items-center text-center">
                        <div className="flex flex-row rounded-lg bg-[#435C72] h-[25vh] w-4/12 justify-evenly items-center">
                            <img src="/assets/images/testimoni-1.png" alt="Testimoni 1" />
                            <div className="flex flex-col text-left text-white gap-4">
                                <div>
                                    <h2 className="text-base">Budi Sutono</h2>
                                    <h3 className="text-sm font-light">Siswa SDN Lampung Kelas 4</h3>
                                </div>
                                <p className="text-xs max-w-60 text-justify italic font-light">Aku senang banget bisa mendapatkan makanan gratis di sekolah setiap hari. Makanannya enak dan sehat, jadi aku bisa belajar dengan semangat. Terima kasih sudah peduli dengan kami!</p>
                            </div>
                        </div>
                        <div className="flex flex-row rounded-lg bg-[#435C72] h-[25vh] w-4/12 justify-evenly items-center">
                            <img src="/assets/images/testimoni-2.png" alt="Testimoni 2" />
                            <div className="flex flex-col text-left text-white gap-4">
                                <div>
                                    <h2 className="text-base">Siti Nuryani</h2>
                                    <h3 className="text-sm font-light">Kepala Sekolah SDN 01 Rinjani</h3>
                                </div>
                                <p className="text-xs max-w-60 text-justify italic font-light">Sistem distribusi makanan gratis ini sangat membantu meningkatkan kesehatan dan konsentrasi belajar siswa. Anak-anak menjadi lebih bersemangat saat belajar karena kebutuhan gizi mereka terpenuhi. Kami sangat mengapresiasi program ini</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row bg-[#E0F7FA] rounded-lg w-full h-[35vh] max-w-[90%] justify-evenly items-center text-center">
                        <div className="flex flex-row rounded-lg bg-[#435C72] h-[25vh] w-4/12 justify-evenly items-center">
                            <img src="/assets/images/testimoni-3.png" alt="Testimoni 3" />
                            <div className="flex flex-col text-left text-white gap-4">
                                <div>
                                    <h2 className="text-base">Rudi</h2>
                                    <h3 className="text-sm font-light">SPPG Daerah Banyumas</h3>
                                </div>
                                <p className="text-xs max-w-60 text-justify italic font-light">Program distribusi makanan gratis ini adalah langkah nyata dalam memastikan anak-anak mendapatkan asupan gizi yang cukup. Dengan sistem yang terorganisir, distribusi makanan berjalan lancar dan tepat sasaran. Kami berharap program ini terus berlanjut dan menginspirasi banyak pihak!</p>
                            </div>
                        </div>
                        <div className="flex flex-row rounded-lg bg-[#435C72] h-[25vh] w-4/12 justify-evenly items-center">
                            <img src="/assets/images/testimoni-4.png" alt="Testimoni 4" />
                            <div className="flex flex-col text-left text-white gap-4">
                                <div>
                                    <h2 className="text-base">Aisyah Putri</h2>
                                    <h3 className="text-sm font-light">Siswi SDN 01 Takalar</h3>
                                </div>
                                <p className="text-xs max-w-60 text-justify italic font-light">Seneng banget karena tiap hari bisa dapet makanan gratis. Menu favorit aku ikan goreng dan sayur bayem. Terima kasih untuk SPPG yang setiap hari udah anterin makanan, pemerintah, dan GiziTrack yang membantu pengiriman makanan ga telat lagi!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    )
}