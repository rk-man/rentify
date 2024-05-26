import { createContext, useEffect, useState } from "react";

import axios from "axios";

import { BACKEND_URL } from "../constants";

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [authUser, setAuthUser] = useState({
        user: null,
        success: false,
        error: false,
        message: "",
    });

    useEffect(() => {
        getLoggedInUser();
    }, []);

    function resetAuth() {
        setAuthUser((prev) => {
            return {
                ...prev,
                success: false,
                error: false,
                message: "",
            };
        });
    }

    //login function
    async function login(userData) {
        try {
            const res = await axios.post(
                `${BACKEND_URL}/users/login`,
                userData,
                {
                    withCredentials: true,
                }
            );

            setAuthUser((prev) => {
                return { ...prev, user: res.data.data.user, success: true };
            });
        } catch (err) {
            setAuthUser((prev) => {
                return {
                    ...prev,
                    error: true,
                    message:
                        err?.response?.data?.message || "Something Went wrong",
                };
            });
        }
    }

    async function register(userData) {
        try {
            const res = await axios.post(
                `${BACKEND_URL}/users/register`,
                userData,
                {
                    withCredentials: true,
                }
            );

            setAuthUser((prev) => {
                return { ...prev, user: res.data.data.user, success: true };
            });
        } catch (err) {
            setAuthUser((prev) => {
                return {
                    ...prev,
                    error: true,
                    message:
                        err?.response?.data?.message || "Something Went wrong",
                };
            });
        }
    }

    //logout
    async function logout() {
        try {
            await axios.post(
                `${BACKEND_URL}/users/logout`,
                {},
                {
                    withCredentials: true,
                }
            );
            setAuthUser((prev) => {
                return {
                    ...prev,
                    user: null,
                };
            });
        } catch (err) {
            console.log(err);
        }
    }

    // Getting current user
    async function getLoggedInUser() {
        try {
            const res = await axios.get(`${BACKEND_URL}/users/me`, {
                withCredentials: true,
            });
            setAuthUser((prev) => {
                return {
                    ...prev,
                    user: res.data.data.user,
                };
            });
        } catch (err) {
            // console.log(err);
        }
    }

    return (
        <UserContext.Provider
            value={{
                authUser,
                login,
                register,
                resetAuth,
                logout,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;
