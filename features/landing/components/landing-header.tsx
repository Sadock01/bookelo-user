import Image from "next/image";
import Link from "next/link";

import { LANDING_SHELL } from "@/features/landing/constants/landing-layout";
import type { LandingHeaderModel } from "@/features/landing/types/landing-page.types";

type LandingHeaderProps = {
  readonly model: LandingHeaderModel;
};

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchField({
  placeholder,
  ariaLabel,
}: {
  placeholder: string;
  ariaLabel: string;
}) {
  return (
    <label className="relative block w-full">
      <span className="sr-only">{ariaLabel}</span>
      <svg
        className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-5.2-5.2M11 18a7 7 0 100-14 7 7 0 000 14z"
        />
      </svg>
      <input
        type="search"
        placeholder={placeholder}
        className="w-full rounded-full border border-[#e5e7eb] bg-[#f9fafb] py-2.5 pl-10 pr-4 text-sm text-[#111827] shadow-inner outline-none transition placeholder:text-[#9ca3af] focus:border-[#1ec9b6] focus:bg-white focus:ring-2 focus:ring-[#96f1e7]/80"
      />
    </label>
  );
}

/**
 * App bar alignée sur les grandes plateformes de contenu : recherche centrale, CTA « Télécharger »,
 * authentification. Pas de menu « Écrire » (Bookelo = lecture & préparation certifiante).
 */
export function LandingHeader({ model }: LandingHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-[#e5e7eb] bg-white/95 shadow-sm backdrop-blur-md">
      {/* Mobile / tablette compacte */}
      <div className={`${LANDING_SHELL} py-3 md:hidden`}>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <Link href="/" className="flex min-w-0 items-center gap-2.5">
              <Image
                src={model.logo}
                alt={model.logoAlt}
                width={40}
                height={40}
                priority
                className="shrink-0 rounded-lg"
              />
              <span className="truncate font-[var(--font-poppins)] text-lg font-semibold text-[#111827]">
                {model.brandLabel}
              </span>
            </Link>
            <div className="flex shrink-0 items-center gap-2">
              <button type="button" className="text-sm font-semibold text-[#374151]">
                {model.loginLabel}
              </button>
              <button
                type="button"
                className="rounded-full border border-[#d1d5db] bg-white px-3 py-2 text-sm font-semibold text-[#111827]"
              >
                {model.signupLabel}
              </button>
            </div>
          </div>
          <nav className="flex flex-wrap gap-2 text-sm font-medium text-[#374151]" aria-label="Navigation">
            {model.navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="inline-flex items-center gap-1 rounded-full bg-[#f3f4f6] px-3 py-1.5"
              >
                {item.label}
                {item.hasDropdown ? <ChevronDown className="opacity-70" /> : null}
              </Link>
            ))}
          </nav>
          <SearchField placeholder={model.searchPlaceholder} ariaLabel={model.searchAriaLabel} />
          <button
            type="button"
            className="w-full rounded-full bg-[#169283] py-2.5 text-sm font-semibold text-white shadow-sm"
          >
            {model.downloadAppLabel}
          </button>
        </div>
      </div>

      {/* Desktop */}
      <div className={`${LANDING_SHELL} hidden py-3.5 md:block`}>
        <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-6 lg:gap-8">
          <div className="flex items-center gap-6 lg:gap-8">
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src={model.logo}
                alt={model.logoAlt}
                width={42}
                height={42}
                priority
                className="rounded-lg"
              />
              <span className="font-[var(--font-poppins)] text-xl font-semibold tracking-tight text-[#111827]">
                {model.brandLabel}
              </span>
            </Link>
            <nav className="flex items-center gap-1 text-sm font-medium text-[#374151]" aria-label="Navigation principale">
              {model.navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 transition hover:bg-[#96f1e7]/25 hover:text-[#169283]"
                >
                  {item.label}
                  {item.hasDropdown ? <ChevronDown className="opacity-70" /> : null}
                </Link>
              ))}
            </nav>
          </div>

          <div className="min-w-0 px-2">
            <SearchField placeholder={model.searchPlaceholder} ariaLabel={model.searchAriaLabel} />
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              className="rounded-full bg-[#169283] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0f6b5e]"
            >
              {model.downloadAppLabel}
            </button>
            <button type="button" className="text-sm font-semibold text-[#374151] hover:text-[#111827]">
              {model.loginLabel}
            </button>
            <button
              type="button"
              className="rounded-full border border-[#d1d5db] bg-white px-4 py-2 text-sm font-semibold text-[#111827] transition hover:border-[#1ec9b6] hover:text-[#169283]"
            >
              {model.signupLabel}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
