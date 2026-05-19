import Link from "next/link";

import { CatalogPageShell } from "@/features/catalog/components/catalog-page-shell";
import { BookGrid } from "@/features/catalog/components/book-grid";
import { getBooks, getLatestBooks, getMostReadBooks } from "@/lib/api/books";
import { hasApiBaseUrl } from "@/lib/api/config";

type BooksPageProps = {
  readonly searchParams: Promise<{
    readonly category?: string;
    readonly language?: string;
    readonly page?: string;
  }>;
};

export default async function BooksPage({ searchParams }: BooksPageProps) {
  const params = await searchParams;
  const page = Number(params.page) > 0 ? Number(params.page) : 1;

  let books: Awaited<ReturnType<typeof getBooks>>["data"] = [];
  let latest: Awaited<ReturnType<typeof getLatestBooks>> = [];
  let mostRead: Awaited<ReturnType<typeof getMostReadBooks>> = [];
  let errorMessage: string | null = null;

  if (!hasApiBaseUrl()) {
    errorMessage = "Configurez NEXT_PUBLIC_API_URL pour afficher le catalogue.";
  } else {
    try {
      const [list, latestBooks, popular] = await Promise.all([
        getBooks({
          category: params.category,
          language: params.language,
          page,
          limit: 24,
          sort: "createdAt",
          order: "desc",
        }),
        getLatestBooks(params.language),
        getMostReadBooks(8),
      ]);
      books = list.data;
      latest = latestBooks;
      mostRead = popular;
    } catch {
      errorMessage = "Impossible de charger le catalogue.";
    }
  }

  return (
    <CatalogPageShell
      title="Catalogue"
      description="Parcourez tous les parcours et livres disponibles sur Bookelo."
    >
      {errorMessage ? (
        <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-900">
          {errorMessage}
        </p>
      ) : (
        <>
          {mostRead.length > 0 ? (
            <section className="mb-12">
              <h2 className="mb-4 text-xl font-semibold">Les plus consultés</h2>
              <BookGrid books={mostRead} />
            </section>
          ) : null}

          {latest.length > 0 ? (
            <section className="mb-12">
              <h2 className="mb-4 text-xl font-semibold">Derniers ajouts</h2>
              <BookGrid books={latest} />
            </section>
          ) : null}

          <section>
            <h2 className="mb-4 text-xl font-semibold">Tous les livres</h2>
            <BookGrid books={books} />
            {books.length > 0 ? (
              <p className="mt-6 text-center text-sm text-[#6b7280]">
                Page {page}
                {params.category ? ` · catégorie ${params.category}` : ""}
                {params.language ? ` · langue ${params.language}` : ""}
              </p>
            ) : null}
          </section>
        </>
      )}

      <p className="mt-8 text-center">
        <Link href="/search" className="text-sm font-semibold text-[#169283] hover:underline">
          Recherche avancée →
        </Link>
      </p>
    </CatalogPageShell>
  );
}
