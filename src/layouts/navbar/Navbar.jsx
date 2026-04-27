import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { cart } = useCart();
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <div>
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 shadow-md bg-blue-500 text-white">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src="/logo.png"
            alt="Swiftly Logo"
            className="w-8 md:w-10 h-auto object-contain"
          />
          <h1 className="text-lg md:text-xl font-bold tracking-tight">
            Swiftly
          </h1>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 font-medium items-center">
          <p
            onClick={() => navigate("/")}
            className="cursor-pointer hover:text-gray-200"
          >
            Home
          </p>

          {isLoggedIn ? (
            <>
              <p
                onClick={() => navigate("/profile")}
                className="cursor-pointer hover:text-gray-200"
              >
                Profile
              </p>

              <p
                onClick={logout}
                className="cursor-pointer hover:text-gray-200"
              >
                Logout
              </p>
            </>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              className="bg-white text-blue-500 px-4 py-1 rounded font-medium hover:bg-gray-100 transition"
            >
              Login
            </button>
          )}

          <p
            onClick={() => navigate("/cart")}
            className="cursor-pointer hover:text-gray-200"
          >
            Cart ({cart.length})
          </p>
        </div>

        {/* Mobile Icon */}
        <div
          className="md:hidden text-2xl cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✖" : "☰"}
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-blue-500 text-white flex flex-col items-center gap-4 py-4 shadow-md transition-all duration-300 ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-5 pointer-events-none"
        }`}
      >
        <p
          onClick={() => {
            navigate("/");
            setIsOpen(false);
          }}
        >
          Home
        </p>

        {isLoggedIn ? (
          <>
            <p
              onClick={() => {
                navigate("/profile");
                setIsOpen(false);
              }}
            >
              Profile
            </p>

            <p
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
            >
              Logout
            </p>
          </>
        ) : (
          <p onClick={() => setIsOpen(false)}>Login</p>
        )}

        <p
          onClick={() => {
            navigate("/cart");
            setIsOpen(false);
          }}
        >
          Cart ({cart.length})
        </p>
      </div>
      {showAuthModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
    <div className="bg-white p-6 rounded shadow-lg w-80">
      <h2 className="text-lg font-bold mb-4">Login</h2>

      <p className="text-sm text-gray-600 mb-4">
        (We’ll build full login/register UI next)
      </p>

      <button
        onClick={() => setShowAuthModal(false)}
        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
      >
        Close
      </button>
    </div>
  </div>
)}
    </div>
  );
};

export default Navbar;
