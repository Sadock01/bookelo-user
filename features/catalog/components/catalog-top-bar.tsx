import Link from "next/link";
import type { ReactNode } from "react";

import { AuthNav } from "@/features/auth/components/auth-nav";
import { LANDING_SHELL } from "@/features/landing/constants/landing-layout";
import { SearchCombobox } from "@/features/search/components/search-combobox";

type CatalogTopBarProps = {
  readonly searchDefaultValue?: string;
  readonly trailing?: ReactNode;
};

export function CatalogTopBar({ searchDefaultValue = "", trailing }: CatalogTopBarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-[#e5e7eb] bg-white/95 shadow-sm backdrop-blur-md">
      <div className={`${LANDING_SHELL} flex flex-col gap-3 py-3.5 md:flex-row md:items-center md:gap-6`}>
        <Link
          href="/"
          className="shrink-0 font-[var(--font-poppins)] text-xl font-bold tracking-tight text-[#169283]"
        >
          Bookelo
        </Link>
        <div className="min-w-0 flex-1 md:max-w-xl lg:max-w-2xl">
          <SearchCombobox
            placeholder="Security+, Python, Cisco…"
            ariaLabel="Rechercher un livre"
            defaultValue={searchDefaultValue}
            variant="header"
          />
        </div>
        <nav className="flex shrink-0 items-center gap-4 text-sm font-semibold text-[#374151]">
          <Link href="/books" className="transition hover:text-[#169283]">
            Catalogue
          </Link>
          {trailing ?? <AuthNav />}
        </nav>
      </div>
    </header>
  );
}
