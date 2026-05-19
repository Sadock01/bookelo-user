import { getBooks } from "@/lib/api/books";
import { getApiConfigHint, hasApiBaseUrl } from "@/lib/api/config";
import { isApiError } from "@/lib/api/errors";
import { searchMockCatalog } from "@/lib/api/mock-catalog";
import { SearchResultsPage } from "@/features/search/components/search-results-page";

type SearchPageProps = {
  readonly searchParams: Promise<{ readonly q?: string; readonly page?: string }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q, page: pageParam } = await searchParams;
  const query = q?.trim() ?? "";
  const page = Number(pageParam) > 0 ? Number(pageParam) : 1;

  let books: Awaited<ReturnType<typeof getBooks>>["data"] = [];
  let total: number | undefined;
  let errorMessage: string | null = null;
  let infoMessage: string | null = null;

  if (!query) {
    // État initial : pas d'appel API.
  } else if (!hasApiBaseUrl()) {
    books = [...searchMockCatalog(query)];
    total = books.length;
    infoMessage =
      "Mode démo : configurez API_URL dans .env.local pour interroger le catalogue Bookelo en ligne.";
  } else {
    try {
      const result = await getBooks({ search: query, page, limit: 20 });
      books = result.data;
      total = result.pagination.total;
    } catch (error) {
      const detail = isApiError(error)
        ? ` (${error.status}${error.message ? ` — ${error.message}` : ""})`
        : "";
      errorMessage = `Impossible de joindre l'API${detail}. ${getApiConfigHint()}`;
    }
  }

  return (
    <SearchResultsPage
      query={query}
      books={books}
      total={total}
      errorMessage={errorMessage}
      infoMessage={infoMessage}
    />
  );
}
