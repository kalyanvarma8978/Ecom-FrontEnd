import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/axios'

const OrderDetails = () => {

    const { id } = useParams()

    const [order, setOrder] = useState(null)

    const [loading, setLoading] = useState(true)

    // Fetch Single Order
    const fetchOrder = async () => {

        try {

            const res = await api.get(`/orders/${id}/`)

            setOrder(res.data)

            setLoading(false)

        } catch (error) {

            console.log(error)

            setLoading(false)

        }

    }

    useEffect(() => {

        fetchOrder()

    }, [])

    // Loading State
    if (loading) {

        return (

            <div className='bg-gray-50 min-h-screen py-10 px-4'>

                <div className='max-w-6xl mx-auto space-y-6'>

                    {

                        [...Array(4)].map((_, index) => (

                            <div
                                key={index}
                                className='
                                    bg-white
                                    rounded-3xl
                                    border
                                    border-gray-100
                                    shadow-sm
                                    p-8
                                    animate-pulse
                                '
                            >

                                <div className='h-6 bg-gray-200 rounded w-52 mb-4'></div>

                                <div className='h-4 bg-gray-200 rounded w-32'></div>

                            </div>

                        ))

                    }

                </div>

            </div>

        )

    }

    return (

        <div className='bg-gray-50 min-h-screen py-6 md:py-10'>

            <div className='max-w-6xl mx-auto px-4 md:px-6'>

                {/* Header */}
                <div
                    className='
                        bg-white
                        rounded-3xl
                        border
                        border-gray-100
                        shadow-sm
                        p-6
                        sm:p-8
                        mb-6
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

                            <p className='text-gray-500 mb-2'>
                                Order Details
                            </p>

                            <h1
                                className='
                                    text-3xl
                                    sm:text-4xl
                                    font-bold
                                    text-gray-900
                                '
                            >
                                Order #{order.id}
                            </h1>

                            <p className='text-gray-500 mt-3'>
                                {
                                    new Date(
                                        order.created_at
                                    ).toLocaleDateString()
                                }
                            </p>

                        </div>

                        {/* Status */}
                        <span
                            className='
                                w-fit
                                capitalize
                                bg-green-100
                                text-green-700
                                px-5
                                py-3
                                rounded-full
                                font-medium
                            '
                        >
                            {order.status}
                        </span>

                    </div>

                </div>

                {/* Grid */}
                <div
                    className='
                        grid
                        grid-cols-1
                        lg:grid-cols-3
                        gap-6
                    '
                >

                    {/* Left Side */}
                    <div className='lg:col-span-2 space-y-6'>

                        {/* Shipping Address */}
                        <div
                            className='
                                bg-white
                                rounded-3xl
                                border
                                border-gray-100
                                shadow-sm
                                p-6
                                sm:p-8
                            '
                        >

                            <h2
                                className='
                                    text-2xl
                                    font-bold
                                    text-gray-900
                                    mb-6
                                '
                            >
                                Shipping Address
                            </h2>

                            <p
                                className='
                                    text-gray-600
                                    whitespace-pre-line
                                    leading-relaxed
                                '
                            >
                                {order.shipping_address}
                            </p>

                        </div>

                        {/* Ordered Products */}
                        <div
                            className='
                                bg-white
                                rounded-3xl
                                border
                                border-gray-100
                                shadow-sm
                                p-6
                                sm:p-8
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
                                Ordered Products
                            </h2>

                            <div className='space-y-6'>

                                {

                                    order.items.map((item) => (

                                        <div
                                            key={item.id}
                                            className='
                                                flex
                                                flex-col
                                                sm:flex-row
                                                sm:items-center
                                                sm:justify-between
                                                gap-4
                                                border-b
                                                border-gray-100
                                                pb-6
                                            '
                                        >

                                            <div>

                                                <h3
                                                    className='
                                                        text-lg
                                                        font-semibold
                                                        text-gray-900
                                                    '
                                                >
                                                    {item.product_name}
                                                </h3>

                                                <p
                                                    className='
                                                        text-gray-500
                                                        mt-2
                                                    '
                                                >
                                                    Quantity: {item.quantity}
                                                </p>

                                            </div>

                                            <p
                                                className='
                                                    text-2xl
                                                    font-bold
                                                    text-black
                                                '
                                            >
                                                ₹ {item.price}
                                            </p>

                                        </div>

                                    ))

                                }

                            </div>

                        </div>

                    </div>

                    {/* Right Side */}
                    <div className='space-y-6'>

                        {/* Payment Details */}
                        <div
                            className='
                                bg-white
                                rounded-3xl
                                border
                                border-gray-100
                                shadow-sm
                                p-6
                                sticky
                                top-28
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
                                Payment Details
                            </h2>

                            <div className='space-y-6'>

                                {/* Method */}
                                <div>

                                    <p className='text-gray-500 text-sm mb-2'>
                                        Payment Method
                                    </p>

                                    <h3
                                        className='
                                            text-lg
                                            font-semibold
                                            text-gray-900
                                        '
                                    >
                                        {order.payment?.method || "Cash On Delivery"}
                                    </h3>

                                </div>

                                {/* Status */}
                                <div>

                                    <p className='text-gray-500 text-sm mb-2'>
                                        Payment Status
                                    </p>

                                    <h3
                                        className='
                                            text-lg
                                            font-semibold
                                            text-green-600
                                        '
                                    >
                                        {order.payment?.status || "Successful"}
                                    </h3>

                                </div>

                                {/* Divider */}
                                <div className='border-t border-gray-100 pt-6'>

                                    <div
                                        className='
                                            flex
                                            justify-between
                                            items-center
                                        '
                                    >

                                        <div>

                                            <p className='text-gray-500 text-sm'>
                                                Total Amount
                                            </p>

                                            <h2
                                                className='
                                                    text-3xl
                                                    font-bold
                                                    text-black
                                                    mt-2
                                                '
                                            >
                                                ₹ {order.total_amount}
                                            </h2>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    )

}

export default OrderDetails