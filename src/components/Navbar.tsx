export default function Navbar() {
    return (
        <nav className="flex flex-row h-16 items-center justify-between bg-[#27445D] px-14">
            <div className="flex flex-row gap-3">
                <img src="/assets/logos/logo.png" alt="Logo" className="h-12"/>
                <p className="text-white text-lg font-medium mt-[10px]">GiziTrack</p>
            </div>
            <div className="flex flex-row gap-8">
                <a href="#" className="flex items-center rounded-lg w-20 py-[6px] justify-center bg-[#435C72] hover:bg-opacity-50 transition-all ease-in-out duration-300" role="button">
                    <span className="font-medium text-[#FFFFFF]">Login</span>
                </a>
                <a href="#" className="flex items-center rounded-lg w-32 py-[6px] justify-center bg-[#435C72] hover:bg-opacity-50 transition-all ease-in-out duration-300" role="button">
                    <span className="font-medium text-[#FFFFFF]">Get Started</span>
                </a>
            </div>
        </nav>
    )
}