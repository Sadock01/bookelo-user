"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { AUTH_CHANGED_EVENT } from "@/lib/auth/constants";
import {
  clearAuthSession,
  getAuthToken,
  getAuthUser,
  markLoginToastPending,
  saveAuthSession,
} from "@/lib/auth/session";
import type { AuthUser } from "@/lib/api/types";

type AuthContextValue = {
  readonly user: AuthUser | null;
  readonly token: string | null;
  readonly isAuthenticated: boolean;
  readonly isReady: boolean;
  readonly login: (token: string, user: AuthUser, options?: { readonly showToast?: boolean }) => void;
  readonly logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { readonly children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  const syncFromStorage = useCallback(() => {
    setUser(getAuthUser());
    setToken(getAuthToken());
  }, []);

  useEffect(() => {
    syncFromStorage();
    setIsReady(true);

    const onAuthChanged = () => syncFromStorage();
    window.addEventListener(AUTH_CHANGED_EVENT, onAuthChanged);
    return () => window.removeEventListener(AUTH_CHANGED_EVENT, onAuthChanged);
  }, [syncFromStorage]);

  const login = useCallback(
    (nextToken: string, nextUser: AuthUser, options?: { readonly showToast?: boolean }) => {
      saveAuthSession(nextToken, nextUser);
      setUser(nextUser);
      setToken(nextToken);
      if (options?.showToast !== false) {
        markLoginToastPending();
      }
    },
    [],
  );

  const logout = useCallback(() => {
    clearAuthSession();
    setUser(null);
    setToken(null);
    router.push("/");
    router.refresh();
  }, [router]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(user && token),
      isReady,
      login,
      logout,
    }),
    [user, token, isReady, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider.");
  }
  return context;
}
