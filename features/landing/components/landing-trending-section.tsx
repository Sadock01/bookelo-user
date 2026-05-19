import Link from "next/link";

import { LandingBookShelf } from "@/features/landing/components/landing-book-shelf";
import { LANDING_SHELL } from "@/features/landing/constants/landing-layout";
import type { LandingTrendingModel } from "@/features/landing/types/landing-page.types";

type LandingTrendingSectionProps = {
  readonly model: LandingTrendingModel;
};

export function LandingTrendingSection({ model }: LandingTrendingSectionProps) {
  const seeAllHref = model.seeAllHref ?? "/books";

  return (
    <section
      id="parcours"
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
          <Link
            href={seeAllHref}
            className="inline-flex items-center gap-2 rounded-full border border-transparent px-4 py-2 text-sm font-semibold text-[#169283] transition hover:border-[#1ec9b6]/40 hover:bg-white/70"
          >
            {model.seeAllLabel}
            <span aria-hidden>→</span>
          </Link>
        </div>

        <LandingBookShelf stories={model.stories} />
      </div>
    </section>
  );
}
