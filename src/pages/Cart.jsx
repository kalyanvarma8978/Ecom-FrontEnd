import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext'

const Cart = () => {

    const {
        cartItems,
        removeFromCart,
        updateQuantity
    } = useContext(CartContext)

    const totalPrice = cartItems.reduce((total, item) => {

        return total + (item.product.price * item.quantity)

    }, 0)

    return (

        <div className='max-w-5xl mx-auto p-4'>

            <h1 className='text-3xl font-bold mb-6'>
                Shopping Cart
            </h1>

            {
                cartItems.length === 0 ? (

                    <h1 className='text-xl font-medium'>
                        Cart is empty
                    </h1>

                ) : (

                    <>
                        {
                            cartItems.map((item) => (

                                <div
                                    key={item.product.id}
                                    className='flex items-center gap-4 border p-4 rounded-lg mb-4'
                                >

                                    <img
                                        src={item.product.images[0]?.image}
                                        alt={item.product.name}
                                        className='w-24 h-24 object-cover rounded'
                                    />

                                    <div className='flex-1'>

                                        <h2 className='text-lg font-semibold'>
                                            {item.product.name}
                                        </h2>

                                        <p className='text-gray-700 mt-1'>
                                            ₹ {item.product.price} × {item.quantity} = ₹ {item.product.price * item.quantity}
                                        </p>

                                        <div className='flex items-center gap-3 mt-3'>

                                            <button
                                                className='w-8 h-8 border rounded hover:bg-gray-100'
                                                onClick={() =>
                                                    item.quantity > 1 &&
                                                    updateQuantity(
                                                        item.product.id,
                                                        item.quantity - 1
                                                    )
                                                }
                                            >
                                                -
                                            </button>

                                            <span className='font-medium'>
                                                {item.quantity}
                                            </span>

                                            <button
                                                className='w-8 h-8 border rounded hover:bg-gray-100'
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.product.id,
                                                        item.quantity + 1
                                                    )
                                                }
                                            >
                                                +
                                            </button>

                                        </div>

                                        <button
                                            onClick={() =>
                                                removeFromCart(item.product.id)
                                            }
                                            className='text-red-500 mt-3 hover:underline'
                                        >
                                            Remove
                                        </button>

                                    </div>

                                </div>

                            ))
                        }

                        <div className='mt-6 border-t pt-4 flex justify-between items-center'>

                            <h2 className='text-2xl font-bold'>
                                Total: ₹ {totalPrice}
                            </h2>

                            <button
                                className='bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition'
                            >
                                Proceed to Checkout
                            </button>

                        </div>

                    </>

                )
            }

        </div>

    )
}

export default Cart