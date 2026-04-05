import { z } from "zod";

// ─── Register Schema ──────────────────────────────────────────────────────────

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(60, "Name must be at most 60 characters")
      .regex(/^[a-zA-Z\s'-]+$/, "Name contains invalid characters"),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),

    phone: z
      .string()
      .optional()
      .refine(
        (val) => !val || /^\+?[\d\s\-()]{7,20}$/.test(val),
        "Please enter a valid phone number"
      ),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),

    confirmPassword: z.string().min(1, "Please confirm your password"),

    acceptTerms: z
      .boolean()
      .refine((val) => val === true, "You must accept the terms to continue"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// ─── Login Schema ─────────────────────────────────────────────────────────────

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  password: z.string().min(1, "Password is required"),

  rememberMe: z.boolean().optional(),
});

// ─── Inferred Types ───────────────────────────────────────────────────────────

export type RegisterFormValues = z.infer<typeof registerSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;

// ─── Auth View ────────────────────────────────────────────────────────────────

export type AuthView = "login" | "register";

// ─── API Response Types ───────────────────────────────────────────────────────

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  createdAt: string;
}

export interface AuthSuccessResponse {
  success: true;
  user: AuthUser;
  token: string;
}

export interface AuthErrorResponse {
  success: false;
  message: string;
  field?: keyof RegisterFormValues | keyof LoginFormValues;
}

export type AuthResponse = AuthSuccessResponse | AuthErrorResponse;