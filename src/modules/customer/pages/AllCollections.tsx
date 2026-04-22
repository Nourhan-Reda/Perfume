import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import Card from "../components/Card";

export default function AllCollections() {
  const { products, loading, error } = useProducts();
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search")?.toLowerCase() || "";
  const searchValue = search.trim();

  // max price slider state
  const [maxPrice, setMaxPrice] = useState(800);

  const filteredProducts = products.filter((item) => {
    const titleMatch = item.title.toLowerCase().includes(searchValue);

    const categoryMatch =
      item.category?.toLowerCase().trim() === searchValue;

    const matchesSearch =
      searchValue === "" ? true : titleMatch || categoryMatch;

    const matchesPrice = Number(item.price) <= maxPrice;

    return matchesSearch && matchesPrice;
  });

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10">{error}</p>;

  return (
    <section className="px-6 py-20 bg-[#faf7fb] min-h-screen">
      <h2 className="text-center text-3xl mb-10 uppercase">
        All Collections
      </h2>

      {/* Search result text */}
      {searchValue && (
        <p className="text-center mb-6 text-[#4b2a53]/60">
          Results for: <span className="font-semibold">{searchValue}</span>
        </p>
      )}

      {/* Price Filter Slider */}
      <div className="max-w-md mx-auto mb-10">
        <label className="block text-center mb-3 text-[#4b2a53] font-medium">
          Max Price: <span className="font-bold">${maxPrice}</span>
        </label>

        <input
          type="range"
          min="0"
          max="800"
          step="10"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-[#4b2a53] cursor-pointer"
        />
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <Card key={item.id} product={item} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-400">
            No products found
          </p>
        )}
      </div>
    </section>
  );
}