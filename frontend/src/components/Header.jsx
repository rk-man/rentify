import React, { useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import { toast } from "react-toastify";

const Header = () => {
    const { authUser, logout } = useContext(UserContext);

    const navigate = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault();
        await logout();
        toast.success("Logged out successfully");
        navigate("/");
    };

    return (
        <header className="bg-white shadow-md py-4 font-poppins">
            <nav className="container mx-auto flex items-center justify-between">
                <a href="/" className="text-secondary text-2xl font-bold mr-8">
                    Rentify
                </a>
                <div className="flex items-center gap-8">
                    <ul className="flex space-x-8">
                        {authUser.user && authUser.user.role === "seller" ? (
                            <li>
                                <Link
                                    to="/properties"
                                    className="text-secondary hover:text-accent hover:underline"
                                >
                                    Manage Property
                                </Link>
                            </li>
                        ) : null}
                    </ul>

                    {authUser.user ? (
                        <button
                            className="bg-black text-white hover:text-black py-2 px-4 rounded-md hover:bg-transparent transition-colors duration-300 font-poppins border-[1px] border-black"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    ) : (
                        <button
                            className="bg-black text-white hover:text-black py-2 px-4 rounded-md hover:bg-transparent transition-colors duration-300 font-poppins border-[1px] border-black"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate("/users/login");
                            }}
                        >
                            Login
                        </button>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
