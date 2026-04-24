import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCart();
  return (
    <div>
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 shadow-md bg-blue-500 text-white">
        {/* Logo */}
        <div className="flex items-center gap-2">
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
        <div className="hidden md:flex gap-6 font-medium">
          <p className="cursor-pointer hover:text-gray-200 transition">Home</p>
          <p className="cursor-pointer hover:text-gray-200 transition">Login</p>
          <p className="cursor-pointer hover:text-gray-200 transition">Cart {cart.length}</p>
        </div>

        {/* Mobile Icon */}
        <div
          className="md:hidden text-2xl cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✖" : "☰"}
        </div>
      </nav>

      <div
        className={`md:hidden bg-blue-500 text-white flex flex-col items-center gap-4 py-4 shadow-md transform transition-all duration-300 ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-5 pointer-events-none"
        }`}
      >
        <p onClick={()=>setIsOpen(false)} className="cursor-pointer hover:text-gray-200 transition">Home</p>
        <p onClick={()=>setIsOpen(false)} className="cursor-pointer hover:text-gray-200 transition">Login</p>
        <p onClick={()=>setIsOpen(false)} className="cursor-pointer hover:text-gray-200 transition">Cart</p>
      </div>
    </div>
  );
};

export default Navbar;
