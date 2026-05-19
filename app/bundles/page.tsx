import Link from "next/link";

import { CatalogPageShell } from "@/features/catalog/components/catalog-page-shell";
import { getBundles } from "@/lib/api/bundles";
import { hasApiBaseUrl } from "@/lib/api/config";

export default async function BundlesPage() {
  if (!hasApiBaseUrl()) {
    return (
      <CatalogPageShell title="Packs de livres">
        <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-900">
          Configurez NEXT_PUBLIC_API_URL pour afficher les packs.
        </p>
      </CatalogPageShell>
    );
  }

  let bundles: Awaited<ReturnType<typeof getBundles>> = [];
  let errorMessage: string | null = null;

  try {
    bundles = await getBundles();
  } catch {
    errorMessage = "Impossible de charger les packs.";
  }

  return (
    <CatalogPageShell
      title="Packs de livres"
      description="Économisez en achetant plusieurs livres regroupés."
    >
      {errorMessage ? (
        <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-900">
          {errorMessage}
        </p>
      ) : null}

      {!errorMessage && bundles.length === 0 ? (
        <p className="text-[#6b7280]">Aucun pack disponible pour le moment.</p>
      ) : null}

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {bundles.map((bundle) => (
          <li key={bundle.id}>
            <Link
              href={`/bundles/${encodeURIComponent(bundle.id)}`}
              className="block rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-sm transition hover:border-[#1ec9b6] hover:shadow-md"
            >
              <h2 className="text-lg font-semibold text-[#111827]">{bundle.name}</h2>
              {bundle.description ? (
                <p className="mt-2 line-clamp-3 text-sm text-[#4b5563]">{bundle.description}</p>
              ) : null}
              {bundle.price !== undefined ? (
                <p className="mt-3 font-semibold text-[#169283]">
                  {bundle.price.toLocaleString("fr-FR")} FCFA
                </p>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </CatalogPageShell>
  );
}
