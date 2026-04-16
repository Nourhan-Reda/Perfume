import { useParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { useCart } from "../../../store/cart";

export default function ProductDetails() {
  const { id } = useParams();
  const { products, loading, error } = useProducts();
  const { addToCart } = useCart();

  const product = products.find((item) => item.id === id);

  if (loading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  if (error) {
    return <p className="text-center py-10 text-red-500">{error}</p>;
  }

  if (!product) {
    return <p className="text-center py-10">Product not found</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-10">
      {/* Image */}
      <div className="bg-[#f9f5fb] rounded-2xl p-8 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-[500px] object-contain"
        />
      </div>

      {/* Details */}
      <div className="flex flex-col justify-center">
        <p className="text-sm uppercase tracking-widest text-[#4b2a53]/60 mb-2">
          {product.category}
        </p>

        <h1 className="text-3xl font-bold text-[#2f1d17] mb-4">
          {product.title}
        </h1>

        <p className="text-[#2f1d17]/70 leading-relaxed mb-6">
          {product.description}
        </p>

        <span className="text-3xl font-bold text-[#4b2a53] mb-4">
          ${Number(product.price).toFixed(2)}
        </span>

        <p className="mb-6 text-sm text-gray-600">
          Stock: {product.stock}
        </p>

        <button
          onClick={() =>
            addToCart({
              id: product.id,
              name: product.title,
              price: Number(product.price),
              image: product.image,
              stock: product.stock,
            })
          }
          className="bg-[#4b2a53] text-white px-6 py-3 rounded-full w-fit hover:bg-[#3a2040]"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}