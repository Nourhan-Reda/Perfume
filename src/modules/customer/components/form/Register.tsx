import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, Lock, Eye, EyeOff, Loader2, Check } from "lucide-react";
import InputField from "./InputField";
import type { RegisterFormValues } from "../../types/Auth";
import { registerSchema } from "../../types/Auth";
import { saveUserSession } from "../../utils/session";
// import type { StoredUser } from "../../utils/session";

import { registerUser } from "../../../../services/authApi";
const fadeUp = (delay: number): React.CSSProperties => ({
  animation: `vyra-fade-up 0.55s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms both`,
});

// ─── Types ────────────────────────────────────────────────────────────────────

interface RegisterProps {
  onSuccess?: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

const Register: React.FC<RegisterProps> = ({ onSuccess }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>("");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });



const onSubmit = async (data: RegisterFormValues): Promise<void> => {
  setIsSubmitting(true);
  setAuthError("");
  try {
    const newUser = await registerUser({
      fullName: data.fullName,
      email: data.email,
      phone: data.phone ?? "",
      password: data.password,
        role: "user",
    });

    saveUserSession({
      id:newUser.id,
      email: newUser.email,
      fullName: newUser.fullName,
      phone: newUser.phone,
        role: newUser.role,
      registeredAt: newUser.registeredAt,
    });

    onSuccess?.();
    navigate("/");
  } catch {
    setAuthError("Registration failed. Please try again.");
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="w-full">

      {/* Heading — delay 0 */}
      <div style={fadeUp(0)} className="mb-7">
        <p className="text-[11px] tracking-[0.4em] text-[#9b7aac] uppercase mb-2 font-medium">
          Create Account
        </p>
        <h2 className="font-serif text-[1.75rem] text-[#f0eaf4] font-light leading-tight">
          Join <span className="italic text-[#c8a8d8]">VYRA</span>
        </h2>
      </div>

      {/* Auth error banner */}
      {authError && (
        <div style={fadeUp(0)} className="mb-4 px-3 py-2.5 border border-[#e06c75]/30 bg-[#e06c75]/5">
          <p className="text-[11px] tracking-wide text-[#e06c75]">{authError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-0.5">

        {/* Full Name — delay 80ms */}
        <div style={fadeUp(80)}>
          <InputField
            label="Full Name"
            type="text"
            placeholder="Your full name"
            leftIcon={<User size={15} />}
            required
            error={errors.fullName?.message}
            {...register("fullName")}
          />
        </div>

        {/* Email — delay 150ms */}
        <div style={fadeUp(150)}>
          <InputField
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            leftIcon={<Mail size={15} />}
            required
            error={errors.email?.message}
            {...register("email")}
          />
        </div>

        {/* Phone — delay 210ms */}
        <div style={fadeUp(210)}>
          <InputField
            label="Phone Number"
            type="tel"
            placeholder="+1 (555) 000-0000"
            leftIcon={<Phone size={15} />}
            hint="Optional — for order updates"
            error={errors.phone?.message}
            {...register("phone")}
          />
        </div>

        {/* Password — delay 270ms */}
        <div style={fadeUp(270)}>
          <InputField
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Min 8 chars, 1 uppercase, 1 number"
            leftIcon={<Lock size={15} />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="cursor-pointer text-[#6b4f7a] hover:text-[#c8a8d8] transition-colors"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            }
            required
            error={errors.password?.message}
            {...register("password")}
          />
        </div>

        {/* Confirm Password — delay 330ms */}
        <div style={fadeUp(330)}>
          <InputField
            label="Confirm Password"
            type={showConfirm ? "text" : "password"}
            placeholder="Repeat your password"
            leftIcon={<Lock size={15} />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowConfirm((p) => !p)}
                aria-label={showConfirm ? "Hide password" : "Show password"}
                className="cursor-pointer text-[#6b4f7a] hover:text-[#c8a8d8] transition-colors"
              >
                {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            }
            required
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
        </div>

        {/* Terms — delay 390ms */}
        <div style={fadeUp(390)} className="pt-2">
          <label className="flex items-start gap-2.5 cursor-pointer group">
            <div className="relative flex-shrink-0 mt-0.5">
              <input type="checkbox" className="sr-only peer" {...register("acceptTerms")} />
              <div className="w-4 h-4 border border-[#6b4f7a] peer-checked:border-[#c8a8d8] peer-checked:bg-[#c8a8d8]/10 transition-all duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none">
                <Check size={9} color="#c8a8d8" strokeWidth={3} />
              </div>
            </div>
            <span className="text-[11px] tracking-wider uppercase text-[#6b4f7a] leading-relaxed group-hover:text-[#9b7aac] transition-colors font-medium">
              I accept the{" "}
              <button type="button" className="text-[#c8a8d8] underline underline-offset-2">
                Terms of Service
              </button>{" "}
              &amp; Privacy Policy
            </span>
          </label>
          {errors.acceptTerms && (
            <p className="mt-1.5 text-[11px] tracking-wider text-[#e06c75] uppercase font-medium">
              {errors.acceptTerms.message}
            </p>
          )}
        </div>

        {/* Submit — delay 450ms */}
        <div style={fadeUp(450)} className="pt-5">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`
              w-full py-3.5 text-[12px] tracking-[0.3em] uppercase font-medium transition-all duration-300
              ${isSubmitting
                ? "bg-[#4a2d5e]/50 text-[#6b4f7a] cursor-not-allowed border border-[#4a2d5e]"
                : "bg-[#3d1f52] text-[#f0eaf4] hover:bg-[#4a2d5e] border border-[#6b4f7a] hover:border-[#c8a8d8] active:scale-[0.99]"
              }
            `}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 size={14} className="animate-spin" />
                Creating Account…
              </span>
            ) : (
              "Create Account"
            )}
          </button>
        </div>

      </form>
    </div>
  );
};

export default Register;