"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

import { AuthAlert, AuthSubmitButton } from "@/features/auth/components/auth-field";
import { AuthPasswordField } from "@/features/auth/components/auth-password-field";
import { AuthShell } from "@/features/auth/components/auth-shell";
import { readApiErrorMessage, validatePassword } from "@/lib/auth/validation";
import type { MessageResponse } from "@/lib/api/types";

type ResetPasswordFormProps = {
  readonly token: string;
};

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!token) {
      setError("Lien de réinitialisation invalide.");
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }
    if (password !== confirm) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: password }),
      });

      const json = (await response.json()) as MessageResponse;

      if (!response.ok) {
        setError(readApiErrorMessage(json, "Lien expiré ou invalide."));
        return;
      }

      router.push("/login?reset=success");
    } catch {
      setError("Erreur réseau.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthShell
      title="Nouveau mot de passe"
      subtitle="Choisissez un mot de passe sécurisé pour votre compte Bookelo."
      footer={
        <Link href="/login" className="font-semibold text-[#169283] hover:underline">
          Retour à la connexion
        </Link>
      }
    >
      <form onSubmit={onSubmit} className="space-y-5">
        {error ? <AuthAlert variant="error">{error}</AuthAlert> : null}

        <AuthPasswordField
          id="reset-password"
          label="Nouveau mot de passe"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <AuthPasswordField
          id="reset-confirm"
          label="Confirmer"
          autoComplete="new-password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />

        <AuthSubmitButton isLoading={isLoading}>Réinitialiser</AuthSubmitButton>
      </form>
    </AuthShell>
  );
}
