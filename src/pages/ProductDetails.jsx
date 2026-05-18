import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../api/axios'
import { CartContext } from '../context/CartContext'
import { AuthContext } from '../context/AuthContext'
import ProductDetailsSkeleton from '../components/skeletons/ProductDetailsSkeleton'

const ProductDetails = () => {

    const { slug } = useParams()

    const navigate = useNavigate()

    const { addToCart } = useContext(CartContext)

    const { isAuthenticated } = useContext(AuthContext)

    const [product, setProduct] = useState(null)

    const [quantity, setQuantity] = useState(1)

    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const fetchProduct = async () => {

            try {

                const res = await api.get(
                    `/catalog/products/${slug}/`
                )

                setProduct(res.data)

                setLoading(false)

            } catch (error) {

                console.log(error)

                setLoading(false)

            }

        }

        fetchProduct()

    }, [slug])

    // Loading
    if (loading) {

        return <ProductDetailsSkeleton />

    }

    // Add To Cart
    const handleAddToCart = () => {

        if (!isAuthenticated) {

            navigate("/signin")

            return

        }

        addToCart(product.id, quantity)

    }

    return (

        <div className='bg-gray-50 min-h-screen py-6 md:py-10'>

            <div className='max-w-7xl mx-auto px-4 md:px-6'>

                <div
                    className='
                        grid
                        grid-cols-1
                        lg:grid-cols-2
                        gap-6
                        lg:gap-10
                        items-start
                    '
                >

                    {/* Left Section */}
                    <div
                        className='
                            bg-white
                            rounded-3xl
                            border
                            border-gray-100
                            shadow-sm
                            p-4
                            sm:p-6
                            lg:p-8
                            lg:sticky
                            lg:top-28
                        '
                    >

                        <div
                            className='
                                bg-gray-100
                                rounded-[28px]
                                p-4
                                sm:p-8
                                overflow-hidden
                            '
                        >

                            <img
                                src={product.images[0]?.image}
                                alt={product.name}
                                loading="lazy"
                                className='
                                    w-full
                                    h-[280px]
                                    sm:h-[400px]
                                    lg:h-[500px]
                                    object-contain
                                    hover:scale-105
                                    transition-transform
                                    duration-500
                                '
                            />

                        </div>

                    </div>

                    {/* Right Section */}
                    <div
                        className='
                            bg-white
                            rounded-3xl
                            border
                            border-gray-100
                            shadow-sm
                            p-5
                            sm:p-7
                            lg:p-8
                        '
                    >

                        {/* Category */}
                        <p
                            className='
                                text-xs
                                sm:text-sm
                                uppercase
                                tracking-[3px]
                                text-gray-500
                                mb-4
                            '
                        >
                            {product.category_name}
                        </p>

                        {/* Product Name */}
                        <h1
                            className='
                                text-3xl
                                sm:text-4xl
                                lg:text-5xl
                                font-bold
                                text-gray-900
                                leading-tight
                            '
                        >
                            {product.name}
                        </h1>

                        {/* Price */}
                        <div className='mt-6 sm:mt-8'>

                            <p
                                className='
                                    text-3xl
                                    sm:text-4xl
                                    font-bold
                                    text-black
                                '
                            >
                                ₹ {product.price}
                            </p>

                        </div>

                        {/* Description */}
                        <div className='mt-6 sm:mt-8'>

                            <p
                                className='
                                    text-gray-600
                                    leading-relaxed
                                    text-base
                                    sm:text-lg
                                '
                            >
                                {product.description}
                            </p>

                        </div>

                        {/* Stock */}
                        <div className='mt-6 sm:mt-8'>

                            <span
                                className='
                                    inline-flex
                                    items-center
                                    bg-green-100
                                    text-green-700
                                    px-4
                                    py-2
                                    rounded-full
                                    text-sm
                                    font-medium
                                '
                            >
                                In Stock • {product.stock} Available
                            </span>

                        </div>

                        {/* Quantity */}
                        <div className='mt-8 sm:mt-10'>

                            <p className='text-gray-900 font-medium mb-4'>
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
                                        quantity > 1 &&
                                        setQuantity(quantity - 1)
                                    }
                                    className='
                                        w-11
                                        h-11
                                        sm:w-12
                                        sm:h-12
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
                                        sm:text-xl
                                        font-semibold
                                        min-w-[30px]
                                        text-center
                                    '
                                >
                                    {quantity}
                                </span>

                                <button
                                    onClick={() =>
                                        setQuantity(quantity + 1)
                                    }
                                    className='
                                        w-11
                                        h-11
                                        sm:w-12
                                        sm:h-12
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

                        {/* Buttons */}
                        <div
                            className='
                                flex
                                flex-col
                                sm:flex-row
                                gap-4
                                mt-10
                            '
                        >

                            <button
                                onClick={handleAddToCart}
                                className='
                                    flex-1
                                    bg-black
                                    text-white
                                    py-4
                                    rounded-2xl
                                    font-medium
                                    hover:bg-gray-800
                                    transition-all
                                '
                            >
                                Add To Cart
                            </button>

                            <button
                                className='
                                    flex-1
                                    border
                                    border-gray-300
                                    py-4
                                    rounded-2xl
                                    font-medium
                                    hover:bg-gray-100
                                    transition-all
                                '
                            >
                                Buy Now
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    )

}

export default ProductDetails