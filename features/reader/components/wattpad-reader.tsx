"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { useAuth } from "@/features/auth/context/auth-provider";
import { formatCompactCount } from "@/features/catalog/utils/format-stats";
import { fetchWithAuth } from "@/lib/auth/fetch-with-auth";
import { ReaderAuthorSidebar } from "@/features/reader/components/reader-author-sidebar";
import { ReaderGuestFooter } from "@/features/reader/components/reader-guest-footer";
import { ReaderPdfPanel } from "@/features/reader/components/reader-pdf-panel";
import { ReaderStoryBanner } from "@/features/reader/components/reader-story-banner";
import { ReaderTopBar } from "@/features/reader/components/reader-top-bar";
import type { ReaderBookData } from "@/features/reader/types";

type PreviewPayload = {
  readonly url?: string;
  readonly previewPageCount?: number;
  readonly error?: string;
};

type WattpadReaderProps = {
  readonly book: ReaderBookData;
};

export function WattpadReader({ book }: WattpadReaderProps) {
  const { isAuthenticated, user } = useAuth();
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [pages, setPages] = useState(book.previewPageCount);
  const [message, setMessage] = useState<string | null>(null);

  const detailHref = `/books/${encodeURIComponent(book.id)}`;

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setState("loading");
      try {
        const response = await fetchWithAuth(`/api/books/${encodeURIComponent(book.id)}/preview`);
        const json = (await response.json()) as PreviewPayload;
        if (cancelled) return;

        if (response.ok && json.url) {
          setPreviewUrl(json.url);
          setPages(json.previewPageCount ?? book.previewPageCount);
          setState("ready");
          return;
        }

        setMessage(
          json.error ??
            "L'extrait PDF n'est pas encore disponible. Les premières pages seront bientôt en ligne.",
        );
        setState("error");
      } catch {
        if (!cancelled) {
          setMessage("Connexion impossible. Réessayez.");
          setState("error");
        }
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [book.id, book.previewPageCount]);

  return (
    <div className="min-h-screen bg-white pb-24 text-[#111827]">
      <ReaderTopBar
        bookId={book.id}
        title={book.title}
        author={book.author}
        cover={book.cover}
      />

      <ReaderStoryBanner
        title={book.title}
        description={book.description}
        cover={book.cover}
        categoryName={book.categoryName}
        tags={book.tags}
      />

      <div className="mx-auto flex max-w-6xl gap-10 px-4 py-10 sm:px-6">
        <ReaderAuthorSidebar author={book.author} bookId={book.id} />

        <article className="min-w-0 flex-1">
          <header className="mb-8 text-center">
            <h2 className="font-serif text-3xl font-medium tracking-tight text-[#111827] sm:text-4xl">
              Extrait gratuit
            </h2>
            <p className="mt-1 text-sm text-[#6b7280]">
              {pages} page{pages > 1 ? "s" : ""} offerte{pages > 1 ? "s" : ""} sur Bookelo
              {isAuthenticated && user ? (
                <span className="mt-1 block font-medium text-[#169283]">
                  Lecture en tant que {user.name}
                </span>
              ) : null}
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-5 text-sm text-[#6b7280]">
              <Stat icon="eye" value={formatCompactCount(book.views)} label="vues" />
              <Stat icon="star" value={formatCompactCount(book.likes)} label="j'aime" />
              <Stat icon="chat" value={formatCompactCount(book.commentsCount)} label="avis" />
            </div>
          </header>

          {state === "loading" ? (
            <div className="flex min-h-[40vh] flex-col items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#169283] border-t-transparent" />
              <p className="mt-4 text-sm text-[#6b7280]">Chargement de l&apos;extrait…</p>
            </div>
          ) : null}

          {state === "ready" && previewUrl ? (
            <>
              <ReaderPdfPanel title={book.title} previewUrl={previewUrl} />

              <div className="mx-auto mt-12 max-w-lg rounded-2xl border border-[#96f1e7]/50 bg-gradient-to-br from-[#f0fdf9] to-white p-6 text-center shadow-sm">
                <p className="text-sm font-semibold text-[#169283]">Fin de l&apos;extrait gratuit</p>
                <p className="mt-2 text-sm leading-relaxed text-[#4b5563]">
                  Vous avez lu les {pages} premières pages.
                  {isAuthenticated
                    ? " Achetez le livre pour continuer la lecture complète."
                    : " Inscrivez-vous ou achetez le livre pour continuer la lecture complète."}
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-3">
                  {isAuthenticated ? (
                    <Link
                      href="/account"
                      className="rounded-full bg-[#111827] px-6 py-2.5 text-sm font-bold text-white hover:bg-black"
                    >
                      Mon compte
                    </Link>
                  ) : (
                    <Link
                      href="/register"
                      className="rounded-full bg-[#111827] px-6 py-2.5 text-sm font-bold text-white hover:bg-black"
                    >
                      S&apos;inscrire
                    </Link>
                  )}
                  {book.price !== undefined ? (
                    <Link
                      href={detailHref}
                      className="rounded-full border border-[#169283] px-6 py-2.5 text-sm font-bold text-[#169283] hover:bg-[#f0fdf9]"
                    >
                      Acheter — {book.price.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} €
                    </Link>
                  ) : (
                    <Link
                      href={detailHref}
                      className="rounded-full border border-[#169283] px-6 py-2.5 text-sm font-bold text-[#169283]"
                    >
                      Voir le livre
                    </Link>
                  )}
                </div>
              </div>
            </>
          ) : null}

          {state === "error" ? (
            <div className="mx-auto max-w-md rounded-2xl border border-dashed border-[#d1d5db] bg-[#fafafa] px-6 py-12 text-center">
              <p className="text-4xl" aria-hidden>
                📖
              </p>
              <h3 className="mt-4 text-lg font-bold">Extrait indisponible</h3>
              <p className="mt-2 text-sm text-[#6b7280]">{message}</p>
              <Link
                href={detailHref}
                className="mt-6 inline-block rounded-full bg-[#169283] px-6 py-2.5 text-sm font-bold text-white"
              >
                Retour à la fiche
              </Link>
            </div>
          ) : null}

          {book.description && state === "ready" ? (
            <div className="mx-auto mt-12 max-w-[42rem] border-t border-[#f3f4f6] pt-8">
              <p className="font-serif text-base leading-[1.85] text-[#374151]">{book.description}</p>
            </div>
          ) : null}
        </article>
      </div>

      <ReaderGuestFooter />
    </div>
  );
}

function Stat({
  icon,
  value,
  label,
}: {
  readonly icon: "eye" | "star" | "chat";
  readonly value: string;
  readonly label: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5" title={label}>
      {icon === "eye" ? (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ) : icon === "star" ? (
        <svg className="h-4 w-4 text-[#169283]" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7-6.3-4.6L5.7 21l2.3-7-6-4.6h7.6z" />
        </svg>
      ) : (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )}
      <span className="font-semibold text-[#111827]">{value}</span>
    </span>
  );
}
