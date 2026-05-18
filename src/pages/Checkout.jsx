import React, { useContext, useState } from 'react'
import { CartContext } from '../context/CartContext'
import api from '../api/axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Checkout = () => {

    const { cartItems } = useContext(CartContext)

    const navigate = useNavigate()

    const [checkoutData, setCheckoutData] = useState({

        fullname: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: ""

    })

    // Handle Input Change
    const handleChange = (e) => {

        setCheckoutData({

            ...checkoutData,

            [e.target.name]: e.target.value

        })

    }

    // Total Price
    const totalPrice = cartItems.reduce((total, item) => {

        return total + item.line_total

    }, 0)

    // Place Order
    const handlePlaceOrder = async () => {

        // Validation
        if (!checkoutData.fullname.trim()) {

            toast.error("Full name is required")

            return

        }

        if (!checkoutData.phone.trim()) {

            toast.error("Phone number is required")

            return

        }

        if (checkoutData.phone.length < 10) {

            toast.error("Enter valid phone number")

            return

        }

        if (!checkoutData.address.trim()) {

            toast.error("Address is required")

            return

        }

        if (!checkoutData.city.trim()) {

            toast.error("City is required")

            return

        }

        if (!checkoutData.state.trim()) {

            toast.error("State is required")

            return

        }

        if (!checkoutData.pincode.trim()) {

            toast.error("Pincode is required")

            return

        }

        if (checkoutData.pincode.length < 6) {

            toast.error("Enter valid pincode")

            return

        }

        try {

            const shippingAddress = `
                ${checkoutData.fullname},
                ${checkoutData.phone},
                ${checkoutData.address},
                ${checkoutData.city},
                ${checkoutData.state} - ${checkoutData.pincode}
            `

            const res = await api.post("/orders/", {

                shipping_address: shippingAddress

            })

            console.log(res.data)

            toast.success("Order placed successfully")

            navigate("/order-success")

        } catch (error) {

            console.error(error)

            toast.error("Failed to place order")

        }

    }

    return (

        <div className='bg-gray-50 min-h-screen py-6 md:py-10'>

            <div className='max-w-7xl mx-auto px-4 md:px-6'>

                {/* Heading */}
                <div className='mb-10'>

                    <p className='text-gray-500 mb-2'>
                        Secure Checkout
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
                        Checkout
                    </h1>

                </div>

                <div
                    className='
                        grid
                        grid-cols-1
                        lg:grid-cols-3
                        gap-8
                    '
                >

                    {/* Shipping Information */}
                    <div
                        className='
                            lg:col-span-2
                            bg-white
                            rounded-3xl
                            border
                            border-gray-100
                            shadow-sm
                            p-5
                            sm:p-7
                            lg:p-8
                        '
                    >

                        <h2
                            className='
                                text-2xl
                                font-bold
                                text-gray-900
                                mb-8
                            '
                        >
                            Shipping Information
                        </h2>

                        {/* Full Name */}
                        <div className='mb-5'>

                            <label
                                className='
                                    block
                                    mb-2
                                    text-sm
                                    font-medium
                                    text-gray-700
                                '
                            >
                                Full Name
                            </label>

                            <input
                                type='text'
                                name='fullname'
                                value={checkoutData.fullname}
                                onChange={handleChange}
                                placeholder='Enter your full name'
                                className='
                                    w-full
                                    bg-gray-100
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

                        </div>

                        {/* Phone */}
                        <div className='mb-5'>

                            <label
                                className='
                                    block
                                    mb-2
                                    text-sm
                                    font-medium
                                    text-gray-700
                                '
                            >
                                Phone Number
                            </label>

                            <input
                                type='text'
                                name='phone'
                                value={checkoutData.phone}
                                onChange={handleChange}
                                placeholder='Enter your phone number'
                                className='
                                    w-full
                                    bg-gray-100
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

                        </div>

                        {/* Address */}
                        <div className='mb-5'>

                            <label
                                className='
                                    block
                                    mb-2
                                    text-sm
                                    font-medium
                                    text-gray-700
                                '
                            >
                                Address
                            </label>

                            <textarea
                                rows={5}
                                name='address'
                                value={checkoutData.address}
                                onChange={handleChange}
                                placeholder='Enter your address'
                                className='
                                    w-full
                                    bg-gray-100
                                    border
                                    border-gray-200
                                    rounded-2xl
                                    px-5
                                    py-4
                                    outline-none
                                    focus:ring-2
                                    focus:ring-gray-300
                                    resize-none
                                '
                            />

                        </div>

                        {/* City + State */}
                        <div
                            className='
                                grid
                                grid-cols-1
                                sm:grid-cols-2
                                gap-5
                                mb-5
                            '
                        >

                            {/* City */}
                            <div>

                                <label
                                    className='
                                        block
                                        mb-2
                                        text-sm
                                        font-medium
                                        text-gray-700
                                    '
                                >
                                    City
                                </label>

                                <input
                                    type='text'
                                    name='city'
                                    value={checkoutData.city}
                                    onChange={handleChange}
                                    placeholder='Enter city'
                                    className='
                                        w-full
                                        bg-gray-100
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

                            </div>

                            {/* State */}
                            <div>

                                <label
                                    className='
                                        block
                                        mb-2
                                        text-sm
                                        font-medium
                                        text-gray-700
                                    '
                                >
                                    State
                                </label>

                                <input
                                    type='text'
                                    name='state'
                                    value={checkoutData.state}
                                    onChange={handleChange}
                                    placeholder='Enter state'
                                    className='
                                        w-full
                                        bg-gray-100
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

                            </div>

                        </div>

                        {/* Pincode */}
                        <div>

                            <label
                                className='
                                    block
                                    mb-2
                                    text-sm
                                    font-medium
                                    text-gray-700
                                '
                            >
                                Pincode
                            </label>

                            <input
                                type='text'
                                name='pincode'
                                value={checkoutData.pincode}
                                onChange={handleChange}
                                placeholder='Enter pincode'
                                className='
                                    w-full
                                    bg-gray-100
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

                        </div>

                    </div>

                    {/* Order Summary */}
                    <div
                        className='
                            bg-white
                            rounded-3xl
                            border
                            border-gray-100
                            shadow-sm
                            p-6
                            h-fit
                            lg:sticky
                            lg:top-28
                        '
                    >

                        <h2
                            className='
                                text-2xl
                                font-bold
                                text-gray-900
                                mb-8
                            '
                        >
                            Order Summary
                        </h2>

                        {

                            cartItems.map((item) => (

                                <div
                                    key={item.id}
                                    className='
                                        flex
                                        justify-between
                                        items-center
                                        border-b
                                        border-gray-100
                                        pb-4
                                        mb-4
                                    '
                                >

                                    <div>

                                        <h3
                                            className='
                                                font-semibold
                                                text-gray-900
                                            '
                                        >
                                            {item.product_name}
                                        </h3>

                                        <p
                                            className='
                                                text-sm
                                                text-gray-500
                                                mt-1
                                            '
                                        >
                                            Quantity: {item.quantity}
                                        </p>

                                    </div>

                                    <p
                                        className='
                                            font-bold
                                            text-black
                                        '
                                    >
                                        ₹ {item.line_total}
                                    </p>

                                </div>

                            ))

                        }

                        {/* Total */}
                        <div className='border-t border-gray-200 pt-6'>

                            <div
                                className='
                                    flex
                                    justify-between
                                    items-center
                                '
                            >

                                <h3
                                    className='
                                        text-xl
                                        font-bold
                                        text-gray-900
                                    '
                                >
                                    Total
                                </h3>

                                <p
                                    className='
                                        text-2xl
                                        font-bold
                                        text-black
                                    '
                                >
                                    ₹ {totalPrice}
                                </p>

                            </div>

                        </div>

                        {/* Button */}
                        <button
                            onClick={handlePlaceOrder}
                            className='
                                w-full
                                mt-8
                                bg-black
                                text-white
                                py-4
                                rounded-2xl
                                font-medium
                                hover:bg-gray-800
                                transition-all
                            '
                        >
                            Place Order
                        </button>

                    </div>

                </div>

            </div>

        </div>

    )

}

export default Checkout