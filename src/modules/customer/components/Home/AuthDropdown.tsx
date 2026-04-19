import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";

export default function AuthDropdown() {
  const navigate = useNavigate();

  return (
    <div className="absolute top-full right-[-50px] mt-4 w-[320px] bg-white shadow-2xl rounded-sm border border-[#e7dfe9] z-50 p-6">
      {/* Triangle Arrow */}
      <div className="absolute -top-2 right-[62px] w-4 h-4 bg-white border-t border-l border-[#e7dfe9] rotate-45"></div>

      <div className="relative">
        <h3 className="text-base font-semibold text-[#2f1d17] mb-5">
          You are not logged in
        </h3>

        <ul className="space-y-4 mb-8">
          {[
            "Permanently reduced products",
            "Secure shopping and payment",
            "4-6 working days delivery time",
          ].map((text, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="mt-0.5 bg-[#4b2a53] rounded-full p-0.5 shrink-0">
                <Check size={12} className="text-white" strokeWidth={3} />
              </div>
              <span className="text-sm text-[#2f1d17]/80 leading-tight">
                {text}
              </span>
            </li>
          ))}
        </ul>

        <button
          onClick={() => navigate("/auth")}
          className="w-full bg-black text-white py-4 text-sm font-bold uppercase tracking-widest hover:bg-[#2f1d17] transition-colors duration-300"
        >
          Log in/Register
        </button>
      </div>
    </div>
  );
}
