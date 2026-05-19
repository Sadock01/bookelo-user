import type { Book, Category } from "@/lib/api/types";
import { getBookCoverUrl } from "@/lib/api/books";

import { bookDetailHref, categoryHref, resolveBookCover } from "@/features/catalog/utils/book-display";
import type { LandingCategoryTag, LandingStoryCover } from "@/features/landing/types/landing-page.types";

export function mapBookToLandingStory(book: Book, index: number): LandingStoryCover {
  const remote = getBookCoverUrl(book);
  return {
    id: book.id,
    title: book.title,
    image: remote ?? resolveBookCover(book, index),
    href: bookDetailHref(book.id),
  };
}

export function mapBooksToLandingStories(books: readonly Book[]): readonly LandingStoryCover[] {
  return books.map((book, index) => mapBookToLandingStory(book, index));
}

export function mapCategoryToLandingTag(category: Category): LandingCategoryTag {
  return {
    id: category.id,
    label: category.name,
    slug: category.slug,
  };
}

export { categoryHref, bookDetailHref };
