import { notFound } from "next/navigation";

import { CatalogPageShell } from "@/features/catalog/components/catalog-page-shell";
import { BookGrid } from "@/features/catalog/components/book-grid";
import { getCategoryBySlug } from "@/lib/api/categories";
import { hasApiBaseUrl } from "@/lib/api/config";

type CategoryPageProps = {
  readonly params: Promise<{ readonly slug: string }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  if (!hasApiBaseUrl()) {
    return (
      <CatalogPageShell title="Catégorie">
        <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-900">
          Configurez NEXT_PUBLIC_API_URL pour afficher cette catégorie.
        </p>
      </CatalogPageShell>
    );
  }

  let category: Awaited<ReturnType<typeof getCategoryBySlug>>;
  try {
    category = await getCategoryBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <CatalogPageShell
      title={category.name}
      description={category.description ?? `Livres de la catégorie ${category.name}.`}
    >
      <BookGrid books={category.books ?? []} emptyMessage="Aucun livre dans cette catégorie pour le moment." />
    </CatalogPageShell>
  );
}
