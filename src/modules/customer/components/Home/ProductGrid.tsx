import { useEffect, useState } from "react";
import { useCart } from "../../../../store/cart";

// Updated Type to include stock
type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  stock: number; // ✅ Added stock tracking
};

// Interface for API response safety
type ApiProduct = {
  id: string;
  title?: string;
  price?: number;
  image?: string;
  category?: string;
  stock?: number | string; // ✅ Included API field
};

export default function ProductGrid({ category }: { category: string }) {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("https://690e4923bd0fefc30a040b18.mockapi.io/Perfume")
      .then((res) => res.json())
      .then((data: ApiProduct[]) => {
        // Map the data and ensure stock is a Number
        const formatted = data.map((item) => ({
          id: item.id,
          title: item.title ?? "Unknown Perfume",
          price: item.price ?? 0,
          image: item.image ?? "",
          category: item.category ?? "other",
          stock: Number(item.stock ?? 0), // ✅ Convert stock to number
        }));

        const filtered = formatted.filter(
          (item) => item.category.toLowerCase() === category.toLowerCase(),
        );
        setProducts(filtered);
      })
      .catch((err) => console.error("Error fetching products:", err))
      .finally(() => setLoading(false));
  }, [category]);

  if (loading)
    return (
      <p className="text-center text-[#2f1d17]/60 mt-10 tracking-[0.2em] uppercase">
        Loading products...
      </p>
    );

  if (products.length === 0)
    return (
      <p className="text-center text-[#2f1d17]/40 mt-10 uppercase tracking-widest">
        No products found in this collection.
      </p>
    );

  return (
    <div className="grid md:grid-cols-3 gap-10 mt-10">
      {products.map((product) => {
        const isOutOfStock = product.stock <= 0; // ✅ Calculate stock status

        return (
          <div
            key={product.id}
            className={`group relative rounded-xl overflow-hidden border border-[#e7dfe9] hover:border-[#4b2a53] transition bg-white shadow-[0_10px_30px_rgba(75,42,83,0.08)] ${
              isOutOfStock ? "opacity-75" : ""
            }`}
          >
            {/* IMAGE */}
            <div className="h-[220px] overflow-hidden">
              <img
                src={product.image || "https://via.placeholder.com/300x400"}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
            </div>

            {/* INFO */}
            <div className="p-4 text-center">
              <h3 className="text-sm tracking-[0.2em] uppercase font-medium">
                {product.title}
              </h3>
              <p className="text-[#2f1d17]/50 text-xs mt-2 tracking-[0.15em] uppercase">
                {product.category}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-[#2f1d17]/80 text-sm font-semibold">
                  ${product.price}
                </span>

                <button
                  type="button"
                  disabled={isOutOfStock} // ✅ Prevent interaction if sold out
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    addToCart({
                      id: product.id,
                      name: product.title,
                      price: product.price,
                      image: product.image,
                      stock: product.stock, // ✅ Pass stock to the hook logic
                    });
                  }}
                  className={`relative z-20 text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 border transition active:scale-95 
                    ${
                      isOutOfStock
                        ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                        : "bg-white border-[#4b2a53]/30 hover:border-[#4b2a53] hover:text-[#4b2a53]"
                    }`}
                >
                  {isOutOfStock ? "Sold Out" : "Add to Cart"}
                </button>
              </div>
            </div>

            {/* Sold Out Badge overlay */}
            {isOutOfStock && (
              <div className="absolute top-3 right-3 bg-white/95 px-2 py-1 text-[10px] uppercase tracking-tighter text-red-600 font-bold rounded shadow-sm z-30">
                Out of Stock
              </div>
            )}

            {/* HOVER BACKGROUND */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-[#4b2a53]/5 pointer-events-none" />
          </div>
        );
      })}
    </div>
  );
}
