import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "./../contexts/userContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const LoginPage = () => {
    const { authUser, login, resetAuth } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        console.log(authUser);
        if (authUser.user && authUser.success) {
            toast.success("Successfully logged in!");
            resetAuth();
            navigate("/");
        } else if (authUser.error && authUser.message) {
            toast.error(authUser.message);
            resetAuth();
            navigate("/");
        }
    }, [authUser]);

    const handleSubmit = (e) => {
        e.preventDefault();
        login({ email, password });
    };

    return (
        <div className="flex justify-center items-start min-h-screen bg-primary font-poppins mt-[80px]">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-secondary">
                    Login
                </h2>
                <form>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block mb-2 text-secondary"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block mb-2 text-secondary"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 rounded-md hover:bg-transparent transition-colors duration-300 border-[1px] border-black hover:text-black"
                        onClick={handleSubmit}
                    >
                        Login
                    </button>
                </form>

                <p className="text-gray-600 mb-4 text-center mt-8">
                    New user?{" "}
                    <Link
                        to="/users/register"
                        className="text-secondary hover:underline"
                    >
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
