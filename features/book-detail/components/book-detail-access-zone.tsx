"use client";

import Link from "next/link";

import { useAuth } from "@/features/auth/context/auth-provider";
import { useBookAccess } from "@/features/auth/hooks/use-book-access";
import type { Book, BookAccessState } from "@/lib/api/types";

type BookDetailAccessZoneProps = {
  readonly book: Book;
  readonly initialAccess: BookAccessState | null;
};

export function BookDetailAccessZone({ book, initialAccess }: BookDetailAccessZoneProps) {
  const { isAuthenticated, user, isReady } = useAuth();
  const { access, isLoading } = useBookAccess(book.id, initialAccess);

  const previewPages = access?.previewPageCount ?? book.previewPageCount ?? 5;
  const canPreview = access?.canPreview ?? book.hasPreview ?? false;
  const readHref = `/books/${encodeURIComponent(book.id)}/read`;
  const hasPurchased = access?.hasPurchased ?? false;
  const canReadFull = access?.canReadFull ?? false;

  return (
    <>
      {isReady && isAuthenticated && user ? (
        <div className="mt-6 rounded-xl border border-[#96f1e7]/70 bg-[#f0fdf9] px-4 py-3 text-sm">
          <p className="font-semibold text-[#169283]">
            Connecté en tant que {user.name}
            {isLoading ? " — mise à jour des droits…" : null}
          </p>
          <BookAccessStatus
            canPreview={canPreview}
            previewPages={previewPages}
            hasPurchased={hasPurchased}
            canReadFull={canReadFull}
          />
        </div>
      ) : null}

      <div className="mt-7 flex flex-wrap items-center gap-3">
        {canReadFull ? (
          <span className="inline-flex items-center justify-center rounded-full bg-[#169283] px-8 py-3.5 text-sm font-bold text-white opacity-90">
            Lecture complète — bientôt en ligne
          </span>
        ) : canPreview ? (
          <Link
            href={readHref}
            className="inline-flex items-center justify-center rounded-full bg-[#111827] px-8 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-black"
          >
            {isAuthenticated ? "Lire l'extrait gratuit" : "Commencer la lecture"}
          </Link>
        ) : (
          <span className="inline-flex cursor-not-allowed items-center justify-center rounded-full bg-[#d1d5db] px-8 py-3.5 text-sm font-bold text-[#6b7280]">
            Extrait indisponible
          </span>
        )}

        {!hasPurchased && book.price !== undefined ? (
          <Link
            href={isAuthenticated ? readHref : "/login"}
            className="inline-flex items-center justify-center rounded-full border-2 border-[#169283] px-6 py-3 text-sm font-bold text-[#169283] transition hover:bg-[#f0fdf9]"
          >
            {isAuthenticated ? `Acheter — ${formatPrice(book.price)}` : "Se connecter pour acheter"}
          </Link>
        ) : null}

        {hasPurchased ? (
          <span className="rounded-full bg-[#111827]/10 px-4 py-2 text-sm font-semibold text-[#111827]">
            ✓ Déjà dans votre bibliothèque
          </span>
        ) : null}

        {book.price !== undefined && !hasPurchased ? (
          <span className="ml-1 text-lg font-bold text-[#169283]">{formatPrice(book.price)}</span>
        ) : null}
      </div>
    </>
  );
}

function formatPrice(price: number): string {
  return `${price.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} €`;
}

function BookAccessStatus({
  canPreview,
  previewPages,
  hasPurchased,
  canReadFull,
}: {
  readonly canPreview: boolean;
  readonly previewPages: number;
  readonly hasPurchased: boolean;
  readonly canReadFull: boolean;
}) {
  if (canReadFull) {
    return (
      <p className="mt-1 text-[#374151]">
        Vous avez accès à la lecture complète de ce titre.
      </p>
    );
  }
  if (hasPurchased) {
    return (
      <p className="mt-1 text-[#374151]">
        Vous avez acheté ce livre. La lecture intégrale sera disponible dès l’ouverture du flux
        PDF.
      </p>
    );
  }
  if (canPreview) {
    return (
      <p className="mt-1 text-[#374151]">
        Extrait gratuit : {previewPages} page{previewPages > 1 ? "s" : ""} disponible
        {previewPages > 1 ? "s" : ""}.
      </p>
    );
  }
  return (
    <p className="mt-1 text-[#374151]">
      Aucun extrait PDF n’est publié pour ce livre pour le moment (fichier sample manquant côté
      éditeur).
    </p>
  );
}

export function BookDetailSignupPromo() {
  const { isAuthenticated, isReady } = useAuth();

  if (!isReady || isAuthenticated) {
    return null;
  }

  return (
    <div className="mt-12 overflow-hidden rounded-2xl border border-[#96f1e7]/40 bg-gradient-to-r from-[#f0fdf9] via-[#faf8f5] to-[#fff7f1] p-8 md:p-10">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-[#169283]">Bookelo</p>
          <h3 className="mt-2 max-w-lg text-xl font-bold text-[#111827] md:text-2xl">
            Connectez-vous pour suivre vos droits sur chaque livre et préparer vos certifications.
          </h3>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <Link
            href="/login"
            className="rounded-full border border-[#169283] px-6 py-3 text-sm font-bold text-[#169283] hover:bg-white"
          >
            Se connecter
          </Link>
          <Link
            href="/register"
            className="rounded-full bg-[#169283] px-8 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#0f6b5e]"
          >
            Créer un compte
          </Link>
        </div>
      </div>
    </div>
  );
}
