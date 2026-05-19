import Link from "next/link";

import { LANDING_SHELL } from "@/features/landing/constants/landing-layout";
import { AuthNav } from "@/features/auth/components/auth-nav";
import { SearchAuthAside } from "@/features/search/components/search-auth-aside";
import { SearchCombobox } from "@/features/search/components/search-combobox";
import { SearchResultRow } from "@/features/search/components/search-result-row";
import type { Book } from "@/lib/api/types";

type SearchTab = "books" | "categories";

type SearchResultsPageProps = {
  readonly query: string;
  readonly books: readonly Book[];
  readonly total?: number;
  readonly errorMessage?: string | null;
  readonly infoMessage?: string | null;
  readonly activeTab?: SearchTab;
};

function SearchPromoAside() {
  return (
    <aside className="hidden xl:block">
      <div className="sticky top-24 overflow-hidden rounded-2xl bg-gradient-to-br from-[#169283] via-[#1ec9b6] to-[#96f1e7] p-6 text-white shadow-lg">
        <p className="text-xs font-semibold uppercase tracking-wider opacity-90">Bookelo</p>
        <h3 className="mt-2 text-xl font-bold leading-tight">
          Préparez vos certifications IT avec des contenus structurés.
        </h3>
        <Link
          href="/books"
          className="mt-5 inline-flex rounded-full bg-white px-5 py-2 text-sm font-bold text-[#169283] transition hover:bg-[#f0fdf9]"
        >
          Explorer le catalogue
        </Link>
      </div>
    </aside>
  );
}

export function SearchResultsPage({
  query,
  books,
  total,
  errorMessage,
  infoMessage,
  activeTab = "books",
}: SearchResultsPageProps) {
  const booksTabClass =
    activeTab === "books"
      ? "border-[#169283] font-semibold text-[#111827]"
      : "border-transparent text-[#6b7280] hover:text-[#111827]";
  const categoriesTabClass =
    activeTab === "categories"
      ? "border-[#169283] font-semibold text-[#111827]"
      : "border-transparent text-[#6b7280] hover:text-[#111827]";

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#111827]">
      <header className="sticky top-0 z-40 border-b border-[#e5e7eb] bg-white shadow-sm">
        <div className={`${LANDING_SHELL} flex flex-col gap-4 py-4 md:flex-row md:items-center md:gap-6`}>
          <Link href="/" className="shrink-0 text-xl font-bold text-[#169283]">
            Bookelo
          </Link>
          <div className="min-w-0 flex-1 md:max-w-2xl">
            <SearchCombobox
              placeholder="Security+, Python, Cisco…"
              ariaLabel="Rechercher un livre"
              defaultValue={query}
              variant="page"
            />
          </div>
          <nav className="flex shrink-0 items-center gap-4 text-sm font-medium">
            <Link href="/books" className="text-[#374151] hover:text-[#169283]">
              Catalogue
            </Link>
            <AuthNav />
          </nav>
        </div>
      </header>

      <div className={`${LANDING_SHELL} py-6`}>
        <nav className="flex gap-8 border-b border-[#e5e7eb]" aria-label="Type de résultats">
          <Link
            href={query ? `/search?q=${encodeURIComponent(query)}` : "/search"}
            className={`border-b-2 pb-3 text-sm ${booksTabClass}`}
          >
            Livres
          </Link>
          <Link
            href="/books"
            className={`border-b-2 pb-3 text-sm ${categoriesTabClass}`}
          >
            Catalogue
          </Link>
        </nav>

        {query ? (
          <p className="mt-4 text-sm text-[#6b7280]">
            {total !== undefined ? (
              <>
                <span className="font-semibold text-[#111827]">{total}</span> résultat
                {total > 1 ? "s" : ""} pour « {query} »
              </>
            ) : (
              <>Résultats pour « {query} »</>
            )}
          </p>
        ) : null}

        <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,220px)_minmax(0,1fr)_minmax(0,240px)] lg:gap-10">
          <SearchAuthAside />

          <section className="min-w-0">
            {errorMessage ? (
              <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-900">
                {errorMessage}
              </p>
            ) : null}

            {infoMessage && !errorMessage ? (
              <p className="mb-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-950">
                {infoMessage}
              </p>
            ) : null}

            {!errorMessage && query && books.length > 0 ? (
              <div className="rounded-2xl border border-[#e5e7eb] bg-white px-4 sm:px-6">
                {books.map((book, index) => (
                  <SearchResultRow key={book.id} book={book} index={index} />
                ))}
              </div>
            ) : null}

            {!errorMessage && query && books.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-[#d1d5db] bg-white px-6 py-12 text-center text-[#6b7280]">
                Aucun livre trouvé. Essayez un autre mot-clé.
              </p>
            ) : null}

            {!query ? (
              <p className="text-[#6b7280]">Tapez dans la barre de recherche pour commencer.</p>
            ) : null}
          </section>

          <SearchPromoAside />
        </div>
      </div>
    </div>
  );
}
