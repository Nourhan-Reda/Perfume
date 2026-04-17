import { useEffect, useState } from "react";
import Card from "../Card";
import type { Product } from "../../types/Product";





export default function RecommendedForYou() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAndMix = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          "https://690e4923bd0fefc30a040b18.mockapi.io/Perfume"
        );

        const data: unknown = await res.json();

        if (!Array.isArray(data)) {
          setProducts([]);
          return;
        }

        const formatted: Product[] = (data as Product[]).map((item) => ({
          id: item.id,
          title: item.title ?? "Unknown Perfume",
          description:item.description??"unKnown",
         price: Number(item.price ?? 0),
          image: item.image ?? "",
          category: (item.category ?? "other").toLowerCase().trim(),
          stock: Number(item.stock ?? 0),
        }));

        const women = formatted.filter((p) => p.category === "women");
        const men = formatted.filter((p) => p.category === "men");
        const children = formatted.filter((p) => p.category === "children");

        const selected: Product[] = [];
        selected.push(...women.slice(0, 2));
        selected.push(...men.slice(0, 1));
        selected.push(...children.slice(0, 1));

        const fallbackPool = formatted.filter(
          (p) => !selected.find((s) => s.id === p.id)
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
          <p className="text-[#2f1d17]/60 mt-4">
            A curated mix of fragrances
          </p>
        </div>

        {loading ? (
          <div className="text-center text-[#2f1d17]/50 tracking-[0.2em] uppercase">
            Curating...
          </div>
        ) : (
          <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-8">
            {products.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}