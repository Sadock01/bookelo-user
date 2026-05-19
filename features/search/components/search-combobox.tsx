"use client";

import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";

import { searchHref } from "@/features/catalog/utils/book-display";
import type { SearchSuggestion } from "@/lib/api/types";

type SearchComboboxProps = {
  readonly placeholder: string;
  readonly ariaLabel: string;
  readonly defaultValue?: string;
  readonly className?: string;
  /** Style compact pour le header, plus large sur la page résultats. */
  readonly variant?: "header" | "page";
};

function SearchIcon({ className }: { readonly className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-5.2-5.2M11 18a7 7 0 100-14 7 7 0 000 14z"
      />
    </svg>
  );
}

export function SearchCombobox({
  placeholder,
  ariaLabel,
  defaultValue = "",
  className = "",
  variant = "header",
}: SearchComboboxProps) {
  const router = useRouter();
  const listboxId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState(defaultValue);
  const [suggestions, setSuggestions] = useState<readonly SearchSuggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);

  const goToSearch = useCallback(
    (term: string) => {
      const trimmed = term.trim();
      if (!trimmed) return;
      setIsOpen(false);
      router.push(searchHref(trimmed));
    },
    [router],
  );

  useEffect(() => {
    setQuery(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 1) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams({ q: trimmed });
        const response = await fetch(`/api/search/suggest?${params}`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("suggest failed");
        const json = (await response.json()) as { suggestions: SearchSuggestion[] };
        setSuggestions(json.suggestions ?? []);
        setIsOpen((json.suggestions?.length ?? 0) > 0);
        setActiveIndex(-1);
      } catch {
        if (!controller.signal.aborted) {
          setSuggestions([]);
          setIsOpen(false);
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }, 280);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (activeIndex >= 0 && suggestions[activeIndex]) {
      goToSearch(suggestions[activeIndex].title);
      return;
    }
    goToSearch(query);
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (!isOpen || suggestions.length === 0) {
      if (event.key === "Escape") setIsOpen(false);
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % suggestions.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => (index <= 0 ? suggestions.length - 1 : index - 1));
    } else if (event.key === "Escape") {
      setIsOpen(false);
      setActiveIndex(-1);
    } else if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault();
      goToSearch(suggestions[activeIndex].title);
    }
  }

  const inputClass =
    variant === "page"
      ? "w-full rounded-lg border border-[#e5e7eb] bg-white py-3 pl-11 pr-4 text-base text-[#111827] shadow-sm outline-none transition placeholder:text-[#9ca3af] focus:border-[#1ec9b6] focus:ring-2 focus:ring-[#96f1e7]/80"
      : "w-full rounded-full border border-[#e5e7eb] bg-[#f9fafb] py-2.5 pl-10 pr-4 text-sm text-[#111827] shadow-inner outline-none transition placeholder:text-[#9ca3af] focus:border-[#1ec9b6] focus:bg-white focus:ring-2 focus:ring-[#96f1e7]/80";

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <form onSubmit={onSubmit} role="search">
        <label className="relative block w-full">
          <span className="sr-only">{ariaLabel}</span>
          <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            autoComplete="off"
            role="combobox"
            aria-expanded={isOpen}
            aria-controls={listboxId}
            aria-autocomplete="list"
            aria-activedescendant={
              activeIndex >= 0 ? `${listboxId}-option-${activeIndex}` : undefined
            }
            onChange={(event) => {
              setQuery(event.target.value);
              setIsOpen(true);
            }}
            onFocus={() => {
              if (suggestions.length > 0) setIsOpen(true);
            }}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            className={inputClass}
          />
        </label>
      </form>

      {isOpen && suggestions.length > 0 ? (
        <div
          className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 overflow-hidden rounded-xl border border-[#e5e7eb] bg-white py-2 shadow-xl shadow-[#169283]/10"
          role="presentation"
        >
          <div
            className="pointer-events-none absolute -top-2 left-8 h-4 w-4 rotate-45 border-l border-t border-[#e5e7eb] bg-white"
            aria-hidden
          />
          <ul id={listboxId} role="listbox" className="relative max-h-[min(22rem,60vh)] overflow-y-auto">
            {suggestions.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <li key={item.id} role="option" aria-selected={isActive}>
                  <button
                    type="button"
                    id={`${listboxId}-option-${index}`}
                    className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition ${
                      isActive ? "bg-[#f0fdf9] text-[#169283]" : "text-[#374151] hover:bg-[#fafafa]"
                    }`}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => goToSearch(item.title)}
                  >
                    <SearchIcon className="h-4 w-4 shrink-0 text-[#9ca3af]" />
                    <span className="min-w-0 flex-1 truncate">
                      <span className="font-medium text-[#111827]">{item.title}</span>
                      {item.author ? (
                        <span className="text-[#6b7280]"> — {item.author}</span>
                      ) : null}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          {isLoading ? (
            <p className="border-t border-[#f3f4f6] px-4 py-2 text-xs text-[#9ca3af]">Chargement…</p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
