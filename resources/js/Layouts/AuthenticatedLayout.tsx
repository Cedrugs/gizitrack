import Footer from '@/Components/Footer';
import Navbar from '@/Components/Navbar';
import { usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode} from 'react';

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;

    return (
        <div className="h-full bg-gray-100">
            <Navbar user={user}/>

            {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main className="min-h-[100vh]">{children}</main>
            <Footer/>
        </div>
    );
}
