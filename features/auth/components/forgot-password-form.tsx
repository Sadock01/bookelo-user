"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";

import { AuthAlert, AuthField, AuthSubmitButton } from "@/features/auth/components/auth-field";
import { AuthShell } from "@/features/auth/components/auth-shell";
import { isValidEmail, readApiErrorMessage } from "@/lib/auth/validation";
import type { MessageResponse } from "@/lib/api/types";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!isValidEmail(email)) {
      setError("Email invalide.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const json = (await response.json()) as MessageResponse;

      if (!response.ok) {
        setError(readApiErrorMessage(json, "Erreur lors de l'envoi."));
        return;
      }

      setSuccess(
        json.message ??
          "Si un compte existe avec cet email, un lien de réinitialisation a été envoyé.",
      );
    } catch {
      setError("Erreur réseau.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthShell
      title="Mot de passe oublié"
      subtitle="Nous vous enverrons un lien pour choisir un nouveau mot de passe."
      footer={
        <Link href="/login" className="font-semibold text-[#169283] hover:underline">
          Retour à la connexion
        </Link>
      }
    >
      <form onSubmit={onSubmit} className="space-y-5">
        {error ? <AuthAlert variant="error">{error}</AuthAlert> : null}
        {success ? <AuthAlert variant="success">{success}</AuthAlert> : null}

        <AuthField
          id="forgot-email"
          label="Email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <AuthSubmitButton isLoading={isLoading}>Envoyer le lien</AuthSubmitButton>
      </form>
    </AuthShell>
  );
}
