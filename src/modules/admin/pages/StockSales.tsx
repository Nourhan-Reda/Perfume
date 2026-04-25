import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
  TrendingUp,
  Package,
  AlertTriangle,
  DollarSign,
  ArrowUpRight,
  Loader2,
} from "lucide-react";
import type { Perfume } from "../types/inventory";
import StatCard from "../components/StatCard";

const StockSales: React.FC = () => {
  const [products, setProducts] = useState<Perfume[]>([]);
  const [isSyncing, setIsSyncing] = useState(true);

  useEffect(() => {
    axios
      .get("https://690e4923bd0fefc30a040b18.mockapi.io/Perfume")
      .then((res) => {
        setProducts(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => console.error("Data fetch failed:", err))
      .finally(() => setIsSyncing(false));
  }, []);

  // Expert-level data aggregation
  const metrics = useMemo(() => {
    const totalStock = products.reduce(
      (acc, p) => acc + Number(p.stock || 0),
      0,
    );
    const lowStockItems = products.filter((p) => Number(p.stock) < 10);
    const totalValue = products.reduce(
      (acc, p) => acc + Number(p.price || 0) * Number(p.stock || 0),
      0,
    );
    const averagePrice = products.length > 0 ? totalValue / products.length : 0;

    return {
      totalStock,
      lowStockCount: lowStockItems.length,
      totalValue,
      lowStockItems,
      averagePrice,
    };
  }, [products]);

  if (isSyncing)
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-4">
        <Loader2 className="animate-spin text-neutral-200" size={32} />
        <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-light">
          Calculating Analytics...
        </p>
      </div>
    );

  return (
    <div className="space-y-10 animate-in fade-in duration-700 p-2">
      <header>
        <h2 className="text-2xl font-light italic text-black">
          Financial Oversight
        </h2>
        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mt-1">
          Real-time inventory health & value
        </p>
      </header>

      {/* PRIMARY METRICS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Inventory Value"
          value={`$${metrics.totalValue.toLocaleString()}`}
          trend="12.5%"
          isPositive={true}
          icon={DollarSign}
        />
        <StatCard
          title="Stock Units"
          value={metrics.totalStock.toLocaleString()}
          trend="3.1%"
          isPositive={true}
          icon={Package}
        />
        <StatCard
          title="Low Stock Alerts"
          value={metrics.lowStockCount}
          trend="Action Needed"
          isPositive={false}
          icon={AlertTriangle}
        />
        <StatCard
          title="Avg. Scent Value"
          value={`$${metrics.averagePrice.toFixed(2)}`}
          icon={TrendingUp}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* REPLENISHMENT TERMINAL */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-gray-100 p-10 shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-sm uppercase tracking-[0.2em] font-medium text-black">
              Priority Replenishment
            </h3>
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-ping" />
              <span className="text-[9px] text-rose-500 font-bold tracking-widest uppercase">
                Live Alerts
              </span>
            </div>
          </div>

          <div className="space-y-6">
            {metrics.lowStockItems.length > 0 ? (
              metrics.lowStockItems.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between group p-2 hover:bg-neutral-50 rounded-2xl transition-all"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 shadow-inner">
                      <img
                        src={p.image}
                        className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all"
                        alt=""
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-black">
                        {p.title}
                      </p>
                      <p className="text-[9px] text-gray-400 uppercase tracking-widest">
                        {p.category}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-rose-500 font-semibold text-sm">
                      {p.stock} Units
                    </p>
                    <p className="text-[8px] text-gray-300 uppercase tracking-widest">
                      Threshold breached
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-10 text-center">
                <p className="text-xs text-gray-400 italic font-light">
                  All fragrance levels are currently optimal.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* RECENT REVENUE FEED */}
        <div className="bg-neutral-950 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-black/20">
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-medium">
                Sales Ledger
              </h3>
              <div className="w-8 h-px bg-neutral-800" />
            </div>

            <div className="space-y-8">
              {[102, 103, 104, 105].map((id) => (
                <div
                  key={id}
                  className="flex items-center justify-between border-b border-white/5 pb-5 last:border-none"
                >
                  <div>
                    <p className="text-xs font-light text-neutral-200">
                      Order #VRA-{id}
                    </p>
                    <p className="text-[8px] text-neutral-600 uppercase tracking-widest mt-1.5">
                      Processed 12m ago
                    </p>
                  </div>
                  <div className="flex items-center text-emerald-400 text-xs font-medium">
                    +$185.00{" "}
                    <ArrowUpRight size={12} className="ml-1 opacity-50" />
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-12 py-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[9px] uppercase tracking-[0.3em] font-medium transition-all active:scale-95">
              Archive Analysis
            </button>
          </div>

          {/* Ambient Lighting Effect */}
          <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-emerald-500/10 blur-[80px]" />
        </div>
      </div>
    </div>
  );
};

export default StockSales;
