"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { useAuth } from "@/features/auth/context/auth-provider";
import { consumeLoginToastPending } from "@/lib/auth/session";

const AUTO_DISMISS_MS = 8000;

export function AuthToast() {
  const { user, isAuthenticated, isReady } = useAuth();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isReady || !isAuthenticated || !user) return;
    if (consumeLoginToastPending()) {
      setVisible(true);
    }
  }, [isReady, isAuthenticated, user]);

  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(() => setVisible(false), AUTO_DISMISS_MS);
    return () => window.clearTimeout(timer);
  }, [visible]);

  if (!visible || !user) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 top-4 z-[100] flex justify-center px-4"
    >
      <div className="pointer-events-auto flex w-full max-w-md items-start gap-3 rounded-2xl border border-[#96f1e7] bg-white p-4 shadow-[0_12px_40px_-8px_rgba(22,146,131,0.35)]">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#169283] text-lg text-white">
          ✓
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-[#111827]">Vous êtes connecté</p>
          <p className="mt-0.5 text-sm text-[#4b5563]">
            Bonjour <span className="font-semibold text-[#169283]">{user.name}</span> — votre session
            est active sur Bookelo.
          </p>
          <Link
            href="/account"
            className="mt-2 inline-block text-sm font-semibold text-[#169283] hover:underline"
            onClick={() => setVisible(false)}
          >
            Voir mon compte →
          </Link>
        </div>
        <button
          type="button"
          onClick={() => setVisible(false)}
          className="shrink-0 rounded-lg p-1 text-[#9ca3af] transition hover:bg-[#f3f4f6] hover:text-[#111827]"
          aria-label="Fermer la notification"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
