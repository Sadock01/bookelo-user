"use client";

import { useCallback, useEffect, useState } from "react";

import { useAuth } from "@/features/auth/context/auth-provider";
import { fetchWithAuth } from "@/lib/auth/fetch-with-auth";
import type { BookAccessState } from "@/lib/api/types";

type UseBookAccessResult = {
  readonly access: BookAccessState | null;
  readonly isLoading: boolean;
  readonly error: string | null;
  readonly refresh: () => Promise<void>;
};

export function useBookAccess(
  bookId: string,
  initialAccess: BookAccessState | null = null,
): UseBookAccessResult {
  const { isReady, isAuthenticated } = useAuth();
  const [access, setAccess] = useState<BookAccessState | null>(initialAccess);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchWithAuth(`/api/books/${encodeURIComponent(bookId)}/access`);
      if (!response.ok) {
        setError("Impossible de charger vos droits sur ce livre.");
        return;
      }
      const json = (await response.json()) as BookAccessState;
      setAccess(json);
    } catch {
      setError("Connexion impossible.");
    } finally {
      setIsLoading(false);
    }
  }, [bookId]);

  useEffect(() => {
    if (!isReady) return;
    void refresh();
  }, [isReady, isAuthenticated, bookId, refresh]);

  return { access, isLoading, error, refresh };
}
