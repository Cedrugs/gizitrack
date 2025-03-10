export default function Navbar() {
    return (
        <nav className="flex flex-row h-16 items-center justify-between bg-[#27445D] max-md:px-2 lg:px-14">
            <div className="flex flex-row gap-3">
                <img src="/assets/logos/logo.png" alt="Logo" className="max-md:h-10 lg:h-12"/>
                <p className="text-white max-md:text-base lg:text-lg font-medium mt-[9px]">GiziTrack</p>
            </div>
            <div className="flex flex-row max-md:gap-2 lg:gap-8">
                <a href="#" className="flex items-center rounded-lg w-20 py-[6px] justify-center bg-[#435C72] hover:bg-opacity-50 transition-all ease-in-out duration-300" role="button">
                    <span className="font-medium text-[#FFFFFF] max-md:text-sm">Login</span>
                </a>
                <a href="#" className="flex items-center rounded-lg w-32 py-[6px] justify-center bg-[#435C72] hover:bg-opacity-50 transition-all ease-in-out duration-300" role="button">
                    <span className="font-medium text-[#FFFFFF] max-md:text-sm">Get Started</span>
                </a>
            </div>
        </nav>
    )
}