import React, {
    useContext,
    useState,
    useEffect,
    useRef
} from 'react'

import { AuthContext } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { CartContext } from '../context/CartContext'

const Navbar = ({ searchQuery, setSearchQuery }) => {

    const { isAuthenticated, logout } =
        useContext(AuthContext)

    const { cartItems } =
        useContext(CartContext)

    const navigate = useNavigate()

    const [isMenuOpen, setIsMenuOpen] =
        useState(false)

    const [isProfileOpen, setIsProfileOpen] =
        useState(false)

    // Dropdown Ref
    const dropdownRef = useRef(null)

    // Close On Outside Click
    useEffect(() => {

        const handleClickOutside = (event) => {

            if (

                dropdownRef.current &&

                !dropdownRef.current.contains(event.target)

            ) {

                setIsProfileOpen(false)

            }

        }

        document.addEventListener(
            "mousedown",
            handleClickOutside
        )

        return () => {

            document.removeEventListener(
                "mousedown",
                handleClickOutside
            )

        }

    }, [])

    const handleLogout = () => {

        logout()

        setIsProfileOpen(false)

        navigate("/")

    }

    const cartCount = cartItems.reduce(

        (acc, item) => acc + item.quantity,

        0

    )

    return (

        <>

            {/* Navbar */}
            <nav
                className='
                    sticky
                    top-0
                    z-50
                    bg-white/80
                    backdrop-blur-md
                    border-b
                    border-gray-200
                '
            >

                <div className='max-w-7xl mx-auto px-4 md:px-6'>

                    <div
                        className='
                            flex
                            items-center
                            justify-between
                            h-20
                        '
                    >

                        {/* Logo */}
                        <div
                            className='
                                flex
                                items-center
                                gap-3
                                shrink-0
                            '
                        >

                            <img
                                src='/logo.png'
                                alt='Swiftly'
                                className='
                                    w-10
                                    h-10
                                    rounded-xl
                                    object-cover
                                '
                            />

                            <h1
                                className='
                                    text-gray-900
                                    text-2xl
                                    font-bold
                                    tracking-tight
                                '
                            >
                                Swiftly
                            </h1>

                        </div>

                        {/* Desktop */}
                        <div
                            className='
                                hidden
                                md:flex
                                items-center
                                flex-1
                                justify-between
                                mx-10
                                gap-8
                            '
                        >

                            {/* Search */}
                            <div className='w-full max-w-2xl'>

                                <input
                                    type='text'
                                    placeholder='Search products...'
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(
                                            e.target.value
                                        )
                                    }
                                    className='
                                        w-full
                                        bg-gray-100
                                        border
                                        border-gray-200
                                        rounded-2xl
                                        px-5
                                        py-3
                                        text-sm
                                        text-gray-700
                                        placeholder:text-gray-400
                                        outline-none
                                        focus:ring-2
                                        focus:ring-gray-300
                                        transition-all
                                    '
                                />

                            </div>

                            {/* Links */}
                            <div
                                className='
                                    flex
                                    items-center
                                    gap-6
                                    shrink-0
                                '
                            >

                                <Link
                                    to="/"
                                    className='
                                        text-gray-700
                                        font-medium
                                        hover:text-black
                                        transition
                                    '
                                >
                                    Home
                                </Link>

                                <Link
                                    to="/cart"
                                    className='
                                        text-gray-700
                                        font-medium
                                        hover:text-black
                                        transition
                                    '
                                >
                                    Cart ({cartCount})
                                </Link>

                            </div>

                        </div>

                        {/* Right Section */}
                        <div className='hidden md:block'>

                            {

                                isAuthenticated ? (

                                    <div
                                        className='relative'
                                        ref={dropdownRef}
                                    >

                                        {/* Profile Button */}
                                        <button
                                            onClick={() =>
                                                setIsProfileOpen(
                                                    !isProfileOpen
                                                )
                                            }
                                            className='
                                                w-11
                                                h-11
                                                rounded-full
                                                bg-gray-100
                                                hover:bg-gray-200
                                                flex
                                                items-center
                                                justify-center
                                                transition
                                                text-lg
                                                cursor-pointer
                                            '
                                        >
                                            👤
                                        </button>

                                        {/* Dropdown */}
                                        {

                                            isProfileOpen && (

                                                <div
                                                    className='
                                                        absolute
                                                        right-0
                                                        mt-3
                                                        w-60
                                                        bg-white
                                                        border
                                                        border-gray-100
                                                        rounded-2xl
                                                        shadow-lg
                                                        p-2
                                                        flex
                                                        flex-col
                                                        gap-1
                                                    '
                                                >

                                                    <Link
                                                        to="/orders"
                                                        onClick={() =>
                                                            setIsProfileOpen(false)
                                                        }
                                                        className='
                                                            hover:bg-gray-100
                                                            px-4
                                                            py-3
                                                            rounded-xl
                                                            transition
                                                            text-gray-700
                                                        '
                                                    >
                                                        My Orders
                                                    </Link>

                                                    <Link
                                                        to="/profile"
                                                        onClick={() =>
                                                            setIsProfileOpen(false)
                                                        }
                                                        className='
                                                            hover:bg-gray-100
                                                            px-4
                                                            py-3
                                                            rounded-xl
                                                            transition
                                                            text-gray-700
                                                        '
                                                    >
                                                        Profile
                                                    </Link>

                                                    <Link
                                                        to="/change-password"
                                                        onClick={() =>
                                                            setIsProfileOpen(false)
                                                        }
                                                        className='
                                                            hover:bg-gray-100
                                                            px-4
                                                            py-3
                                                            rounded-xl
                                                            transition
                                                            text-gray-700
                                                        '
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
                                                            py-3
                                                            rounded-xl
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
                                            bg-black
                                            text-white
                                            px-5
                                            py-2.5
                                            rounded-xl
                                            font-medium
                                            hover:bg-gray-800
                                            transition
                                        '
                                    >
                                        Login
                                    </Link>

                                )

                            }

                        </div>

                        {/* Mobile Button */}
                        <button
                            className='md:hidden text-3xl text-gray-800'
                            onClick={() =>
                                setIsMenuOpen(!isMenuOpen)
                            }
                        >
                            {isMenuOpen ? "✕" : "☰"}
                        </button>

                    </div>

                </div>

            </nav>

        </>

    )

}

export default Navbar