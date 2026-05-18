import React from 'react'
import { useNavigate } from 'react-router-dom'

const OrderSuccess = () => {

    const navigate = useNavigate()

    return (

        <div
            className='
                min-h-screen
                bg-gray-50
                flex
                items-center
                justify-center
                px-4
                py-10
            '
        >

            <div
                className='
                    bg-white
                    max-w-2xl
                    w-full
                    rounded-[32px]
                    border
                    border-gray-100
                    shadow-sm
                    p-8
                    md:p-12
                    text-center
                    relative
                    overflow-hidden
                '
            >

                {/* Background Glow */}
                <div
                    className='
                        absolute
                        w-72
                        h-72
                        bg-green-100
                        rounded-full
                        blur-3xl
                        opacity-40
                        -top-20
                        -right-20
                    '
                ></div>

                {/* Content */}
                <div className='relative z-10'>

                    {/* Success Icon */}
                    <div
                        className='
                            w-24
                            h-24
                            bg-green-100
                            text-green-600
                            rounded-full
                            flex
                            items-center
                            justify-center
                            text-5xl
                            mx-auto
                            mb-8
                        '
                    >
                        ✓
                    </div>

                    {/* Small Text */}
                    <p
                        className='
                            text-sm
                            uppercase
                            tracking-[4px]
                            text-gray-500
                            mb-4
                        '
                    >
                        Order Confirmed
                    </p>

                    {/* Heading */}
                    <h1
                        className='
                            text-3xl
                            sm:text-4xl
                            md:text-5xl
                            font-bold
                            text-gray-900
                            leading-tight
                        '
                    >
                        Your Order Has Been Placed Successfully
                    </h1>

                    {/* Description */}
                    <p
                        className='
                            text-gray-500
                            text-base
                            sm:text-lg
                            leading-relaxed
                            max-w-xl
                            mx-auto
                            mt-6
                        '
                    >
                        Thank you for shopping with us. Your order is now being processed and you’ll receive updates soon.
                    </p>

                    {/* Info Box */}
                    <div
                        className='
                            bg-gray-50
                            border
                            border-gray-100
                            rounded-3xl
                            p-5
                            mt-10
                            text-left
                        '
                    >

                        <div
                            className='
                                flex
                                flex-col
                                sm:flex-row
                                sm:items-center
                                sm:justify-between
                                gap-4
                            '
                        >

                            <div>

                                <p className='text-gray-500 text-sm'>
                                    Estimated Delivery
                                </p>

                                <h3
                                    className='
                                        text-lg
                                        font-semibold
                                        text-gray-900
                                        mt-1
                                    '
                                >
                                    3 - 5 Business Days
                                </h3>

                            </div>

                            <div>

                                <p className='text-gray-500 text-sm'>
                                    Payment Status
                                </p>

                                <h3
                                    className='
                                        text-lg
                                        font-semibold
                                        text-green-600
                                        mt-1
                                    '
                                >
                                    Successful
                                </h3>

                            </div>

                        </div>

                    </div>

                    {/* Buttons */}
                    <div
                        className='
                            flex
                            flex-col
                            sm:flex-row
                            gap-4
                            mt-10
                        '
                    >

                        {/* Continue Shopping */}
                        <button
                            onClick={() => navigate("/")}
                            className='
                                flex-1
                                bg-black
                                text-white
                                py-4
                                rounded-2xl
                                font-medium
                                hover:bg-gray-800
                                transition-all
                            '
                        >
                            Continue Shopping
                        </button>

                        {/* View Orders */}
                        <button
                            onClick={() => navigate("/orders")}
                            className='
                                flex-1
                                border
                                border-gray-300
                                py-4
                                rounded-2xl
                                font-medium
                                hover:bg-gray-100
                                transition-all
                            '
                        >
                            View Orders
                        </button>

                    </div>

                </div>

            </div>

        </div>

    )

}

export default OrderSuccess