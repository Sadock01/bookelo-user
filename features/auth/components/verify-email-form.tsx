"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

import { AuthAlert, AuthField, AuthSubmitButton } from "@/features/auth/components/auth-field";
import { AuthShell } from "@/features/auth/components/auth-shell";
import { isValidEmail, readApiErrorMessage } from "@/lib/auth/validation";
import type { MessageResponse } from "@/lib/api/types";

type VerifyEmailFormProps = {
  readonly initialEmail?: string;
};

export function VerifyEmailForm({ initialEmail = "" }: VerifyEmailFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState(initialEmail);
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!isValidEmail(email)) {
      setError("Email invalide.");
      return;
    }
    if (code.trim().length < 6) {
      setError("Saisissez le code à 6 chiffres reçu par email.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/verify-email-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), code: code.trim() }),
      });

      const json = (await response.json()) as MessageResponse;

      if (!response.ok) {
        setError(readApiErrorMessage(json, "Code invalide ou expiré."));
        return;
      }

      setSuccess(json.message ?? "Email vérifié. Vous pouvez vous connecter.");
      setTimeout(() => router.push("/login"), 1500);
    } catch {
      setError("Erreur réseau.");
    } finally {
      setIsLoading(false);
    }
  }

  async function onResend() {
    setError(null);
    if (!isValidEmail(email)) {
      setError("Indiquez votre email pour renvoyer le code.");
      return;
    }

    setIsResending(true);
    try {
      const response = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const json = (await response.json()) as MessageResponse;
      if (!response.ok) {
        setError(readApiErrorMessage(json, "Envoi impossible."));
        return;
      }
      setSuccess(json.message ?? "Email de vérification renvoyé.");
    } catch {
      setError("Erreur réseau.");
    } finally {
      setIsResending(false);
    }
  }

  return (
    <AuthShell
      title="Vérifiez votre email"
      subtitle="Entrez le code à 6 chiffres envoyé après votre inscription."
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
          id="verify-email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <AuthField
          id="verify-code"
          label="Code de vérification"
          inputMode="numeric"
          maxLength={6}
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
          placeholder="000000"
          className="text-center text-lg tracking-[0.35em]"
          required
        />

        <AuthSubmitButton isLoading={isLoading}>Valider</AuthSubmitButton>

        <button
          type="button"
          onClick={() => void onResend()}
          disabled={isResending}
          className="w-full text-sm font-semibold text-[#169283] hover:underline disabled:opacity-50"
        >
          {isResending ? "Envoi…" : "Renvoyer le code"}
        </button>
      </form>
    </AuthShell>
  );
}
