"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { CategoryInterestCard } from "@/features/auth/components/category-interest-card";
import { AuthAlert, AuthField, AuthSubmitButton } from "@/features/auth/components/auth-field";
import { AuthDropdown } from "@/features/auth/components/auth-dropdown";
import { AuthPasswordField } from "@/features/auth/components/auth-password-field";
import { COUNTRY_OPTIONS, LANGUAGE_OPTIONS } from "@/lib/constants/countries";
import { RegisterWizardShell } from "@/features/auth/components/register-wizard-shell";
import { isValidEmail, readApiErrorMessage, validatePassword } from "@/lib/auth/validation";
import type { AppLanguage, Category, RegisterResponse } from "@/lib/api/types";

const TOTAL_STEPS = 3;
const MAX_CATEGORIES = 3;
const MIN_CATEGORIES = 1;

type RegisterWizardProps = {
  readonly categories: readonly Category[];
};

export function RegisterWizard({ categories }: RegisterWizardProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const [selectedCategoryIds, setSelectedCategoryIds] = useState<readonly string[]>([]);
  const [name, setName] = useState("");
  const [language, setLanguage] = useState<AppLanguage>("FR");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  function toggleCategory(id: string) {
    setSelectedCategoryIds((current) => {
      if (current.includes(id)) return current.filter((c) => c !== id);
      if (current.length >= MAX_CATEGORIES) return current;
      return [...current, id];
    });
    setError(null);
  }

  function goBack() {
    setError(null);
    setStep((s) => Math.max(1, s - 1));
  }

  function goNext() {
    setError(null);

    if (step === 1) {
      if (selectedCategoryIds.length < MIN_CATEGORIES) {
        setError(`Choisissez au moins ${MIN_CATEGORIES} domaine pour personnaliser votre fil.`);
        return;
      }
      setStep(2);
      return;
    }

    if (step === 2) {
      if (!name.trim()) {
        setError("Indiquez votre nom pour continuer.");
        return;
      }
      setStep(3);
      return;
    }
  }

  async function submitRegistration() {
    setError(null);

    if (!isValidEmail(email)) {
      setError("Adresse email invalide.");
      return;
    }
    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
          language,
          country: country.trim() || undefined,
          favoriteCategoryIds: selectedCategoryIds,
        }),
      });

      const json = (await response.json()) as RegisterResponse & { message?: string };

      if (!response.ok) {
        setError(readApiErrorMessage(json, "Inscription impossible."));
        return;
      }

      router.push(`/verify-email?email=${encodeURIComponent(email.trim())}`);
    } catch {
      setError("Erreur réseau. Réessayez.");
    } finally {
      setIsLoading(false);
    }
  }

  const selectedCount = selectedCategoryIds.length;
  const canPickMore = selectedCount < MAX_CATEGORIES;

  const footer = (
    <>
      Déjà inscrit ?{" "}
      <Link href="/login" className="font-semibold text-[#169283] hover:underline">
        Se connecter
      </Link>
    </>
  );

  if (step === 1) {
    return (
      <RegisterWizardShell
        step={1}
        totalSteps={TOTAL_STEPS}
        title="Qu'est-ce qui vous passionne ?"
        subtitle="Choisissez jusqu'à 3 domaines — nous adapterons vos recommandations de parcours et de livres."
        wide
        footer={footer}
      >
        <div className="rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-xl shadow-[#169283]/5 sm:p-8">
          {error ? (
            <div className="mb-5">
              <AuthAlert variant="error">{error}</AuthAlert>
            </div>
          ) : null}

          <div className="mb-6 flex items-center justify-between gap-4">
            <p className="text-sm text-[#6b7280]">
              <span className="font-bold text-[#169283]">{selectedCount}</span>
              <span className="text-[#9ca3af]"> / {MAX_CATEGORIES}</span> sélectionné
              {selectedCount > 1 ? "s" : ""}
            </p>
            {selectedCount >= MAX_CATEGORIES ? (
              <span className="rounded-full bg-[#96f1e7]/40 px-3 py-1 text-xs font-semibold text-[#169283]">
                Maximum atteint
              </span>
            ) : null}
          </div>

          {categories.length === 0 ? (
            <AuthAlert variant="info">
              Impossible de charger les catégories. Vérifiez la connexion API ou réessayez plus tard.
            </AuthAlert>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category, index) => (
                <CategoryInterestCard
                  key={category.id}
                  category={category}
                  index={index}
                  selected={selectedCategoryIds.includes(category.id)}
                  disabled={!canPickMore && !selectedCategoryIds.includes(category.id)}
                  onToggle={() => toggleCategory(category.id)}
                />
              ))}
            </div>
          )}

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-full border border-[#e5e7eb] px-6 py-3 text-sm font-semibold text-[#374151] transition hover:bg-[#fafafa]"
            >
              J&apos;ai déjà un compte
            </Link>
            <button
              type="button"
              onClick={goNext}
              disabled={selectedCount < MIN_CATEGORIES}
              className="inline-flex items-center justify-center rounded-full bg-[#111827] px-8 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continuer
            </button>
          </div>
        </div>
      </RegisterWizardShell>
    );
  }

  if (step === 2) {
    return (
      <RegisterWizardShell
        step={2}
        totalSteps={TOTAL_STEPS}
        title="Parlez-nous de vous"
        subtitle="Quelques informations pour personnaliser votre expérience Bookelo."
        onBack={goBack}
        footer={footer}
      >
        <div className="rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-xl shadow-[#169283]/5 sm:p-8">
          {error ? (
            <div className="mb-5">
              <AuthAlert variant="error">{error}</AuthAlert>
            </div>
          ) : null}

          <div className="mb-6 rounded-xl bg-[#f0fdf9] p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#169283]">
              Vos centres d&apos;intérêt
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {selectedCategoryIds.map((id) => {
                const cat = categories.find((c) => c.id === id);
                return cat ? (
                  <span
                    key={id}
                    className="rounded-full border border-[#96f1e7] bg-white px-3 py-1 text-xs font-semibold text-[#169283]"
                  >
                    {cat.name}
                  </span>
                ) : null;
              })}
            </div>
          </div>

          <div className="space-y-5">
            <AuthField
              id="wizard-name"
              label="Nom complet"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              placeholder="Votre nom"
            />

            <AuthDropdown
              id="wizard-language"
              label="Langue de lecture préférée"
              value={language}
              onChange={(next) => setLanguage(next as AppLanguage)}
              options={LANGUAGE_OPTIONS}
              placeholder="Choisir une langue"
            />

            <AuthDropdown
              id="wizard-country"
              label="Pays ou région (optionnel)"
              value={country}
              onChange={setCountry}
              options={COUNTRY_OPTIONS}
              placeholder="Choisir un pays"
              searchable
              allowEmpty
              emptyLabel="Ne pas préciser"
            />
          </div>

          <div className="mt-8">
            <button
              type="button"
              onClick={goNext}
              className="w-full rounded-full bg-[#111827] py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-black"
            >
              Continuer
            </button>
          </div>
          </div>
      </RegisterWizardShell>
    );
  }

  return (
    <RegisterWizardShell
      step={3}
      totalSteps={TOTAL_STEPS}
      title="Créez vos identifiants"
      subtitle="Dernière étape — votre email servira à vous connecter et à valider votre compte."
      onBack={goBack}
      footer={footer}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void submitRegistration();
        }}
        className="rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-xl shadow-[#169283]/5 sm:p-8"
      >
        {error ? (
          <div className="mb-5">
            <AuthAlert variant="error">{error}</AuthAlert>
          </div>
        ) : null}

        <div className="space-y-5">
          <AuthField
            id="wizard-email"
            label="Email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="vous@exemple.com"
            required
          />

          <AuthPasswordField
            id="wizard-password"
            label="Mot de passe"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            hint="8 caractères minimum, une majuscule, une minuscule et un chiffre."
            required
          />

          <AuthPasswordField
            id="wizard-confirm"
            label="Confirmer le mot de passe"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <div className="mt-8 space-y-3">
          <AuthSubmitButton isLoading={isLoading}>Créer mon compte</AuthSubmitButton>
          <p className="text-center text-xs leading-relaxed text-[#9ca3af]">
            En créant un compte, vous acceptez nos conditions d&apos;utilisation et notre politique
            de confidentialité.
          </p>
        </div>
      </form>
    </RegisterWizardShell>
  );
}
