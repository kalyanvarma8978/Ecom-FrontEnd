import { createContext, useState, useEffect } from "react";
import api from "../api/axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState([]);

    // Fetch Cart
    const fetchCart = async () => {

        try {

            const res = await api.get("/cart/");

            setCartItems(res.data.items);

        } catch (error) {

            console.log(error);

        }

    };

    // Add To Cart
    const addToCart = async (productId, quantity) => {

        try {

            await api.post("/cart/items/", {
                product_id: productId,
                quantity: quantity
            });

            fetchCart();

        } catch (error) {

            console.log(error);

        }

    };

    // Update Quantity
    const updateQuantity = async (itemId, quantity) => {

        try {

            await api.patch(`/cart/items/${itemId}/`, {
                quantity: quantity
            });

            fetchCart();

        } catch (error) {

            console.log(error);

        }

    };

    // Remove Item
    const removeFromCart = async (itemId) => {

        try {

            await api.delete(`/cart/items/${itemId}/`);

            fetchCart();

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        fetchCart();

    }, []);

    return (

        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                updateQuantity,
                removeFromCart
            }}
        >

            {children}

        </CartContext.Provider>

    );

};