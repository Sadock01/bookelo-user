import { BookCard } from "@/features/catalog/components/book-card";
import type { Book } from "@/lib/api/types";

type BookGridProps = {
  readonly books: readonly Book[];
  readonly emptyMessage?: string;
};

export function BookGrid({
  books,
  emptyMessage = "Aucun livre trouvé pour le moment.",
}: BookGridProps) {
  if (books.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-[#d1d5db] bg-white px-6 py-12 text-center text-[#6b7280]">
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {books.map((book, index) => (
        <BookCard key={book.id} book={book} index={index} />
      ))}
    </div>
  );
}
