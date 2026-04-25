import React from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  Layers,
  BarChart3,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react";

const menuItems = [
  {
    name: "Overview",
    path: "/admin",
    icon: <LayoutDashboard size={20} strokeWidth={1.5} />,
  },
  {
    name: "Products",
    path: "/admin/inventory",
    icon: <ShoppingBag size={20} strokeWidth={1.5} />,
  },
  {
    name: "Categories",
    path: "/admin/categories",
    icon: <Layers size={20} strokeWidth={1.5} />,
  },
  {
    name: "Stock & Sales",
    path: "/admin/stats",
    icon: <BarChart3 size={20} strokeWidth={1.5} />,
  },
  {
    name: "Concierge Logs",
    path: "/admin/ai-logs",
    icon: <MessageSquare size={20} strokeWidth={1.5} />,
  },
  {
    name: "Settings",
    path: "/admin/settings",
    icon: <Settings size={20} strokeWidth={1.5} />,
  },
];

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Helper to find the current page name for the header
  const currentPathName =
    menuItems.find((i) => i.path === location.pathname)?.name || "Dashboard";

  // Function to handle returning to the homepage
  const handleExit = () => {
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-[#FDFDFD] font-sans">
      {/* SIDEBAR: Luxury Minimalist */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col sticky top-0 h-screen">
        <div className="p-8">
          <h1 className="text-2xl font-light tracking-[0.2em] text-black">
            VYRA
          </h1>
          <p className="text-[10px] uppercase tracking-widest text-gray-400 mt-1">
            Admin Portal
          </p>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                location.pathname === item.path
                  ? "bg-black text-white shadow-lg shadow-black/10"
                  : "text-gray-500 hover:bg-gray-50 hover:text-black"
              }`}
            >
              {item.icon}
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-gray-50">
          <button
            onClick={handleExit}
            className="flex items-center space-x-3 px-4 py-3 text-red-500 hover:bg-red-50 w-full rounded-xl transition-colors group"
          >
            <LogOut
              size={20}
              className="group-hover:scale-110 transition-transform"
            />
            <span className="text-sm font-medium">Exit Dashboard</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-10 sticky top-0 z-10">
          <h2 className="text-lg font-medium text-gray-800">
            {currentPathName}
          </h2>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-xs font-semibold text-black leading-none">
                Admin User
              </p>
              <p className="text-[10px] text-gray-400 uppercase tracking-tighter mt-1">
                Master Curator
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 overflow-hidden" />
          </div>
        </header>

        <section className="p-10 animate-in fade-in slide-in-from-bottom-2 duration-700">
          <Outlet />
          {/* Sub-pages like Inventory or Stats will render here */}
        </section>
      </main>
    </div>
  );
};

export default AdminLayout;
