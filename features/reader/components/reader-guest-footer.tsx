"use client";

import Link from "next/link";

import { useAuth } from "@/features/auth/context/auth-provider";

export function ReaderGuestFooter() {
  const { isAuthenticated, user, isReady } = useAuth();

  if (!isReady) return null;
  if (isAuthenticated && user) return null;

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#e5e7eb] bg-white/95 shadow-[0_-4px_24px_rgba(0,0,0,0.06)] backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-3 sm:flex-row sm:px-6">
        <p className="text-center text-sm font-medium text-[#374151] sm:text-left">
          <span className="font-bold text-[#111827]">Bookelo</span> — où les parcours certification
          prennent vie.{" "}
          <span className="text-[#6b7280]">Découvrez maintenant.</span>
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/login"
            className="rounded-full border border-[#e5e7eb] px-5 py-2 text-sm font-bold text-[#374151] transition hover:bg-[#fafafa]"
          >
            Se connecter
          </Link>
          <Link
            href="/register"
            className="rounded-full bg-[#169283] px-5 py-2 text-sm font-bold text-white transition hover:bg-[#0f6b5e]"
          >
            S&apos;inscrire
          </Link>
        </div>
      </div>
    </footer>
  );
}
