import { useState, useEffect, useCallback } from "react";

type MoodSlide = {
  id: string;
  image: string;
  label: string;
};

const VISUAL_MOODS: MoodSlide[] = [
  {
    id: "01",
    label: "THE EMBRACE",
    image:
      "https://i.pinimg.com/1200x/a8/fb/49/a8fb49db48e4397a7c416ef77e9ea45e.jpg",
  },
  {
    id: "02",
    label: "THE BLOOM",
    image:
      "https://i.pinimg.com/736x/02/25/66/02256666f134302d4193d2e20d39c604.jpg",
  },
  {
    id: "03",
    label: "THE RUSH",
    image:
      "https://i.pinimg.com/1200x/44/a9/4f/44a94f41c295d737a038814039ed4357.jpg",
  },
];

export default function ProfessionalWideCarousel() {
  const [idx, setIdx] = useState(0);
  const [animating, setAnimating] = useState(false);

  const move = useCallback(
    (nextIdx: number) => {
      if (animating) return;
      setAnimating(true);
      setTimeout(() => {
        setIdx(nextIdx);
        setAnimating(false);
      }, 800);
    },
    [animating],
  );

  useEffect(() => {
    const timer = setInterval(() => {
      move((idx + 1) % VISUAL_MOODS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [idx, move]);

  return (
    <div
      style={{
        width: "100%", 
        height: "85vh",
        backgroundColor: "#fff",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* MAIN IMAGE STAGE */}
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transition: "transform 1.2s cubic-bezier(0.2, 1, 0.3, 1)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${VISUAL_MOODS[idx].image})`,
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
            transform: animating ? "scale(1.08)" : "scale(1.02)",
            opacity: animating ? 0.8 : 1,
            transition: "transform 1.5s ease-out, opacity 0.8s ease-in-out",
          }}
        />

        {/* GRADIENT OVERLAY */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(255,255,255,0.4) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.1) 100%)",
            zIndex: 1,
          }}
        />
      </div>

      {/* OVERLAY LABEL */}
      <div
        style={{
          position: "absolute",
          left: "8%",
          zIndex: 2,
          opacity: animating ? 0 : 1,
          transform: animating ? "translateX(-20px)" : "translateX(0)",
          transition: "all 0.8s ease",
        }}
      >
        <span
          style={{
            fontSize: "12px",
            letterSpacing: "8px",
            color: "#1a1a1a",
            fontWeight: 300,
            textTransform: "uppercase",
          }}
        >
          {VISUAL_MOODS[idx].label}
        </span>
      </div>

      {/* FLOATING CONTROLS */}
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "0",
          right: "0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "60px",
          zIndex: 3,
        }}
      >
        <button
          onClick={() =>
            move((idx - 1 + VISUAL_MOODS.length) % VISUAL_MOODS.length)
          }
          style={arrowStyle}
        >
          PREV
        </button>

        <div style={{ display: "flex", gap: "12px" }}>
          {VISUAL_MOODS.map((_, i) => (
            <div
              key={i}
              onClick={() => move(i)}
              style={{
                width: i === idx ? "40px" : "6px",
                height: "6px",
                borderRadius: "3px",
                backgroundColor: i === idx ? "#1a1a1a" : "rgba(0,0,0,0.15)",
                cursor: "pointer",
                transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            />
          ))}
        </div>

        <button
          onClick={() => move((idx + 1) % VISUAL_MOODS.length)}
          style={arrowStyle}
        >
          NEXT
        </button>
      </div>

      {/* VERTICAL LINE DETAIL */}
      <div
        style={{
          position: "absolute",
          right: "5%",
          top: "20%",
          bottom: "20%",
          width: "1px",
          background:
            "linear-gradient(to bottom, transparent, rgba(0,0,0,0.1), transparent)",
          zIndex: 2,
        }}
      />
    </div>
  );
}

const arrowStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  fontSize: "11px",
  letterSpacing: "4px",
  cursor: "pointer",
  color: "#1a1a1a",
  opacity: 0.6,
  padding: "10px",
  transition: "opacity 0.3s ease",
};