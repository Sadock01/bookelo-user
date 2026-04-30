import Image from "next/image";

import { LANDING_SHELL } from "@/features/landing/constants/landing-layout";
import type { LandingAuthorBannerModel } from "@/features/landing/types/landing-page.types";

type LandingAuthorBannerProps = {
  readonly model: LandingAuthorBannerModel;
};

/**
 * Conversion / parcours post-paiement : accès certification (liens, codes, vouchers).
 * Distinct du hero « découverte » pour garder une intention claire par bloc (**S** du SOLID).
 */
export function LandingAuthorBanner({ model }: LandingAuthorBannerProps) {
  return (
    <section className={`${LANDING_SHELL} py-16`}>
      <div className="relative overflow-hidden rounded-[2rem] border border-[#1ec9b6]/25 bg-[#111827] p-8 text-white md:p-12">
        <div className="pointer-events-none absolute top-0 right-0 h-full w-1/2 opacity-35" aria-hidden>
          <Image
            src={model.backdropImage}
            alt={model.backdropAlt}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="relative max-w-2xl space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#96f1e7]">{model.eyebrow}</p>
          <h2 className="text-4xl font-[var(--font-poppins)] font-bold leading-tight">{model.title}</h2>
          <p className="text-base leading-8 text-[#d1d5db]">{model.body}</p>
          <button
            type="button"
            className="rounded-full bg-[#1ec9b6] px-7 py-3 text-sm font-semibold text-[#06231f] transition hover:bg-[#96f1e7]"
          >
            {model.ctaLabel}
          </button>
        </div>
      </div>
    </section>
  );
}
