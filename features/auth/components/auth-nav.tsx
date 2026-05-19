"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { useAuth } from "@/features/auth/context/auth-provider";

type AuthNavProps = {
  readonly variant?: "default" | "landing";
  readonly loginLabel?: string;
  readonly signupLabel?: string;
  readonly className?: string;
};

function userInitial(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return "?";
  return trimmed.charAt(0).toUpperCase();
}

export function AuthNav({
  variant = "default",
  loginLabel = "Connexion",
  signupLabel = "S'inscrire",
  className = "",
}: AuthNavProps) {
  const { user, isAuthenticated, isReady, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    function onPointerDown(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [menuOpen]);

  if (!isReady) {
    return (
      <div className={`flex items-center gap-3 ${className}`} aria-hidden>
        <span className="h-9 w-16 animate-pulse rounded-full bg-[#e5e7eb]" />
        <span className="h-9 w-24 animate-pulse rounded-full bg-[#e5e7eb]" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    const loginClass =
      variant === "landing"
        ? "text-sm font-semibold text-[#374151] hover:text-[#111827]"
        : "transition hover:text-[#169283]";
    const signupClass =
      variant === "landing"
        ? "rounded-full border border-[#d1d5db] bg-white px-4 py-2 text-sm font-semibold text-[#111827] transition hover:border-[#1ec9b6] hover:text-[#169283]"
        : "rounded-full bg-[#169283] px-4 py-2 text-white transition hover:bg-[#0f6b5e]";

    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <Link href="/login" className={loginClass}>
          {loginLabel}
        </Link>
        <Link href="/register" className={signupClass}>
          {signupLabel}
        </Link>
      </div>
    );
  }

  return (
    <div className={`relative flex items-center gap-2 ${className}`} ref={menuRef}>
      <button
        type="button"
        onClick={() => setMenuOpen((open) => !open)}
        className="flex items-center gap-2 rounded-full border border-[#e5e7eb] bg-white py-1.5 pl-1.5 pr-3 text-sm font-semibold text-[#111827] shadow-sm transition hover:border-[#169283] hover:shadow-md"
        aria-expanded={menuOpen}
        aria-haspopup="menu"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#169283] text-sm font-bold text-white">
          {userInitial(user.name)}
        </span>
        <span className="max-w-[8rem] truncate">{user.name}</span>
        <svg className="h-4 w-4 text-[#9ca3af]" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      {menuOpen ? (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 min-w-[12rem] overflow-hidden rounded-xl border border-[#e5e7eb] bg-white py-1 shadow-lg"
        >
          <div className="border-b border-[#f3f4f6] px-4 py-3">
            <p className="truncate text-sm font-bold text-[#111827]">{user.name}</p>
            <p className="truncate text-xs text-[#6b7280]">{user.email}</p>
          </div>
          <Link
            href="/account"
            role="menuitem"
            className="block px-4 py-2.5 text-sm text-[#374151] hover:bg-[#f0fdf9] hover:text-[#169283]"
            onClick={() => setMenuOpen(false)}
          >
            Mon compte
          </Link>
          <Link
            href="/books"
            role="menuitem"
            className="block px-4 py-2.5 text-sm text-[#374151] hover:bg-[#f0fdf9] hover:text-[#169283]"
            onClick={() => setMenuOpen(false)}
          >
            Catalogue
          </Link>
          <button
            type="button"
            role="menuitem"
            className="block w-full px-4 py-2.5 text-left text-sm font-medium text-[#b91c1c] hover:bg-[#fef2f2]"
            onClick={() => {
              setMenuOpen(false);
              logout();
            }}
          >
            Se déconnecter
          </button>
        </div>
      ) : null}
    </div>
  );
}
