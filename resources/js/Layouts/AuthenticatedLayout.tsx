import Footer from '@/Components/Footer';
import Navbar from '@/Components/Navbar';
import { User } from '@/types/user';
import { PropsWithChildren, ReactNode} from 'react';

interface AuthenticatedProps {
    header?: ReactNode;
    user: User
}

export default function Authenticated({
    header,
    children,
    user,
}: PropsWithChildren<AuthenticatedProps>) {

    return (
        <div className="h-full">
            <Navbar user={user}/>

            {header && (
                <header className="flex justify-center">
                    <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main className="min-h-[100vh]">{children}</main>
            <Footer/>
        </div>
    );
}
