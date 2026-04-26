import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Loader2, Check } from "lucide-react";
import InputField from "./InputField";
import type { LoginFormValues } from "../../types/Auth";
import { loginSchema } from "../../types/Auth";
import { saveUserSession } from "../../utils/session";
// import type { StoredUser } from "../../utils/session";

import { loginUser } from "../../../../services/authApi";

const fadeUp = (delay: number): React.CSSProperties => ({
  animation: `vyra-fade-up 0.55s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms both`,
});

// ─── Types ────────────────────────────────────────────────────────────────────

interface LoginProps {
  onSuccess?: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

const Login: React.FC<LoginProps> = ({ onSuccess }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>("");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", rememberMe: false },
  });


const onSubmit = async (data: LoginFormValues): Promise<void> => {
  setIsSubmitting(true);
  setAuthError("");

  try {
    const user = await loginUser(data.email, data.password);

    saveUserSession({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      phone: user.phone,
      role: user.role,
      loginAt: new Date().toISOString(),
    });

    onSuccess?.();

    if (user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      setAuthError(err.message);
    } else {
      setAuthError("Something went wrong. Please try again.");
    }
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="w-full">

      {/* Heading — أول حاجة تظهر */}
      <div style={fadeUp(0)} className="mb-7">
        <p className="text-[11px] tracking-[0.4em] text-[#9b7aac] uppercase mb-2 font-medium">
          Welcome Back
        </p>
        <h2 className="font-serif text-[1.75rem] text-[#f0eaf4] font-light leading-tight">
          Sign in to <span className="italic text-[#c8a8d8]">VYRA</span>
        </h2>
      </div>

      {/* Auth error banner */}
      {authError && (
        <div style={fadeUp(0)} className="mb-4 px-3 py-2.5 border border-[#e06c75]/30 bg-[#e06c75]/5">
          <p className="text-[11px] tracking-wide text-[#e06c75]">{authError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-0.5">

        {/* Email — delay 80ms */}
        <div style={fadeUp(80)}>
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

        {/* Password — delay 160ms */}
        <div style={fadeUp(160)}>
          <InputField
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Your password"
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

        {/* Remember me + Forgot — delay 220ms */}
        <div style={fadeUp(220)} className="flex items-center justify-between pt-2">
          <label className="flex items-center gap-2 cursor-pointer group">
            <div className="relative flex-shrink-0">
              <input type="checkbox" className="sr-only peer" {...register("rememberMe")} />
              <div className="w-4 h-4 border border-[#6b4f7a] peer-checked:border-[#c8a8d8] peer-checked:bg-[#c8a8d8]/10 transition-all duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none">
                <Check size={9} color="#c8a8d8" strokeWidth={3} />
              </div>
            </div>
            <span className="text-[11px] tracking-wider uppercase text-[#6b4f7a] group-hover:text-[#9b7aac] transition-colors font-medium">
              Remember Me
            </span>
          </label>
          <button
            type="button"
            className="text-[11px] tracking-wider uppercase text-[#9b7aac] hover:text-[#c8a8d8] transition-colors font-medium"
          >
            Forgot Password?
          </button>
        </div>

        {/* Submit button — delay 290ms */}
        <div style={fadeUp(290)} className="pt-5">
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
                Signing In…
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </div>

        {/* Divider + Social — delay 360ms */}
        <div style={fadeUp(360)}>
          <div className="flex items-center gap-3 pt-5">
            <div className="flex-1 h-px bg-[#2d1a3a]" />
            <span className="text-[10px] tracking-[0.25em] text-[#4a3058] uppercase font-medium">
              Or continue with
            </span>
            <div className="flex-1 h-px bg-[#2d1a3a]" />
          </div>
          <div className="flex gap-2 pt-3">
            {(["Google", "Apple"] as const).map((provider) => (
              <button
                key={provider}
                type="button"
                className="flex-1 py-3 border border-[#2d1a3a] text-[11px] tracking-wider uppercase text-[#6b4f7a] hover:border-[#6b4f7a] hover:text-[#9b7aac] transition-all duration-300 font-medium"
              >
                {provider}
              </button>
            ))}
          </div>
        </div>

      </form>
    </div>
  );
};

export default Login;