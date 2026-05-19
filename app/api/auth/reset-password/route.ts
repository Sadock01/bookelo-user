import { NextResponse } from "next/server";

import { resetPassword } from "@/lib/api/auth";
import { isApiError } from "@/lib/api/errors";
import { hasApiBaseUrl } from "@/lib/api/config";

export async function POST(request: Request) {
  if (!hasApiBaseUrl()) {
    return NextResponse.json({ message: "API non configurée." }, { status: 503 });
  }

  try {
    const body = (await request.json()) as { token?: string; newPassword?: string };
    const result = await resetPassword({
      token: body.token ?? "",
      newPassword: body.newPassword ?? "",
    });
    return NextResponse.json(result);
  } catch (error) {
    if (isApiError(error)) {
      return NextResponse.json(error.body ?? { message: error.message }, { status: error.status });
    }
    return NextResponse.json({ message: "Lien invalide ou expiré." }, { status: 400 });
  }
}
