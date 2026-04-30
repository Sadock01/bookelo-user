import Image from "next/image";

import { LANDING_SHELL } from "@/features/landing/constants/landing-layout";
import type { LandingHeroModel } from "@/features/landing/types/landing-page.types";

type LandingHeroProps = {
  readonly model: LandingHeroModel;
};

/**
 * Hero « deux colonnes » avec formes organiques (inspiré des landings type Wattpad),
 * couleurs dérivées de la charte Bookelo (turquoise doux + crème).
 */
export function LandingHero({ model }: LandingHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#faf8f5]" aria-labelledby="landing-hero-title">
      {/* Formes organiques arrière-plan */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -top-40 -left-28 h-[28rem] w-[28rem] rounded-[45%_55%_60%_40%] bg-[#ffe8dc]/90 blur-[2px]" />
        <div className="absolute -top-24 right-[-10%] h-[22rem] w-[min(42rem,90vw)] rounded-[52%_48%_40%_60%] bg-[#96f1e7]/55" />
        <div className="absolute bottom-[-20%] left-[15%] h-80 w-80 rounded-[60%_40%_50%_50%] bg-[#1ec9b6]/10 blur-xl" />
        <svg
          className="absolute bottom-0 left-0 w-full opacity-[0.35] text-[#96f1e7]"
          viewBox="0 0 1440 120"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M0 80C240 120 480 0 720 40C960 80 1200 20 1440 60V120H0V80Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className={`${LANDING_SHELL} relative z-[1] grid items-start gap-12 py-16 md:grid-cols-2 md:items-stretch md:py-24`}>
        <div className="space-y-8">
          <p className="inline-flex rounded-full border border-[#1ec9b6]/35 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#169283] shadow-sm backdrop-blur">
            {model.eyebrow}
          </p>
          <h1
            id="landing-hero-title"
            className="max-w-xl text-4xl leading-[1.08] font-[var(--font-poppins)] font-bold tracking-tight text-[#111827] sm:text-5xl lg:text-6xl"
          >
            {model.title}
          </h1>
          <p className="max-w-lg text-lg leading-8 text-[#4b5563]">{model.subtitle}</p>
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              className="rounded-full bg-[#111827] px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-black/10 transition hover:bg-black"
            >
              {model.primaryCtaLabel}
            </button>
            <button
              type="button"
              className="rounded-full border-2 border-[#1ec9b6] bg-white/90 px-8 py-3.5 text-base font-semibold text-[#169283] backdrop-blur transition hover:bg-[#96f1e7]/35"
            >
              {model.secondaryCtaLabel}
            </button>
          </div>
        </div>
        <div className="relative md:h-full">
          <div className="absolute -top-8 -left-8 h-40 w-40 rounded-full bg-[#96f1e7]/60 blur-2xl" aria-hidden />
          <div className="absolute -right-6 -bottom-8 h-44 w-44 rounded-full bg-[#00c0ad]/25 blur-2xl" aria-hidden />
          <div className="relative h-[380px] overflow-hidden rounded-[2rem] border border-white/70 bg-transparent p-2 shadow-2xl shadow-[#169283]/15 ring-1 ring-[#1ec9b6]/20 md:h-full md:min-h-[520px] md:p-3">
            <Image
              src={model.heroImage}
              alt={model.heroImageAlt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="scale-[1.38] object-contain object-center md:scale-[1.45]"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
