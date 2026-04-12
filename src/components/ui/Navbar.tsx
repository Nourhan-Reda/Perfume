import SearchBar from "./SearchBar";

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
  { label: "Men", href: "#men" },
  { label: "Women", href: "#women" },
  { label: "Children", href: "#children" },
];

export default function Navbar({
  brand = "VYRA",
  tagLine = "Luxury Fragrance House",
  navItems = DEFAULT_ITEMS,
  cartCount = 2,
  logoText = "V",
}: NavbarProps) {
  void cartCount;

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
            <span>Customer Care 24/7</span>
            <span>Store Locator</span>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-4 py-6 sm:px-6 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          {/* BRAND */}
          <div className="flex items-center gap-4">
            <div className="relative grid h-12 w-12 place-items-center rounded-[18px] border border-[#4b2a53]/20 bg-white text-sm font-semibold tracking-[0.32em] text-[#4b2a53] shadow-[0_10px_24px_rgba(75,42,83,0.2)]">
              <span
                aria-hidden="true"
                className="absolute inset-1 rounded-[14px] border border-[#4b2a53]/30"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-[18px] bg-[conic-gradient(from_90deg,transparent,rgba(75,42,83,0.35),transparent)] animate-[spin_6s_linear_infinite]"
              />
              <span className="relative ml-[6px]">{logoText}</span>
            </div>

            <div>
              <a
                href="/"
                className="text-2xl font-semibold tracking-[0.2em] text-[#4b2a53]"
              >
                {brand}
              </a>

              <p className="text-[11px] uppercase tracking-[0.3em] text-[#4b2a53]/60">
                {tagLine}
              </p>
            </div>
          </div>

          {/* SEARCH COMPONENT */}
          <SearchBar />

          {/* ACTIONS */}
          <div className="flex items-center gap-6 text-sm text-[#4b2a53] lg:justify-self-end">
            <button type="button" aria-label="My account">
              <svg
                className="h-5 w-5 text-[#2f1d17]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path d="M20 21a8 8 0 0 0-16 0" />
                <circle cx="12" cy="8" r="4" />
              </svg>
            </button>

            <button type="button" aria-label="Wishlist">
              <svg
                className="h-5 w-5 text-[#2f1d17]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path d="M20.8 6.8a4.8 4.8 0 0 0-6.8 0L12 8.8l-2-2a4.8 4.8 0 0 0-6.8 6.8l8.8 8.8 8.8-8.8a4.8 4.8 0 0 0 0-6.8Z" />
              </svg>
            </button>

            <button
              type="button"
              className="flex items-center gap-2"
              aria-label="Cart"
            >
              <svg
                className="h-5 w-5 text-[#2f1d17]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path d="M6 8h12l-1.2 11.2a2 2 0 0 1-2 1.8H9.2a2 2 0 0 1-2-1.8L6 8Z" />
                <path d="M9 8V6a3 3 0 0 1 6 0v2" />
              </svg>
            </button>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="flex flex-wrap items-center justify-center gap-12 text-[13px] font-semibold uppercase tracking-[0.35em] text-[#3a293f]">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="transition hover:text-[#4b2a53]"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
