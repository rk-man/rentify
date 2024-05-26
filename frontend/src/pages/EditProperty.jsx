import React, { useEffect, useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../constants";
import { toast } from "react-toastify";
import LoadingSpinner from "../utils/LoadingSpinner";

const EditProperty = () => {
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const [property, setProperty] = useState(null);

    useEffect(() => {
        getMyProperty(params.propertyId);
    }, []);

    const navigate = useNavigate();
    const handleChange = (e) => {
        setProperty({ ...property, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Submit form data
        try {
            const res = await axios.patch(
                `${BACKEND_URL}/properties/${params.propertyId}/update`,
                property,
                {
                    withCredentials: true,
                }
            );

            setProperty(res.data.data.property);
            setLoading(false);
            toast.success("Updated successfully");
        } catch (err) {
            toast.error(err?.response?.data?.message);
            setLoading(false);
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Submit form data
        try {
            await axios.delete(
                `${BACKEND_URL}/properties/${params.propertyId}/delete`,
                {
                    withCredentials: true,
                }
            );

            setProperty(null);
            setLoading(false);
            navigate("/properties");
            toast.success("Deleted successfully");
        } catch (err) {
            toast.error(err?.response?.data?.message);
            setLoading(false);
        }
    };

    const getMyProperty = async (propertyId) => {
        try {
            const res = await axios.get(
                `${BACKEND_URL}/properties/${propertyId}`,
                {
                    withCredentials: true,
                }
            );

            setProperty(res.data.data.property);
            setLoading(false);
        } catch (err) {
            toast.error(err?.response?.data?.message);
            setLoading(false);
        }
    };
    return (
        <>
            {loading && <LoadingSpinner />}
            {property ? (
                <div className="container mx-auto py-8 font-poppins">
                    <h2 className="text-2xl font-bold mb-6 text-secondary">
                        Property Details
                    </h2>
                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        {/* Left Column */}
                        <div>
                            <div className="mb-4">
                                <label
                                    htmlFor="title"
                                    className="block mb-2 text-secondary"
                                >
                                    Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={property.title}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="price"
                                    className="block mb-2 text-secondary"
                                >
                                    Price
                                </label>
                                <input
                                    type="text"
                                    id="price"
                                    name="price"
                                    value={property.price}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="address"
                                    className="block mb-2 text-secondary"
                                >
                                    Address
                                </label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={property.address}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="bedrooms"
                                    className="block mb-2 text-secondary"
                                >
                                    Bedrooms
                                </label>
                                <input
                                    type="number"
                                    id="bedrooms"
                                    name="bedrooms"
                                    value={property.bedrooms}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="bathrooms"
                                    className="block mb-2 text-secondary"
                                >
                                    Bathrooms
                                </label>
                                <input
                                    type="number"
                                    id="bathrooms"
                                    name="bathrooms"
                                    value={property.bathrooms}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                                />
                            </div>
                        </div>

                        {/* Right Column */}
                        <div>
                            {" "}
                            <div className="mb-4">
                                <label
                                    htmlFor="landmark"
                                    className="block mb-2 text-secondary"
                                >
                                    Landmark
                                </label>
                                <input
                                    type="text"
                                    id="landmark"
                                    name="landmark"
                                    value={property.landmark}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                                />
                            </div>
                            {/* Closing tag for the form */}
                            <div className="mb-4">
                                <label
                                    htmlFor="hospitalsNearby"
                                    className="block mb-2 text-secondary"
                                >
                                    Hospitals Nearby
                                </label>
                                <input
                                    type="text"
                                    id="hospitalsNearby"
                                    name="hospitalsNearby"
                                    value={property.hospitalsNearby}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                                    placeholder="Enter the name of the nearby hospitals"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="collegesNearby"
                                    className="block mb-2 text-secondary"
                                >
                                    Colleges Nearby
                                </label>
                                <input
                                    type="text"
                                    id="collegesNearby"
                                    name="collegesNearby"
                                    value={property.schoolsNearby}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                                    placeholder="Enter the name of the nearby schools and colleges"
                                />
                            </div>
                        </div>

                        <div className="col-span-2 flex justify-end">
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors duration-300 mr-4"
                            >
                                Delete
                            </button>
                            <button
                                type="submit"
                                className="bg-black text-white border-black border-[1px] hover:text-black py-2 px-4 rounded-md hover:bg-transparent transition-colors duration-300"
                            >
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            ) : null}
            ;
        </>
    );
};

export default EditProperty;
