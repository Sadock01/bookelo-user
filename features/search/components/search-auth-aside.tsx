"use client";

import Link from "next/link";

import { useAuth } from "@/features/auth/context/auth-provider";

export function SearchAuthAside() {
  const { user, isAuthenticated, isReady } = useAuth();

  if (!isReady) {
    return (
      <aside className="hidden rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-sm lg:block">
        <div className="h-24 animate-pulse rounded-lg bg-[#f3f4f6]" />
      </aside>
    );
  }

  if (isAuthenticated && user) {
    return (
      <aside className="hidden rounded-2xl border border-[#96f1e7]/60 bg-[#f0fdf9] p-6 shadow-sm lg:block">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#169283]">Connecté</p>
        <h2 className="mt-2 text-lg font-bold leading-snug text-[#111827]">Bonjour, {user.name}</h2>
        <p className="mt-2 text-sm text-[#6b7280]">
          Votre session est active. Vos droits sur chaque livre sont visibles sur la fiche détail.
        </p>
        <Link
          href="/account"
          className="mt-5 flex w-full items-center justify-center rounded-full bg-[#169283] py-2.5 text-sm font-semibold text-white transition hover:bg-[#0f6b5e]"
        >
          Mon compte
        </Link>
      </aside>
    );
  }

  return (
    <aside className="hidden rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-sm lg:block">
      <h2 className="text-lg font-bold leading-snug text-[#111827]">
        Rejoignez Bookelo pour sauvegarder vos parcours et accéder aux certifications.
      </h2>
      <div className="mt-5 space-y-3">
        <Link
          href="/register"
          className="flex w-full items-center justify-center rounded-full border border-[#e5e7eb] bg-white py-2.5 text-sm font-semibold text-[#374151] transition hover:bg-[#fafafa]"
        >
          S&apos;inscrire
        </Link>
        <Link
          href="/login"
          className="flex w-full items-center justify-center rounded-full bg-[#169283] py-2.5 text-sm font-semibold text-white transition hover:bg-[#0f6b5e]"
        >
          Se connecter
        </Link>
      </div>
    </aside>
  );
}
