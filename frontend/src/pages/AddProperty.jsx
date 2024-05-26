import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../constants";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../utils/LoadingSpinner";

const AddProperty = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        address: "",
        bedrooms: 0,
        bathrooms: 0,
        landmark: "",
        hospitalsNearby: "",
        schoolsNearby: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(formData);
        try {
            const res = await axios.post(
                `${BACKEND_URL}/properties/create`,
                formData,
                {
                    withCredentials: true,
                }
            );

            if (res.data?.data?.property) {
                toast.success("Property Added Successfully");
                navigate("/properties");
            }
            setLoading(false);
        } catch (err) {
            console.log(err);
            toast.error(err?.response?.data?.message);
            navigate("/properties");
            setLoading(false);
        }
    };

    return !loading ? (
        <div className="container mx-auto py-8 font-poppins">
            <h2 className="text-2xl font-bold mb-6 text-secondary">
                Add New Property
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
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                            placeholder="Enter property title"
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
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                            placeholder="Enter property price - Ex: 15,00,000 INR"
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
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                            placeholder="Enter property address"
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
                            value={formData.bedrooms}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                            placeholder="Enter number of bedrooms"
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
                            value={formData.bathrooms}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                            placeholder="Enter number of bathrooms"
                        />
                    </div>
                </div>

                {/* Right Column */}
                <div>
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
                            value={formData.landmark}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                            placeholder="Enter nearby landmark"
                        />
                    </div>
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
                            value={formData.hospitalsNearby}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                            placeholder="Enter the name of the nearby hospitals"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="schoolsNearby"
                            className="block mb-2 text-secondary"
                        >
                            Schools Nearby
                        </label>
                        <input
                            type="text"
                            id="schoolsNearby"
                            name="schoolsNearby"
                            value={formData.schoolsNearby}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                            placeholder="Enter the name of the nearby schools and colleges"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="bg-black text-white hover:text-black border-[1px] border-black py-2 px-4 rounded-md hover:bg-transparent transition-colors duration-300 col-span-2"
                >
                    Add Property
                </button>
            </form>
        </div>
    ) : (
        <LoadingSpinner />
    );
};

export default AddProperty;
