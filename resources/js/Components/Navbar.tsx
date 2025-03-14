import { Link } from "@inertiajs/react"
import Dropdown from "@/Components/Dropdown";

interface User {
    id: number;
    name: string;
    email: string;
    role?: string;
}

interface NavbarProps {
    user: User | null;
}

export default function Navbar({ user }: NavbarProps) {

    return (
        <nav className="flex flex-row h-16 items-center justify-between bg-[#27445D] max-md:px-2 lg:px-14">
            <Link href="/" className="flex flex-row gap-3">
                <img src="/assets/logos/logo.png" alt="Logo" className="max-md:h-10 lg:h-12"/>
                <p className="text-white max-md:text-base lg:text-lg font-medium mt-[9px]">GiziTrack</p>
            </Link>
            <div className="flex flex-row max-md:gap-2 lg:gap-8">
                { user ? (
                    <div className="relative ms-3">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <span className="inline-flex rounded-md">
                                    <button
                                        type="button"
                                        className="inline-flex items-center rounded-md border border-transparent px-3 py-2 text-sm font-medium leading-4 text-white transition duration-150 ease-in-out focus:outline-none"
                                    >
                                        {user.name}

                                        <svg
                                            className="-me-0.5 ms-2 h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </span>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                <Dropdown.Link
                                    href={route('profile.edit')}
                                >
                                    Profile
                                </Dropdown.Link>
                                <Dropdown.Link
                                    href={route('dashboard')}
                                    as="button"
                                >
                                    Dashboard
                                </Dropdown.Link>
                                <Dropdown.Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                >
                                    Log Out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                ) : (
                    <>
                        <Link href="/login">
                            <a href="#" className="flex items-center rounded-lg w-20 py-[6px] justify-center bg-[#435C72] hover:bg-opacity-50 transition-all ease-in-out duration-300" role="button">
                                <span className="font-medium text-[#FFFFFF] max-md:text-sm">Login</span>
                            </a>
                        </Link>
                        <Link href="/register">
                            <a href="#" className="flex items-center rounded-lg w-32 py-[6px] justify-center bg-[#435C72] hover:bg-opacity-50 transition-all ease-in-out duration-300" role="button">
                                <span className="font-medium text-[#FFFFFF] max-md:text-sm">Get Started</span>
                            </a>
                        </Link>
                    </>
                )}
            </div>
        </nav>
    )
}