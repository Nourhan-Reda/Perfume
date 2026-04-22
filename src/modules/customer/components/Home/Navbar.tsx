import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useWishlist } from "../../../../store/wishlist-context";
import AuthDropdown from "./AuthDropdown";

type NavItem = {
  label: string;
  href: string;
};

type NavbarProps = {
  brand?: string;
  tagLine?: string;
  navItems?: NavItem[];
  cartCount?: number;
  logoText?: string;
};

const DEFAULT_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Men", href: "/collections" },
  { label: "Women", href: "/collections" },
  { label: "Children", href: "/collections" },
  { label: "Blog", href: "/blog" },
];

export default function Navbar({
  brand = "VYRA",
  tagLine = "Luxury Fragrance House",
  navItems = DEFAULT_ITEMS,
  cartCount = 2,
  logoText = "V",
}: NavbarProps) {
  const navigate = useNavigate();
  const { wishlistCount } = useWishlist();
  const isLoggedIn = !!sessionStorage.getItem("vyra_user");

  // State to track if the dropdown should be visible
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-[0_12px_30px_rgba(24,16,32,0.08)]">
      {/* TOP BAR */}
      <div className="bg-[#4b2a53] text-white">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-2 text-xs uppercase tracking-[0.2em] sm:px-6 lg:px-10">
          <div className="text-[11px] font-semibold tracking-[0.25em] text-white/90">
            Bespoke fragrance consultations
          </div>

          <p className="hidden text-center text-[11px] font-semibold tracking-[0.25em] text-white/90 md:block">
            Only 11 days left until Valentine&apos;s Day!
          </p>

          <div className="flex items-center gap-5 text-[11px]">
            <span className="cursor-pointer hover:text-white/70">
              Customer Care 24/7
            </span>
            <span className="cursor-pointer hover:text-white/70">
              Store Locator
            </span>
          </div>
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-4 py-6 sm:px-6 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          {/* BRAND/LOGO SECTION */}
          <div
            className="flex cursor-pointer items-center gap-4 transition-opacity hover:opacity-90"
            onClick={() => navigate("/")}
          >
            <div className="relative grid h-12 w-12 place-items-center rounded-[18px] border border-[#4b2a53]/20 bg-white text-sm font-semibold tracking-[0.32em] text-[#4b2a53] shadow-[0_10px_24px_rgba(75,42,83,0.2)]">
              <span className="absolute inset-1 rounded-[14px] border border-[#4b2a53]/30" />
              <span className="absolute inset-0 rounded-[18px] bg-[conic-gradient(from_90deg,transparent,rgba(75,42,83,0.35),transparent)] animate-[spin_6s_linear_infinite]" />
              <span className="relative ml-[6px]">{logoText}</span>
            </div>

            <div>
              <h1 className="text-2xl font-semibold tracking-[0.2em] text-[#4b2a53]">
                {brand}
              </h1>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#4b2a53]/60">
                {tagLine}
              </p>
            </div>
          </div>

          {/* SEARCH COMPONENT */}
          <SearchBar />

          {/* ACTIONS (Account, Wishlist, Cart) */}
          <div className="flex items-center gap-6 text-sm text-[#4b2a53] lg:justify-self-end">
            {/* Account Icon + Hover Logic */}
            <div
              className="relative py-2"
              onMouseEnter={() => !isLoggedIn && setIsAuthOpen(true)}
              onMouseLeave={() => setIsAuthOpen(false)}
            >
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[150%] h-8 bg-transparent" />

              <button
                type="button"
                aria-label="My account"
                onClick={() => {
                  const user = sessionStorage.getItem("vyra_user");
                  navigate(user ? "/profile" : "/auth");
                }}
                className="relative z-[60] transition-transform hover:scale-110 active:scale-95"
              >
                <svg
                  className="h-6 w-6 text-[#2f1d17]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              </button>

              {/* AUTH DROPDOWN */}
              {isAuthOpen && !isLoggedIn && (
                <div className="absolute top-[110%] right-[-60px] z-[100]">
                  <AuthDropdown />
                </div>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              type="button"
              aria-label="Wishlist"
              onClick={() => navigate("/wishlist")}
              className="group relative transition-transform hover:scale-110 active:scale-95"
            >
              <svg
                className="h-6 w-6 text-[#2f1d17]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
              {wishlistCount > 0 && (
                <span className="absolute -right-2 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#4b2a53] text-[10px] font-bold text-white ring-2 ring-white">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              type="button"
              aria-label="Cart"
              onClick={() => navigate("/cart")}
              className="group relative transition-transform hover:scale-110 active:scale-95"
            >
              <svg
                className="h-6 w-6 text-[#2f1d17]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#4b2a53] text-[10px] font-bold text-white ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Login Toggle */}
            <button
              type="button"
              onClick={() => {
                if (isLoggedIn) {
                  sessionStorage.removeItem("vyra_user");
                  navigate("/");
                } else {
                  navigate("/auth");
                }
              }}
              className="ml-2 rounded-full border border-[#4b2a53]/20 px-6 py-2 text-[11px] font-bold uppercase tracking-widest transition-all hover:bg-[#4b2a53] hover:text-white"
            >
              {isLoggedIn ? "Logout" : "Login"}
            </button>
          </div>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="flex flex-wrap items-center justify-center gap-12 text-[13px] font-semibold uppercase tracking-[0.35em] text-[#3a293f]">
          {navItems.map((item) => {
            const labelLower = item.label.toLowerCase();
            const isCategory = ["men", "women", "children"].includes(
              labelLower,
            );

            return (
              <button
                key={item.label}
                onClick={() => {
                  if (isCategory) {
                    navigate(`/collections?search=${labelLower}`);
                  } else {
                    navigate(item.href);
                  }
                }}
                className="relative py-1 transition-colors hover:text-[#4b2a53] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-[#4b2a53] after:transition-all hover:after:w-full"
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
