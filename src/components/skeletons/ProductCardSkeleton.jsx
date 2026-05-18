import React from 'react'

const ProductCardSkeleton = () => {

    return (

        <div
            className='
                w-full
                bg-white
                rounded-xl
                overflow-hidden
                shadow-sm
                border
                border-gray-100
                animate-pulse
            '
        >

            {/* Image Skeleton */}
            <div className='w-full h-72 bg-gray-200'></div>

            {/* Content */}
            <div className='p-4'>

                {/* Title */}
                <div className='h-4 bg-gray-200 rounded w-3/4 mb-3'></div>

                <div className='h-4 bg-gray-200 rounded w-1/2 mb-5'></div>

                {/* Price */}
                <div className='h-6 bg-gray-200 rounded w-1/3 mb-5'></div>

                {/* Button */}
                <div className='h-10 bg-gray-200 rounded-lg w-full'></div>

            </div>

        </div>

    )

}

export default ProductCardSkeleton