import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Plus, Search, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { BLANK_PERFUME } from "../types/inventory";
import type { Perfume } from "../types/inventory";
import InventoryDrawer from "../components/InventoryDrawer";
import ProductRow from "../components/ProductRow";

const API_URL = "https://690e4923bd0fefc30a040b18.mockapi.io/Perfume";

const Inventory: React.FC = () => {
  const [products, setProducts] = useState<Perfume[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentProduct, setCurrentProduct] =
    useState<Partial<Perfume>>(BLANK_PERFUME);

  const location = useLocation();

  const fetchProducts = useCallback(async () => {
    try {
      const { data } = await axios.get<Perfume[]>(API_URL);
      setProducts(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Database sync failed.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (location.state?.categoryFilter) {
      setSearchTerm(location.state.categoryFilter);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  // --- REFINED FILTER LOGIC ---
  const filtered = products.filter((p) => {
    const search = searchTerm.toLowerCase().trim();
    if (!search) return true;

    const title = (p.title || "").toLowerCase();
    const category = (p.category || "").toLowerCase();

    // FIXED: If the search matches an exact category name, prioritize that equality
    // This prevents "Men" from showing up in "Women"
    const isExactCategory = category === search;

    // If it's not an exact category match, we fall back to partial title matching
    return isExactCategory || title.includes(search);
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (currentProduct.id) {
        await axios.put(`${API_URL}/${currentProduct.id}`, currentProduct);
        setProducts((prev) =>
          prev.map((p) =>
            p.id === currentProduct.id ? (currentProduct as Perfume) : p,
          ),
        );
        toast.success("Record updated.");
      } else {
        const { data } = await axios.post<Perfume>(API_URL, currentProduct);
        setProducts((prev) => [data, ...prev]);
        toast.success("New scent added.");
      }
      setIsDrawerOpen(false);
    } catch {
      toast.error("Action failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (id: string, name: string) => {
    toast(`Remove ${name}?`, {
      action: {
        label: "Confirm",
        onClick: async () => {
          try {
            await axios.delete(`${API_URL}/${id}`);
            setProducts((prev) => prev.filter((p) => p.id !== id));
            toast.success("Removed.");
          } catch {
            toast.error("Error.");
          }
        },
      },
    });
  };

  if (loading)
    return (
      <div className="flex justify-center p-20">
        <Loader2 className="animate-spin text-neutral-200" />
      </div>
    );

  return (
    <div className="space-y-8 p-2 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div className="relative w-96 group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors"
            size={16}
          />
          <input
            value={searchTerm}
            placeholder="Search name or exact category..."
            className="w-full pl-12 py-4 bg-white border border-gray-100 rounded-2xl outline-none text-sm font-light focus:border-black/10 transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          onClick={() => {
            setCurrentProduct(BLANK_PERFUME);
            setIsDrawerOpen(true);
          }}
          className="bg-black text-white px-8 py-4 rounded-2xl text-[10px] uppercase tracking-widest hover:bg-neutral-800 transition-all flex items-center space-x-2"
        >
          <Plus size={16} /> <span>Add New Scent</span>
        </button>
      </div>

      <div className="bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-neutral-50/50 border-b border-gray-100">
            <tr>
              <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-gray-400 font-medium">
                Fragrance
              </th>
              <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-gray-400 font-medium">
                Details
              </th>
              <th className="px-8 py-6 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((p) => (
              <ProductRow
                key={p.id}
                item={p}
                onEdit={(item) => {
                  setCurrentProduct(item);
                  setIsDrawerOpen(true);
                }}
                onDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-20 text-center text-gray-400 text-xs italic">
            No matching results.
          </div>
        )}
      </div>

      <InventoryDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        product={currentProduct}
        setProduct={setCurrentProduct}
        onSave={handleSave}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default Inventory;
