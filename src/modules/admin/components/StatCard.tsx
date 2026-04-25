import React from "react";
import type { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  value: string | number;
  trend?: string;
  isPositive?: boolean;
  icon: LucideIcon;
}

const StatCard: React.FC<Props> = ({
  title,
  value,
  trend,
  isPositive,
  icon: Icon,
}) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-black/5 transition-all duration-500 group">
    <div className="flex justify-between items-start mb-6">
      <div className="p-4 bg-neutral-50 rounded-2xl group-hover:bg-black group-hover:text-white transition-colors duration-500">
        <Icon size={20} strokeWidth={1.5} />
      </div>
      {trend && (
        <span
          className={`text-[10px] font-medium px-2.5 py-1 rounded-full ${isPositive ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}
        >
          {isPositive ? "↑" : "↓"} {trend}
        </span>
      )}
    </div>
    <div>
      <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1">
        {title}
      </p>
      <h3 className="text-3xl font-light tracking-tighter text-black">
        {value}
      </h3>
    </div>
  </div>
);

export default StatCard;
