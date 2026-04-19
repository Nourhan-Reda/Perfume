import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";

type Product = {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  category: string;
  rating: number;
};

const API_DATA: Product[] = [
  {
    id: "1",
    title: "Floral Rose Essence",
    description: "Soft feminine fragrance with romantic floral fresh notes",
    image:
      "https://i.pinimg.com/1200x/97/27/f6/9727f62d412ff145d386c1741af3437b.jpg",
    price: 350,
    category: "women",
    rating: 4.5,
  },
  {
    id: "2",
    title: "Sweet Vanilla Bloom",
    description: "Warm sweet scent with creamy vanilla soft touch",
    image:
      "https://i.pinimg.com/736x/fd/1a/a7/fd1aa7d65ac9efcb945237c21e81dc03.jpg",
    price: 300,
    category: "women",
    rating: 4.3,
  },
  {
    id: "3",
    title: "Elegant Jasmine Mist",
    description: "Fresh jasmine aroma giving elegant feminine daily fragrance",
    image:
      "https://i.pinimg.com/1200x/ec/91/66/ec9166e5be6603e660550a25d6eb9fdf.jpg",
    price: 320,
    category: "women",
    rating: 4.4,
  },
];

export default function PerfumeCarousel() {
  const navigate = useNavigate();
  const items = API_DATA;
  const [idx, setIdx] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [dir, setDir] = useState<1 | -1>(1);

  const p = items[idx];

  const goTo = useCallback(
    (next: number, direction: 1 | -1) => {
      if (animating || next === idx) return;
      setDir(direction);
      setAnimating(true);
      setTimeout(() => {
        setIdx(next);
        setAnimating(false);
      }, 500); // Slightly slower for luxury feel
    },
    [animating, idx],
  );

  useEffect(() => {
    const t = setInterval(() => {
      goTo((idx + 1) % items.length, 1);
    }, 6000);
    return () => clearInterval(t);
  }, [idx, items.length, goTo]);

  if (!p) return null;

  const accent = "#4b2a53";
  const textPrimary = "#1a1a1a";
  const textSecondary = "#665d69";

  // Refined Animation Logic
  const contentSlide: React.CSSProperties = {
    opacity: animating ? 0 : 1,
    transform: animating ? `translateY(${dir * 15}px)` : "translateY(0)",
    transition: "all 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
  };

  const imageEffect: React.CSSProperties = {
    opacity: animating ? 0.8 : 1,
    transform: animating ? "scale(1.05)" : "scale(1)",
    transition: "all 0.8s cubic-bezier(0.23, 1, 0.32, 1)",
  };

  return (
    <div
      style={{
        fontFamily: "'Didot', 'Playfair Display', serif",
        background: "#ffffff",
        width: "100%",
        minHeight: "600px",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 40px",
      }}
    >
      {/* Sophisticated Background Element */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "40%",
          height: "100%",
          background: "linear-gradient(to left, #faf7fb, transparent)",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 100,
          maxWidth: 1100,
          alignItems: "center",
        }}
      >
        {/* LEFT: IMAGE SECTION */}
        <div style={{ position: "relative" }}>
          <div
            style={{
              width: "100%",
              aspectRatio: "4/5",
              borderRadius: "2px", // Luxury often uses sharp or very slight radii
              overflow: "hidden",
              boxShadow: "0 30px 60px -12px rgba(50, 50, 93, 0.15)",
              backgroundColor: "#f6f6f6",
              ...imageEffect,
            }}
          >
            <img
              src={p.image}
              alt={p.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          {/* Minimalist Pagination dots */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 12,
              marginTop: 32,
            }}
          >
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > idx ? 1 : -1)}
                style={{
                  width: i === idx ? 40 : 8,
                  height: 2,
                  padding: 0,
                  border: "none",
                  background: i === idx ? accent : "#d1d1d1",
                  cursor: "pointer",
                  transition: "all 0.4s ease",
                }}
              />
            ))}
          </div>
        </div>

        {/* RIGHT: CONTENT SECTION */}
        <div style={contentSlide}>
          <div style={{ marginBottom: 24 }}>
            <span
              style={{
                fontSize: 12,
                letterSpacing: 6,
                textTransform: "uppercase",
                color: accent,
                fontWeight: 600,
                display: "block",
                marginBottom: 16,
              }}
            >
              The {p.category} Series
            </span>
            <h2
              style={{
                fontSize: 64,
                lineHeight: 1.1,
                margin: "0 0 24px 0",
                color: textPrimary,
                fontWeight: 400,
              }}
            >
              {p.title}
            </h2>
            <p
              style={{
                fontSize: 18,
                lineHeight: 1.6,
                color: textSecondary,
                maxWidth: 400,
                fontFamily: "sans-serif",
                fontWeight: 300,
              }}
            >
              {p.description}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 16,
              marginBottom: 40,
            }}
          >
            <span
              style={{
                fontSize: 32,
                color: textPrimary,
                fontWeight: 400,
              }}
            >
              ${p.price}.00
            </span>
            <span
              style={{
                fontSize: 14,
                color: textSecondary,
                textDecoration: "overline",
                letterSpacing: 1,
              }}
            >
              Free Delivery
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <button
              onClick={() => navigate("collections")}
              style={{
                padding: "18px 48px",
                backgroundColor: accent,
                color: "white",
                border: "none",
                fontSize: 14,
                letterSpacing: 2,
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "opacity 0.2s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = "0.9")}
              onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Experience Now
            </button>

            <div
              style={{ fontSize: 13, color: textSecondary, letterSpacing: 1 }}
            >
              {String(idx + 1).padStart(2, "0")} / {items.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
