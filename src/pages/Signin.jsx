import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import Cookies from "js-cookie"
import { AuthContext } from '../context/AuthContext';
const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const{setIsAuthenticated}=useContext(AuthContext)
    const navigate = useNavigate();
     const handleSubmit = async (e) => {
        e.preventDefault()

        const userData = {
            email,
            password
        }
        try {
            const res = await api.post("/auth/login/",
                userData
            )
            Cookies.set("access",res.data.access);
            Cookies.set("refresh",res.data.refresh)
            setIsAuthenticated(true)
            navigate("/navbar")

            console.log(res.data);
        } catch (error) {
            console.error(error)
        }

        console.log(userData)
    }
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">

            <div className="bg-white shadow-lg rounded-2xl p-6 md:p-8 w-full max-w-md">

                <h1 className="text-2xl md:text-3xl font-bold text-center mb-2">
                    Welcome Back
                </h1>

                <p className="text-center text-gray-500 text-sm mb-6">
                    Sign in to continue shopping
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 md:gap-5"
                >

                    {/* Email */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="
                                w-full
                                p-3
                                rounded-lg
                                border
                                border-gray-300
                                focus:outline-none
                                focus:ring-2
                                focus:ring-black
                            "
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="
                                w-full
                                p-3
                                rounded-lg
                                border
                                border-gray-300
                                focus:outline-none
                                focus:ring-2
                                focus:ring-black
                            "
                        />
                    </div>

                    <button
                        type="submit"
                        className="
                            w-full
                            bg-black
                            text-white
                            p-3
                            rounded-lg
                            hover:bg-gray-800
                            transition
                            duration-300
                            cursor-pointer
                        "
                    >
                        Sign In
                    </button>

                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Don't have an account? {""}
                    <Link to={"/signup"} className="text-blue-500 cursor-pointer hover:underline">
                        Sign Up
                    </Link>
                </p>

            </div>

        </div>
    )
}

export default Signin
