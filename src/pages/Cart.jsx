import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

    const navigate = useNavigate()

    const {
        cartItems,
        removeFromCart,
        updateQuantity
    } = useContext(CartContext)

    // Total Price
    const totalPrice = cartItems.reduce((total, item) => {

        return total + item.line_total

    }, 0)

    return (

        <div className='bg-gray-50 min-h-screen py-6 md:py-10'>

            <div className='max-w-7xl mx-auto px-4 md:px-6'>

                {/* Heading */}
                <div className='mb-10'>

                    <p className='text-gray-500 mb-2'>
                        Your Shopping Cart
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
                        Cart Overview
                    </h1>

                </div>

                {

                    cartItems.length === 0 ? (

                        /* Empty Cart */
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
                                Your cart is empty
                            </h2>

                            <p className='text-gray-500 mb-8'>
                                Looks like you haven't added anything yet.
                            </p>

                            <button
                                onClick={() => navigate("/")}
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
                                Continue Shopping
                            </button>

                        </div>

                    ) : (

                        <div
                            className='
                                grid
                                grid-cols-1
                                lg:grid-cols-3
                                gap-8
                            '
                        >

                            {/* Cart Items */}
                            <div className='lg:col-span-2 space-y-6'>

                                {

                                    cartItems.map((item) => (

                                        <div
                                            key={item.id}
                                            className='
                                                bg-white
                                                rounded-3xl
                                                border
                                                border-gray-100
                                                shadow-sm
                                                p-5
                                                sm:p-6
                                            '
                                        >

                                            <div
                                                className='
                                                    flex
                                                    flex-col
                                                    sm:flex-row
                                                    justify-between
                                                    gap-6
                                                '
                                            >

                                                {/* Left Content */}
                                                <div className='flex-1'>

                                                    {/* Product Name */}
                                                    <h2
                                                        className='
                                                            text-xl
                                                            sm:text-2xl
                                                            font-semibold
                                                            text-gray-900
                                                        '
                                                    >
                                                        {item.product_name}
                                                    </h2>

                                                    {/* Price */}
                                                    <p
                                                        className='
                                                            text-2xl
                                                            font-bold
                                                            text-black
                                                            mt-3
                                                        '
                                                    >
                                                        ₹ {item.product_price}
                                                    </p>

                                                    {/* Line Total */}
                                                    <p
                                                        className='
                                                            text-gray-500
                                                            mt-2
                                                        '
                                                    >
                                                        Total: ₹ {item.line_total}
                                                    </p>

                                                    {/* Quantity */}
                                                    <div className='mt-6'>

                                                        <p
                                                            className='
                                                                text-sm
                                                                text-gray-500
                                                                mb-3
                                                            '
                                                        >
                                                            Quantity
                                                        </p>

                                                        <div
                                                            className='
                                                                flex
                                                                items-center
                                                                gap-4
                                                            '
                                                        >

                                                            <button
                                                                onClick={() =>
                                                                    item.quantity > 1 &&
                                                                    updateQuantity(
                                                                        item.id,
                                                                        item.quantity - 1
                                                                    )
                                                                }
                                                                className='
                                                                    w-11
                                                                    h-11
                                                                    rounded-2xl
                                                                    bg-gray-100
                                                                    hover:bg-gray-200
                                                                    transition
                                                                    text-xl
                                                                    font-semibold
                                                                '
                                                            >
                                                                −
                                                            </button>

                                                            <span
                                                                className='
                                                                    text-lg
                                                                    font-semibold
                                                                '
                                                            >
                                                                {item.quantity}
                                                            </span>

                                                            <button
                                                                onClick={() =>
                                                                    updateQuantity(
                                                                        item.id,
                                                                        item.quantity + 1
                                                                    )
                                                                }
                                                                className='
                                                                    w-11
                                                                    h-11
                                                                    rounded-2xl
                                                                    bg-gray-100
                                                                    hover:bg-gray-200
                                                                    transition
                                                                    text-xl
                                                                    font-semibold
                                                                '
                                                            >
                                                                +
                                                            </button>

                                                        </div>

                                                    </div>

                                                    {/* Remove */}
                                                    <button
                                                        onClick={() =>
                                                            removeFromCart(item.id)
                                                        }
                                                        className='
                                                            mt-6
                                                            text-red-500
                                                            hover:text-red-600
                                                            font-medium
                                                            transition
                                                        '
                                                    >
                                                        Remove Item
                                                    </button>

                                                </div>

                                            </div>

                                        </div>

                                    ))

                                }

                            </div>

                            {/* Order Summary */}
                            <div
                                className='
                                    bg-white
                                    rounded-3xl
                                    border
                                    border-gray-100
                                    shadow-sm
                                    p-6
                                    h-fit
                                    lg:sticky
                                    lg:top-28
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
                                    Order Summary
                                </h2>

                                {/* Subtotal */}
                                <div
                                    className='
                                        flex
                                        justify-between
                                        items-center
                                        mb-4
                                    '
                                >

                                    <p className='text-gray-500'>
                                        Subtotal
                                    </p>

                                    <p className='font-semibold'>
                                        ₹ {totalPrice}
                                    </p>

                                </div>

                                {/* Shipping */}
                                <div
                                    className='
                                        flex
                                        justify-between
                                        items-center
                                        mb-6
                                    '
                                >

                                    <p className='text-gray-500'>
                                        Shipping
                                    </p>

                                    <p className='font-semibold'>
                                        Free
                                    </p>

                                </div>

                                {/* Divider */}
                                <div className='border-t border-gray-200 pt-6'>

                                    <div
                                        className='
                                            flex
                                            justify-between
                                            items-center
                                        '
                                    >

                                        <h3
                                            className='
                                                text-xl
                                                font-bold
                                                text-gray-900
                                            '
                                        >
                                            Total
                                        </h3>

                                        <p
                                            className='
                                                text-2xl
                                                font-bold
                                                text-black
                                            '
                                        >
                                            ₹ {totalPrice}
                                        </p>

                                    </div>

                                </div>

                                {/* Checkout Button */}
                                <button
                                    onClick={() =>
                                        navigate("/checkout")
                                    }
                                    className='
                                        w-full
                                        bg-black
                                        text-white
                                        py-4
                                        rounded-2xl
                                        font-medium
                                        mt-8
                                        hover:bg-gray-800
                                        transition-all
                                    '
                                >
                                    Proceed To Checkout
                                </button>

                            </div>

                        </div>

                    )

                }

            </div>

        </div>

    )

}

export default Cart