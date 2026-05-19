import { NextResponse } from "next/server";

import { getBookAccess, getBookPreviewUrl } from "@/lib/api/books";
import { hasApiBaseUrl } from "@/lib/api/config";

type RouteContext = {
  readonly params: Promise<{ readonly id: string }>;
};

function extractBearer(request: Request): string | undefined {
  const header = request.headers.get("Authorization");
  if (!header?.startsWith("Bearer ")) return undefined;
  const token = header.slice(7).trim();
  return token || undefined;
}

export async function GET(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const token = extractBearer(request);

  if (!hasApiBaseUrl()) {
    return NextResponse.json(
      { error: "API non configurée", canPreview: false },
      { status: 503 },
    );
  }

  try {
    const [access, url] = await Promise.all([
      getBookAccess(id, { token }).catch(() => null),
      getBookPreviewUrl(id),
    ]);

    return NextResponse.json({
      url,
      canPreview: access?.canPreview ?? true,
      previewPageCount: access?.previewPageCount ?? 5,
    });
  } catch {
    return NextResponse.json(
      {
        error: "Aperçu indisponible pour ce livre.",
        canPreview: false,
        previewPageCount: 5,
      },
      { status: 404 },
    );
  }
}
