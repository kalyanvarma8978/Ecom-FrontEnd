import React from 'react'

const ProductDetailsSkeleton = () => {

    return (

        <div className='max-w-7xl mx-auto p-6'>

            <div className='grid md:grid-cols-2 gap-10 animate-pulse'>

                {/* Image Skeleton */}
                <div className='bg-white rounded-2xl shadow-sm p-6'>

                    <div className='w-full h-[500px] bg-gray-200 rounded-xl'></div>

                </div>

                {/* Content Skeleton */}
                <div>

                    {/* Title */}
                    <div className='h-10 bg-gray-200 rounded w-3/4 mb-6'></div>

                    {/* Price */}
                    <div className='h-8 bg-gray-200 rounded w-1/3 mb-8'></div>

                    {/* Description */}
                    <div className='space-y-3 mb-8'>

                        <div className='h-4 bg-gray-200 rounded w-full'></div>

                        <div className='h-4 bg-gray-200 rounded w-full'></div>

                        <div className='h-4 bg-gray-200 rounded w-5/6'></div>

                    </div>

                    {/* Stock */}
                    <div className='h-5 bg-gray-200 rounded w-1/4 mb-8'></div>

                    {/* Quantity Buttons */}
                    <div className='flex items-center gap-4 mb-8'>

                        <div className='w-10 h-10 bg-gray-200 rounded-lg'></div>

                        <div className='w-10 h-6 bg-gray-200 rounded'></div>

                        <div className='w-10 h-10 bg-gray-200 rounded-lg'></div>

                    </div>

                    {/* Buttons */}
                    <div className='flex gap-4'>

                        <div className='flex-1 h-14 bg-gray-200 rounded-xl'></div>

                        <div className='flex-1 h-14 bg-gray-200 rounded-xl'></div>

                    </div>

                </div>

            </div>

        </div>

    )

}

export default ProductDetailsSkeleton