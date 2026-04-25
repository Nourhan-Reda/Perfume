import React from "react";
import { ChevronRight, Package } from "lucide-react";

interface CategoryCardProps {
  name: string;
  count: number;
  description: string;
  image: string;
  onClick: () => void; // Added for navigation
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  name,
  count,
  description,
  image,
  onClick,
}) => (
  <div
    onClick={onClick}
    className="bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden group hover:shadow-xl hover:shadow-black/5 transition-all duration-500 cursor-pointer"
  >
    <div className="relative h-48 overflow-hidden">
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-6 left-8">
        <h3 className="text-white text-xl font-light tracking-widest uppercase">
          {name}
        </h3>
      </div>
    </div>

    <div className="p-8">
      <p className="text-gray-400 text-[11px] font-light leading-relaxed mb-6 h-8 line-clamp-2">
        {description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-black">
          <Package size={14} className="text-gray-400" />
          <span className="text-sm font-medium">{count} Items</span>
        </div>
        <button className="p-2 rounded-full bg-neutral-50 text-gray-400 group-hover:bg-black group-hover:text-white transition-all">
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  </div>
);

export default CategoryCard;
