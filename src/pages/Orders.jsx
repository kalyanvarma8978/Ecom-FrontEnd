import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

const Orders = () => {

    const navigate = useNavigate()

    const [orders, setOrders] = useState([])

    const [loading, setLoading] = useState(true)

    // Fetch Orders
    const fetchOrders = async () => {

        try {

            const res = await api.get("/orders/")

            setOrders(res.data)

            setLoading(false)

        } catch (error) {

            console.log(error)

            setLoading(false)

        }

    }

    useEffect(() => {

        fetchOrders()

    }, [])

    return (

        <div className='bg-gray-50 min-h-screen py-6 md:py-10'>

            <div className='max-w-7xl mx-auto px-4 md:px-6'>

                {/* Heading */}
                <div className='mb-10'>

                    <p className='text-gray-500 mb-2'>
                        Track Your Purchases
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
                        My Orders
                    </h1>

                </div>

                {/* Empty State */}
                {

                    !loading && orders.length === 0 && (

                        <div
                            className='
                                bg-white
                                rounded-3xl
                                border
                                border-gray-100
                                shadow-sm
                                p-10
                                text-center
                            '
                        >

                            <h2
                                className='
                                    text-2xl
                                    font-bold
                                    text-gray-900
                                    mb-4
                                '
                            >
                                No orders found
                            </h2>

                            <p className='text-gray-500'>
                                Your order history will appear here.
                            </p>

                        </div>

                    )

                }

                {/* Orders List */}
                <div className='space-y-6'>

                    {

                        loading ? (

                            [...Array(3)].map((_, index) => (

                                <div
                                    key={index}
                                    className='
                                        bg-white
                                        rounded-3xl
                                        border
                                        border-gray-100
                                        shadow-sm
                                        p-6
                                        animate-pulse
                                    '
                                >

                                    <div className='h-6 bg-gray-200 rounded w-40 mb-4'></div>

                                    <div className='h-4 bg-gray-200 rounded w-24 mb-6'></div>

                                    <div className='space-y-3'>

                                        <div className='h-4 bg-gray-200 rounded'></div>

                                        <div className='h-4 bg-gray-200 rounded'></div>

                                    </div>

                                </div>

                            ))

                        ) : (

                            orders.map((order) => (

                                <div
                                    key={order.id}
                                    onClick={() =>
                                        navigate(`/orders/${order.id}`)
                                    }
                                    className='
                                        bg-white
                                        rounded-3xl
                                        border
                                        border-gray-100
                                        shadow-sm
                                        p-5
                                        sm:p-7
                                        cursor-pointer
                                        hover:shadow-xl
                                        hover:-translate-y-1
                                        transition-all
                                        duration-300
                                    '
                                >

                                    {/* Header */}
                                    <div
                                        className='
                                            flex
                                            flex-col
                                            sm:flex-row
                                            sm:items-center
                                            sm:justify-between
                                            gap-4
                                            mb-6
                                        '
                                    >

                                        <div>

                                            <h2
                                                className='
                                                    text-2xl
                                                    font-bold
                                                    text-gray-900
                                                '
                                            >
                                                Order #{order.id}
                                            </h2>

                                            <p
                                                className='
                                                    text-gray-500
                                                    mt-1
                                                '
                                            >
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
                                                py-2
                                                rounded-full
                                                text-sm
                                                font-medium
                                            '
                                        >
                                            {order.status}
                                        </span>

                                    </div>

                                    {/* Products */}
                                    <div className='space-y-4'>

                                        {

                                            order.items.map((item) => (

                                                <div
                                                    key={item.id}
                                                    className='
                                                        flex
                                                        justify-between
                                                        items-center
                                                        border-b
                                                        border-gray-100
                                                        pb-4
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
                                                        ₹ {item.price}
                                                    </p>

                                                </div>

                                            ))

                                        }

                                    </div>

                                    {/* Footer */}
                                    <div
                                        className='
                                            flex
                                            flex-col
                                            sm:flex-row
                                            sm:items-center
                                            sm:justify-between
                                            gap-4
                                            pt-6
                                        '
                                    >

                                        <div>

                                            <p className='text-gray-500 text-sm'>
                                                Total Amount
                                            </p>

                                            <h3
                                                className='
                                                    text-2xl
                                                    font-bold
                                                    text-black
                                                    mt-1
                                                '
                                            >
                                                ₹ {order.total_amount}
                                            </h3>

                                        </div>

                                        <button
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
                                            View Details
                                        </button>

                                    </div>

                                </div>

                            ))

                        )

                    }

                </div>

            </div>

        </div>

    )

}

export default Orders