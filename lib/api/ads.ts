import { publicApiRequest } from "@/lib/api/client";
import type { Advertisement } from "@/lib/api/types";

export async function getAds(location: string): Promise<readonly Advertisement[]> {
  return publicApiRequest<readonly Advertisement[]>("/ads", {
    query: { location },
    next: { revalidate: 300 },
  });
}
