import Link from "next/link";
import type { ReactNode } from "react";

import { AuthStickyAppBar } from "@/features/auth/components/auth-sticky-app-bar";
import { RegisterStepIndicator } from "@/features/auth/components/register-step-indicator";

type RegisterWizardShellProps = {
  readonly step: number;
  readonly totalSteps: number;
  readonly title: string;
  readonly subtitle?: string;
  readonly children: ReactNode;
  readonly wide?: boolean;
  readonly onBack?: () => void;
  readonly footer?: ReactNode;
};

export function RegisterWizardShell({
  step,
  totalSteps,
  title,
  subtitle,
  children,
  wide = false,
  onBack,
  footer,
}: RegisterWizardShellProps) {
  const leading = onBack ? (
    <button
      type="button"
      onClick={onBack}
      className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-[#374151] transition hover:text-[#169283]"
    >
      <span aria-hidden>←</span> Retour
    </button>
  ) : (
    <Link
      href="/"
      className="shrink-0 font-[var(--font-poppins)] text-xl font-bold tracking-tight text-[#169283]"
    >
      Bookelo
    </Link>
  );

  return (
    <div className="flex min-h-screen flex-col bg-[#faf8f5] text-[#111827]">
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -right-32 top-0 h-96 w-96 rounded-full bg-[#96f1e7]/25 blur-3xl" />
        <div className="absolute -left-24 bottom-1/4 h-80 w-80 rounded-full bg-[#1ec9b6]/15 blur-3xl" />
      </div>

      <AuthStickyAppBar
        leading={leading}
        center={<RegisterStepIndicator current={step} total={totalSteps} />}
      />

      <main
        className={`relative mx-auto flex w-full flex-1 flex-col px-4 py-8 sm:py-12 ${wide ? "max-w-3xl" : "max-w-lg"}`}
      >
        <div className="mb-8 text-center sm:mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#169283]">
            Étape {step} sur {totalSteps}
          </p>
          <h1 className="mt-3 font-[var(--font-poppins)] text-2xl font-bold tracking-tight sm:text-3xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#6b7280] sm:text-base">
              {subtitle}
            </p>
          ) : null}
        </div>

        {children}

        {footer ? <p className="mt-8 text-center text-sm text-[#6b7280]">{footer}</p> : null}
      </main>
    </div>
  );
}
