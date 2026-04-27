import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AuthModal from "../../components/AuthModal"; // ✅ FIXED

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [search, setSearch] = useState("");

  const { cart } = useCart();
  const { isLoggedIn, logout, user } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 h-[60px] md:h-[70px] flex items-center px-4 md:px-6 shadow-md bg-blue-500 text-white">

        <div className="flex items-center justify-between w-full">

          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src="/logo.png" alt="logo" className="w-7 md:w-10" />
            <h1 className="text-lg md:text-xl font-bold">Swiftly</h1>
          </div>

          {/* Search (Desktop) */}
          <div className="hidden md:flex flex-1 mx-6 max-w-xl">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 rounded-l-md text-black focus:outline-none"
            />
            <button className="bg-white text-blue-500 px-4 rounded-r-md font-medium">
              Search
            </button>
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center gap-6">

            {/* Home */}
            <p
              onClick={() => navigate("/")}
              className="cursor-pointer hover:text-gray-200 transition"
            >
              Home
            </p>

            {/* Cart */}
            <div
              onClick={() => navigate("/cart")}
              className="relative cursor-pointer text-xl"
            >
              🛒
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                  {cart.length}
                </span>
              )}
            </div>

            {/* Auth */}
            {isLoggedIn ? (
              <div className="relative group">
                <div className="w-9 h-9 bg-white text-blue-500 rounded-full flex items-center justify-center font-bold cursor-pointer">
                  {user?.username?.charAt(0)?.toUpperCase() || "U"}
                </div>

                <div className="absolute right-0 mt-2 w-44 bg-white text-black rounded shadow-lg opacity-0 group-hover:opacity-100 transition duration-200 z-50">

                  <p
                    onClick={() => navigate("/profile")}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Profile
                  </p>

                  <p
                    onClick={() => navigate("/orders")}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Orders
                  </p>

                  <p
                    onClick={() => navigate("/change-password")}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Change Password
                  </p>

                  <p
                    onClick={logout}
                    className="px-4 py-2 hover:bg-red-100 text-red-500 cursor-pointer"
                  >
                    Logout
                  </p>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="bg-white text-blue-500 px-4 py-1 rounded font-medium hover:bg-gray-100 transition"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Icon */}
          <div
            className="md:hidden text-2xl cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "✖" : "☰"}
          </div>
        </div>
      </nav>

      {/* Mobile Search */}
      <div className="md:hidden px-4 py-2 bg-blue-500">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 rounded-md text-black focus:outline-none"
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-blue-500 text-white flex flex-col items-center gap-5 shadow-md transition-all duration-300 ${
          isOpen
            ? "max-h-[300px] opacity-100 py-5"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <p onClick={() => { navigate("/"); setIsOpen(false); }}>
          Home
        </p>

        <p onClick={() => { navigate("/cart"); setIsOpen(false); }}>
          Cart ({cart.length})
        </p>

        {isLoggedIn ? (
          <>
            <p onClick={() => { navigate("/profile"); setIsOpen(false); }}>
              Profile
            </p>

            <p onClick={() => { navigate("/orders"); setIsOpen(false); }}>
              Orders
            </p>

            <p onClick={() => { navigate("/change-password"); setIsOpen(false); }}>
              Change Password
            </p>

            <p onClick={() => { logout(); setIsOpen(false); }}>
              Logout
            </p>
          </>
        ) : (
          <p onClick={() => { setShowAuthModal(true); setIsOpen(false); }}>
            Login
          </p>
        )}
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
};

export default Navbar;