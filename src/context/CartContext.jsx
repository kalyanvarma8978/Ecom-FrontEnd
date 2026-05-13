import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product, quantity) => {

        /* Check Existing Product */
        const existingItem = cartItems.find(
            (item) => item.product.id === product.id
        );

        /* If Product Already Exists */
        if (existingItem) {

            const updatedCart = cartItems.map((item) =>

                item.product.id === product.id

                    ? {
                        ...item,
                        quantity: item.quantity + quantity
                    }

                    : item

            );

            setCartItems(updatedCart);

        }

        /* Add New Product */
        else {

            setCartItems([
                ...cartItems,
                {
                    product,
                    quantity
                }
            ]);

        }

    };

    const removeFromCart = (productId)=>{
        const updatedCart =cartItems.filter(
            (item)=>item.product.id!==productId
        );

        setCartItems(updatedCart)
    };

    const updateQuantity = (productId, newQuantity) =>{
        const updatedCart = cartItems.map((item)=>
        item.product.id===productId ?
        {
            ...item,
            quantity:newQuantity
        } : item
    );
    setCartItems(updatedCart)
    } 

    useEffect(() => {

        console.log(cartItems);

    }, [cartItems]);

    return (

        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity
            }}
        >

            {children}

        </CartContext.Provider>

    );

};