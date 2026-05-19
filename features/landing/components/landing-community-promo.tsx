import Image from "next/image";
import Link from "next/link";

import { LandingBookShelf } from "@/features/landing/components/landing-book-shelf";
import { LANDING_SHELL } from "@/features/landing/constants/landing-layout";
import type { LandingCommunityPromoModel } from "@/features/landing/types/landing-page.types";

type LandingCommunityPromoProps = {
  readonly model: LandingCommunityPromoModel;
};

export function LandingCommunityPromo({ model }: LandingCommunityPromoProps) {
  const ctaHref = model.ctaHref ?? "/books";

  return (
    <section id="communaute" className="bg-[#faf8f5] py-10 md:py-14">
      <div className={LANDING_SHELL}>
        <div className="relative overflow-hidden rounded-[2rem] border border-[#b8eae3]/80 bg-gradient-to-br from-[#d9fbf6] via-[#c8f4ee] to-[#96f1e7]/55 px-5 py-10 shadow-inner shadow-[#169283]/10 sm:px-8 md:px-12 md:py-14">
          <div
            className="pointer-events-none absolute -right-6 top-6 hidden h-40 w-40 rotate-12 opacity-20 md:block"
            aria-hidden
          >
            <Image src={model.decorationImage} alt="" className="h-full w-full object-contain" />
          </div>

          <div className="relative text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#169283]">
              {model.eyebrow}
            </p>
            <h3 className="mx-auto mt-4 max-w-3xl font-[var(--font-poppins)] text-3xl font-bold leading-tight text-[#111827] md:text-4xl">
              {model.title}
            </h3>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#374151] md:text-base">
              {model.body}
            </p>
          </div>

          <LandingBookShelf stories={model.stories} className="mt-10 md:mt-12" />

          <div className="mt-10 flex justify-center">
            <Link
              href={ctaHref}
              className="rounded-full bg-[#111827] px-8 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-black"
            >
              {model.ctaLabel}
            </Link>
          </div>
          </div>
      </div>
    </section>
  );
}
