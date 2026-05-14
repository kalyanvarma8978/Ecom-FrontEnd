import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/axios'

const OrderDetails = () => {

    const { id } = useParams();

    const [order, setOrder] = useState(null);

    // Fetch Single Order
    const fetchOrder = async () => {

        try {

            const res = await api.get(`/orders/${id}/`);

            setOrder(res.data);

            console.log(res.data);

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        fetchOrder();

    }, []);

    // Loading State
    if (!order) {

        return (

            <h1 className='p-6 text-xl font-semibold'>
                Loading...
            </h1>

        );

    }

    return (

        <div className='max-w-5xl mx-auto p-6'>

            {/* Header */}
            <div className='flex justify-between items-center mb-8'>

                <div>

                    <h1 className='text-3xl font-bold'>
                        Order #{order.id}
                    </h1>

                    <p className='text-gray-500 mt-2'>
                        {
                            new Date(
                                order.created_at
                            ).toLocaleDateString()
                        }
                    </p>

                </div>

                <span className='capitalize bg-gray-100 px-4 py-2 rounded-full font-medium'>
                    {order.status}
                </span>

            </div>

            {/* Shipping Address */}
            <div className='border rounded-xl p-6 mb-6'>

                <h2 className='text-2xl font-semibold mb-4'>
                    Shipping Address
                </h2>

                <p className='text-gray-700 whitespace-pre-line'>
                    {order.shipping_address}
                </p>

            </div>

            {/* Ordered Products */}
            <div className='border rounded-xl p-6 mb-6'>

                <h2 className='text-2xl font-semibold mb-6'>
                    Ordered Products
                </h2>

                {
                    order.items.map((item) => (

                        <div
                            key={item.id}
                            className='flex justify-between items-center border-b pb-4 mb-4'
                        >

                            <div>

                                <h3 className='font-semibold text-lg'>
                                    {item.product_name}
                                </h3>

                                <p className='text-gray-500'>
                                    Quantity: {item.quantity}
                                </p>

                            </div>

                            <p className='font-bold text-blue-600'>
                                ₹ {item.price}
                            </p>

                        </div>

                    ))
                }

            </div>

            {/* Payment Details */}
            <div className='border rounded-xl p-6 mb-6'>

                <h2 className='text-2xl font-semibold mb-4'>
                    Payment Details
                </h2>

                <div className='space-y-3'>

                    <p>
                        <span className='font-semibold'>
                            Method:
                        </span>{" "}
                        {order.payment?.method}
                    </p>

                    <p>
                        <span className='font-semibold'>
                            Payment Status:
                        </span>{" "}
                        {order.payment?.status}
                    </p>

                </div>

            </div>

            {/* Total */}
            <div className='border rounded-xl p-6 flex justify-between items-center'>

                <h2 className='text-2xl font-bold'>
                    Total Amount
                </h2>

                <p className='text-3xl font-bold text-blue-600'>
                    ₹ {order.total_amount}
                </p>

            </div>

        </div>

    )

}

export default OrderDetails