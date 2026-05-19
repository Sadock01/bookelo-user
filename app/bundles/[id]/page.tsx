import Link from "next/link";
import { notFound } from "next/navigation";

import { BookGrid } from "@/features/catalog/components/book-grid";
import { CatalogPageShell } from "@/features/catalog/components/catalog-page-shell";
import { getBundleById } from "@/lib/api/bundles";
import { hasApiBaseUrl } from "@/lib/api/config";

type BundleDetailPageProps = {
  readonly params: Promise<{ readonly id: string }>;
};

export default async function BundleDetailPage({ params }: BundleDetailPageProps) {
  const { id } = await params;

  if (!hasApiBaseUrl()) {
    return (
      <CatalogPageShell title="Pack">
        <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-900">
          Configurez NEXT_PUBLIC_API_URL pour afficher ce pack.
        </p>
      </CatalogPageShell>
    );
  }

  let bundle: Awaited<ReturnType<typeof getBundleById>>;
  try {
    bundle = await getBundleById(id);
  } catch {
    notFound();
  }

  return (
    <CatalogPageShell title={bundle.name} description={bundle.description}>
      {bundle.price !== undefined ? (
        <p className="-mt-6 mb-8 text-2xl font-bold text-[#169283]">
          {bundle.price.toLocaleString("fr-FR")} FCFA
        </p>
      ) : null}

      {bundle.books && bundle.books.length > 0 ? (
        <BookGrid books={bundle.books} />
      ) : (
        <p className="text-[#6b7280]">Ce pack ne contient pas encore de livres listés.</p>
      )}

      <p className="mt-8">
        <Link href="/bundles" className="text-sm font-semibold text-[#169283] hover:underline">
          ← Tous les packs
        </Link>
      </p>
    </CatalogPageShell>
  );
}
