import { useEffect, useState } from "react";
import Card from "../Card";
import type { Product } from "../../types/Product";




export default function Bestsellers() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBestsellers = async () => {
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

   const formatted: Product[] = (data as Product[]).map((item) => {
  const category = (item.category ?? "").toLowerCase().trim();

  const validCategory: Product["category"] =
    category === "women" || category === "men" || category === "children"
      ? category
      : "women";

  return {
    id: item.id,
    title: item.title ?? "Unknown Perfume",
    description: item.description,
    price: Number(item.price ?? 0),
    image: item.image ?? "",
    category: validCategory,
    stock: Number(item.stock ?? 0),
  };
});

        const women = formatted.filter((p) => p.category === "women");
        const men = formatted.filter((p) => p.category === "men");
        const children = formatted.filter((p) => p.category === "children");

        const selected: Product[] = [];
        selected.push(...women.slice(0, 3));
        selected.push(...men.slice(0, 3));
        selected.push(...children.slice(0, 2));

        const fallback = formatted.filter(
          (p) => !selected.find((s) => s.id === p.id)
        );

        while (selected.length < 8 && fallback.length > 0) {
          selected.push(fallback.shift()!);
        }

        setProducts(selected.slice(0, 8));
      } catch (err) {
        console.error("Bestsellers error:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBestsellers();
  }, []);

  return (
    <section className="px-6 py-24 bg-[#faf7fb] text-[#2f1d17]">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl tracking-[0.2em] uppercase">
            Our Bestsellers
          </h2>
          <p className="text-[#2f1d17]/60 mt-4">
            The most loved fragrances by our customers
          </p>
        </div>

        {loading ? (
          <div className="text-center text-[#2f1d17]/50 tracking-[0.2em] uppercase">
            Loading bestsellers...
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