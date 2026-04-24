import { createContext, useContext, useState } from "react";
import api from "../services/api";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = async (productId) => {
    try {
      await api.post("/cart/items/", {
        product: productId,
        quantity: 1,
      });
      setCart((prev)=>[...prev,productId])

      console.log("Added to cart");
    } catch (err) {
      console.error(err.response?.data || err.message);
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