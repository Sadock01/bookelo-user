import Image from "next/image";
import Link from "next/link";
import type { StaticImageData } from "next/image";

import { AuthNav } from "@/features/auth/components/auth-nav";
import { bookDetailHref } from "@/features/catalog/utils/book-display";
import { SearchCombobox } from "@/features/search/components/search-combobox";

type ReaderTopBarProps = {
  readonly bookId: string;
  readonly title: string;
  readonly author?: string;
  readonly cover: string | StaticImageData;
};

export function ReaderTopBar({ bookId, title, author, cover }: ReaderTopBarProps) {
  const detailHref = bookDetailHref(bookId);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[#e5e7eb] bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6">
          <Link
            href="/"
            className="shrink-0 font-[var(--font-poppins)] text-lg font-bold text-[#169283]"
          >
            Bookelo
          </Link>
          <div className="hidden min-w-0 flex-1 md:block md:max-w-md lg:max-w-lg">
            <SearchCombobox placeholder="Rechercher…" ariaLabel="Rechercher" variant="header" />
          </div>
          <nav className="flex shrink-0 items-center gap-3 text-sm font-semibold">
            <Link href="/books" className="hidden text-[#374151] hover:text-[#169283] sm:inline">
              Catalogue
            </Link>
            <AuthNav />
          </nav>
        </div>
      </header>

      <div className="sticky top-[53px] z-40 border-b border-[#e5e7eb] bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2 sm:px-6">
          <Link
            href={detailHref}
            className="flex min-w-0 flex-1 items-center gap-3 transition hover:opacity-80"
          >
            <div className="relative h-12 w-9 shrink-0 overflow-hidden rounded border border-[#e5e7eb] shadow-sm">
              {typeof cover === "string" ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={cover} alt="" className="h-full w-full object-cover" />
              ) : (
                <Image src={cover} alt="" fill className="object-cover" sizes="36px" />
              )}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-[#111827]">{title}</p>
              {author ? (
                <p className="truncate text-xs text-[#6b7280]">par {author}</p>
              ) : null}
            </div>
            <svg
              className="h-4 w-4 shrink-0 text-[#9ca3af]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Link>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              className="hidden items-center gap-1.5 rounded-full border border-[#e5e7eb] px-3 py-1.5 text-xs font-bold text-[#374151] transition hover:border-[#169283] hover:text-[#169283] sm:inline-flex"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#169283] text-sm text-white">
                +
              </span>
              Liste
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#e5e7eb] px-3 py-1.5 text-xs font-bold text-[#374151] transition hover:border-[#169283]"
            >
              <svg className="h-4 w-4 text-[#169283]" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7-6.3-4.6L5.7 21l2.3-7-6-4.6h7.6z" />
              </svg>
              J&apos;aime
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
