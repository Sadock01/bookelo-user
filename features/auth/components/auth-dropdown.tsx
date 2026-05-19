"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";

export type AuthDropdownOption = {
  readonly value: string;
  readonly label: string;
};

type AuthDropdownProps = {
  readonly label: string;
  readonly id?: string;
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly options: readonly AuthDropdownOption[];
  readonly placeholder?: string;
  readonly error?: string;
  readonly searchable?: boolean;
  readonly allowEmpty?: boolean;
  readonly emptyLabel?: string;
};

function ChevronIcon({ open }: { readonly open: boolean }) {
  return (
    <svg
      className={`h-4 w-4 shrink-0 text-[#9ca3af] transition-transform ${open ? "rotate-180" : ""}`}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function AuthDropdown({
  label,
  id: idProp,
  value,
  onChange,
  options,
  placeholder = "Choisir une option",
  error,
  searchable = false,
  allowEmpty = false,
  emptyLabel = "— Aucune sélection —",
}: AuthDropdownProps) {
  const generatedId = useId();
  const triggerId = idProp ?? generatedId;
  const listboxId = `${triggerId}-listbox`;
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const selectedLabel = useMemo(() => {
    if (!value && allowEmpty) return emptyLabel;
    return options.find((o) => o.value === value)?.label ?? placeholder;
  }, [allowEmpty, emptyLabel, options, placeholder, value]);

  const filteredOptions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!searchable || !q) return options;
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query, searchable]);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    }
    function onEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onEscape);
    };
  }, [open]);

  function selectOption(next: string) {
    onChange(next);
    setOpen(false);
    setQuery("");
  }

  const triggerClass = `flex w-full items-center justify-between gap-2 rounded-xl border bg-[#fafafa] px-4 py-2.5 text-left text-sm outline-none transition focus:border-[#1ec9b6] focus:bg-white focus:ring-2 focus:ring-[#96f1e7]/80 ${
    error ? "border-red-300" : open ? "border-[#1ec9b6] bg-white ring-2 ring-[#96f1e7]/80" : "border-[#e5e7eb]"
  }`;

  return (
    <div ref={rootRef} className="relative space-y-1.5">
      <label htmlFor={triggerId} className="block text-sm font-medium text-[#374151]">
        {label}
      </label>

      <button
        type="button"
        id={triggerId}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        className={triggerClass}
        onClick={() => setOpen((o) => !o)}
      >
        <span className={value || allowEmpty ? "text-[#111827]" : "text-[#9ca3af]"}>
          {selectedLabel}
        </span>
        <ChevronIcon open={open} />
      </button>

      {open ? (
        <div
          className="absolute left-0 right-0 top-full z-50 mt-1.5 overflow-hidden rounded-xl border border-[#e5e7eb] bg-white shadow-[0_12px_40px_-8px_rgba(0,0,0,0.15)]"
        >
          {searchable ? (
            <div className="border-b border-[#f3f4f6] p-2">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher…"
                className="w-full rounded-lg border border-[#e5e7eb] bg-[#fafafa] px-3 py-2 text-sm outline-none focus:border-[#1ec9b6] focus:bg-white"
                autoFocus
              />
            </div>
          ) : null}

          <ul
            id={listboxId}
            role="listbox"
            aria-labelledby={triggerId}
            className="max-h-56 overflow-y-auto py-1"
          >
            {allowEmpty ? (
              <li role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={!value}
                  onClick={() => selectOption("")}
                  className={`flex w-full px-4 py-2.5 text-left text-sm transition hover:bg-[#f0fdf9] ${
                    !value ? "bg-[#f0fdf9] font-semibold text-[#169283]" : "text-[#6b7280]"
                  }`}
                >
                  {emptyLabel}
                </button>
              </li>
            ) : null}

            {filteredOptions.length === 0 ? (
              <li className="px-4 py-3 text-sm text-[#9ca3af]">Aucun résultat</li>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = option.value === value;
                return (
                  <li key={option.value} role="presentation">
                    <button
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => selectOption(option.value)}
                      className={`flex w-full px-4 py-2.5 text-left text-sm transition hover:bg-[#f0fdf9] ${
                        isSelected ? "bg-[#f0fdf9] font-semibold text-[#169283]" : "text-[#111827]"
                      }`}
                    >
                      {option.label}
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      ) : null}

      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
