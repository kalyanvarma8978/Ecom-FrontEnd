// import React, { useEffect, useState } from 'react'
// import api from '../services/api';
// import { useNavigate } from 'react-router-dom';

// const Orders = () => {
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const navigate=useNavigate();

//     const fetchOrders = async () => {
//         try {
//             const res = await api.get("/orders/")
//             setOrders(res.data.results || res.data)
//         } catch (err) {
//             console.error(err)
//         }
//         finally {
//             setLoading(false)
//         }
//     }
//     useEffect(() => {
//         fetchOrders()
//     }, [])

//     if (loading) return <p className="text-center mt-10">Loading...</p>;

//     if (orders.length === 0)
//         return <p className="text-center mt-10">No orders yet</p>;
//     return (
//         <div className='p-4'>
//             <h1 className='text-xl font-bold mb-4'>My Orders</h1>

//             {orders.map((order) => (
//                 <div key={order.id} className='border p-4 mb-4 rounded shadow-sm'>
//                     <p><b>Order ID:</b> {order.id}</p>
//                     <p><b>Status:</b> {order.status}</p>
//                     <p><b>Total:</b> ₹{order.total_price}</p>


//                     <button onClick={()=> navigate(`/orders/${order.id}`)} className='mt-2 text-blue-500 ttext-sm'>View Details</button>
//                 </div>
               
//             ))}

//         </div>
//     )
// }

// export default Orders
