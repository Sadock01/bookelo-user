import Link from "next/link";

import { CatalogTopBar } from "@/features/catalog/components/catalog-top-bar";
import { BookCoverImage } from "@/features/catalog/components/book-cover-image";
import { LANDING_SHELL } from "@/features/landing/constants/landing-layout";
import {
  BookDetailAccessZone,
  BookDetailSignupPromo,
} from "@/features/book-detail/components/book-detail-access-zone";
import { BookDetailTabs } from "@/features/book-detail/components/book-detail-tabs";
import { RelatedBooksRail } from "@/features/book-detail/components/related-books-rail";
import { resolveBookCover } from "@/features/catalog/utils/book-display";
import { formatCompactCount, formatLevelLabel } from "@/features/catalog/utils/format-stats";
import { getBookViews } from "@/lib/api/books";
import type { Book, BookAccessState, Review } from "@/lib/api/types";

type BookDetailViewProps = {
  readonly book: Book;
  readonly access: BookAccessState | null;
  readonly reviews: readonly Review[];
  readonly related: readonly Book[];
};

function buildTags(book: Book): readonly string[] {
  const tags: string[] = [];
  if (book.category?.name) tags.push(book.category.name);
  if (book.level) tags.push(formatLevelLabel(book.level));
  if (book.language) tags.push(book.language);
  if (book.format) tags.push(book.format);
  return tags;
}

export function BookDetailView({
  book,
  access,
  reviews,
  related,
}: BookDetailViewProps) {
  const cover = resolveBookCover(book, 0);
  const views = getBookViews(book);
  const likes = book.likesCount ?? 0;
  const previewPages = access?.previewPageCount ?? book.previewPageCount ?? 5;
  const canPreview = access?.canPreview ?? book.hasPreview ?? false;
  const tags = buildTags(book);

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#111827]">
      <CatalogTopBar />

      <main className={`${LANDING_SHELL} py-8 md:py-12`}>
        <div className="flex flex-col gap-8 md:flex-row md:gap-10 lg:gap-14">
          <div className="mx-auto w-full max-w-[220px] shrink-0 md:mx-0 md:max-w-[260px]">
            <div className="relative aspect-[2/3] overflow-hidden rounded-lg border border-[#e5e7eb] bg-white shadow-xl shadow-[#169283]/10">
              <BookCoverImage src={cover} alt={book.title} priority sizes="260px" />
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <h1 className="font-[var(--font-poppins)] text-3xl font-bold uppercase tracking-tight text-[#111827] md:text-4xl lg:text-[2.5rem] lg:leading-tight">
              {book.title}
            </h1>

            {book.author ? (
              <Link
                href="/search"
                className="mt-3 inline-flex items-center gap-2 text-[#374151] transition hover:text-[#169283]"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#96f1e7]/50 text-sm font-bold text-[#169283]">
                  {book.author.charAt(0).toUpperCase()}
                </span>
                <span className="text-base font-medium">{book.author}</span>
              </Link>
            ) : null}

            <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-[#6b7280]">
              <span className="inline-flex items-center gap-1.5" title="Vues">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span className="font-semibold text-[#111827]">{formatCompactCount(views)}</span>
              </span>
              <span className="inline-flex items-center gap-1.5" title="J'aime">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                <span className="font-semibold text-[#111827]">{formatCompactCount(likes)}</span>
              </span>
              <span className="inline-flex items-center gap-1.5" title="Extrait">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span className="font-semibold text-[#111827]">
                  {previewPages} p. gratuite{previewPages > 1 ? "s" : ""}
                </span>
              </span>
            </div>

            <BookDetailAccessZone book={book} initialAccess={access} />

            {tags.length > 0 ? (
              <div className="mt-8 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-[#f3f4f6] px-2.5 py-1 text-xs font-medium text-[#4b5563]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <BookDetailTabs
          description={book.description}
          reviews={reviews}
          previewPageCount={previewPages}
          canPreview={canPreview}
        />

        <BookDetailSignupPromo />

        <RelatedBooksRail books={related} />
      </main>
    </div>
  );
}
