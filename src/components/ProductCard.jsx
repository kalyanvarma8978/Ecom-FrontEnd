import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  return (
    <div
      className="border rounded-lg p-4 shadow-sm hover:shadow-lg transition cursor-pointer"
      onClick={() => navigate(`/product/${product.slug}`)}
    >
      <img
        src={product.images?.[0]?.image || "https://via.placeholder.com/300"}
        alt={product.name}
        className="w-full h-48 object-cover rounded-md"
      />
      <h2 className="mt-2 font-semibold text-lg">{product.name}</h2>
      <p className="text-blue-500 font-bold">₹{Number(product.price)}</p>

      <button
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/product/${product.slug}`);
        }}
        className="mt-3 w-full bg-blue-500 text-white py-2 rounded cursor-pointer"
      >
        View Product
      </button>
    </div>
  );
};

export default ProductCard;
