import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

const Orders = () => {

    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);

    // Fetch Orders
    const fetchOrders = async () => {

        try {

            const res = await api.get("/orders/");

            setOrders(res.data);

            console.log(res.data);

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        fetchOrders();

    }, []);

    return (

        <div className='max-w-6xl mx-auto p-6'>

            <h1 className='text-3xl font-bold mb-8'>
                My Orders
            </h1>

            {
                orders.length === 0 ? (

                    <h2 className='text-gray-500 text-lg'>
                        No orders found
                    </h2>

                ) : (

                    orders.map((order) => (

                        <div
                            key={order.id}
                            onClick={() => navigate(`/orders/${order.id}`)}
                            className='border rounded-xl p-6 mb-6 shadow-sm cursor-pointer hover:shadow-md transition'
                        >

                            {/* Header */}
                            <div className='flex justify-between items-center mb-4'>

                                <div>

                                    <h2 className='text-xl font-semibold'>
                                        Order #{order.id}
                                    </h2>

                                    <p className='text-gray-500 text-sm'>
                                        {
                                            new Date(
                                                order.created_at
                                            ).toLocaleDateString()
                                        }
                                    </p>

                                </div>

                                <span className='capitalize bg-gray-100 px-4 py-2 rounded-full text-sm font-medium'>
                                    {order.status}
                                </span>

                            </div>

                            {/* Products */}
                            <h3 className='font-semibold mb-3'>
                                Products
                            </h3>

                            {
                                order.items.map((item) => (

                                    <div
                                        key={item.id}
                                        className='flex justify-between items-center mb-2'
                                    >

                                        <p>
                                            {item.product_name} × {item.quantity}
                                        </p>

                                        <p>
                                            ₹ {item.price}
                                        </p>

                                    </div>

                                ))
                            }

                            {/* Total */}
                            <div className='border-t mt-4 pt-4 flex justify-between items-center'>

                                <h3 className='text-lg font-bold'>
                                    Total
                                </h3>

                                <p className='text-lg font-bold text-blue-600'>
                                    ₹ {order.total_amount}
                                </p>

                            </div>

                        </div>

                    ))

                )
            }

        </div>

    )

}

export default Orders