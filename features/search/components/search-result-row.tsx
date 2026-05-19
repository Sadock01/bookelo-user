import Link from "next/link";
import type { ReactNode } from "react";

import { BookCoverImage } from "@/features/catalog/components/book-cover-image";
import { bookDetailHref, resolveBookCover } from "@/features/catalog/utils/book-display";
import { formatCompactCount, formatLevelLabel } from "@/features/catalog/utils/format-stats";
import { getBookViews } from "@/lib/api/books";
import type { Book } from "@/lib/api/types";

type SearchResultRowProps = {
  readonly book: Book;
  readonly index?: number;
};

function StatItem({
  icon,
  label,
  value,
}: {
  readonly icon: ReactNode;
  readonly label: string;
  readonly value: string;
}) {
  return (
    <span className="inline-flex items-center gap-1 text-[#6b7280]" title={label}>
      {icon}
      <span className="text-xs font-medium">{value}</span>
    </span>
  );
}

export function SearchResultRow({ book, index = 0 }: SearchResultRowProps) {
  const cover = resolveBookCover(book, index);
  const views = getBookViews(book);
  const likes = book.likesCount ?? 0;
  const categoryName = book.category?.name;
  const levelLabel = formatLevelLabel(book.level);

  return (
    <article className="flex gap-4 border-b border-[#f3f4f6] py-5 last:border-b-0 sm:gap-5">
      <Link
        href={bookDetailHref(book.id)}
        className="relative h-[7.5rem] w-[5rem] shrink-0 overflow-hidden rounded-md border border-[#e5e7eb] bg-[#f9fafb] shadow-sm sm:h-[8.5rem] sm:w-[5.75rem]"
      >
        <BookCoverImage src={cover} alt={book.title} sizes="92px" />
      </Link>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-lg font-bold leading-snug text-[#111827] sm:text-xl">
            <Link href={bookDetailHref(book.id)} className="hover:text-[#169283]">
              {book.title}
            </Link>
          </h2>
          <span className="rounded-full bg-[#96f1e7]/45 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-[#169283]">
            {levelLabel}
          </span>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
          <StatItem
            label="Vues"
            value={formatCompactCount(views)}
            icon={
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            }
          />
          <StatItem
            label="J'aime"
            value={formatCompactCount(likes)}
            icon={
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            }
          />
          {book.language ? (
            <StatItem
              label="Langue"
              value={book.language}
              icon={
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              }
            />
          ) : null}
          {book.price !== undefined ? (
            <StatItem
              label="Prix"
              value={`${book.price.toLocaleString("fr-FR")} €`}
              icon={
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V6m0 12v-2" />
                </svg>
              }
            />
          ) : null}
        </div>

        {book.author || categoryName ? (
          <p className="mt-1 text-sm text-[#6b7280]">
            {book.author ? `par ${book.author}` : null}
            {book.author && categoryName ? " · " : null}
            {categoryName ?? null}
          </p>
        ) : null}

        {book.description ? (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#4b5563]">{book.description}</p>
        ) : null}
      </div>
    </article>
  );
}
