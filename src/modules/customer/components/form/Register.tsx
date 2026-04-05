import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "./InputField";
import type { RegisterFormValues } from "../../types/Auth";
import { registerSchema } from "../../types/Auth";

// ─── Icons ────────────────────────────────────────────────────────────────────

const UserIcon: React.FC = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const MailIcon: React.FC = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const PhoneIcon: React.FC = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.65 3.38 2 2 0 0 1 3.62 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.1 6.1l.82-.81a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const LockIcon: React.FC = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const EyeIcon: React.FC<{ open: boolean }> = ({ open }) =>
  open ? (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" x2="22" y1="2" y2="22" />
    </svg>
  );

// ─── Component ────────────────────────────────────────────────────────────────

interface RegisterProps {
  onSuccess?: () => void;
}

const Register: React.FC<RegisterProps> = ({ onSuccess }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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
    try {
      await new Promise<void>((resolve) => setTimeout(resolve, 1500));
      console.log("Register data:", data);
      onSuccess?.();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <p className="text-[9px] tracking-[0.4em] text-[#9b7aac] uppercase mb-2">
          Create Account
        </p>
        <h2 className="font-serif text-2xl text-[#f0eaf4] font-light leading-tight">
          Join <span className="italic text-[#c8a8d8]">VYRA</span>
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-0.5">
        <InputField
          label="Full Name"
          type="text"
          placeholder="Your full name"
          leftIcon={<UserIcon />}
          required
          error={errors.fullName?.message}
          {...register("fullName")}
        />

        <InputField
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          leftIcon={<MailIcon />}
          required
          error={errors.email?.message}
          {...register("email")}
        />

        <InputField
          label="Phone Number"
          type="tel"
          placeholder="+1 (555) 000-0000"
          leftIcon={<PhoneIcon />}
          hint="Optional — for order updates"
          error={errors.phone?.message}
          {...register("phone")}
        />

        <InputField
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="Min 8 chars, 1 uppercase, 1 number"
          leftIcon={<LockIcon />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="cursor-pointer text-[#6b4f7a] hover:text-[#c8a8d8] transition-colors"
            >
              <EyeIcon open={showPassword} />
            </button>
          }
          required
          error={errors.password?.message}
          {...register("password")}
        />

        <InputField
          label="Confirm Password"
          type={showConfirm ? "text" : "password"}
          placeholder="Repeat your password"
          leftIcon={<LockIcon />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowConfirm((p) => !p)}
              aria-label={showConfirm ? "Hide password" : "Show password"}
              className="cursor-pointer text-[#6b4f7a] hover:text-[#c8a8d8] transition-colors"
            >
              <EyeIcon open={showConfirm} />
            </button>
          }
          required
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        {/* Terms */}
        <div className="pt-2">
          <label className="flex items-start gap-2.5 cursor-pointer group">
            <div className="relative flex-shrink-0 mt-0.5">
              <input type="checkbox" className="sr-only peer" {...register("acceptTerms")} />
              <div className="w-3.5 h-3.5 border border-[#6b4f7a] peer-checked:border-[#c8a8d8] peer-checked:bg-[#c8a8d8]/10 transition-all duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none">
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#c8a8d8" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            </div>
            <span className="text-[9px] tracking-widest uppercase text-[#4a3058] leading-relaxed group-hover:text-[#9b7aac] transition-colors">
              I accept the{" "}
              <button type="button" className="text-[#c8a8d8] underline underline-offset-2">
                Terms of Service
              </button>{" "}
              &amp; Privacy Policy
            </span>
          </label>
          {errors.acceptTerms && (
            <p className="mt-1 text-[9px] tracking-widest text-[#e06c75] uppercase">
              {errors.acceptTerms.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <div className="pt-5">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`
              w-full py-3 text-[10px] tracking-[0.3em] uppercase font-medium transition-all duration-400
              ${isSubmitting
                ? "bg-[#4a2d5e]/50 text-[#6b4f7a] cursor-not-allowed"
                : "bg-[#3d1f52] text-[#f0eaf4] hover:bg-[#4a2d5e] border border-[#6b4f7a] hover:border-[#c8a8d8] active:scale-[0.99]"
              }
            `}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
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