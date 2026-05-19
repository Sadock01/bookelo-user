"use client";

import { useState } from "react";

import type { Review } from "@/lib/api/types";

type BookDetailTabsProps = {
  readonly description?: string;
  readonly reviews: readonly Review[];
  readonly previewPageCount: number;
  readonly canPreview: boolean;
};

export function BookDetailTabs({
  description,
  reviews,
  previewPageCount,
  canPreview,
}: BookDetailTabsProps) {
  const [tab, setTab] = useState<"summary" | "reviews">("summary");

  return (
    <section className="mt-10">
      <div className="flex gap-8 border-b border-[#e5e7eb]" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={tab === "summary"}
          onClick={() => setTab("summary")}
          className={`border-b-2 pb-3 text-sm font-medium transition ${
            tab === "summary"
              ? "border-[#169283] text-[#111827]"
              : "border-transparent text-[#6b7280] hover:text-[#111827]"
          }`}
        >
          Résumé
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "reviews"}
          onClick={() => setTab("reviews")}
          className={`border-b-2 pb-3 text-sm font-medium transition ${
            tab === "reviews"
              ? "border-[#169283] text-[#111827]"
              : "border-transparent text-[#6b7280] hover:text-[#111827]"
          }`}
        >
          Avis{reviews.length > 0 ? ` (${reviews.length})` : ""}
        </button>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-[#6b7280]">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#1ec9b6]" aria-hidden />
          {canPreview ? "Extrait disponible" : "Extrait bientôt disponible"}
        </span>
        <span>·</span>
        <span>
          {previewPageCount} page{previewPageCount > 1 ? "s" : ""} gratuite{previewPageCount > 1 ? "s" : ""}
        </span>
      </div>

      {tab === "summary" ? (
        <div role="tabpanel" className="mt-6 max-w-3xl">
          {description ? (
            <p className="text-base leading-relaxed text-[#374151] whitespace-pre-line">{description}</p>
          ) : (
            <p className="text-[#6b7280]">Aucun résumé pour le moment.</p>
          )}
        </div>
      ) : (
        <div role="tabpanel" className="mt-6 space-y-4">
          {reviews.length === 0 ? (
            <p className="text-[#6b7280]">Pas encore d&apos;avis sur ce livre.</p>
          ) : (
            reviews.map((review) => (
              <article
                key={review.id}
                className="rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm"
              >
                <p className="font-semibold text-[#169283]">{review.rating} / 5</p>
                {review.comment ? (
                  <p className="mt-2 text-sm leading-relaxed text-[#374151]">{review.comment}</p>
                ) : null}
              </article>
            ))
          )}
        </div>
      )}
    </section>
  );
}
