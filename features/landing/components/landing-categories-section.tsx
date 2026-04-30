import Image from "next/image";

import { LANDING_SHELL } from "@/features/landing/constants/landing-layout";
import type { LandingCategoriesModel } from "@/features/landing/types/landing-page.types";

type LandingCategoriesSectionProps = {
  readonly model: LandingCategoriesModel;
};

/**
 * Section « tous les genres » réinterprétée : domaines IT / certifications.
 * Visuel latéral + grille de filtres à brancher ultérieurement sur le catalogue.
 */
export function LandingCategoriesSection({ model }: LandingCategoriesSectionProps) {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className={`${LANDING_SHELL} grid items-center gap-12 lg:grid-cols-2 lg:gap-16`}>
        <div className="space-y-6">
          <h2 className="text-3xl font-[var(--font-poppins)] font-bold tracking-tight text-[#111827] md:text-4xl lg:text-[2.65rem] lg:leading-tight">
            {model.title}
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-[#4b5563]">{model.subtitle}</p>

          <div className="relative max-w-md">
            <label className="sr-only">Exemple de recherche par domaine</label>
            <span className="pointer-events-none absolute left-4 top-1/2 inline-flex -translate-y-1/2 rounded-full bg-[#96f1e7]/35 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#169283]">
              Hint
            </span>
            <input
              type="search"
              readOnly
              placeholder="Essayez « Security+ » ou « Python »…"
              className="w-full cursor-default rounded-full border border-[#e5e7eb] bg-[#fafafa] py-3 pr-4 pl-[4.5rem] text-sm text-[#374151] shadow-sm outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {model.tags.map((tag) => (
              <button
                key={tag.id}
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-[#e5e7eb] bg-white px-3.5 py-2 text-sm font-medium text-[#374151] shadow-sm transition hover:border-[#1ec9b6] hover:bg-[#f0fdf9] hover:text-[#169283]"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#96f1e7]/55 text-[10px] font-bold text-[#169283]" aria-hidden>
                  #
                </span>
                {tag.label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <Image
            src={model.illustration}
            alt={model.illustrationAlt}
            className="h-auto w-full object-contain"
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
        </div>
      </div>
    </section>
  );
}
