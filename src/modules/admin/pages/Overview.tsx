import React, { useEffect, useState } from "react";
import axios from "axios";
import { Package, DollarSign, Activity, ShoppingBag } from "lucide-react";

// 1. Define the strict interface to remove all 'any' errors
interface Perfume {
  id: string;
  name: string;
  title?: string; // MockAPI sometimes uses title or name
  price: string | number;
  stock: string | number;
  category: string;
  image: string;
}

interface DashboardStats {
  count: number;
  totalStock: number;
  avgPrice: number;
}

const Overview: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    count: 0,
    totalStock: 0,
    avgPrice: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Calling your specific MockAPI
    axios
      .get<Perfume[]>("https://690e4923bd0fefc30a040b18.mockapi.io/Perfume")
      .then((res) => {
        const data = res.data;

        // Calculate totals using strict types
        const totalStock = data.reduce(
          (acc, item) => acc + (Number(item.stock) || 0),
          0,
        );
        const totalPrice = data.reduce(
          (acc, item) => acc + (Number(item.price) || 0),
          0,
        );
        const avg = data.length > 0 ? totalPrice / data.length : 0;

        setStats({
          count: data.length,
          totalStock,
          avgPrice: Math.round(avg),
        });
        setLoading(false);
      })
      .catch((err: Error) => {
        console.error("VYRA Overview Error:", err.message);
        setLoading(false);
      });
  }, []);

  const cards = [
    {
      title: "Total Collection",
      value: stats.count,
      icon: <Package size={20} className="text-black" />,
    },
    {
      title: "Warehouse Stock",
      value: stats.totalStock,
      icon: <ShoppingBag size={20} className="text-black" />,
    },
    {
      title: "Avg. Bottle Price",
      value: `$${stats.avgPrice}`,
      icon: <DollarSign size={20} className="text-black" />,
    },
    {
      title: "Active Status",
      value: "Live",
      icon: <Activity size={20} className="text-black" />,
    },
  ];

  if (loading) {
    return (
      <div className="p-10 text-gray-400 animate-pulse uppercase tracking-widest text-[10px]">
        Loading Analytics...
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* LUXURY STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <div
            key={i}
            className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-lg hover:border-black/5 transition-all duration-500 group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="p-4 bg-gray-50 rounded-2xl group-hover:bg-black group-hover:text-white transition-colors duration-500">
                {card.icon}
              </div>
            </div>
            <p className="text-gray-400 text-[10px] uppercase tracking-[0.2em]">
              {card.title}
            </p>
            <h4 className="text-3xl font-light mt-2 tracking-tight text-black">
              {card.value}
            </h4>
          </div>
        ))}
      </div>

      {/* DASHBOARD GRAPHIC PLACEHOLDER */}
      <div className="relative overflow-hidden h-80 bg-white rounded-[2.5rem] border border-gray-100 flex flex-col items-center justify-center">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <p className="text-gray-300 text-xs uppercase tracking-widest mb-2">
          Market Performance
        </p>
        <p className="text-gray-200 italic font-serif">
          Visual analytics will appear as sales data populates.
        </p>
      </div>
    </div>
  );
};

export default Overview;
