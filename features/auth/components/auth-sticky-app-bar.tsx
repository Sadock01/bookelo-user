"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { AuthNav } from "@/features/auth/components/auth-nav";
import { LANDING_SHELL } from "@/features/landing/constants/landing-layout";

type AuthStickyAppBarProps = {
  readonly leading?: ReactNode;
  readonly center?: ReactNode;
  readonly trailing?: ReactNode;
  readonly showDefaultNav?: boolean;
};

export function AuthStickyAppBar({
  leading,
  center,
  trailing,
  showDefaultNav = true,
}: AuthStickyAppBarProps) {
  const defaultLeading = (
    <Link
      href="/"
      className="shrink-0 font-[var(--font-poppins)] text-xl font-bold tracking-tight text-[#169283]"
    >
      Bookelo
    </Link>
  );

  const defaultTrailing = showDefaultNav ? (
    <>
      <Link
        href="/books"
        className="hidden text-[#374151] transition hover:text-[#169283] sm:inline"
      >
        Catalogue
      </Link>
      <AuthNav />
    </>
  ) : null;

  if (center) {
    return (
      <header className="sticky top-0 z-40 border-b border-[#e5e7eb] bg-white/95 shadow-sm backdrop-blur-md">
        <div
          className={`${LANDING_SHELL} grid min-h-[3.25rem] grid-cols-[1fr_auto_1fr] items-center gap-3 py-3`}
        >
          <div className="flex min-w-0 items-center justify-start">{leading ?? defaultLeading}</div>
          <div className="flex justify-center px-2">{center}</div>
          <nav className="flex min-w-0 items-center justify-end gap-3 text-sm font-semibold">
            {trailing ?? defaultTrailing}
          </nav>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-40 border-b border-[#e5e7eb] bg-white/95 shadow-sm backdrop-blur-md">
      <div
        className={`${LANDING_SHELL} flex min-h-[3.25rem] items-center justify-between gap-4 py-3`}
      >
        <div className="flex min-w-0 items-center">{leading ?? defaultLeading}</div>
        <nav className="flex shrink-0 items-center gap-3 text-sm font-semibold">
          {trailing ?? defaultTrailing}
        </nav>
      </div>
    </header>
  );
}
