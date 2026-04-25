import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Loader2, LayoutGrid } from "lucide-react";
import type { Perfume } from "../types/inventory";
import CategoryCard from "../components/CategoryCard";

const Categories: React.FC = () => {
  const [products, setProducts] = useState<Perfume[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://690e4923bd0fefc30a040b18.mockapi.io/Perfume")
      .then((res) => {
        setProducts(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const stats = useMemo(() => {
    const counts = { men: 0, women: 0, children: 0 };
    products.forEach((p) => {
      const cat = (p.category || "").toLowerCase().trim();
      if (cat === "men") counts.men++;
      else if (cat === "women") counts.women++;
      else if (cat === "children") counts.children++;
    });
    return counts;
  }, [products]);

  const handleCategoryClick = (categoryName: string) => {
    // Navigates and tells Inventory to filter by this name
    navigate("/admin/inventory", { state: { categoryFilter: categoryName } });
  };

  if (loading)
    return (
      <div className="flex justify-center p-20">
        <Loader2 className="animate-spin text-gray-200" />
      </div>
    );

  return (
    <div className="space-y-10 animate-in fade-in duration-700 p-2">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-light tracking-tight text-black italic">
            Collections
          </h2>
          <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mt-1">
            Tiered Inventory Management
          </p>
        </div>
        <div className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-400">
          <LayoutGrid size={20} />
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <CategoryCard
          name="Men"
          count={stats.men}
          description="Bold signatures and woody compositions for the modern gentleman."
          image="https://i.pinimg.com/736x/3a/62/90/3a62904420903d88e44991bde66de2a6.jpg"
          onClick={() => handleCategoryClick("Men")}
        />
        <CategoryCard
          name="Women"
          count={stats.women}
          description="Elegant florals and sweet notes curated for timeless grace."
          image="https://i.pinimg.com/1200x/97/27/f6/9727f62d412ff145d386c1741af3437b.jpg"
          onClick={() => handleCategoryClick("Women")}
        />
        <CategoryCard
          name="Children"
          count={stats.children}
          description="Soft, hypoallergenic, and playful scents for the younger collection."
          image="https://i.pinimg.com/736x/e5/3c/9e/e53c9e5347e2fd9104a9c184f65ad9df.jpg"
          onClick={() => handleCategoryClick("Children")}
        />
      </div>
    </div>
  );
};

export default Categories;
