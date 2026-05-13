import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { CartContext } from '../context/CartContext'

const Navbar = ({searchQuery,setSearchQuery}) => {

    const { isAuthenticated, logout } = useContext(AuthContext)

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isProfileOpen, setIsProfileOpen] = useState(false)

    const navigate = useNavigate()
    const {cartItems}=useContext(CartContext)

    const handleLogout = () => {

        logout()
        navigate("/")

    }

    const cartCount=cartItems.reduce((acc,item)=> acc+item.quantity,0)
    return (

        <>

            {/* Navbar */}
            <nav className='bg-blue-600 shadow-md sticky top-0 z-50'>

                {/* Full Width Container */}
                <div className='w-full px-6 lg:px-10'>

                    {/* Navbar Row */}
                    <div className='flex items-center justify-between h-16'>

                        {/* Logo Section */}
                        <div className='flex items-center gap-3'>

                            <img
                                src='/logo.png'
                                alt='Swiftly'
                                className='w-10 h-10 rounded object-cover'
                            />

                            <h1 className='text-white text-2xl font-bold tracking-wide'>
                                Swiftly
                            </h1>

                        </div>

                        {/* Desktop Section */}
                        <div className='hidden md:flex items-center gap-6 flex-1 justify-between mx-10'>

                            {/* Search Bar */}
                            <div className='w-full max-w-2xl'>

                                <input
                                    type='text'
                                    placeholder='Search products...'
                                    value={searchQuery}
                                    onChange={(e)=>setSearchQuery(e.target.value)}
                                    className='
                                        w-full
                                        px-4
                                        py-2
                                        rounded-lg
                                        outline-none
                                        border-none
                                        text-black
                                        bg-white
                                        focus:ring-2
                                        focus:ring-blue-300
                                    '
                                />

                            </div>

                            {/* Navigation Links */}
                            <div className='flex items-center gap-6'>

                                <Link
                                    to="/"
                                    className='text-white font-medium hover:text-gray-200 transition'
                                >
                                    Home
                                </Link>

                                <Link
                                    to="/cart" 
                                    className='text-white font-medium hover:text-gray-200 transition'
                                >
                                    Cart ({cartCount})
                                </Link>

                            </div>

                        </div>

                        {/* Desktop Right Section */}
                        <div className='hidden md:block'>

                            {

                                isAuthenticated ? (

                                    <div className='relative'>

                                        <button
                                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                                            className='
                                                bg-white
                                                text-blue-600
                                                px-3
                                                py-2
                                                rounded-lg
                                                hover:bg-gray-100
                                                transition
                                                cursor-pointer
                                            '
                                        >
                                            👤
                                        </button>

                                        {

                                            isProfileOpen && (

                                                <div className='absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl p-2 flex flex-col gap-1'>

                                                    <Link
                                                        to="/orders"
                                                        className='hover:bg-gray-100 px-4 py-2 rounded-lg transition'
                                                    >
                                                        My Orders
                                                    </Link>

                                                    <Link
                                                        to="/profile"
                                                        className='hover:bg-gray-100 px-4 py-2 rounded-lg transition'
                                                    >
                                                        Profile
                                                    </Link>

                                                    <Link
                                                        to="/address"
                                                        className='hover:bg-gray-100 px-4 py-2 rounded-lg transition'
                                                    >
                                                        Address
                                                    </Link>

                                                    <Link
                                                        to="/change-password"
                                                        className='hover:bg-gray-100 px-4 py-2 rounded-lg transition'
                                                    >
                                                        Change Password
                                                    </Link>

                                                    <button
                                                        onClick={handleLogout}
                                                        className='
                                                            text-left
                                                            text-red-500
                                                            hover:bg-red-50
                                                            px-4
                                                            py-2
                                                            rounded-lg
                                                            transition
                                                        '
                                                    >
                                                        Logout
                                                    </button>

                                                </div>

                                            )

                                        }

                                    </div>

                                ) : (

                                    <Link
                                        to="/signin"
                                        className='
                                            bg-white
                                            text-blue-600
                                            px-4
                                            py-2
                                            rounded-lg
                                            font-medium
                                            hover:bg-gray-100
                                            transition
                                        '
                                    >
                                        Login
                                    </Link>

                                )

                            }

                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className='md:hidden text-white text-3xl'
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? "✕" : "☰"}
                        </button>

                    </div>

                </div>

            </nav>

            {/* Mobile Menu */}
            {

                isMenuOpen && (

                    <div className='md:hidden bg-blue-600 px-4 pb-5 shadow-lg'>

                        <div className='flex flex-col gap-4'>

                            {/* Search */}
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e)=> setSearchQuery(e.target.value)}
                                className='
                                    w-full
                                    px-4
                                    py-3
                                    rounded-lg
                                    outline-none
                                    text-black
                                    bg-white
                                '
                            />

                            {/* Navigation */}
                            <Link
                                to="/"
                                className='
                                    bg-white
                                    text-blue-600
                                    py-3
                                    rounded-lg
                                    text-center
                                    font-medium
                                '
                            >
                                Home
                            </Link>

                            <Link
                                to="/cart"
                                className='
                                    bg-white
                                    text-blue-600
                                    py-3
                                    rounded-lg
                                    text-center
                                    font-medium
                                '
                            >
                                Cart ({cartCount})
                            </Link>

                            {

                                isAuthenticated ? (

                                    <>

                                        <Link
                                            to="/orders"
                                            className='bg-white text-blue-600 py-3 rounded-lg text-center font-medium'
                                        >
                                            My Orders
                                        </Link>

                                        <Link
                                            to="/profile"
                                            className='bg-white text-blue-600 py-3 rounded-lg text-center font-medium'
                                        >
                                            Profile
                                        </Link>

                                        <Link
                                            to="/address"
                                            className='bg-white text-blue-600 py-3 rounded-lg text-center font-medium'
                                        >
                                            Address
                                        </Link>

                                        <Link
                                            to="/change-password"
                                            className='bg-white text-blue-600 py-3 rounded-lg text-center font-medium'
                                        >
                                            Change Password
                                        </Link>

                                        <button
                                            onClick={handleLogout}
                                            className='
                                                bg-red-500
                                                text-white
                                                py-3
                                                rounded-lg
                                                font-medium
                                            '
                                        >
                                            Logout
                                        </button>

                                    </>

                                ) : (

                                    <Link
                                        to="/signin"
                                        className='
                                            bg-white
                                            text-blue-600
                                            py-3
                                            rounded-lg
                                            text-center
                                            font-medium
                                        '
                                    >
                                        Login
                                    </Link>

                                )

                            }

                        </div>

                    </div>

                )

            }

        </>

    )

}

export default Navbar