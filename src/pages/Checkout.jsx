import React, { useContext, useState } from 'react'
import { CartContext } from '../context/CartContext'
import api from '../api/axios'
import { useNavigate } from 'react-router-dom'

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

    const handleChange = (e) => {
        setCheckoutData({
            ...checkoutData,
            [e.target.name]: e.target.value
        })

    }

    const totalPrice = cartItems.reduce((total, item) => {

        return total + item.line_total

    }, 0)

    const handlePlaceOrder = async () => {
        try {
            const shippingAddress = `
            ${checkoutData.fullname},
            ${checkoutData.phone},
            ${checkoutData.address},
            ${checkoutData.city},
            ${checkoutData.state} - ${checkoutData.pincode}`

            console.log({
                shipping_address: shippingAddress
            })

            const res = await api.post("/orders/", {
                shipping_address: shippingAddress
            })
            navigate("/order-success")
            console.log(res.data)
        } catch (error) {
            console.error(error);
        }

    }

    return (

        <div className='max-w-6xl mx-auto p-6'>

            <h1 className='text-3xl font-bold mb-8'>
                Checkout
            </h1>

            <div className='grid md:grid-cols-2 gap-8'>

                {/* Shipping Information */}
                <div className='border rounded-xl p-6'>

                    <h2 className='text-2xl font-semibold mb-6'>
                        Shipping Information
                    </h2>

                    {/* Full Name */}
                    <div className='mb-4'>

                        <label className='block mb-2 font-medium'>
                            Full Name
                        </label>

                        <input
                            type='text'
                            name='fullname'
                            value={checkoutData.fullname}
                            onChange={handleChange}
                            placeholder='Enter Your Full Name'
                            className='w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500'
                        />

                    </div>

                    {/* Phone Number */}
                    <div className='mb-4'>

                        <label className='block mb-2 font-medium'>
                            Phone Number
                        </label>

                        <input
                            type='text'
                            name='phone'
                            value={checkoutData.phone}
                            onChange={handleChange}
                            placeholder='Enter Your Phone Number'
                            className='w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500'
                        />

                    </div>

                    {/* Address */}
                    <div className='mb-4'>

                        <label className='block mb-2 font-medium'>
                            Address
                        </label>

                        <textarea
                            placeholder='Enter your address'
                            rows={4}
                            name='address'
                            value={checkoutData.address}
                            onChange={handleChange}
                            className='w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500'
                        />

                    </div>

                    {/* City */}
                    <div className='mb-4'>

                        <label className='block mb-2 font-medium'>
                            City
                        </label>

                        <input
                            type='text'
                            placeholder='Enter your city'
                            name='city'
                            value={checkoutData.city}
                            onChange={handleChange}
                            className='w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500'
                        />

                    </div>

                    {/* State + Pincode */}
                    <div className='grid grid-cols-2 gap-4 mb-4'>

                        <div>

                            <label className='block mb-2 font-medium'>
                                State
                            </label>

                            <input
                                type='text'
                                placeholder='Enter state'
                                name='state'
                                value={checkoutData.state}
                                onChange={handleChange}
                                className='w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500'
                            />

                        </div>

                        <div>

                            <label className='block mb-2 font-medium'>
                                Pincode
                            </label>

                            <input
                                type='text'
                                placeholder='Enter pincode'
                                name='pincode'
                                value={checkoutData.pincode}
                                onChange={handleChange}
                                className='w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500'
                            />

                        </div>

                    </div>

                </div>

                {/* Order Summary */}
                <div className='border rounded-xl p-6 h-fit'>

                    <h2 className='text-2xl font-semibold mb-6'>
                        Order Summary
                    </h2>

                    {
                        cartItems.map((item) => (

                            <div
                                key={item.id}
                                className='flex justify-between items-center mb-4 border-b pb-3'
                            >

                                <div>

                                    <h3 className='font-medium'>
                                        {item.product_name}
                                    </h3>

                                    <p className='text-sm text-gray-500'>
                                        Quantity: {item.quantity}
                                    </p>

                                </div>

                                <p className='font-semibold'>
                                    ₹ {item.line_total}
                                </p>

                            </div>

                        ))
                    }

                    {/* Total */}
                    <div className='flex justify-between items-center mt-6 pt-4 border-t'>

                        <h3 className='text-xl font-bold'>
                            Total
                        </h3>

                        <p className='text-xl font-bold text-blue-600'>
                            ₹ {totalPrice}
                        </p>

                    </div>
                    <button
                        onClick={handlePlaceOrder}
                        className='w-full mt-6 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition cursor-pointer'
                    >
                        Place Order </button>

                </div>

            </div>

        </div>

    )

}

export default Checkout