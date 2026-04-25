import React from "react";
import { Edit2, Trash2 } from "lucide-react";
import type { Perfume } from "../types/inventory";

interface Props {
  item: Perfume;
  onEdit: (item: Perfume) => void;
  onDelete: (id: string, name: string) => void;
}

const ProductRow: React.FC<Props> = ({ item, onEdit, onDelete }) => (
  <tr className="hover:bg-neutral-50/50 transition-colors border-b border-gray-50 last:border-none group">
    {/* Product Info */}
    <td className="px-8 py-5">
      <div className="flex items-center space-x-5">
        <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0 shadow-sm">
          <img
            src={
              item.image ||
              "https://images.unsplash.com/photo-1541643600914-78b084683601?w=200"
            }
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            alt={item.title}
          />
        </div>
        <div>
          <p className="text-sm font-medium text-black tracking-tight">
            {item.title}
          </p>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">
            {item.category}
          </p>
        </div>
      </div>
    </td>

    {/* Price & Stock Details */}
    <td className="px-8 py-5">
      <div className="flex space-x-10 items-center">
        <div>
          <span className="text-gray-400 block text-[9px] mb-1 uppercase tracking-widest font-semibold">
            Price
          </span>
          <span className="text-sm font-light text-black">${item.price}</span>
        </div>
        <div>
          <span className="text-gray-400 block text-[9px] mb-1 uppercase tracking-widest font-semibold">
            Inventory
          </span>
          <div className="flex items-center space-x-2">
            <div
              className={`w-1.5 h-1.5 rounded-full ${Number(item.stock) < 5 ? "bg-rose-500 animate-pulse" : "bg-emerald-400"}`}
            />
            <span
              className={`text-sm ${Number(item.stock) < 5 ? "text-rose-500 font-medium" : "text-black font-light"}`}
            >
              {item.stock} Units
            </span>
          </div>
        </div>
      </div>
    </td>

    {/* Permanent Actions Column */}
    <td className="px-8 py-5 text-right">
      <div className="flex justify-end items-center space-x-2">
        <button
          onClick={() => onEdit(item)}
          title="Edit Fragrance"
          className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-black hover:border-black/10 hover:shadow-sm transition-all active:scale-90"
        >
          <Edit2 size={15} strokeWidth={1.5} />
        </button>
        <button
          onClick={() => onDelete(item.id, item.title)}
          title="Delete Fragrance"
          className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-rose-500 hover:bg-rose-50/30 hover:border-rose-100 transition-all active:scale-90"
        >
          <Trash2 size={15} strokeWidth={1.5} />
        </button>
      </div>
    </td>
  </tr>
);

export default ProductRow;
