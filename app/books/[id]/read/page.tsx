import { notFound } from "next/navigation";

import { WattpadReader } from "@/features/reader/components/wattpad-reader";
import { buildReaderBook } from "@/features/reader/utils/build-reader-book";
import { getBookAccess, getBookById, getBookReviews } from "@/lib/api/books";
import { hasApiBaseUrl } from "@/lib/api/config";

type BookReadPageProps = {
  readonly params: Promise<{ readonly id: string }>;
};

export default async function BookReadPage({ params }: BookReadPageProps) {
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

  const [access, reviews] = await Promise.all([
    getBookAccess(id).catch(() => null),
    getBookReviews(id).catch(() => [] as const),
  ]);

  const readerBook = buildReaderBook(book, {
    commentsCount: reviews.length,
    previewPageCount: access?.previewPageCount ?? book.previewPageCount ?? 5,
  });

  return <WattpadReader book={readerBook} />;
}
