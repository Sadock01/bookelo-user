import { NextResponse } from "next/server";

import { resendVerificationEmail } from "@/lib/api/auth";
import { isApiError } from "@/lib/api/errors";
import { hasApiBaseUrl } from "@/lib/api/config";

export async function POST(request: Request) {
  if (!hasApiBaseUrl()) {
    return NextResponse.json({ message: "API non configurée." }, { status: 503 });
  }

  try {
    const body = (await request.json()) as { email?: string };
    const result = await resendVerificationEmail({ email: body.email?.trim() ?? "" });
    return NextResponse.json(result);
  } catch (error) {
    if (isApiError(error)) {
      return NextResponse.json(error.body ?? { message: error.message }, { status: error.status });
    }
    return NextResponse.json({ message: "Impossible d'envoyer l'email." }, { status: 500 });
  }
}
