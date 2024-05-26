import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../constants";

const HomePage = () => {
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [properties, setProperties] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getAllProperties();
    }, []);

    const itemsPerPage = 7;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = properties.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(properties.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const getAllProperties = async () => {
        try {
            const res = await axios.get(`${BACKEND_URL}/properties/all`, {
                withCredentials: true,
            });
            setProperties(res.data.data.properties);
            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto py-8 font-poppins">
            <h1 className="text-center text-4xl font-bold mb-16">
                Here's a list of amazing properties!
            </h1>

            {properties.length == 0 && (
                <h1 className="text-center">No properties found</h1>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {currentItems.map((property) => (
                    <div
                        key={property._id}
                        className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(`/properties/${property._id}/view`);
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

                            <div className="flex items-center justify-end mb-2">
                                <FaHeart style={{ marginRight: "8px" }} />
                                <span className="text-gray-600">
                                    {property.likes.length} Likes
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {properties.length > 0 ? (
                <div className="flex justify-center mt-8">
                    <nav aria-label="Pagination">
                        <ul className="flex">
                            <li>
                                <button
                                    onClick={() =>
                                        handlePageChange(currentPage - 1)
                                    }
                                    disabled={currentPage === 1}
                                    className={`px-3 py-2 rounded-l-md h-full ${
                                        currentPage === 1
                                            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                            : "bg-gray-200 text-white hover:bg-gray-500 transition-colors duration-300"
                                    }`}
                                >
                                    <FaChevronLeft />
                                </button>
                            </li>
                            {Array.from(
                                { length: totalPages },
                                (_, i) => i + 1
                            ).map((page) => (
                                <li key={page}>
                                    <button
                                        onClick={() => handlePageChange(page)}
                                        className={`px-3 py-2 ${
                                            currentPage === page
                                                ? "bg-black text-white"
                                                : "bg-gray-200 text-gray-500 hover:bg-gray-300 transition-colors duration-300"
                                        }`}
                                    >
                                        {page}
                                    </button>
                                </li>
                            ))}
                            <li>
                                <button
                                    onClick={() =>
                                        handlePageChange(currentPage + 1)
                                    }
                                    disabled={currentPage === totalPages}
                                    className={`px-3 py-2 rounded-r-md h-full ${
                                        currentPage === totalPages
                                            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                            : "bg-gray-200 text-white hover:bg-gray-500 transition-colors duration-300"
                                    }`}
                                >
                                    <FaChevronRight />
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            ) : null}
        </div>
    );
};

export default HomePage;
