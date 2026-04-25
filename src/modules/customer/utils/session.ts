// ─── Session Storage Utility ──────────────────────────────────────────────────
// Separate file so Fast Refresh works correctly in Login.tsx and Register.tsx

export const SESSION_KEY = "vyra_user" as const;

// ─── Types ────────────────────────────────────────────────────────────────────

export interface StoredUser {
  id:string|undefined;
  email: string;
  fullName: string;
  phone?: string;
  loginAt?: string;
  registeredAt?: string;
  role: "admin" | "user";
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function saveUserSession(user: StoredUser): void {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function getUserSession(): StoredUser | null {
  const raw = sessionStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredUser;
  } catch {
    return null;
  }
}

export function clearUserSession(): void {
  sessionStorage.removeItem(SESSION_KEY);
}