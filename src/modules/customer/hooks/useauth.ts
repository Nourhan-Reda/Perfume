import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getUserSession, clearUserSession } from "../utils/session";
import type { StoredUser } from "../utils/session";

// ─── Types ────────────────────────────────────────────────────────────────────

export type { StoredUser };

interface UseAuthOptions {
  /** If true, redirects to /auth when no session is found */
  requireAuth?: boolean;
}

interface UseAuthReturn {
  /** The current session user, or null if not logged in */
  user: StoredUser | null;
  isLoggedIn: boolean;
  logout: () => void;
}

export function useAuth(options: UseAuthOptions = {}): UseAuthReturn {
  const { requireAuth = false } = options;
  const navigate = useNavigate();


  const user: StoredUser | null = getUserSession();


  // useRef prevents the navigate call from running on every re-render.
  const redirected = useRef<boolean>(false);

  useEffect(() => {
    if (requireAuth && !user && !redirected.current) {
      redirected.current = true;
      navigate("/auth");
    }
  }, [requireAuth, user, navigate]);
  // ↑ No setState inside the effect body — only navigate(), which is safe.

  // ── Logout ────────────────────────────────────────────────────────────────

  const logout = (): void => {
    clearUserSession();
    navigate("/auth");
  };

  return {
    user,
    isLoggedIn: user !== null,
    logout,
  };
}