import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import toast from 'react-hot-toast'

const Profile = () => {

    const [user, setUser] = useState(null)

    const [loading, setLoading] = useState(true)

    const [isEditing, setIsEditing] = useState(false)

    const [formData, setFormData] = useState({

        username: "",

        phone_number: "",

        address: ""

    })

    // Fetch Logged In User
    const fetchProfile = async () => {

        try {

            const res = await api.get("/auth/me/")

            setUser(res.data)

            setFormData({

                username: res.data.username || "",

                phone_number: res.data.phone_number || "",

                address: res.data.address || ""

            })

            setLoading(false)

        } catch (error) {

            console.log(error)

            setLoading(false)

        }

    }

    useEffect(() => {

        fetchProfile()

    }, [])

    // Handle Change
    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        })

    }

    // Save Profile
    const handleSaveProfile = async () => {

        // Validation
        if (!formData.username.trim()) {

            toast.error("Username is required")

            return

        }

        if (!formData.phone_number.trim()) {

            toast.error("Phone number is required")

            return

        }

        if (formData.phone_number.length < 10) {

            toast.error("Enter valid phone number")

            return

        }

        if (!formData.address.trim()) {

            toast.error("Address is required")

            return

        }

        try {

            // IMPORTANT:
            // Only works if backend supports PATCH /auth/me/

            const res = await api.patch("/auth/me/", {

                username: formData.username,

                phone_number: formData.phone_number,

                address: formData.address

            })

            setUser(res.data)

            setIsEditing(false)

            toast.success("Profile updated successfully")

        } catch (error) {

            console.log(error)

            toast.error(
                "Profile update API not available in backend"
            )

        }

    }

    // Loading State
    if (loading) {

        return (

            <div className='bg-gray-50 min-h-screen py-10 px-4'>

                <div className='max-w-6xl mx-auto'>

                    <div
                        className='
                            bg-white
                            rounded-3xl
                            border
                            border-gray-100
                            shadow-sm
                            p-10
                            animate-pulse
                        '
                    >

                        <div className='h-10 bg-gray-200 rounded w-52 mb-8'></div>

                        <div className='h-40 bg-gray-200 rounded-3xl'></div>

                    </div>

                </div>

            </div>

        )

    }

    return (

        <div className='bg-gray-50 min-h-screen py-6 md:py-10'>

            <div className='max-w-6xl mx-auto px-4 md:px-6'>

                {/* Header */}
                <div className='mb-10'>

                    <p className='text-gray-500 mb-2'>
                        Manage Your Account
                    </p>

                    <h1
                        className='
                            text-3xl
                            sm:text-4xl
                            md:text-5xl
                            font-bold
                            text-gray-900
                        '
                    >
                        My Profile
                    </h1>

                </div>

                {/* Main Card */}
                <div
                    className='
                        bg-white
                        rounded-[32px]
                        border
                        border-gray-100
                        shadow-sm
                        overflow-hidden
                    '
                >

                    {/* Top Banner */}
                    <div
                        className='
                            h-40
                            bg-gradient-to-r
                            from-black
                            to-gray-900
                            relative
                        '
                    >

                        {/* Glow */}
                        <div
                            className='
                                absolute
                                w-72
                                h-72
                                bg-white/10
                                rounded-full
                                blur-3xl
                                -top-20
                                -right-20
                            '
                        ></div>

                    </div>

                    {/* Content */}
                    <div className='p-5 sm:p-8'>

                        {/* Top Section */}
                        <div
                            className='
                                flex
                                flex-col
                                lg:flex-row
                                lg:items-center
                                lg:justify-between
                                gap-8
                                -mt-24
                            '
                        >

                            {/* Left */}
                            <div
                                className='
                                    flex
                                    flex-col
                                    sm:flex-row
                                    items-center
                                    sm:items-end
                                    gap-6
                                '
                            >

                                {/* Avatar */}
                                <div
                                    className='
                                        w-36
                                        h-36
                                        rounded-full
                                        bg-white
                                        border-4
                                        border-white
                                        shadow-lg
                                        flex
                                        items-center
                                        justify-center
                                        text-5xl
                                        font-bold
                                        text-black
                                        shrink-0
                                    '
                                >

                                    {
                                        user.username
                                            ?.charAt(0)
                                            .toUpperCase()
                                    }

                                </div>

                                {/* User Info */}
                                <div className='text-center sm:text-left'>

                                    {

                                        isEditing ? (

                                            <input
                                                type='text'
                                                name='username'
                                                value={formData.username}
                                                onChange={handleChange}
                                                className='
                                                    bg-gray-100
                                                    border
                                                    border-gray-200
                                                    rounded-2xl
                                                    px-5
                                                    py-3
                                                    text-2xl
                                                    font-bold
                                                    outline-none
                                                    focus:ring-2
                                                    focus:ring-gray-300
                                                '
                                            />

                                        ) : (

                                            <h2
                                                className='
                                                    text-3xl
                                                    sm:text-4xl
                                                    font-bold
                                                    text-gray-900
                                                '
                                            >
                                                {user.username}
                                            </h2>

                                        )

                                    }

                                    <p className='text-gray-500 mt-3'>
                                        {user.email}
                                    </p>

                                    <span
                                        className='
                                            inline-flex
                                            items-center
                                            bg-gray-100
                                            text-gray-700
                                            px-4
                                            py-2
                                            rounded-full
                                            text-sm
                                            font-medium
                                            mt-4
                                        '
                                    >
                                        Customer Account
                                    </span>

                                </div>

                            </div>

                            {/* Buttons */}
                            <div
                                className='
                                    flex
                                    flex-col
                                    sm:flex-row
                                    gap-4
                                '
                            >

                                {

                                    isEditing ? (

                                        <>

                                            {/* Save */}
                                            <button
                                                onClick={handleSaveProfile}
                                                className='
                                                    bg-black
                                                    text-white
                                                    px-6
                                                    py-3
                                                    rounded-2xl
                                                    font-medium
                                                    hover:bg-gray-800
                                                    transition-all
                                                '
                                            >
                                                Save Changes
                                            </button>

                                            {/* Cancel */}
                                            <button
                                                onClick={() => {

                                                    setIsEditing(false)

                                                    setFormData({

                                                        username: user.username || "",

                                                        phone_number: user.phone_number || "",

                                                        address: user.address || ""

                                                    })

                                                }}
                                                className='
                                                    border
                                                    border-gray-300
                                                    px-6
                                                    py-3
                                                    rounded-2xl
                                                    font-medium
                                                    hover:bg-gray-100
                                                    transition-all
                                                '
                                            >
                                                Cancel
                                            </button>

                                        </>

                                    ) : (

                                        <button
                                            onClick={() =>
                                                setIsEditing(true)
                                            }
                                            className='
                                                bg-black
                                                text-white
                                                px-6
                                                py-3
                                                rounded-2xl
                                                font-medium
                                                hover:bg-gray-800
                                                transition-all
                                            '
                                        >
                                            Edit Profile
                                        </button>

                                    )

                                }

                            </div>

                        </div>

                        {/* Details */}
                        <div
                            className='
                                grid
                                grid-cols-1
                                md:grid-cols-2
                                gap-6
                                mt-12
                            '
                        >

                            {/* Phone */}
                            <div
                                className='
                                    bg-gray-50
                                    border
                                    border-gray-100
                                    rounded-3xl
                                    p-6
                                '
                            >

                                <h3
                                    className='
                                        text-lg
                                        font-semibold
                                        text-gray-900
                                        mb-4
                                    '
                                >
                                    Phone Number
                                </h3>

                                {

                                    isEditing ? (

                                        <input
                                            type='text'
                                            name='phone_number'
                                            value={formData.phone_number}
                                            onChange={handleChange}
                                            placeholder='Enter phone number'
                                            className='
                                                w-full
                                                bg-white
                                                border
                                                border-gray-200
                                                rounded-2xl
                                                px-5
                                                py-4
                                                outline-none
                                                focus:ring-2
                                                focus:ring-gray-300
                                            '
                                        />

                                    ) : (

                                        <p className='text-gray-600'>
                                            {
                                                user.phone_number
                                                    ? user.phone_number
                                                    : "No phone number added"
                                            }
                                        </p>

                                    )

                                }

                            </div>

                            {/* Address */}
                            <div
                                className='
                                    bg-gray-50
                                    border
                                    border-gray-100
                                    rounded-3xl
                                    p-6
                                '
                            >

                                <h3
                                    className='
                                        text-lg
                                        font-semibold
                                        text-gray-900
                                        mb-4
                                    '
                                >
                                    Address
                                </h3>

                                {

                                    isEditing ? (

                                        <textarea
                                            rows={4}
                                            name='address'
                                            value={formData.address}
                                            onChange={handleChange}
                                            placeholder='Enter address'
                                            className='
                                                w-full
                                                bg-white
                                                border
                                                border-gray-200
                                                rounded-2xl
                                                px-5
                                                py-4
                                                outline-none
                                                resize-none
                                                focus:ring-2
                                                focus:ring-gray-300
                                            '
                                        />

                                    ) : (

                                        <p className='text-gray-600'>
                                            {
                                                user.address
                                                    ? user.address
                                                    : "No address added"
                                            }
                                        </p>

                                    )

                                }

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    )

}

export default Profile