import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import ProductCard from '../components/ProductCard'

const Home = ({
    searchQuery,
    selectedCategory,
    setSelectedCategory
}) => {

    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])

    useEffect(() => {

        /* Fetch Products */
        const fetchProducts = async () => {

            try {

                const res = await api.get("/catalog/products/")

                setProducts(res.data.results)

            } catch (error) {

                console.error(error)

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

        /* Search Match */
        const matchesSearch =
            product.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase())

        /* Category Match */
        const matchesCategory =
            selectedCategory === "All"
                ? true
                : product.category === selectedCategory

        return matchesSearch && matchesCategory

    })

    return (

        <div
            className='
                flex
                flex-col
                md:flex-row
                gap-8
                p-4
                md:p-6
            '
        >

            {/* Sidebar */}
            <div
                className='
                    hidden
                    md:flex
                    flex-col
                    md:w-64
                    w-full
                    gap-4
                    h-fit
                    sticky
                    top-24
                    bg-white
                    p-5
                    rounded-2xl
                    shadow-sm
                    border
                    border-gray-100
                '
            >

                <h2 className='text-2xl font-bold mb-2'>
                    Categories
                </h2>

                {/* All Button */}
                <button
                    onClick={() => setSelectedCategory("All")}
                    className={`
                        text-left
                        px-5
                        py-3
                        rounded-xl
                        border
                        transition
                        duration-300

                        ${selectedCategory === "All"
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
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
                            onClick={() => setSelectedCategory(category.id)}
                            className={`
                                text-left
                                px-5
                                py-3
                                rounded-xl
                                border
                                transition
                                duration-300

                                ${selectedCategory === category.id
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                                }
                            `}
                        >

                            {category.name}

                        </button>

                    ))

                }

            </div>

            {/* Products Section */}
            <div className='flex-1'>

                {/* Heading */}
                <h1 className='text-3xl font-bold mb-8'>
                    Latest Products
                </h1>

                {/* Mobile Categories */}
                <div
                    className='
                        md:hidden
                        flex
                        gap-3
                        overflow-x-auto
                        mb-6
                        pb-2
                    '
                >

                    {/* All Button */}
                    <button
                        onClick={() => setSelectedCategory("All")}
                        className={`
                            whitespace-nowrap
                            px-4
                            py-2
                            rounded-full
                            border

                            ${selectedCategory === "All"
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white border-gray-300"
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
                                onClick={() => setSelectedCategory(category.id)}
                                className={`
                                    whitespace-nowrap
                                    px-4
                                    py-2
                                    rounded-full
                                    border

                                    ${selectedCategory === category.id
                                        ? "bg-blue-600 text-white border-blue-600"
                                        : "bg-white border-gray-300"
                                    }
                                `}
                            >

                                {category.name}

                            </button>

                        ))

                    }

                </div>

                {/* Products Grid */}
                <div
                    className='
                        grid
                        grid-cols-1
                        sm:grid-cols-2
                        md:grid-cols-2
                        lg:grid-cols-3
                        xl:grid-cols-4
                        2xl:grid-cols-5
                        gap-6
                    '
                >

                    {

                        filteredProducts?.map((product) => (

                            <ProductCard
                                key={product.id}
                                product={product}
                            />

                        ))

                    }

                </div>

            </div>

        </div>

    )

}

export default Home