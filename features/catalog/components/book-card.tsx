import Link from "next/link";

import { BookCoverImage } from "@/features/catalog/components/book-cover-image";
import { bookDetailHref, resolveBookCover } from "@/features/catalog/utils/book-display";
import type { Book } from "@/lib/api/types";

type BookCardProps = {
  readonly book: Book;
  readonly index?: number;
  readonly className?: string;
};

export function BookCard({ book, index = 0, className = "" }: BookCardProps) {
  const cover = resolveBookCover(book, index);
  const author = book.author ? ` — ${book.author}` : "";

  return (
    <article
      className={`group overflow-hidden rounded-2xl border border-[#fdeee5] bg-white shadow-lg shadow-orange-950/5 transition hover:-translate-y-1 hover:shadow-xl ${className}`}
    >
      <Link href={bookDetailHref(book.id)} className="block">
        <div className="relative aspect-[3/4] overflow-hidden">
          <BookCoverImage src={cover} alt={book.title} />
        </div>
        <div className="p-3.5">
          <h3 className="line-clamp-3 text-sm font-semibold leading-snug text-[#111827]">
            {book.title}
            {author}
          </h3>
          {book.price !== undefined ? (
            <p className="mt-1 text-sm font-medium text-[#169283]">
              {book.price.toLocaleString("fr-FR")} FCFA
            </p>
          ) : null}
        </div>
      </Link>
    </article>
  );
}
