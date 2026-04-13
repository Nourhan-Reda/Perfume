import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Product = {
  id: string;
  title: string;
  price: string;
  image: string;
  category: string;
};

type ApiProduct = {
  id: string;
  title: string;
  price?: string | number;
  image?: string;
  category?: string;
};

export default function RecommendedForYou() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // ✅ for routing

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
          price: `$${item.price ?? 0}`,
          image: item.image ?? "",
          category: (item.category ?? "other").toLowerCase().trim(),
        }));

        const women = formatted.filter((p) => p.category===("women"));
        const men = formatted.filter((p) => p.category===("men"));
        const children = formatted.filter((p) =>
          p.category===("children"),
        );

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
        {/* TITLE */}
        <div className="text-center mb-14">
          <h2 className="text-4xl tracking-[0.2em] uppercase">
            Recommended for You
          </h2>
          <p className="text-[#2f1d17]/60 mt-4">
            A curated mix of fragrances across all collections
          </p>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="text-center text-[#2f1d17]/50 tracking-[0.2em] uppercase">
            Curating your selection...
          </div>
        )}

        {!loading && (
          <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="group relative rounded-xl overflow-hidden border border-[#e7dfe9] hover:border-[#4b2a53] transition bg-white shadow-[0_10px_30px_rgba(75,42,83,0.08)]"
              >
                {/* IMAGE */}
                <div className="h-[260px] overflow-hidden bg-white">
                  <img
                    src={
                      product.image ||
                      "https://via.placeholder.com/300x400?text=Perfume"
                    }
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://via.placeholder.com/300x400?text=Perfume";
                    }}
                  />
                </div>

                {/* INFO */}
                <div className="p-4 text-center">
                  <h3 className="text-sm tracking-[0.2em] uppercase">
                    {product.title}
                  </h3>

                  <p className="text-[#2f1d17]/50 text-xs mt-2 tracking-[0.15em] uppercase">
                    {product.category}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-[#2f1d17]/80 text-sm">
                      {product.price}
                    </span>

                    {/* ✅ UPDATED BUTTON */}
                    <button
                      onClick={() => navigate("/cart")}
                      className="text-xs tracking-[0.2em] uppercase px-3 py-1 border border-[#4b2a53]/30 hover:border-[#4b2a53] hover:text-[#4b2a53] transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>

                {/* HOVER EFFECT */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-[#4b2a53]/5 pointer-events-none" />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
