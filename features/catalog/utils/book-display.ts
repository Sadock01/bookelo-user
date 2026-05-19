import type { StaticImageData } from "next/image";

import type { Book } from "@/lib/api/types";
import { getBookCoverUrl } from "@/lib/api/books";

import { landingAssets } from "@/features/landing/data/landing-assets";

const FALLBACK_COVERS = [
  landingAssets.trendingCovers.coverOne,
  landingAssets.trendingCovers.coverTwo,
  landingAssets.promoVisual,
  landingAssets.bannerVisual,
  landingAssets.lastTemp,
] as const;

export function resolveBookCover(book: Book, index = 0): string | StaticImageData {
  const remote = getBookCoverUrl(book);
  if (remote) return remote;
  return FALLBACK_COVERS[index % FALLBACK_COVERS.length];
}

export function bookDetailHref(bookId: string): string {
  return `/books/${encodeURIComponent(bookId)}`;
}

export function categoryHref(slug: string): string {
  return `/categories/${encodeURIComponent(slug)}`;
}

export function searchHref(query: string): string {
  const params = new URLSearchParams();
  if (query.trim()) params.set("q", query.trim());
  const qs = params.toString();
  return qs ? `/search?${qs}` : "/search";
}
