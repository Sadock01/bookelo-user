import Image from "next/image";

import { LANDING_SHELL } from "@/features/landing/constants/landing-layout";
import type { LandingCommunityPromoModel } from "@/features/landing/types/landing-page.types";

type LandingCommunityPromoProps = {
  readonly model: LandingCommunityPromoModel;
};

/**
 * Bandeau coloré façon « étagère à la Une » : fond pastel façon Wattpad mais en déclinaison turquoise Bookelo,
 * titre centré et rangée de cartes certifications.
 */
export function LandingCommunityPromo({ model }: LandingCommunityPromoProps) {
  return (
    <section className="bg-[#faf8f5] py-10 md:py-14">
      <div className={`${LANDING_SHELL}`}>
        <div className="relative overflow-hidden rounded-[2rem] border border-[#b8eae3]/80 bg-gradient-to-br from-[#d9fbf6] via-[#c8f4ee] to-[#96f1e7]/65 px-6 py-10 shadow-inner shadow-[#169283]/10 md:px-12 md:py-14">
          <div className="pointer-events-none absolute -right-8 top-8 h-40 w-40 rotate-12 opacity-30 blur-sm" aria-hidden>
            <Image
              src={model.decorationImage}
              alt={model.decorationAlt}
              className="h-full w-full object-contain"
            />
          </div>

          <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-[#169283]">
            {model.eyebrow}
          </p>
          <h3 className="mx-auto mt-4 max-w-3xl text-center text-3xl font-[var(--font-poppins)] font-bold leading-tight text-[#111827] md:text-4xl">
            {model.title}
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-[#374151] md:text-base">
            {model.body}
          </p>

          <div className="mt-10 -mx-2 flex gap-4 overflow-x-auto px-2 pb-2 pt-2 [scrollbar-width:thin] md:-mx-0 md:flex-wrap md:justify-center md:overflow-visible md:pb-0">
            {model.stories.map((story) => (
              <article
                key={story.id}
                className="group w-[38vw] max-w-[9.5rem] shrink-0 overflow-hidden rounded-xl border border-white/80 bg-white/95 shadow-lg shadow-[#169283]/10 md:w-[calc(25%-12px)] md:max-w-none lg:w-[calc(20%-14px)]"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={story.image}
                    alt={story.title}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.05]"
                  />
                </div>
                <div className="px-2 py-2.5">
                  <h4 className="line-clamp-3 text-[11px] font-semibold leading-snug md:text-xs">{story.title}</h4>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <button
              type="button"
              className="rounded-full bg-[#111827] px-8 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-black"
            >
              {model.ctaLabel}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
