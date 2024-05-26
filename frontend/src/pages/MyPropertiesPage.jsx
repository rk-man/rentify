import React, { useContext, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../constants";
import { toast } from "react-toastify";
import axios from "axios";
import LoadingSpinner from "../utils/LoadingSpinner";
import { UserContext } from "../contexts/userContext";

const MyPropertiesPage = () => {
    const { authUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMyProperties();
    }, []);

    const getMyProperties = async () => {
        try {
            const res = await axios.get(`${BACKEND_URL}/properties`, {
                withCredentials: true,
            });

            setProperties(res.data.data.properties);
            setLoading(false);
        } catch (err) {
            toast.error(err?.response?.data?.message);
            setLoading(false);
        }
    };

    // const properties = [
    //     {
    //         _id: "1",
    //         title: "Cozy Apartment in Downtown",
    //         price: 120000,
    //         address: "123 Main St, City",
    //         images: ["https://via.placeholder.com/300"],
    //         bedrooms: 2,
    //         bathrooms: 1,
    //     },
    //     {
    //         _id: "2",
    //         title: "Modern Loft with City Views",
    //         price: 250000,
    //         address: "456 Oak St, City",
    //         images: ["https://via.placeholder.com/300"],
    //         bedrooms: 1,
    //         bathrooms: 1,
    //     },
    //     {
    //         _id: "3",
    //         title: "Luxurious Villa by the Beach",
    //         price: 850000,
    //         address: "789 Ocean Blvd, City",
    //         images: ["https://via.placeholder.com/300"],
    //         bedrooms: 4,
    //         bathrooms: 3,
    //     },
    // ];

    return !loading ? (
        <div className="container mx-auto py-8 font-poppins">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-center text-4xl font-bold mb-16">
                    Hey {authUser?.user?.firstName}, Here's a list of your
                    properties!
                </h1>
                <button
                    className="bg-black hover:text-black text-white py-2 px-4 rounded-md hover:bg-transparent transition-colors duration-300 flex items-center border-[1px] border-black"
                    onClick={(e) => {
                        e.preventDefault();
                        navigate("/properties/create");
                    }}
                >
                    <FaPlus className="mr-2" />
                    Add Property
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {properties.length > 0 ? (
                    properties.map((property) => (
                        <div
                            key={property._id}
                            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate(`/properties/${property._id}/edit`);
                            }}
                        >
                            <div className="relative">
                                <img
                                    src={"https://via.placeholder.com/300"}
                                    alt={property.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="absolute top-2 left-2 bg-accent text-white px-2 py-1 rounded-md bg-black px-2 py-1">
                                    {property.price}
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-bold mb-2 text-secondary">
                                    {property.title}
                                </h3>
                                <p className="text-gray-600 mb-2">
                                    {property.address}
                                </p>
                                <div className="flex items-center mb-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-gray-600 mr-1"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M5 5a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H7a2 2 0 01-2-2V5z" />
                                    </svg>
                                    <span className="text-gray-600">
                                        {property.bedrooms} Bedrooms
                                    </span>
                                </div>
                                <div className="flex items-center mb-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-gray-600 mr-1"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M17 9V5a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h10a2 2 0 002-2zM5 3a1 1 0 00-1 1v4a1 1 0 001 1h10a1 1 0 001-1V4a1 1 0 00-1-1H5z"
                                            clipRule="evenodd"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            d="M10 13a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span className="text-gray-600">
                                        {property.bathrooms} Bathrooms
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <h1>No properties found</h1>
                )}
            </div>
        </div>
    ) : (
        <LoadingSpinner />
    );
};

export default MyPropertiesPage;
