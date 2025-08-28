import { PlusIcon } from "lucide-react";
import { Link } from 'react-router';

const Navbar = () => {
    return (
        <header className="bg-base-300 border-b border-base-content/10 sticky top-0 z-50 shadow-lg">
            {/* Container with max width and responsive padding */}
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-3">
                <div className="flex items-center justify-between">
                    {/* Logo/Title section with glowing effect */}
                    <h1 className="text-3xl font-bold text-primary font-mono tracking-tighter
                    transition-all duration-300 hover:text-accent ">
                        Notice Board
                    </h1>

                    {/* Navigation actions with smooth transitions */}
                    <div className="flex items-center gap-4">
                        <Link
                            to={"/create"}
                            className="btn btn-primary hover:scale-105 "
                        >
                            {/* Button icon with pulse animation */}
                            <PlusIcon className="size-5 animate-pulse" />
                            <span>New Notice</span>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar