export default function Footer() {
    return (
        <footer className="flex max-md:h-auto lg:h-[258px] bg-[#3F5B71] items-center py-12">
            <div className="flex lg:flex-row flex-wrap items-start justify-around w-full gap-5 max-md:text-center">
                <div className="flex flex-col items-center gap-4">
                    <p className="font-semibold text-2xl text-[#EFE9D5]">GiziTrack</p>
                    <img src="/assets/logos/logo-md.png" alt="Logo Icon" className="w-24"/>
                </div>
                <div className="flex flex-col lg:items-left gap-4 max-w-96">
                    <p className="font-semibold text-xl text-[#EFE9D5]">Contact Us</p>
                    <div className="flex flex-col text-sm gap-2 text-[#EFE9D5]">
                        <p>Jl. Jalur Sutera Bar. No.Kav. 21, RT.001/RW.004, Panunggangan, Kec. Pinang Kota Tangerang Banten</p>
                        <p>+62 123 4567 8900</p>
                        <p>ureeka.group6@binus.ac.id</p>
                    </div>
                </div>
                <div className="flex flex-col  lg:items-left gap-4 max-w-96">
                    <p className="font-semibold text-xl text-[#EFE9D5]">Follow Us</p>
                    <div className="flex flex-row text-sm gap-8 text-[#EFE9D5]">
                        <img src="/assets/icons/linkedin.png" alt="Linkedin Icon" />
                        <img src="/assets/icons/instagram.png" alt="Instagram Icon" />
                        <img src="/assets/icons/facebook.png" alt="Facebook Icon" />
                    </div>
                </div>
            </div>
        </footer>
    )
}