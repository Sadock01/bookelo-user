import Link from "next/link";
import type { ReactNode } from "react";

import { LANDING_SHELL } from "@/features/landing/constants/landing-layout";

type CatalogPageShellProps = {
  readonly title: string;
  readonly description?: string;
  readonly children: ReactNode;
};

export function CatalogPageShell({ title, description, children }: CatalogPageShellProps) {
  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#111827] antialiased">
      <header className="border-b border-[#e5e7eb] bg-white/95 py-4 shadow-sm backdrop-blur-md">
        <div className={`${LANDING_SHELL} flex flex-wrap items-center justify-between gap-4`}>
          <Link href="/" className="text-lg font-semibold text-[#169283] hover:text-[#0f6b5e]">
            ← Bookelo
          </Link>
          <nav className="flex flex-wrap gap-4 text-sm font-medium text-[#374151]">
            <Link href="/books" className="hover:text-[#169283]">
              Catalogue
            </Link>
            <Link href="/search" className="hover:text-[#169283]">
              Recherche
            </Link>
            <Link href="/bundles" className="hover:text-[#169283]">
              Packs
            </Link>
          </nav>
        </div>
      </header>
      <main className={`${LANDING_SHELL} py-10`}>
        <h1 className="font-[var(--font-poppins)] text-3xl font-bold tracking-tight md:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-3 max-w-2xl text-lg text-[#4b5563]">{description}</p>
        ) : null}
        <div className="mt-10">{children}</div>
      </main>
    </div>
  );
}
