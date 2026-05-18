import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import ProductCard from '../components/ProductCard'
import ProductCardSkeleton from '../components/skeletons/ProductCardSkeleton'

const Home = ({
    searchQuery,
    selectedCategory,
    setSelectedCategory
}) => {

    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        /* Fetch Products */
        const fetchProducts = async () => {

            try {

                const res = await api.get("/catalog/products/")

                setProducts(res.data.results)

                setLoading(false)

            } catch (error) {

                console.error(error)

                setLoading(false)

            }

        }

        /* Fetch Categories */
        const fetchCategories = async () => {

            try {

                const res = await api.get("/catalog/categories/")

                setCategories(res.data.results)

            } catch (error) {

                console.error(error)

            }

        }

        fetchProducts()
        fetchCategories()

    }, [])

    /* Search + Category Filtering */
    const filteredProducts = products.filter((product) => {

        const matchesSearch =
            product.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase())

        const matchesCategory =
            selectedCategory === "All"
                ? true
                : product.category === selectedCategory

        return matchesSearch && matchesCategory

    })

    return (

        <div className='bg-gray-50 min-h-screen'>

            <div className='max-w-7xl mx-auto px-4 md:px-6 py-8'>

                {/* Hero Section */}
                <div
                    className='
                        relative
                        overflow-hidden
                        rounded-[32px]
                        bg-gradient-to-r
                        from-black
                        to-gray-900
                        mb-16
                    '
                >

                    {/* Glow Effect */}
                    <div
                        className='
                            absolute
                            w-96
                            h-96
                            bg-white/5
                            rounded-full
                            blur-3xl
                            -top-20
                            -right-20
                        '
                    ></div>

                    <div
                        className='
                            relative
                            flex
                            flex-col
                            items-center
                            justify-center
                            text-center
                            py-20
                            md:py-28
                            px-6
                        '
                    >

                        {/* Small Text */}
                        <p
                            className='
                                text-gray-400
                                uppercase
                                tracking-[4px]
                                text-xs
                                md:text-sm
                                mb-6
                            '
                        >
                            Minimal Modern Ecommerce
                        </p>

                        {/* Heading */}
                        <h1
                            className='
                                text-4xl
                                sm:text-5xl
                                md:text-7xl
                                font-bold
                                text-white
                                leading-tight
                                max-w-5xl
                            '
                        >
                            Discover Premium Products For Modern Living
                        </h1>

                        {/* Description */}
                        <p
                            className='
                                text-gray-400
                                mt-8
                                text-base
                                md:text-lg
                                leading-relaxed
                                max-w-2xl
                            '
                        >
                            Explore curated collections designed with simplicity,
                            elegance, and everyday comfort in mind.
                        </p>

                        {/* Buttons */}
                        <div
                            className='
                                flex
                                flex-wrap
                                justify-center
                                gap-4
                                mt-10
                            '
                        >

                            <button
                                className='
                                    bg-white
                                    text-black
                                    px-7
                                    py-3.5
                                    rounded-2xl
                                    font-medium
                                    hover:bg-gray-200
                                    transition-all
                                '
                            >
                                Shop Now
                            </button>

                            <button
                                className='
                                    border
                                    border-gray-700
                                    text-white
                                    px-7
                                    py-3.5
                                    rounded-2xl
                                    hover:bg-white/10
                                    transition-all
                                '
                            >
                                Explore Collection
                            </button>

                        </div>

                    </div>

                </div>

                {/* Categories Section */}
                <div className='mb-14'>

                    <div className='text-center mb-8'>

                        <p className='text-gray-500 mb-2'>
                            Browse Categories
                        </p>

                        <h2 className='text-3xl md:text-4xl font-bold text-gray-900'>
                            Shop By Category
                        </h2>

                    </div>

                    {/* Category Pills */}
                    <div
                        className='
                            flex
                            items-center
                            justify-start
                            md:justify-center
                            gap-4
                            overflow-x-auto
                            pb-2
                        '
                    >

                        {/* All */}
                        <button
                            onClick={() => setSelectedCategory("All")}
                            className={`
                                whitespace-nowrap
                                px-6
                                py-3
                                rounded-2xl
                                font-medium
                                transition-all

                                ${selectedCategory === "All"
                                    ? "bg-black text-white"
                                    : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
                                }
                            `}
                        >
                            All
                        </button>

                        {/* Dynamic Categories */}
                        {

                            categories?.map((category) => (

                                <button
                                    key={category.id}
                                    onClick={() =>
                                        setSelectedCategory(category.id)
                                    }
                                    className={`
                                        whitespace-nowrap
                                        px-6
                                        py-3
                                        rounded-2xl
                                        font-medium
                                        transition-all

                                        ${selectedCategory === category.id
                                            ? "bg-black text-white"
                                            : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
                                        }
                                    `}
                                >
                                    {category.name}
                                </button>

                            ))

                        }

                    </div>

                </div>

                {/* Products Section */}
                <div>

                    {/* Heading */}
                    <div className='mb-10 text-center'>

                        <p className='text-gray-500 mb-2'>
                            Featured Collection
                        </p>

                        <h2 className='text-3xl md:text-5xl font-bold text-gray-900'>
                            Discover Products
                        </h2>

                        <p className='text-gray-500 mt-4 text-lg max-w-2xl mx-auto'>
                            Carefully selected products crafted for modern lifestyles and premium everyday experiences.
                        </p>

                    </div>

                    {/* Products Grid */}
                    <div
                        className='
                            grid
                            grid-cols-1
                            sm:grid-cols-2
                            lg:grid-cols-3
                            xl:grid-cols-4
                            gap-6
                        '
                    >

                        {
                            loading ? (

                                [...Array(8)].map((_, index) => (

                                    <ProductCardSkeleton
                                        key={index}
                                    />

                                ))

                            ) : (

                                filteredProducts?.map((product) => (

                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                    />

                                ))

                            )

                        }

                    </div>

                </div>

            </div>

        </div>

    )

}

export default Home