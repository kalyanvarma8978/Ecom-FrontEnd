import React from 'react'
import { useNavigate } from 'react-router-dom'

const ProductCard = ({ product }) => {

    const navigate = useNavigate()

    return (

        <div
            onClick={() => navigate(`/product/${product.slug}`)}
            className='
                w-full
                cursor-pointer
                bg-white
                rounded-xl
                overflow-hidden
                shadow-sm
                hover:shadow-lg
                transition-all
                duration-300
                border
                border-gray-100
            '
        >

            {/* Image Wrapper */}
            <div
                className='
                    w-full
                    h-72
                    bg-white
                    overflow-hidden
                    flex
                    items-center
                    justify-center
                    p-4
                '
            >

                <img
                    src={product.images[0]?.image}
                    alt={product.name}
                    className='
                        w-full
                        h-full
                        object-contain
                    '
                />

            </div>

            {/* Details Section */}
            <div className='p-4'>

                {/* Product Name */}
                <h2 className='text-lg font-semibold text-gray-800 line-clamp-2 min-h-[56px]'>
                    {product.name}
                </h2>

                {/* Product Price */}
                <p className='text-blue-600 text-xl font-bold mt-2'>
                    ₹ {product.price}
                </p>

                {/* Button */}
                <button
                    className='
                        w-full
                        mt-4
                        bg-blue-600
                        text-white
                        py-2
                        rounded-lg
                        hover:bg-blue-700
                        transition
                    '
                >
                    Add To Cart
                </button>

            </div>

        </div>

    )

}

export default ProductCard