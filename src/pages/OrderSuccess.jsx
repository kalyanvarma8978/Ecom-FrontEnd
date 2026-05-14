import React from 'react'
import { useNavigate } from 'react-router-dom'

const OrderSuccess = () => {

    const navigate = useNavigate();

    return (

        <div className='min-h-[80vh] flex items-center justify-center p-6'>

            <div className='max-w-md w-full border rounded-2xl shadow-sm p-8 text-center'>

                {/* Success Icon */}
                <div className='text-6xl mb-4'>
                    ✅
                </div>

                {/* Heading */}
                <h1 className='text-3xl font-bold mb-4'>
                    Order Placed Successfully
                </h1>

                {/* Description */}
                <p className='text-gray-600 mb-6'>
                    Thank you for your purchase. Your order has been placed successfully.
                </p>

                {/* Continue Shopping */}
                <button
                    onClick={() => navigate("/")}
                    className='w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition'
                >
                    Continue Shopping
                </button>

            </div>

        </div>

    )

}

export default OrderSuccess