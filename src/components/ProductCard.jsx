import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {

    return (

        <Link
            to={`/product/${product.slug}`}
            className='group'
        >

            <div
                className='
                    bg-white
                    rounded-3xl
                    overflow-hidden
                    border
                    border-gray-100
                    shadow-sm
                    hover:shadow-xl
                    hover:-translate-y-1
                    transition-all
                    duration-300
                '
            >

                {/* Image Container */}
                <div
                    className='
                        bg-gray-100
                        p-8
                        overflow-hidden
                    '
                >

                    <img
                        src={product.images[0]?.image}
                        alt={product.name}
                        loading="lazy"
                        className='
                            w-full
                            h-64
                            object-contain
                            transition-transform
                            duration-500
                            group-hover:scale-105
                        '
                    />

                </div>

                {/* Content */}
                <div className='p-6'>

                    {/* Category */}
                    <p
                        className='
                            text-sm
                            text-gray-500
                            mb-2
                        '
                    >
                        {product.category_name}
                    </p>

                    {/* Product Name */}
                    <h2
                        className='
                            text-lg
                            font-semibold
                            text-gray-900
                            line-clamp-2
                            min-h-[56px]
                        '
                    >
                        {product.name}
                    </h2>

                    {/* Price */}
                    <div className='mt-4 mb-5'>

                        <p
                            className='
                                text-2xl
                                font-bold
                                text-black
                            '
                        >
                            ₹ {product.price}
                        </p>

                    </div>

                    {/* Button */}
                    <button
                        className='
                            w-full
                            bg-black
                            text-white
                            py-3
                            rounded-2xl
                            font-medium
                            hover:bg-gray-800
                            transition-all
                        '
                    >
                        View Product
                    </button>

                </div>

            </div>

        </Link>

    )

}

export default ProductCard