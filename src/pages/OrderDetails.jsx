// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import api from "../services/api";

// const OrderDetails = () => {
//   const { id } = useParams();

//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchOrder = async () => {
//     try {
//       const res = await api.get(`/orders/${id}/`);
//       setOrder(res.data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrder();
//   }, [id]);

//   // Loading
//   if (loading)
//     return <p className="text-center mt-10">Loading...</p>;

//   // Error
//   if (!order)
//     return <p className="text-center mt-10">Order not found</p>;

//   // 🔥 Steps (DO NOT include cancelled)
//   const steps = ["Placed", "Packed", "Shipped", "Delivered"];

//   // 🔥 FIXED STATUS HANDLING
//   const getCurrentStep = (status) => {
//     const normalized = status?.toLowerCase().trim();

//     switch (normalized) {
//       case "pending":
//         return 0;
//       case "processing":
//         return 1;
//       case "shipped":
//         return 2;
//       case "delivered":
//         return 3;
//       case "cancelled":
//         return -1;
//       default:
//         return 0;
//     }
//   };

//   const currentStep = getCurrentStep(order.status);

//   return (
//     <div className="p-4 max-w-3xl mx-auto">
//       <h1 className="text-xl font-bold mb-4">Order Details</h1>

//       {/* Order Info */}
//       <div className="border p-4 rounded mb-4">
//         <p><b>Order ID:</b> {order.id}</p>
//         <p><b>Status:</b> {order.status}</p>
//         <p><b>Total:</b> ₹{order.total_price}</p>
//       </div>

//       {/* 🔥 TRACKING */}
//       {order.status?.toLowerCase().trim() === "cancelled" ? (
//         <div className="bg-red-100 text-red-600 p-4 rounded mb-4 text-center font-semibold">
//           Order Cancelled ❌
//         </div>
//       ) : (
//         <div className="flex items-center justify-between mb-6">
//           {steps.map((step, index) => (
//             <div key={index} className="flex-1 text-center">

//               {/* Circle */}
//               <div
//                 className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-white ${
//                   index <= currentStep ? "bg-green-500" : "bg-gray-300"
//                 }`}
//               >
//                 {index + 1}
//               </div>

//               {/* Label */}
//               <p className="text-sm mt-2">{step}</p>

//               {/* Line */}
//               {index < steps.length - 1 && (
//                 <div
//                   className={`h-1 mt-2 ${
//                     index < currentStep ? "bg-green-500" : "bg-gray-300"
//                   }`}
//                 ></div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Items */}
//       <h2 className="font-semibold mb-2">Items</h2>

//       {order.items?.map((item) => (
//         <div key={item.id} className="border p-3 mb-2 rounded">
//           <p>{item.product_name}</p>
//           <p>Qty: {item.quantity}</p>
//           <p>₹{item.price}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default OrderDetails;