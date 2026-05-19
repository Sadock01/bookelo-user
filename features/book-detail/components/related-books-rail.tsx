import Link from "next/link";

import { BookCoverImage } from "@/features/catalog/components/book-cover-image";
import { bookDetailHref, resolveBookCover } from "@/features/catalog/utils/book-display";
import type { Book } from "@/lib/api/types";

type RelatedBooksRailProps = {
  readonly books: readonly Book[];
};

export function RelatedBooksRail({ books }: RelatedBooksRailProps) {
  if (books.length === 0) return null;

  return (
    <section className="mt-14 border-t border-[#f3f4f6] pt-12">
      <h2 className="text-xl font-bold text-[#111827]">Vous aimerez aussi</h2>
      <div className="mt-6 -mx-2 flex gap-4 overflow-x-auto px-2 pb-2 [scrollbar-width:thin]">
        {books.map((book, index) => {
          const cover = resolveBookCover(book, index);
          return (
            <Link
              key={book.id}
              href={bookDetailHref(book.id)}
              className="group w-[9.5rem] shrink-0 sm:w-[11rem]"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg border border-[#e5e7eb] bg-white shadow-md transition group-hover:-translate-y-0.5 group-hover:shadow-lg">
                <BookCoverImage src={cover} alt={book.title} sizes="176px" />
              </div>
              <p className="mt-2 line-clamp-2 text-sm font-semibold leading-snug text-[#111827] group-hover:text-[#169283]">
                {book.title}
              </p>
              {book.author ? (
                <p className="mt-0.5 line-clamp-1 text-xs text-[#6b7280]">{book.author}</p>
              ) : null}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
