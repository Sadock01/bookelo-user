import { AUTH_CHANGED_EVENT, LOGIN_TOAST_KEY } from "@/lib/auth/constants";
import type { AuthUser } from "@/lib/api/types";

const TOKEN_KEY = "bookelo_auth_token";
const USER_KEY = "bookelo_auth_user";

function dispatchAuthChanged(): void {
  window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
}

export function saveAuthSession(token: string, user: AuthUser): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  dispatchAuthChanged();
}

export function clearAuthSession(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  dispatchAuthChanged();
}

/** Affiche la notification de bienvenue après la prochaine navigation. */
export function markLoginToastPending(): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(LOGIN_TOAST_KEY, "1");
}

export function consumeLoginToastPending(): boolean {
  if (typeof window === "undefined") return false;
  if (sessionStorage.getItem(LOGIN_TOAST_KEY) !== "1") return false;
  sessionStorage.removeItem(LOGIN_TOAST_KEY);
  return true;
}

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getAuthUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}
