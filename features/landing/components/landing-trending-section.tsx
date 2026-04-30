import Image from "next/image";

import { LANDING_SHELL } from "@/features/landing/constants/landing-layout";
import type { LandingTrendingModel } from "@/features/landing/types/landing-page.types";

type LandingTrendingSectionProps = {
  readonly model: LandingTrendingModel;
};

/**
 * Rayon « carrousels » : défilement horizontal sur petit écran, grille sur grand.
 * Fond crème + vagues légères pour coller à l’esthétique des landings éditoriales.
 */
export function LandingTrendingSection({ model }: LandingTrendingSectionProps) {
  return (
    <section
      className="relative overflow-hidden bg-[#fff7f1] py-14"
      aria-labelledby="landing-trending-title"
    >
      <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden>
        <div className="absolute -right-20 top-10 h-72 w-72 rounded-full bg-white blur-2xl" />
        <div className="absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-[#96f1e7]/40 blur-2xl" />
      </div>

      <div className={`${LANDING_SHELL} relative`}>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h2
            id="landing-trending-title"
            className="text-3xl font-[var(--font-poppins)] font-bold tracking-tight text-[#111827] md:text-4xl"
          >
            {model.sectionTitle}
          </h2>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-transparent px-4 py-2 text-sm font-semibold text-[#169283] transition hover:border-[#1ec9b6]/40 hover:bg-white/70"
          >
            {model.seeAllLabel}
            <span aria-hidden>→</span>
          </button>
        </div>

        <div className="relative">
          {/* Carrousel horizontal (mobile / tablette) */}
          <div className="-mx-6 flex gap-4 overflow-x-auto px-6 pb-2 md:hidden [scrollbar-width:thin]">
            {model.stories.map((story) => (
              <article
                key={story.id}
                className="group w-[42vw] shrink-0 overflow-hidden rounded-2xl border border-[#f3f4f6] bg-white shadow-md shadow-[#169283]/5"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={story.image}
                    alt={story.title}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-3">
                  <h3 className="line-clamp-3 text-[13px] font-semibold leading-snug">{story.title}</h3>
                </div>
              </article>
            ))}
          </div>

          {/* Grille desktop */}
          <div className="hidden gap-5 md:grid md:grid-cols-3 lg:grid-cols-5 lg:gap-6">
            {model.stories.map((story) => (
              <article
                key={story.id}
                className="group overflow-hidden rounded-2xl border border-[#fdeee5] bg-white shadow-lg shadow-orange-950/5 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={story.image}
                    alt={story.title}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-3.5">
                  <h3 className="line-clamp-3 text-sm font-semibold leading-snug">{story.title}</h3>
                </div>
              </article>
            ))}
          </div>

          {/* Indication carrousel */}
          <p className="mt-4 text-center text-xs text-[#6b7280] md:hidden">Faites défiler pour voir plus de parcours</p>
        </div>
      </div>
    </section>
  );
}
