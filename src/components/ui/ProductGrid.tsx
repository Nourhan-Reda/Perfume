import { useEffect, useState } from "react";

type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
};

export default function ProductGrid({ category }: { category: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("https://690e4923bd0fefc30a040b18.mockapi.io/Perfume")
      .then((res) => res.json())
      .then((data: Product[]) => {
        const filtered = data.filter(
          (item) => item.category.toLowerCase() === category.toLowerCase(),
        );

        setProducts(filtered);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [category]);

  if (loading) {
    return (
      <p className="text-center text-[#2f1d17]/60 mt-10">Loading products...</p>
    );
  }

  if (products.length === 0) {
    return (
      <p className="text-center text-[#2f1d17]/40 mt-10">
        No products found for this category.
      </p>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-10 mt-10">
      {products.map((product) => (
        <div
          key={product.id}
          className="group rounded-xl overflow-hidden border border-[#e7dfe9] hover:border-[#4b2a53] transition bg-white shadow-[0_10px_30px_rgba(75,42,83,0.08)]"
        >
          {/* Image */}
          <div className="h-[220px] overflow-hidden">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
            />
          </div>

          {/* Info */}
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

              {/* ✅ MATCHED BUTTON */}
              <button className="text-xs tracking-[0.2em] uppercase px-3 py-1 border border-[#4b2a53]/30 hover:border-[#4b2a53] hover:text-[#4b2a53] transition">
                Add to Cart
              </button>
            </div>
          </div>

          {/* Hover effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-[#4b2a53]/5 pointer-events-none" />
        </div>
      ))}
    </div>
  );
}
