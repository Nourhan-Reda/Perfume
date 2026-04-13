import { useMemo, useState, useEffect } from "react";

type BlogCategory = "all" | "savoir-faire" | "escapism" | "solstice";

interface BlogPost {
  id: string;
  title: string;
  summary: string;
  insight: string;
  image: string;
  category: Exclude<BlogCategory, "all">;
  date: string;
}

const posts: BlogPost[] = [
  {
    id: "1",
    category: "savoir-faire",
    title: "Lipid Priming: The 8-Hour Secret",
    summary:
      "Fragrance molecules are lipophilic, meaning they struggle to bind to dry skin. This is why scent 'disappears' on many people.",
    insight:
      "EXPERT TIP: Apply an unscented oil or petroleum-based balm to your pulse points before spraying. This creates a 'molecular anchor' that prevents the alcohol from evaporating too quickly.",
    image:
      "https://i.pinimg.com/736x/d2/e3/2f/d2e32f05b768e91356ff6b6bb8f7b734.jpg",
    date: "13 April 2026",
  },
  {
    id: "2",
    category: "savoir-faire",
    title: "The Friction Fallacy: Don't Rub",
    summary:
      "The common habit of rubbing wrists together is the fastest way to ruin a high-end composition.",
    insight:
      "EXPERT TIP: Rubbing creates heat that 'bruises' the top notes. It forces the delicate citrus and floral molecules to evaporate instantly, skipping the beautiful opening of your perfume.",
    image: "https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=800",
    date: "15 November 2025",
  },
  {
    id: "3",
    category: "savoir-faire",
    title: "The Diffusion Map: Hair & Textiles",
    summary:
      "Skin heat creates projection, but skin chemistry also alters scent. For the truest version of a perfume, look elsewhere.",
    insight:
      "EXPERT TIP: Spray your hairbrush or the lining of your jacket. Porous fibers hold scent longer than skin and don't project heat, keeping the fragrance profile 'true' for the entire day.",
    image:
      "https://i.pinimg.com/736x/d7/21/b8/d721b86f023296557adbd612792956bf.jpg",
    date: "10 January 2026",
  },
  // --- ESCAPISM: INGREDIENTS & ORIGINS (3) ---
  {
    id: "4",
    category: "escapism",
    title: "The Dawn Jasmine of Grasse",
    summary:
      "The Jasmine Grandiflorum used in iconic perfumes is significantly different from common varieties.",
    insight:
      "EXPERT TIP: This Jasmine is harvested at 4 AM. Once the sun rises, the wax on the petals melts and the 'indolic' (sexy/animalic) quality of the scent is lost forever.",
    image:
      "https://i.pinimg.com/1200x/65/29/ab/6529ab7966df0952965f7afeb2e6a001.jpg",
    date: "09 March 2026",
  },
  {
    id: "5",
    category: "escapism",
    title: "Oud: The Liquid Gold of the East",
    summary:
      "Oud is not a wood; it is a resin produced by the Aquilaria tree in response to a specific type of mold.",
    insight:
      "EXPERT TIP: Real Oud acts as a natural fixative. If your perfume contains high-quality Oud, you don't need to over-spray; the base notes will naturally linger for 24+ hours.",
    image:
      "https://i.pinimg.com/1200x/53/b6/55/53b6552cf7dd612c02060603b8023ef0.jpg",
    date: "02 October 2025",
  },
  {
    id: "6",
    category: "escapism",
    title: "Orris Butter: The World's Rarest Note",
    summary:
      "Derived from the roots of the Iris flower, this ingredient takes nearly 6 years to produce.",
    insight:
      "EXPERT TIP: Orris provides a 'powdery' and 'suede' texture. It is the secret ingredient in perfumes that smell 'expensive' and 'clean' without being soapy.",
    image:
      "https://i.pinimg.com/736x/7c/27/5a/7c275ac326469b82dfb02aee448b5231.jpg",
    date: "05 December 2025",
  },
  // --- SOLSTICE: SEASONAL CHEMISTRY (3) ---
  {
    id: "7",
    category: "solstice",
    title: "Winter Chemistry: Alcohol vs. Ice",
    summary:
      "In sub-zero temperatures, the alcohol in your perfume doesn't evaporate fast enough to lift the scent.",
    insight:
      "EXPERT TIP: In winter, spray the 'hottest' parts of your body: the chest and the back of the neck. This extra body heat is required to push the scent through heavy winter layers.",
    image:
      "https://i.pinimg.com/1200x/49/41/8d/49418d993ecf1e6b704e03413322481e.jpg",
    date: "22 January 2026",
  },
  {
    id: "8",
    category: "solstice",
    title: "Summer Sillage: The Citrus Trap",
    summary:
      "Citrus molecules are the lightest in perfumery and evaporate almost instantly in high heat.",
    insight:
      "EXPERT TIP: For summer longevity, look for 'Green' citrus (Vetiver or Bergamot) rather than 'Sweet' citrus. These earthier notes 'grip' the skin better in high humidity.",
    image:
      "https://i.pinimg.com/1200x/7e/eb/47/7eeb4734a896f78ce61e1080c6d9d14b.jpg",
    date: "14 August 2025",
  },
  {
    id: "9",
    category: "solstice",
    title: "The Autumn Pivot: Spice & Resins",
    summary:
      "As humidity drops, your skin loses the moisture that usually holds light floral perfumes.",
    insight:
      "EXPERT TIP: Transition your wardrobe to 'Resinous' scents (Amber, Benzoin, Myrrh). These heavier molecules provide a warm 'envelope' that thrives in the crisp, dry air of autumn.",
    image:
      "https://i.pinimg.com/1200x/b1/20/a4/b120a460e8fc10a5d6441906cb9db4dc.jpg",
    date: "21 March 2026",
  },
];

export default function ProfessionalPerfumeJournal() {
  const [filter, setFilter] = useState<BlogCategory>("all");
  const [fade, setFade] = useState(true);

  const filtered = useMemo(
    () =>
      filter === "all" ? posts : posts.filter((p) => p.category === filter),
    [filter],
  );

  useEffect(() => {
    const t = setTimeout(() => setFade(true), 150);
    return () => clearTimeout(t);
  }, [filter]);

  return (
    <div
      style={{ backgroundColor: "#fff", minHeight: "100vh", color: "#1a1a1a" }}
    >
      {/* 💎 ELEGANT HEADER */}
      <header
        style={{
          textAlign: "center",
          padding: "80px 20px 40px",
          borderBottom: "1px solid #f5f5f5",
        }}
      >
        <h1
          style={{
            fontSize: "14px",
            letterSpacing: "10px",
            textTransform: "uppercase",
            marginBottom: "40px",
            fontWeight: 700,
          }}
        >
          The Fragrance Journal
        </h1>

        <nav
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "35px",
            flexWrap: "wrap",
          }}
        >
          {["all", "savoir-faire", "escapism", "solstice"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat as BlogCategory)}
              style={{
                background: "none",
                border: "none",
                fontSize: "11px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                cursor: "pointer",
                color: filter === cat ? "#4b2a53" : "#aaa",
                transition: "0.4s ease",
                paddingBottom: "10px",
                borderBottom:
                  filter === cat
                    ? "2px solid #4b2a53"
                    : "2px solid transparent",
                fontWeight: 600,
              }}
            >
              {cat}
            </button>
          ))}
        </nav>
      </header>

      {/* 💎 3-COLUMN PROFESSIONAL GRID */}
      <main
        style={{
          padding: "60px 5%",
          maxWidth: "1400px",
          margin: "0 auto",
          opacity: fade ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
            gap: "80px 40px",
          }}
        >
          {filtered.map((post) => (
            <article
              key={post.id}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div
                style={{
                  width: "100%",
                  aspectRatio: "4/3",
                  overflow: "hidden",
                  marginBottom: "25px",
                  backgroundColor: "#fcfcfc",
                }}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              <div style={{ padding: "0 5px" }}>
                <div
                  style={{
                    display: "inline-block",
                    backgroundColor: "#000",
                    color: "#fff",
                    fontSize: "9px",
                    padding: "5px 10px",
                    letterSpacing: "1px",
                    marginBottom: "20px",
                    textTransform: "uppercase",
                    fontWeight: 700,
                  }}
                >
                  Fragrances
                </div>

                <h2
                  style={{
                    fontSize: "22px",
                    fontFamily: "serif",
                    marginBottom: "15px",
                    lineHeight: 1.25,
                  }}
                >
                  {post.title}
                </h2>

                <p
                  style={{
                    fontSize: "15px",
                    color: "#555",
                    lineHeight: "1.7",
                    marginBottom: "25px",
                    fontWeight: 300,
                  }}
                >
                  {post.summary}
                </p>

                {/* 💎 THE INTEGRATED TIP SECTION */}
                <div
                  style={{
                    borderTop: "1px solid #efefef",
                    paddingTop: "20px",
                    marginTop: "auto",
                  }}
                >
                  <p
                    style={{
                      fontSize: "13px",
                      lineHeight: "1.6",
                      color: "#4b2a53",
                      fontWeight: 600,
                      fontStyle: "italic",
                    }}
                  >
                    {post.insight}
                  </p>
                  <span
                    style={{
                      display: "block",
                      fontSize: "10px",
                      color: "#bbb",
                      marginTop: "20px",
                      letterSpacing: "1px",
                    }}
                  >
                    {post.date.toUpperCase()}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
