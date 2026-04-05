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
