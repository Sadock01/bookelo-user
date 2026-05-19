import { NextResponse } from "next/server";

import { verifyEmailWithCode } from "@/lib/api/auth";
import { isApiError } from "@/lib/api/errors";
import { hasApiBaseUrl } from "@/lib/api/config";

export async function POST(request: Request) {
  if (!hasApiBaseUrl()) {
    return NextResponse.json({ message: "API non configurée." }, { status: 503 });
  }

  try {
    const body = (await request.json()) as { email?: string; code?: string };
    const result = await verifyEmailWithCode({
      email: body.email?.trim() ?? "",
      code: body.code?.trim() ?? "",
    });
    return NextResponse.json(result);
  } catch (error) {
    if (isApiError(error)) {
      return NextResponse.json(error.body ?? { message: error.message }, { status: error.status });
    }
    return NextResponse.json({ message: "Code invalide ou expiré." }, { status: 400 });
  }
}
