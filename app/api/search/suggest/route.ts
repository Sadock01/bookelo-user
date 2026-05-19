import { NextResponse } from "next/server";

import { getBooks } from "@/lib/api/books";
import { hasApiBaseUrl } from "@/lib/api/config";
import { searchMockCatalog } from "@/lib/api/mock-catalog";
import type { SearchSuggestion } from "@/lib/api/types";

export async function GET(request: Request) {
  const q = new URL(request.url).searchParams.get("q")?.trim() ?? "";

  if (q.length < 1) {
    return NextResponse.json({ suggestions: [] satisfies SearchSuggestion[] });
  }

  let suggestions: SearchSuggestion[] = [];

  if (!hasApiBaseUrl()) {
    suggestions = searchMockCatalog(q).map((book) => ({
      id: book.id,
      title: book.title,
      author: book.author,
    }));
  } else {
    try {
      const result = await getBooks({ search: q, limit: 10 });
      suggestions = result.data.map((book) => ({
        id: book.id,
        title: book.title,
        author: book.author,
      }));
    } catch {
      return NextResponse.json({ suggestions: [] }, { status: 200 });
    }
  }

  return NextResponse.json({ suggestions });
}
