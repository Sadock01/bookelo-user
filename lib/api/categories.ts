import { publicApiRequest } from "@/lib/api/client";
import type { Category, CategoryWithBooks } from "@/lib/api/types";

export async function getCategories(): Promise<readonly Category[]> {
  return publicApiRequest<readonly Category[]>("/categories", {
    next: { revalidate: 300 },
  });
}

export async function getCategoryBySlug(slug: string): Promise<CategoryWithBooks> {
  return publicApiRequest<CategoryWithBooks>(`/categories/${encodeURIComponent(slug)}`, {
    next: { revalidate: 60 },
  });
}
