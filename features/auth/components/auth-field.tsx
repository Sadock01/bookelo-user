import type { InputHTMLAttributes, ReactNode } from "react";

type AuthFieldProps = {
  readonly label: string;
  readonly id: string;
  readonly error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function AuthField({ label, id, error, className = "", ...inputProps }: AuthFieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-[#374151]">
        {label}
      </label>
      <input
        id={id}
        className={`w-full rounded-xl border bg-[#fafafa] px-4 py-2.5 text-sm text-[#111827] outline-none transition placeholder:text-[#9ca3af] focus:border-[#1ec9b6] focus:bg-white focus:ring-2 focus:ring-[#96f1e7]/80 ${
          error ? "border-red-300" : "border-[#e5e7eb]"
        } ${className}`}
        {...inputProps}
      />
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  );
}

type AuthSelectProps = {
  readonly label: string;
  readonly id: string;
  readonly error?: string;
  readonly children: ReactNode;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export function AuthSelect({ label, id, error, children, className = "", ...selectProps }: AuthSelectProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-[#374151]">
        {label}
      </label>
      <select
        id={id}
        className={`w-full rounded-xl border bg-[#fafafa] px-4 py-2.5 text-sm text-[#111827] outline-none transition focus:border-[#1ec9b6] focus:bg-white focus:ring-2 focus:ring-[#96f1e7]/80 ${
          error ? "border-red-300" : "border-[#e5e7eb]"
        } ${className}`}
        {...selectProps}
      >
        {children}
      </select>
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  );
}

export function AuthAlert({
  variant,
  children,
}: {
  readonly variant: "error" | "success" | "info";
  readonly children: ReactNode;
}) {
  const styles =
    variant === "error"
      ? "border-red-200 bg-red-50 text-red-900"
      : variant === "success"
        ? "border-emerald-200 bg-emerald-50 text-emerald-900"
        : "border-amber-200 bg-amber-50 text-amber-950";

  return (
    <p className={`rounded-xl border px-4 py-3 text-sm leading-relaxed ${styles}`} role="alert">
      {children}
    </p>
  );
}

export function AuthSubmitButton({
  children,
  isLoading,
}: {
  readonly children: ReactNode;
  readonly isLoading?: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="w-full rounded-full bg-[#169283] py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#0f6b5e] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isLoading ? "Patientez…" : children}
    </button>
  );
}
