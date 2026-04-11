import React, { useState } from "react";
import Login from "../components/form/Login";
import Register from "../components/form/Register";
import type { AuthView } from "../types/Auth";
import Authimg from "../../../assets/Images/Auth.jpg";

const SIDE_IMAGE_URL = Authimg;

// ─── Animation styles ─────────────────────────────────────────────────────────

const panelAnim = {
  image: {
    animation: "vyra-slide-left 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
  } as React.CSSProperties,

  form: {
    animation: "vyra-slide-right 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both",
  } as React.CSSProperties,

  logo: {
    animation: "vyra-fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.40s both",
  } as React.CSSProperties,

  quote: {
    animation: "vyra-fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.55s both",
  } as React.CSSProperties,
};

// ─── VYRA Logo ────────────────────────────────────────────────────────────────

const VyraLogo: React.FC<{ size?: "sm" | "md" }> = ({ size = "md" }) => (
  <div className={size === "md" ? "mb-1" : ""}>
    <div
      className={`font-serif tracking-[0.25em] text-[#f0eaf4] font-light ${
        size === "md" ? "text-3xl" : "text-xl"
      }`}
    >
      VYRA
    </div>
    <div
      className={`tracking-[0.3em] text-[#a18eaa] uppercase ${
        size === "md" ? "text-[8px] mt-0.5" : "text-[7px]"
      }`}
    >
      Luxury Fragrance House
    </div>
  </div>
);

// ─── Auth Layout ──────────────────────────────────────────────────────────────

const AuthLayout: React.FC = () => {
  const [view, setView] = useState<AuthView>("login");
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const switchView = (target: AuthView): void => {
    if (target === view || isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setView(target);
      setIsAnimating(false);
    }, 250);
  };

  return (
    <div
      className="min-h-screen bg-[#1a0d24] flex items-stretch relative overflow-hidden"
      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
    >
      {/* ── Ambient glow ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-40 -left-40 w-80 h-80 rounded-full opacity-25"
          style={{ background: "radial-gradient(circle, #4a2d5e 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-20 right-1/3 w-60 h-60 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #3d1f52 0%, transparent 70%)" }}
        />
      </div>

      {/* ── Left image panel ── */}
      <div
        style={panelAnim.image}
        className="hidden lg:flex flex-col w-[42%] relative overflow-hidden flex-shrink-0"
      >
        <img
          src={SIDE_IMAGE_URL}
          alt="VYRA Fragrance"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a0d24]/60 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a0d24]/80 via-transparent to-[#1a0d24]/30" />

        <div className="relative z-10 flex flex-col justify-between h-full p-10">
          <div style={panelAnim.logo}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-px bg-[#c8a8d8]" />
              <span className="text-[8px] tracking-[0.45em] text-[#c8a8d8]/70 uppercase">
                Est. MMXXIV
              </span>
            </div>
            <VyraLogo size="md" />
          </div>

          <div style={panelAnim.quote} className="mb-4">
            <div className="w-7 h-px bg-[#c8a8d8]/40 mb-4" />
            <p
              className="text-[#c8a8d8]/60 text-[11px] font-light tracking-[0.15em] leading-loose italic"
              style={{ fontFamily: "Georgia, serif" }}
            >
              "Crafted for scent lovers<br />
              who collect stories,<br />
              not just bottles."
            </p>
          </div>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div
        style={panelAnim.form}
        className="flex-1 flex flex-col justify-center items-center px-6 py-8 lg:px-12"
      >
        <div className="lg:hidden text-center mb-6">
          <VyraLogo size="sm" />
        </div>

        <div className="w-full max-w-[340px]">
          {/* ── Tab switcher ── */}
          <div className="flex mb-7 border-b border-[#2d1a3a]">
            {(["login", "register"] as AuthView[]).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => switchView(tab)}
                className={`
                  relative flex-1 pb-3 text-[12px] tracking-[0.3em] uppercase transition-all duration-300
                  font-sans
                  ${view === tab ? "text-[#c8a8d8]" : "text-[#c78bed] hover:text-[#6b4f7a]"}
                `}
              >
                {tab === "login" ? "Sign In" : "Register"}
                {view === tab && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-px bg-[#c8a8d8]" />
                )}
              </button>
            ))}
          </div>

          {/* ── Form area ── */}
          <div
            className={`transition-all duration-250 ${
              isAnimating ? "opacity-0 translate-y-1" : "opacity-100 translate-y-0"
            }`}
          >
            {view === "login" ? (
              <Login onSuccess={() => console.log("Login success")} />
            ) : (
              <Register onSuccess={() => console.log("Register success")} />
            )}
          </div>

          {/* ── Switch prompt ── */}
          <p className="mt-5 text-center text-[9px] tracking-widest uppercase text-[#ca97e9] font-sans">
            {view === "login" ? (
              <>
                New to VYRA?{" "}
                <button
                  type="button"
                  onClick={() => switchView("register")}
                  className="text-[#9b7aac] hover:text-[#c8a8d8] transition-colors underline underline-offset-3"
                >
                  Create Account
                </button>
              </>
            ) : (
              <>
                Already a member?{" "}
                <button
                  type="button"
                  onClick={() => switchView("login")}
                  className="text-[#9b7aac] hover:text-[#c8a8d8] transition-colors underline underline-offset-3"
                >
                  Sign In
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;