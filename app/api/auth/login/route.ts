import { NextResponse } from "next/server";

import { loginUser } from "@/lib/api/auth";
import { isApiError } from "@/lib/api/errors";
import { hasApiBaseUrl } from "@/lib/api/config";

export async function POST(request: Request) {
  if (!hasApiBaseUrl()) {
    return NextResponse.json({ message: "API non configurée." }, { status: 503 });
  }

  try {
    const body = (await request.json()) as { email?: string; password?: string };
    if (!body.email?.trim() || !body.password) {
      return NextResponse.json({ message: "Email et mot de passe requis." }, { status: 400 });
    }

    const result = await loginUser({
      email: body.email.trim(),
      password: body.password,
    });

    return NextResponse.json(result);
  } catch (error) {
    if (isApiError(error)) {
      return NextResponse.json(error.body ?? { message: error.message }, { status: error.status });
    }
    return NextResponse.json({ message: "Erreur de connexion." }, { status: 500 });
  }
}
