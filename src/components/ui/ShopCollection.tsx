import { useState } from "react";
import ProductGrid from "./ProductGrid";

const categories = [
  {
    key: "women",
    label: "Women",
    image:
      "https://i.pinimg.com/736x/21/4c/d3/214cd3f69b77db896ad01de2aa171367.jpg",
  },
  {
    key: "men",
    label: "Men",
    image:
      "https://i.pinimg.com/736x/11/07/80/11078032f4b4a39261a453f6334158c6.jpg",
  },
  {
    key: "children",
    label: "Children",
    image:
      "https://i.pinimg.com/736x/e5/3c/9e/e53c9e5347e2fd9104a9c184f65ad9df.jpg",
  },
];

export default function ShopCollection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <section className="px-6 py-20 bg-[#faf7fb] text-[#2f1d17]">
      <div className="max-w-[1200px] mx-auto">
        {/* Title */}
        <div className="text-center mb-14">
          <h2 className="text-4xl tracking-[0.2em] uppercase">
            Shop Our Collection
          </h2>
          <p className="text-[#2f1d17]/60 mt-4">
            Discover scents crafted for every identity
          </p>
        </div>

        {/* Categories */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {categories.map((cat) => (
            <div
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`cursor-pointer group relative h-[260px] rounded-xl overflow-hidden border transition
                ${
                  selectedCategory === cat.key
                    ? "border-[#4b2a53] shadow-[0_0_30px_rgba(75,42,83,0.15)]"
                    : "border-[#e7dfe9]"
                }`}
            >
              {/* Image */}
              <img
                src={cat.image}
                alt={cat.label}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <h3 className="text-xl tracking-[0.3em] uppercase text-white">
                  {cat.label}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Products */}
        {selectedCategory && (
          <div className="mt-10">
            <h3 className="text-center text-2xl tracking-[0.2em] mb-8 uppercase text-[#2f1d17]/80">
              {selectedCategory} Collection
            </h3>

            <ProductGrid category={selectedCategory} />
          </div>
        )}
      </div>
    </section>
  );
}
