"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { type FormEvent, useState } from "react";

import { AuthAlert, AuthField, AuthSubmitButton } from "@/features/auth/components/auth-field";
import { AuthPasswordField } from "@/features/auth/components/auth-password-field";
import { AuthShell } from "@/features/auth/components/auth-shell";
import { useAuth } from "@/features/auth/context/auth-provider";
import { isValidEmail, readApiErrorMessage } from "@/lib/auth/validation";
import type { LoginResponse } from "@/lib/api/types";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const resetSuccess = searchParams.get("reset") === "success";
  const nextPath = searchParams.get("next");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!isValidEmail(email)) {
      setError("Adresse email invalide.");
      return;
    }
    if (!password) {
      setError("Mot de passe requis.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const json = (await response.json()) as LoginResponse & { message?: string };

      if (!response.ok) {
        setError(readApiErrorMessage(json, "Identifiants incorrects."));
        return;
      }

      login(json.token, json.user);
      const destination =
        nextPath && nextPath.startsWith("/") && !nextPath.startsWith("//") ? nextPath : "/";
      router.push(destination);
      router.refresh();
    } catch {
      setError("Impossible de se connecter. Réessayez.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthShell
      title="Bon retour sur Bookelo"
      subtitle="Connectez-vous pour accéder à vos parcours et certifications."
      footer={
        <>
          Pas encore de compte ?{" "}
          <Link href="/register" className="font-semibold text-[#169283] hover:underline">
            S&apos;inscrire
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-5">
        {resetSuccess ? (
          <AuthAlert variant="success">Mot de passe mis à jour. Vous pouvez vous connecter.</AuthAlert>
        ) : null}
        {error ? <AuthAlert variant="error">{error}</AuthAlert> : null}

        <AuthField
          id="login-email"
          label="Email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="vous@exemple.com"
          required
        />

        <AuthPasswordField
          id="login-password"
          label="Mot de passe"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="text-right">
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-[#169283] hover:underline"
          >
            Mot de passe oublié ?
          </Link>
        </div>

        <AuthSubmitButton isLoading={isLoading}>Se connecter</AuthSubmitButton>
      </form>
    </AuthShell>
  );
}
