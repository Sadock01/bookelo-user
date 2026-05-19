import type { ReactNode } from "react";

import { AuthStickyAppBar } from "@/features/auth/components/auth-sticky-app-bar";

type AuthShellProps = {
  readonly title: string;
  readonly subtitle?: string;
  readonly children: ReactNode;
  readonly footer?: ReactNode;
};

export function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[#faf8f5] text-[#111827]">
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -right-24 top-0 h-80 w-80 rounded-full bg-[#96f1e7]/30 blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-[#1ec9b6]/20 blur-3xl" />
      </div>

      <AuthStickyAppBar />

      <main className="relative mx-auto flex w-full max-w-md flex-1 flex-col px-4 py-10 sm:py-14">
        <div className="mb-8 text-center">
          <h1 className="font-[var(--font-poppins)] text-2xl font-bold tracking-tight sm:text-3xl">
            {title}
          </h1>
          {subtitle ? <p className="mt-2 text-sm leading-relaxed text-[#6b7280]">{subtitle}</p> : null}
        </div>

        <div className="rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-xl shadow-[#169283]/5 sm:p-8">
          {children}
        </div>

        {footer ? <div className="mt-6 text-center text-sm text-[#6b7280]">{footer}</div> : null}
      </main>
    </div>
  );
}
