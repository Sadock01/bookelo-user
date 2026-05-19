"use client";

import { useId, useState, type InputHTMLAttributes } from "react";

type AuthPasswordFieldProps = {
  readonly label: string;
  readonly id?: string;
  readonly error?: string;
  readonly hint?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export function AuthPasswordField({
  label,
  id: idProp,
  error,
  hint,
  className = "",
  ...inputProps
}: AuthPasswordFieldProps) {
  const generatedId = useId();
  const inputId = idProp ?? generatedId;
  const [visible, setVisible] = useState(false);

  return (
    <div className="space-y-1.5">
      <label htmlFor={inputId} className="block text-sm font-medium text-[#374151]">
        {label}
      </label>
      <div className="relative">
        <input
          id={inputId}
          type={visible ? "text" : "password"}
          className={`w-full rounded-xl border bg-[#fafafa] py-2.5 pl-4 pr-12 text-sm text-[#111827] outline-none transition placeholder:text-[#9ca3af] focus:border-[#1ec9b6] focus:bg-white focus:ring-2 focus:ring-[#96f1e7]/80 ${
            error ? "border-red-300" : "border-[#e5e7eb]"
          } ${className}`}
          {...inputProps}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-semibold text-[#6b7280] transition hover:bg-[#f3f4f6] hover:text-[#169283]"
          aria-label={visible ? "Masquer le mot de passe" : "Afficher le mot de passe"}
          aria-pressed={visible}
        >
          {visible ? "Masquer" : "Afficher"}
        </button>
      </div>
      {hint && !error ? <p className="text-xs text-[#9ca3af]">{hint}</p> : null}
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
