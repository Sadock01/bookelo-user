import { NextResponse } from "next/server";

import { forgotPassword } from "@/lib/api/auth";
import { isApiError } from "@/lib/api/errors";
import { hasApiBaseUrl } from "@/lib/api/config";

export async function POST(request: Request) {
  if (!hasApiBaseUrl()) {
    return NextResponse.json({ message: "API non configurée." }, { status: 503 });
  }

  try {
    const body = (await request.json()) as { email?: string };
    const result = await forgotPassword({ email: body.email?.trim() ?? "" });
    return NextResponse.json(result);
  } catch (error) {
    if (isApiError(error)) {
      return NextResponse.json(error.body ?? { message: error.message }, { status: error.status });
    }
    return NextResponse.json({ message: "Erreur serveur." }, { status: 500 });
  }
}
