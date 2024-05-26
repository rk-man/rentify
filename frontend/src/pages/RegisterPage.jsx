import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "./../contexts/userContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const RegisterPage = () => {
    const { authUser, register, resetAuth } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [role, setRole] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        console.log(authUser);
        if (authUser.user && authUser.success) {
            toast.success("Successfully Registered");
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
        register({ email, password, firstName, lastName, role });
    };

    return (
        <div className="flex justify-center items-start min-h-screen bg-primary font-poppins mt-[80px]">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-secondary">
                    Register
                </h2>
                <form>
                    <div className="mb-4">
                        <label
                            htmlFor="firstName"
                            className="block mb-2 text-secondary"
                        >
                            First Name
                        </label>
                        <input
                            type="string"
                            id="firstName"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                            placeholder="Enter your first Name"
                            value={firstName}
                            onChange={(e) => {
                                setFirstName(e.target.value);
                            }}
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="lastName"
                            className="block mb-2 text-secondary"
                        >
                            Last Name
                        </label>
                        <input
                            type="string"
                            id="lastName"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                            placeholder="Enter your last Name"
                            value={lastName}
                            onChange={(e) => {
                                setLastName(e.target.value);
                            }}
                        />
                    </div>
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

                    <div className="mb-6">
                        <label
                            htmlFor="role"
                            className="block mb-2 text-secondary"
                        >
                            Who are you?
                        </label>
                        <select
                            className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent font-poppins"
                            onChange={(e) => {
                                e.preventDefault();
                                setRole(e.target.value);
                            }}
                            value={role}
                        >
                            <option value="">Select one</option>
                            <option value="seller">Seller</option>
                            <option value="buyer">Buyer</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 rounded-md hover:bg-transparent transition-colors duration-300 border-[1px] border-black hover:text-black"
                        onClick={handleSubmit}
                    >
                        Register
                    </button>
                </form>

                <p className="text-gray-600 mb-4 text-center mt-8">
                    Already a user?{" "}
                    <Link
                        to="/users/login"
                        className="text-secondary hover:underline"
                    >
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
