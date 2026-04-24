import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const {addToCart}=useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/catalog/products/${slug}/`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!product) {
    return <p className="text-center mt-10">Product not found</p>;
  }

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md overflow-hidden p-6">
      <div className="grid md:grid-cols-2 gap-8 items-stretch">

        {/* Image */}
        <div className="w-full aspect-4/3  overflow-hidden rounded-lg">
          <img
            src={
              product.images?.[0]?.image ||
              "https://via.placeholder.com/400"
            }
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col h-full">

          {/* Top */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold line-clamp-2">
              {product.name}
            </h1>

            <p className="text-gray-600 mt-4">
              {product.description || "No description available"}
            </p>
          </div>

          {/* Bottom */}
          <div className="mt-auto flex items-center justify-between pt-6">
            <p className="text-2xl font-bold text-blue-500">
              ₹{Number(product.price)}
            </p>

            <button onClick={()=>addToCart(product.id)} className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition cursor-pointer">
              Add to Cart
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;