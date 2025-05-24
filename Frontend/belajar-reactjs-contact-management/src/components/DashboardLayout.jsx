import { Outlet } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

export default function DashboardLayout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/Dashboard/users/logout');
    };
    return (
        <body className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen flex flex-col">
            <header className="bg-gradient shadow-lg">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <Link to="/dashboard/contacts" className="flex items-center hover:opacity-90 transition-opacity duration-200">
                        <i className="fas fa-address-book text-white text-2xl mr-3"></i>
                        <div className="text-white font-bold text-xl">Contact Management</div>
                    </Link>
                    <nav>
                        <ul className="flex space-x-6">
                            <li>
                                <Link to="/dashboard/users/profile" className="text-gray-100 hover:text-white flex items-center transition-colors duration-200">
                                    <i className="fas fa-user-circle mr-2"></i>
                                    <span>Profile</span>
                                </Link>
                            </li>
                            <li>
                                <button onClick={handleLogout} className="text-gray-100 hover:text-white flex items-center transition-colors duration-200">
                                    <i className="fas fa-sign-out-alt mr-2"></i>
                                    <span>Logout</span>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 flex-grow">
                <Outlet />
            </main>

            <div className="mt-10 mb-6 text-center text-gray-400 text-sm">
                <p>&copy; 2025 Contact Management. All rights reserved.</p>
            </div>
        </body>
    );
}