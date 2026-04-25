import { createContext, useContext, useState } from "react";
import api from "../services/api";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      console.log("TOKEN USED:", token);
      console.log("Sending productId:", productId);

      const res = await api.post(
        "/cart/items/",
        {
          product_id: productId, // 🔥 FIXED KEY
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        
      );

      console.log("API RESPONSE:", res.data);

      setCart((prev) => [...prev, productId]);

      console.log("Added to cart ✅");

    } catch (err) {
      console.log("ERROR:", err.response?.data); // 🔥 IMPORTANT DEBUG
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;

export const useCart = () => useContext(CartContext);