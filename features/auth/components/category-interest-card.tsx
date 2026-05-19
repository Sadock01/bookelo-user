import type { Category } from "@/lib/api/types";

const GRADIENTS = [
  "from-[#169283] to-[#1ec9b6]",
  "from-[#0f6b5e] to-[#96f1e7]",
  "from-[#111827] to-[#374151]",
  "from-[#1ec9b6] to-[#d9fbf6]",
  "from-[#169283] to-[#0f6b5e]",
  "from-[#4b5563] to-[#9ca3af]",
] as const;

function gradientForIndex(index: number): string {
  return GRADIENTS[index % GRADIENTS.length];
}

function iconForCategory(name: string): string {
  const lower = name.toLowerCase();
  if (lower.includes("sécur") || lower.includes("security")) return "🛡️";
  if (lower.includes("python") || lower.includes("prog")) return "🐍";
  if (lower.includes("réseau") || lower.includes("cisco")) return "🌐";
  if (lower.includes("cloud") || lower.includes("devops")) return "☁️";
  if (lower.includes("data")) return "📊";
  return "📚";
}

type CategoryInterestCardProps = {
  readonly category: Category;
  readonly index: number;
  readonly selected: boolean;
  readonly disabled: boolean;
  readonly onToggle: () => void;
};

export function CategoryInterestCard({
  category,
  index,
  selected,
  disabled,
  onToggle,
}: CategoryInterestCardProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      aria-pressed={selected}
      className={`group relative overflow-hidden rounded-2xl border-2 p-4 text-left transition-all duration-200 sm:p-5 ${
        selected
          ? "border-[#169283] bg-[#f0fdf9] shadow-lg shadow-[#169283]/15 ring-2 ring-[#96f1e7]/50"
          : "border-[#e5e7eb] bg-white hover:border-[#1ec9b6]/60 hover:shadow-md"
      } ${disabled && !selected ? "cursor-not-allowed opacity-50" : ""}`}
    >
      <div
        className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-2xl shadow-inner ${gradientForIndex(index)}`}
        aria-hidden
      >
        <span className="drop-shadow-sm">{iconForCategory(category.name)}</span>
      </div>

      <h3 className="font-semibold text-[#111827] group-hover:text-[#169283]">{category.name}</h3>
      {category.description ? (
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[#6b7280]">
          {category.description}
        </p>
      ) : (
        <p className="mt-1 text-xs text-[#9ca3af]">Parcours & certifications</p>
      )}

      {selected ? (
        <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-[#169283] text-white shadow">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </span>
      ) : null}
    </button>
  );
}
