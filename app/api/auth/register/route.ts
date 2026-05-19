import { NextResponse } from "next/server";

import { registerUser } from "@/lib/api/auth";
import { isApiError } from "@/lib/api/errors";
import { hasApiBaseUrl } from "@/lib/api/config";
import type { RegisterPayload } from "@/lib/api/types";

export async function POST(request: Request) {
  if (!hasApiBaseUrl()) {
    return NextResponse.json({ message: "API non configurée." }, { status: 503 });
  }

  try {
    const body = (await request.json()) as RegisterPayload;
    const result = await registerUser(body);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    if (isApiError(error)) {
      return NextResponse.json(error.body ?? { message: error.message }, { status: error.status });
    }
    return NextResponse.json({ message: "Erreur lors de l'inscription." }, { status: 500 });
  }
}
