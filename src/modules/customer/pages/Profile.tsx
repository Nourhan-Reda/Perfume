import { Mail, CalendarDays, BadgeCheck, Pencil, User } from "lucide-react";
import InfoRow from "../components/Profile/InfoRow";
import type { InfoRowProps } from "../types/profile";
import { useState } from "react";
import EditProfileModal from "../components/Profile/EditProfileModal";
import { useEditProfile } from "../hooks/useEditProfile";

const keyframes = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600&family=Outfit:wght@300;400;500&display=swap');

  @keyframes spin-ring         { from { transform: rotate(0deg);    } to { transform: rotate(360deg);  } }
  @keyframes spin-ring-reverse { from { transform: rotate(0deg);    } to { transform: rotate(-360deg); } }
  @keyframes pulse-glow        { 0%,100% { opacity:.5; transform:scale(1);   } 50% { opacity:1; transform:scale(1.1); } }
  @keyframes float-letter      { 0%,100% { transform:translateY(0px);        } 50% { transform:translateY(-6px);     } }
  @keyframes fade-up           { from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:translateY(0); } }
  @keyframes shimmer           { 0% { background-position:-300% center; } 100% { background-position:300% center; } }

  .letter-glow {
    text-shadow: 0 0 22px rgba(240,180,230,.75), 0 0 48px rgba(180,90,200,.35), 0 2px 4px rgba(0,0,0,.4);
  }
`;
export default function ProfilePage() {
  const user = JSON.parse(sessionStorage.getItem("vyra_user") || "{}");
  const name: string   = user.fullName || "No Name";
  const email: string  = user.email    || "No Email";
  const initial        = name.trim()[0]?.toUpperCase() ?? "?";
  const handle         = name !== "No Name"
    ? "@" + name.toLowerCase().replace(/\s+/g, ".")
    : "";

  const infoRows: InfoRowProps[] = [
    { icon: <User size={15} />,         label: "Full Name",    value: name },
    { icon: <Mail size={15} />,         label: "Email",        value: email },
    { icon: <CalendarDays size={15} />, label: "Member Since", value: "April 2025" },
    { icon: <BadgeCheck size={15} />,   label: "Account Type", value: "Personal" },
  ];
    const [isModalOpen, setIsModalOpen] = useState(false);      // ← أضف
  const { handleSave } = useEditProfile(); 

  return (
    <>
      <style>{keyframes}</style>
   <EditProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialName={name}
        initialEmail={email}
        onSave={handleSave}
      />
      {/* ── Page background ─────────────────────────────────── */}
      <div
        className="min-h-screen flex items-center justify-center px-6 py-12"
        style={{
          fontFamily: "'Outfit', sans-serif",
          background: "#ddd0e8",
          backgroundImage: [
            "radial-gradient(ellipse 65% 50% at 20% 10%,  rgba(180,140,210,0.45) 0%, transparent 60%)",
            "radial-gradient(ellipse 55% 45% at 85% 85%,  rgba(140,90,170,0.30)  0%, transparent 60%)",
            "radial-gradient(ellipse 40% 35% at 50% 50%,  rgba(200,170,230,0.20) 0%, transparent 70%)",
          ].join(", "),
        }}
      >
        {/* ── Card ──────────────────────────────────────────── */}
        <div
          className="w-full max-w-[580px] rounded-[32px] px-12 pt-12 pb-10 relative overflow-hidden border border-[rgba(180,120,200,0.18)]"
          style={{
            background: "linear-gradient(160deg, #1e1128 0%, #160e20 100%)",
            boxShadow: [
              "0 0 0 1px rgba(255,255,255,0.04) inset",
              "0 40px 100px rgba(80,30,100,0.35)",
              "0 12px 32px rgba(80,30,100,0.25)",
            ].join(", "),
            animation: "fade-up 0.65s cubic-bezier(.22,.68,0,1.2) both",
          }}
        >
          {/* Ambient top glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 75% 45% at 50% 0%, rgba(140,70,160,0.18) 0%, transparent 65%)",
            }}
          />

          {/* ── Avatar section ────────────────────────────── */}
          <div
            className="flex flex-col items-center mb-9"
            style={{ animation: "fade-up 0.7s 0.1s cubic-bezier(.22,.68,0,1.2) both" }}
          >
            {/* Ring stack */}
            <div className="relative w-[152px] h-[152px] mb-6">

              {/* Pulsing glow behind */}
              <div
                className="absolute rounded-full"
                style={{
                  inset: "-20px",
                  background: "radial-gradient(circle, rgba(180,100,200,0.32) 0%, transparent 65%)",
                  animation: "pulse-glow 2.8s ease-in-out infinite",
                }}
              />

              {/* Outer conic ring — spins CW */}
              <div
                className="absolute rounded-full"
                style={{
                  inset: "-6px",
                  background:
                    "conic-gradient(from 0deg, transparent 0%, #b06fa0 20%, #e8a8d8 45%, #d080c0 65%, #8840a8 85%, transparent 100%)",
                  animation: "spin-ring 4s linear infinite",
                }}
              />

              {/* Inner conic ring — spins CCW */}
              <div
                className="absolute rounded-full"
                style={{
                  inset: "-1px",
                  background:
                    "conic-gradient(from 180deg, transparent 0%, rgba(160,80,180,0.55) 30%, rgba(230,160,220,0.85) 55%, rgba(160,80,180,0.55) 80%, transparent 100%)",
                  animation: "spin-ring-reverse 6s linear infinite",
                }}
              />

              {/* Mask to cut rings into a halo */}
              <div
                className="absolute rounded-full"
                style={{ inset: "4px", background: "#160e20" }}
              />

              {/* Avatar circle */}
              <div
                className="absolute rounded-full flex items-center justify-center z-10"
                style={{
                  inset: "8px",
                  background: "linear-gradient(145deg, #2e1540 0%, #4b2a53 55%, #7a3f6e 100%)",
                  boxShadow: "inset 0 2px 10px rgba(0,0,0,0.35)",
                }}
              >
                <span
                  className="letter-glow select-none leading-none tracking-[-2px]"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "58px",
                    fontWeight: 600,
                    color: "#f5d8f0",
                    animation: "float-letter 3.5s ease-in-out infinite",
                  }}
                >
                  {initial}
                </span>
              </div>
            </div>

            {/* Name */}
            <h1
              className="text-[28px] font-semibold text-[#f0e0f5] text-center tracking-wide mb-1"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {name}
            </h1>

            {/* Handle — shimmer gradient text */}
            {handle && (
              <p
                className="text-[13px] font-light text-center tracking-[0.06em] mb-4 bg-clip-text"
                style={{
                  background:
                    "linear-gradient(90deg, #c084b8, #e8b4d8, #a060c0, #e8b4d8, #c084b8)",
                  backgroundSize: "300% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "shimmer 4s linear infinite",
                }}
              >
                {handle}
              </p>
            )}

            {/* Status badge */}
            <div className="inline-flex items-center gap-1.5 bg-[rgba(122,63,110,0.22)] border border-[rgba(180,120,180,0.22)] rounded-full px-3.5 py-1.5">
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#c084b8]"
                style={{
                  boxShadow: "0 0 7px rgba(192,132,184,0.9)",
                  animation: "pulse-glow 2s ease-in-out infinite",
                }}
              />
              <span className="text-[11px] font-medium text-[#c084b8] uppercase tracking-[0.06em]">
                Active member
              </span>
            </div>
          </div>

          {/* ── Divider ───────────────────────────────────── */}
          <div className="relative my-7 h-px">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(180,120,200,0.25), rgba(200,140,220,0.45), rgba(180,120,200,0.25), transparent)",
              }}
            />
            <span
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[8px] text-[#9060a8] px-2.5"
              style={{ background: "#160e20" }}
            >
              ◆
            </span>
          </div>

          {/* ── Info grid ─────────────────────────────────── */}
          <div
            className="grid grid-cols-2 gap-3"
            style={{ animation: "fade-up 0.7s 0.25s cubic-bezier(.22,.68,0,1.2) both" }}
          >
            {infoRows.map((row) => (
              <InfoRow key={row.label} {...row} />
            ))}
          </div>

          {/* ── Edit button ───────────────────────────────── */}
          <button
            className="mt-6 w-full flex items-center justify-center gap-2 py-4 rounded-2xl border border-[rgba(180,120,200,0.28)] bg-[rgba(122,63,110,0.18)] text-[#d4a0c8] text-[13px] font-medium uppercase tracking-[0.1em] transition-all duration-200 hover:bg-[rgba(122,63,110,0.32)] hover:border-[rgba(180,120,200,0.45)] active:scale-[0.98] cursor-pointer"
            style={{
              fontFamily: "'Outfit', sans-serif",
              animation: "fade-up 0.7s 0.35s cubic-bezier(.22,.68,0,1.2) both",
            }}
              onClick={() => setIsModalOpen(true)}
          >
            <Pencil size={14} />
            Edit profile
          </button>
        </div>
      </div>
    </>
  );
}