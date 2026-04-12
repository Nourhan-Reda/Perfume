type FooterLink = {
  label: string;
  href: string;
};

type FooterColumn = {
  title: string;
  links: FooterLink[];
};

type PaymentMethod = {
  label: string;
  short: string;
};

export type FooterProps = {
  brand?: string;
  descriptor?: string;
  serviceCode?: string;
  description?: string;
  copyright?: string;
};

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Customer Care",
    links: [
      { label: "Contact Us", href: "#" },
      { label: "Shipping & Returns", href: "#" },
      { label: "FAQ", href: "#" },
      { label: "Track Order", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "CA Privacy Notice", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  },
];

const PAYMENT_METHODS: PaymentMethod[] = [
  { label: "American Express", short: "AMEX" },
  { label: "Visa", short: "VISA" },
  { label: "Mastercard", short: "MC" },
  { label: "Discover", short: "DISC" },
  { label: "PayPal", short: "PAY" },
  { label: "Apple Pay", short: "PAY" },
];

function FooterColumnBlock({ column }: { column: FooterColumn }) {
  return (
    <section>
      <h4 className="text-xs font-semibold uppercase tracking-[0.28em] text-white/85">
        {column.title}
      </h4>
      <ul className="mt-5 space-y-3 text-sm text-white/75">
        {column.links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="transition hover:text-white hover:underline"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Footer({
  brand = "VYRA",
  descriptor = "VYRA Signature House",
  serviceCode = "VY-07",
  description = "Crafted for scent lovers who collect stories, not just bottles. VYRA curates modern niche fragrances with elevated service and authentic sourcing.",
  copyright,
}: FooterProps) {
  const year = new Date().getFullYear();
  const copyrightText =
    copyright ?? `© ${year} ${brand} Perfume. All rights reserved.`;

  return (
    <footer className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 overflow-hidden bg-[#2f1d35] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#6e4a78]/30 blur-3xl"
      />

      <div className="mx-auto grid min-h-[300px] w-full max-w-[1280px] gap-10 px-4 pb-10 pt-14 sm:px-6 lg:grid-cols-[1.2fr_0.9fr_0.9fr] lg:px-10">
        <section>
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/65">
            {descriptor}
          </p>
          <h3 className="mt-3 text-3xl font-semibold tracking-[0.18em] text-white">
            {brand}
          </h3>
          <p className="mt-6 max-w-md text-sm leading-7 text-white/75">
            {description}
          </p>

          <div className="mt-8 inline-flex items-center rounded-full border border-white/20 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-white/85">
            Customer Service Code: {serviceCode}
          </div>
        </section>

        {FOOTER_COLUMNS.map((column) => (
          <FooterColumnBlock key={column.title} column={column} />
        ))}
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex w-full max-w-[1280px] flex-wrap items-center justify-between gap-5 px-4 py-6 sm:px-6 lg:px-10">
          <ul className="flex flex-wrap items-center gap-2.5">
            {PAYMENT_METHODS.map((method) => (
              <li
                key={method.label}
                aria-label={method.label}
                title={method.label}
                className="rounded border border-white/20 bg-white px-2.5 py-1.5 text-[10px] font-semibold tracking-[0.13em] text-[#4b2a53]"
              >
                {method.short}
              </li>
            ))}
          </ul>

          <p className="text-xs tracking-wide text-white/60">{copyrightText}</p>
        </div>
      </div>
    </footer>
  );
}
