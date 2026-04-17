import { useEffect, useState } from "react";
import Card from "../Card";
import type { Product } from "../../types/Product";


export default function ProductGrid({ category }: { category: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("https://690e4923bd0fefc30a040b18.mockapi.io/Perfume")
      .then((res) => res.json())
      .then((data: Product[]) => {
        const formatted: Product[] = data.map((item) => ({
          id: item.id,
          title: item.title ?? "Unknown Perfume",
          description:item.description,
          price: Number(item.price ?? 0),
          image: item.image ?? "",
          category: item.category ?? "other",
          stock: Number(item.stock ?? 0),
        }));

        const filtered = formatted.filter(
          (item) => item.category.toLowerCase() === category.toLowerCase()
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
      {products.map((product) => (
        <Card key={product.id} product={product} />
      ))}
    </div>
  );
}