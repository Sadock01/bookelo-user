import Link from "next/link";

type ReaderAuthorSidebarProps = {
  readonly author?: string;
  readonly bookId: string;
};

export function ReaderAuthorSidebar({ author, bookId }: ReaderAuthorSidebarProps) {
  const displayName = author ?? "Bookelo";
  const handle = `@${displayName.replace(/\s+/g, "").toLowerCase() || "bookelo"}`;

  return (
    <aside className="hidden w-[168px] shrink-0 lg:block">
      <div className="sticky top-36 space-y-6">
        <div>
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#96f1e7]/50 text-lg font-bold text-[#169283]">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <p className="mt-3 text-sm font-bold text-[#111827]">{handle}</p>
          <button
            type="button"
            className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-[#169283] hover:underline"
          >
            <span className="text-lg leading-none">+</span> Suivre
          </button>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#9ca3af]">Partager</p>
          <ul className="mt-3 space-y-2">
            {["Facebook", "X", "LinkedIn"].map((network) => (
              <li key={network}>
                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e5e7eb] bg-white text-xs font-bold text-[#6b7280] shadow-sm transition hover:border-[#169283] hover:text-[#169283]"
                  title={`Partager sur ${network}`}
                >
                  {network.charAt(0)}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <Link
          href={`/books/${encodeURIComponent(bookId)}`}
          className="block text-xs font-semibold text-[#6b7280] hover:text-[#169283]"
        >
          ← Fiche du livre
        </Link>
      </div>
    </aside>
  );
}
