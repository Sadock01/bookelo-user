import { notFound } from "next/navigation";

import { BookDetailView } from "@/features/book-detail/components/book-detail-view";
import { getBookAccess, getBookById, getBookReviews, getRelatedBooks } from "@/lib/api/books";
import { hasApiBaseUrl } from "@/lib/api/config";

type BookDetailPageProps = {
  readonly params: Promise<{ readonly id: string }>;
};

export default async function BookDetailPage({ params }: BookDetailPageProps) {
  const { id } = await params;

  if (!hasApiBaseUrl()) {
    notFound();
  }

  let book: Awaited<ReturnType<typeof getBookById>>;
  try {
    book = await getBookById(id);
  } catch {
    notFound();
  }

  const [access, reviews, related] = await Promise.all([
    getBookAccess(id).catch(() => null),
    getBookReviews(id).catch(() => [] as const),
    getRelatedBooks(id, 8).catch(() => [] as const),
  ]);

  return (
    <BookDetailView
      book={book}
      access={access}
      reviews={reviews}
      related={related}
    />
  );
}
