import { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { useCart } from "../../../store/cart";
import type { Product } from "../types/Product";
import { useNavigate } from "react-router-dom";

type Props = {
  product: Product;
};

export default function Card({ product }: Props) {
  const { addToCart } = useCart();
  const [isFav, setIsFav] = useState(false);
  const navigate = useNavigate();

  const isOutOfStock = product.stock <= 0;

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className={`group relative rounded-2xl overflow-hidden
        border border-[#e7dfe9] shadow-sm
        bg-white hover:bg-[#f0e8f4]
        hover:shadow-xl hover:border-[#c9afd4]
        transition-all duration-500
        hover:-translate-y-1 cursor-pointer
        ${isOutOfStock ? "opacity-70" : ""}`}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-[300px] bg-[#f9f5fb] group-hover:bg-[#ecdff2] flex items-center justify-center p-4 transition-colors duration-500">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full max-w-full object-contain
          group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFav((prev) => !prev);
          }}
          className={`absolute top-3 right-3 z-20
            w-9 h-9 rounded-full flex items-center justify-center
            backdrop-blur-sm transition-all duration-300 shadow-md
            ${
              isFav
                ? "bg-[#4b2a53] text-white scale-110"
                : "bg-white/80 text-[#4b2a53] hover:bg-white hover:scale-105"
            }`}
        >
          <Heart size={16} fill={isFav ? "currentColor" : "none"} />
        </button>

        {/* Stock Badge */}
        {isOutOfStock && (
          <div className="absolute top-3 left-3 z-20
            bg-white/90 backdrop-blur-sm px-2.5 py-1
            text-[10px] font-semibold uppercase tracking-wider
            text-red-500 rounded-full shadow-sm">
            Out of Stock
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] uppercase tracking-widest text-[#4b2a53]/50 font-medium">
            {product.category ?? "Product"}
          </span>

          <span
            className={`text-[10px] font-medium px-2 py-0.5 rounded-full
              ${
                isOutOfStock
                  ? "bg-red-50 text-red-400"
                  : product.stock <= 5
                  ? "bg-amber-50 text-amber-500"
                  : "bg-emerald-50 text-emerald-600"
              }`}
          >
            {isOutOfStock ? "Sold out" : `${product.stock} left`}
          </span>
        </div>

        <h3 className="text-sm font-semibold text-[#2f1d17] line-clamp-1">
          {product.title}
        </h3>

        {product.description && (
          <p className="text-xs text-[#2f1d17]/50 mt-1.5 line-clamp-2">
            {product.description}
          </p>
        )}

        <div className="flex items-center justify-between mt-4 gap-3">
          <span className="text-lg font-bold text-[#4b2a53]">
            ${Number(product.price).toFixed(2)}
          </span>

          <button
            disabled={isOutOfStock}
            onClick={(e) => {
              e.stopPropagation();
              addToCart({
                id: product.id,
                name: product.title,
                price: Number(product.price),
                image: product.image,
                stock: product.stock,
              });
            }}
            className={`flex items-center gap-1.5 px-4 py-2 text-[11px]
              font-semibold uppercase tracking-widest rounded-full
              ${
                isOutOfStock
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-[#4b2a53] text-white hover:bg-[#3a2040]"
              }`}
          >
            <ShoppingCart size={13} />
            {isOutOfStock ? "Sold Out" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}