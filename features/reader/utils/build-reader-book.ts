import { getBookCoverUrl, getBookViews } from "@/lib/api/books";
import { formatLevelLabel } from "@/features/catalog/utils/format-stats";
import { resolveBookCover } from "@/features/catalog/utils/book-display";
import type { ReaderBookData } from "@/features/reader/types";
import type { Book } from "@/lib/api/types";

export function buildReaderBook(
  book: Book,
  options: { readonly commentsCount?: number; readonly previewPageCount?: number },
): ReaderBookData {
  const tags: string[] = [];
  if (book.category?.name) tags.push(book.category.name);
  if (book.level) tags.push(formatLevelLabel(book.level));
  if (book.language) tags.push(book.language);

  return {
    id: book.id,
    title: book.title,
    author: book.author,
    description: book.description,
    cover: getBookCoverUrl(book) ?? resolveBookCover(book, 0),
    categoryName: book.category?.name,
    language: book.language,
    views: getBookViews(book),
    likes: book.likesCount ?? 0,
    commentsCount: options.commentsCount ?? 0,
    previewPageCount: options.previewPageCount ?? book.previewPageCount ?? 5,
    price: book.price,
    tags,
  };
}
