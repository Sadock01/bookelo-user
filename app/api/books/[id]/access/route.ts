import { NextResponse } from "next/server";

import { getBookAccess } from "@/lib/api/books";
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

  if (!hasApiBaseUrl()) {
    return NextResponse.json({ message: "API non configurée." }, { status: 503 });
  }

  try {
    const access = await getBookAccess(id, { token: extractBearer(request) });
    return NextResponse.json(access);
  } catch {
    return NextResponse.json({ message: "Livre introuvable." }, { status: 404 });
  }
}
