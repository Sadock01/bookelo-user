import Image from "next/image";
import Link from "next/link";

import { AuthNav } from "@/features/auth/components/auth-nav";
import { SearchCombobox } from "@/features/search/components/search-combobox";
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

export function LandingHeader({ model }: LandingHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-[#e5e7eb] bg-white/95 shadow-sm backdrop-blur-md">
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
            <AuthNav
              variant="landing"
              loginLabel={model.loginLabel}
              signupLabel={model.signupLabel}
              className="shrink-0"
            />
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
          <SearchCombobox
            placeholder={model.searchPlaceholder}
            ariaLabel={model.searchAriaLabel}
          />
          <button
            type="button"
            className="w-full rounded-full bg-[#169283] py-2.5 text-sm font-semibold text-white shadow-sm"
          >
            {model.downloadAppLabel}
          </button>
        </div>
      </div>

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
            <SearchCombobox
              placeholder={model.searchPlaceholder}
              ariaLabel={model.searchAriaLabel}
            />
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              className="rounded-full bg-[#169283] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0f6b5e]"
            >
              {model.downloadAppLabel}
            </button>
            <AuthNav
              variant="landing"
              loginLabel={model.loginLabel}
              signupLabel={model.signupLabel}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
