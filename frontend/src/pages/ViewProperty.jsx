import React, { useContext, useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../constants";
import { toast } from "react-toastify";
import LoadingSpinner from "../utils/LoadingSpinner";
import { UserContext } from "../contexts/userContext";

const ViewProperty = () => {
    const { authUser } = useContext(UserContext);

    const [loading, setLoading] = useState(true);
    const params = useParams();
    const [property, setProperty] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getProperty(params.propertyId);
    }, []);

    const [liked, setLiked] = useState(false);

    const toggleLike = () => {
        setLiked(!liked);
    };

    const getProperty = async (propertyId) => {
        try {
            const res = await axios.get(
                `${BACKEND_URL}/properties/${propertyId}`,
                {
                    withCredentials: true,
                }
            );

            const property = res.data.data.property;
            const likes = property.likes;
            delete property.likes;
            const userLikedBy = likes?.filter((like) => {
                return (
                    like.likedBy !== authUser?.user?._id &&
                    like.property === propertyId
                );
            })[0];
            setProperty({
                ...property,
                isLiked: userLikedBy ? true : false,
            });
            setLoading(false);
        } catch (err) {
            // toast.error(err?.response?.data?.message);
            setLoading(false);
            navigate("/users/login");
        }
    };

    const addOrRemoveLike = async (e) => {
        e.preventDefault();
        try {
            if (!property.isLiked) {
                await axios.post(
                    `${BACKEND_URL}/likes/${property._id}/add`,
                    {},
                    { withCredentials: true }
                );

                setProperty((prev) => {
                    return {
                        ...prev,
                        isLiked: true,
                    };
                });
            } else {
                await axios.delete(
                    `${BACKEND_URL}/likes/${property._id}/remove`,
                    { withCredentials: true }
                );

                setProperty((prev) => {
                    return {
                        ...prev,
                        isLiked: false,
                    };
                });
            }
        } catch (err) {
            console.log(err);
        }
    };

    return !loading ? (
        <div className="container mx-auto py-8 font-poppins">
            <div className="max-w-3xl mx-auto rounded-lg shadow-md overflow-hidden">
                <div className="relative">
                    <img
                        src="https://via.placeholder.com/600x400"
                        alt={property.title}
                        className="w-full h-96 object-cover"
                    />
                    <div className="absolute top-2 right-2">
                        <button
                            onClick={toggleLike}
                            className="text-white focus:outline-none"
                        >
                            {property.isLiked ? (
                                <FaHeart
                                    className="text-red-500 text-xl"
                                    onClick={addOrRemoveLike}
                                />
                            ) : (
                                <FaRegHeart
                                    className="text-xl"
                                    onClick={addOrRemoveLike}
                                />
                            )}
                        </button>
                    </div>
                    <div className="absolute bottom-4 left-4 bg-black bg-opacity-75 text-white px-3 py-1 rounded-md">
                        {property.price.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                        })}
                    </div>
                </div>
                <div className="bg-white p-6">
                    <h3 className="text-2xl font-bold mb-4 text-secondary">
                        {property.title}
                    </h3>
                    <p className="text-gray-800 mb-4">{property.address}</p>
                    <div className="flex items-center mb-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-600 mr-2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M5 5a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H7a2 2 0 01-2-2V5z" />
                        </svg>
                        <span className="text-gray-600">
                            {property.bedrooms} Bedrooms
                        </span>
                    </div>
                    <div className="flex items-center mb-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-600 mr-2"
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
                    <p className="text-gray-800 mb-2">
                        <strong>Hospitals Nearby:</strong>{" "}
                        {property.hospitalsNearby}
                    </p>
                    <p className="text-gray-800 mb-4">
                        <strong>Schools Nearby:</strong>{" "}
                        {property.schoolsNearby}
                    </p>
                    <button className="bg-black text-white hover:text-black border-[1px] border-black py-2 px-4 rounded-md hover:bg-transparent transition-colors duration-300">
                        I'm Interested
                    </button>
                </div>
            </div>
        </div>
    ) : (
        <LoadingSpinner />
    );
};

export default ViewProperty;
