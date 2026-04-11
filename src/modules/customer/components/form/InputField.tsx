import React, { forwardRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type InputType =
  | "text"
  | "email"
  | "password"
  | "tel"
  | "number"
  | "search"
  | "url";

export type InputVariant = "default" | "ghost" | "filled";

export interface InputFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  type?: InputType;
  label: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: InputVariant;
  required?: boolean;
  wrapperClassName?: string;
}

// ─── Variant styles ───────────────────────────────────────────────────────────

const variantStyles: Record<InputVariant, string> = {
  default:
    "bg-transparent border-b border-[#6b4f7a] focus:border-[#c8a8d8] text-[#f0eaf4]",
  ghost:
    "bg-white/5 border border-[#6b4f7a]/40 focus:border-[#c8a8d8] text-[#f0eaf4] rounded-sm",
  filled:
    "bg-[#2d1a3a] border border-[#4a2d5e] focus:border-[#c8a8d8] text-[#f0eaf4] rounded-sm",
};

// ─── Component ────────────────────────────────────────────────────────────────

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      type = "text",
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      variant = "default",
      required = false,
      wrapperClassName = "",
      className = "",
      id,
      ...rest
    },
    ref
  ) => {
    const inputId = id ?? `input-${label.toLowerCase().replace(/\s+/g, "-")}`;
    const hasError = Boolean(error);

    return (
      <div className={`relative group w-full ${wrapperClassName}`}>
        {/* Label */}
        <label
          htmlFor={inputId}
          className={`
            block text-[11px] tracking-[0.25em] uppercase font-medium mb-1.5 transition-colors duration-300
            ${hasError ? "text-[#e06c75]" : "text-[#9b7aac] group-focus-within:text-[#c8a8d8]"}
          `}
        >
          {label}
          {required && (
            <span className="ml-1 text-[#c8a8d8]" aria-hidden="true">*</span>
          )}
        </label>

        {/* Input wrapper */}
        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute left-0 flex items-center justify-center w-5 h-5 text-[#6b4f7a] group-focus-within:text-[#c8a8d8] transition-colors duration-300 pointer-events-none">
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            type={type}
            aria-invalid={hasError}
            aria-describedby={
              hasError
                ? `${inputId}-error`
                : hint
                  ? `${inputId}-hint`
                  : undefined
            }
            className={`
              w-full py-2.5 text-[13px] font-light tracking-wide outline-none transition-all duration-300
              placeholder:text-[#4a3058] placeholder:tracking-wide
              ${variantStyles[variant]}
              ${leftIcon ? "pl-7" : "pl-0"}
              ${rightIcon ? "pr-7" : "pr-0"}
              ${hasError ? "!border-[#e06c75]" : ""}
              ${className}
            `}
            {...rest}
          />

          {rightIcon && (
            <span className="absolute right-0 flex items-center justify-center w-5 h-5 text-[#6b4f7a] group-focus-within:text-[#c8a8d8] transition-colors duration-300">
              {rightIcon}
            </span>
          )}
        </div>

        {/* Bottom line animation for default variant */}
        {variant === "default" && (
          <span
            className={`
              block h-px w-0 bg-[#c8a8d8] transition-all duration-500 group-focus-within:w-full
              ${hasError ? "!w-full !bg-[#e06c75]" : ""}
            `}
          />
        )}

        {/* Error / Hint */}
        <div className="min-h-[18px] mt-1">
          {hasError ? (
            <p
              id={`${inputId}-error`}
              role="alert"
              className="text-[10px] tracking-wider text-[#e06c75] uppercase font-medium"
            >
              {error}
            </p>
          ) : hint ? (
            <p
              id={`${inputId}-hint`}
              className="text-[10px] tracking-wider text-[#4a3058] uppercase"
            >
              {hint}
            </p>
          ) : null}
        </div>
      </div>
    );
  }
);

InputField.displayName = "InputField";
export default InputField;