import React, { useState } from 'react'
import { Link,useNavigate  } from 'react-router-dom';
import api from '../api/axios';
const Signup = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [address, setAddress] = useState("")
    const [userData,setUserdata]=useState(null)
    

    const navigate =useNavigate()
   const handleSubmit = async (e) => {

    e.preventDefault()

    if (password !== confirmPassword) {
        alert("Passwords do not match")
        return
    }

    const userData = {
        username,
        password,
        confirmPassword,
        email,
        phoneNumber,
        address
    }

    try {

        const res = await api.post(
            "/auth/register/",
            userData
        )
        alert("Account created successfully")
        navigate("/signin")
        console.log(res.data)

    } catch (error) {

        console.error(error)

    }

}

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">

            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">

                <h1 className="text-3xl font-bold text-center mb-2">
                    Create Account
                </h1>

                <p className="text-center text-gray-500 text-sm mb-6">
                    Join and start shopping today
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                >

                    {/* Username */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Username
                        </label>

                        <input
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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

                    {/* Confirm Password */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
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

                    {/* Phone Number */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Phone Number
                        </label>

                        <input
                            type="text"
                            placeholder="Enter phone number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
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

                    {/* Address */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Address
                        </label>

                        <input
                            type="text"
                            placeholder="Enter address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
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
                        Create Account
                    </button>

                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Already have an account?{" "}
                    <Link to={"/signin"} className="text-blue-500 cursor-pointer hover:underline">
                        Sign In
                    </Link>
                </p>

            </div>

        </div>
    )
}

export default Signup