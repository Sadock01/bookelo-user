import { LandingPosterCard } from "@/features/landing/components/landing-poster-card";
import type { LandingStoryCover } from "@/features/landing/types/landing-page.types";

type LandingBookShelfProps = {
  readonly stories: readonly LandingStoryCover[];
  readonly className?: string;
  readonly emptyMessage?: string;
};

/**
 * Étagère unique pour 1 à N livres : flex wrap + cartes à largeur fixe, centrées.
 * Même mise en page que le catalogue grossisse — pas de branche « un seul livre ».
 */
export function LandingBookShelf({
  stories,
  className = "",
  emptyMessage = "Aucun parcours disponible pour le moment.",
}: LandingBookShelfProps) {
  if (stories.length === 0) {
    return (
      <p className={`text-center text-sm text-[#6b7280] ${className}`}>{emptyMessage}</p>
    );
  }

  return (
    <ul
      className={`m-0 flex list-none flex-wrap items-start justify-center gap-5 p-0 sm:gap-6 md:gap-7 ${className}`}
      aria-label="Livres et parcours"
    >
      {stories.map((story) => (
        <li key={story.id} className="flex justify-center">
          <LandingPosterCard {...story} />
        </li>
      ))}
    </ul>
  );
}
