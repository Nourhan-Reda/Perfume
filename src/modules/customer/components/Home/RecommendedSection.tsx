import { useEffect, useState } from "react";
import { useCart } from "../../../../store/cart";

type Product = {
  id: string;
  title: string;
  price: string;
  image: string;
  category: string;
  stock: number; // ✅ Added stock
};

type ApiProduct = {
  id: string;
  title: string;
  price?: string | number;
  image?: string;
  category?: string;
  stock?: string | number; // ✅ Extracting stock from API
};

export default function RecommendedForYou() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchAndMix = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "https://690e4923bd0fefc30a040b18.mockapi.io/Perfume",
        );
        const data: unknown = await res.json();

        if (!Array.isArray(data)) {
          setProducts([]);
          return;
        }

        const formatted: Product[] = (data as ApiProduct[]).map((item) => ({
          id: item.id,
          title: item.title ?? "Unknown Perfume",
          price: `${item.price ?? 0}`,
          image: item.image ?? "",
          category: (item.category ?? "other").toLowerCase().trim(),
          stock: Number(item.stock ?? 0), // ✅ Store numeric stock
        }));

        const women = formatted.filter((p) => p.category === "women");
        const men = formatted.filter((p) => p.category === "men");
        const children = formatted.filter((p) => p.category === "children");

        const selected: Product[] = [];
        selected.push(...women.slice(0, 2));
        selected.push(...men.slice(0, 1));
        selected.push(...children.slice(0, 1));

        const fallbackPool = formatted.filter(
          (p) => !selected.find((s) => s.id === p.id),
        );
        while (selected.length < 4 && fallbackPool.length > 0) {
          selected.push(fallbackPool.shift()!);
        }

        setProducts(selected.slice(0, 4));
      } catch (err) {
        console.error("Failed to load recommendations:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAndMix();
  }, []);

  return (
    <section className="px-6 py-20 bg-[#faf7fb] text-[#2f1d17]">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl tracking-[0.2em] uppercase">
            Recommended for You
          </h2>
          <p className="text-[#2f1d17]/60 mt-4">A curated mix of fragrances</p>
        </div>

        {loading ? (
          <div className="text-center text-[#2f1d17]/50 tracking-[0.2em] uppercase">
            Curating...
          </div>
        ) : (
          <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-8">
            {products.map((product) => {
              const isOutOfStock = product.stock <= 0; // ✅ Check availability

              return (
                <div
                  key={product.id}
                  className={`group relative rounded-xl overflow-hidden border border-[#e7dfe9] hover:border-[#4b2a53] transition bg-white shadow-[0_10px_30px_rgba(75,42,83,0.08)] ${
                    isOutOfStock ? "opacity-75" : ""
                  }`}
                >
                  <div className="h-[260px] overflow-hidden bg-white">
                    <img
                      src={
                        product.image || "https://via.placeholder.com/300x400"
                      }
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                  </div>

                  <div className="p-4 text-center">
                    <h3 className="text-sm tracking-[0.2em] uppercase">
                      {product.title}
                    </h3>
                    <p className="text-[#2f1d17]/50 text-xs mt-2 tracking-[0.15em] uppercase">
                      {product.category}
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-[#2f1d17]/80 text-sm">
                        ${product.price}
                      </span>

                      <button
                        type="button"
                        disabled={isOutOfStock} // ✅ Logic Guard
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          addToCart({
                            id: product.id,
                            name: product.title,
                            price: parseFloat(product.price),
                            image: product.image,
                            stock: product.stock, // ✅ Pass stock to hook
                          });
                        }}
                        className={`text-xs tracking-[0.2em] uppercase px-3 py-1 border transition relative z-30 
                          ${
                            isOutOfStock
                              ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                              : "bg-white border-[#4b2a53]/30 hover:border-[#4b2a53] hover:text-[#4b2a53] active:scale-95"
                          }`}
                      >
                        {isOutOfStock ? "Sold Out" : "Add to Cart"}
                      </button>
                    </div>
                  </div>

                  {/* Sold Out Badge */}
                  {isOutOfStock && (
                    <div className="absolute top-3 left-3 bg-white/90 px-2 py-1 text-[10px] uppercase tracking-tighter text-red-600 font-bold rounded shadow-sm z-30">
                      Out of Stock
                    </div>
                  )}

                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-[#4b2a53]/5 pointer-events-none" />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
