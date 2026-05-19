import { publicApiRedirectUrl, publicApiRequest } from "@/lib/api/client";
import type {
  Book,
  BookAccessState,
  BooksListResponse,
  GetBooksParams,
  Review,
} from "@/lib/api/types";

function booksQuery(params: GetBooksParams): Record<string, string | number | undefined> {
  return {
    search: params.search,
    category: params.category,
    minPrice: params.minPrice,
    maxPrice: params.maxPrice,
    level: params.level,
    language: params.language,
    sort: params.sort,
    order: params.order,
    page: params.page,
    limit: params.limit,
  };
}

export async function getBooks(params: GetBooksParams = {}): Promise<BooksListResponse> {
  return publicApiRequest<BooksListResponse>("/books", {
    query: booksQuery(params),
    next: { revalidate: 60 },
  });
}

export async function getLatestBooks(language?: string): Promise<readonly Book[]> {
  return publicApiRequest<readonly Book[]>("/books/latest", {
    query: { language },
    next: { revalidate: 120 },
  });
}

export async function getMostReadBooks(limit?: number): Promise<readonly Book[]> {
  return publicApiRequest<readonly Book[]>("/books/most-read", {
    query: { limit },
    next: { revalidate: 120 },
  });
}

export async function getBookById(id: string): Promise<Book> {
  return publicApiRequest<Book>(`/books/${encodeURIComponent(id)}`, {
    next: { revalidate: 60 },
  });
}

export async function getRelatedBooks(
  id: string,
  limit?: number,
): Promise<readonly Book[]> {
  return publicApiRequest<readonly Book[]>(`/books/${encodeURIComponent(id)}/related`, {
    query: { limit },
    next: { revalidate: 120 },
  });
}

export async function getBookAccess(
  id: string,
  options: { readonly token?: string } = {},
): Promise<BookAccessState> {
  return publicApiRequest<BookAccessState>(`/books/${encodeURIComponent(id)}/access`, {
    token: options.token,
    next: { revalidate: 0 },
  });
}

export async function getBookPreviewUrl(id: string): Promise<string> {
  return publicApiRedirectUrl(`/books/${encodeURIComponent(id)}/preview`, {
    cache: "no-store",
  });
}

export async function getBookReviews(bookId: string): Promise<readonly Review[]> {
  return publicApiRequest<readonly Review[]>(
    `/books/${encodeURIComponent(bookId)}/reviews`,
    { next: { revalidate: 60 } },
  );
}

export function getBookCoverUrl(book: Book): string | undefined {
  return book.coverImageURL ?? book.coverImageUrl ?? book.coverUrl ?? book.imageUrl;
}

export function getBookViews(book: Book): number {
  return book.viewsCount ?? book.viewCount ?? 0;
}
