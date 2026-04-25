import React from "react";
import { X, Loader2 } from "lucide-react";
import type { Perfume } from "../types/inventory";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  product: Partial<Perfume>;
  // Replaced 'any' with a strict React State Dispatcher type
  setProduct: React.Dispatch<React.SetStateAction<Partial<Perfume>>>;
  onSave: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

const InventoryDrawer: React.FC<Props> = ({
  isOpen,
  onClose,
  product,
  setProduct,
  onSave,
  isSubmitting,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/10 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-lg bg-white h-full shadow-2xl p-12 flex flex-col animate-in slide-in-from-right duration-500">
        <button
          onClick={onClose}
          className="absolute top-8 right-8 text-gray-400 hover:text-black transition-colors"
        >
          <X size={24} strokeWidth={1} />
        </button>

        <header className="mb-12">
          <h2 className="text-xl font-light tracking-[0.2em] uppercase text-black">
            {product.id ? "Edit Scent" : "Add to Collection"}
          </h2>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-2">
            Update the master olfactory records
          </p>
        </header>

        <form onSubmit={onSave} className="space-y-8 flex-1">
          {/* Title Input */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-gray-400">
              Fragrance Title
            </label>
            <input
              required
              value={product.title || ""}
              onChange={(e) =>
                setProduct((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full border-b border-gray-100 py-3 outline-none focus:border-black transition-all font-light"
            />
          </div>

          <div className="grid grid-cols-2 gap-8">
            {/* Price Input */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-gray-400">
                Price ($)
              </label>
              <input
                type="number"
                required
                value={product.price || ""}
                onChange={(e) =>
                  setProduct((prev) => ({ ...prev, price: e.target.value }))
                }
                className="w-full border-b border-gray-100 py-3 outline-none focus:border-black transition-all font-light"
              />
            </div>
            {/* Stock Input */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-gray-400">
                Stock Units
              </label>
              <input
                type="number"
                required
                value={product.stock || ""}
                onChange={(e) =>
                  setProduct((prev) => ({ ...prev, stock: e.target.value }))
                }
                className="w-full border-b border-gray-100 py-3 outline-none focus:border-black transition-all font-light"
              />
            </div>
          </div>

          {/* Category Select */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-gray-400">
              Classification
            </label>
            <select
              value={product.category || "Unisex"}
              onChange={(e) =>
                setProduct((prev) => ({ ...prev, category: e.target.value }))
              }
              className="w-full border-b border-gray-100 py-3 outline-none focus:border-black bg-transparent uppercase text-[10px] tracking-widest cursor-pointer"
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Children">Children</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            disabled={isSubmitting}
            className="w-full bg-black text-white py-5 rounded-2xl text-[10px] uppercase tracking-[0.3em] mt-12 hover:bg-neutral-800 transition-all flex justify-center items-center disabled:bg-gray-200 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" size={16} />
            ) : product.id ? (
              "Update Master List"
            ) : (
              "Create Entry"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InventoryDrawer;
