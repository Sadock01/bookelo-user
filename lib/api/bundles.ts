import { publicApiRequest } from "@/lib/api/client";
import type { Bundle } from "@/lib/api/types";

export async function getBundles(): Promise<readonly Bundle[]> {
  return publicApiRequest<readonly Bundle[]>("/bundles", {
    next: { revalidate: 120 },
  });
}

export async function getBundleById(id: string): Promise<Bundle> {
  return publicApiRequest<Bundle>(`/bundles/${encodeURIComponent(id)}`, {
    next: { revalidate: 60 },
  });
}
