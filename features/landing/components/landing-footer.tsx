import Image from "next/image";
import Link from "next/link";

import type { LandingFooterModel } from "@/features/landing/types/landing-page.types";

type LandingFooterProps = {
  readonly model: LandingFooterModel;
};

/**
 * Reproduction du bloc final de style Wattpad:
 * grand visuel, découpe en vague sombre, puis liens de navigation.
 */
export function LandingFooter({ model }: LandingFooterProps) {
  return (
    <footer className="mt-10">
      <div className="relative">
        <div className="relative h-[340px] overflow-hidden md:h-[420px]">
          <Image src={model.showcaseImage} alt={model.showcaseAlt} className="h-full w-full object-cover" />
        </div>

        <svg
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
          className="relative -mt-24 h-28 w-full text-[#2d2e32] md:-mt-28 md:h-36"
          aria-hidden
        >
          <path
            d="M0,120 C180,70 280,170 430,140 C560,112 670,32 810,72 C940,110 1060,166 1200,142 C1305,124 1380,88 1440,96 L1440,180 L0,180 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="bg-[#2d2e32] px-6 pb-10 pt-6 text-white">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm font-semibold text-white/90">
          {model.links.map((link) => (
            <Link key={link.id} href={link.href} className="transition hover:text-[#96f1e7]">
              {link.label}
            </Link>
          ))}
          <span className="text-white/60">{model.copyright}</span>
        </div>
      </div>
    </footer>
  );
}
