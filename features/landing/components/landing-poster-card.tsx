import Link from "next/link";
import type { StaticImageData } from "next/image";

import { BookCoverImage } from "@/features/catalog/components/book-cover-image";

/** Largeur fixe de l'affiche — identique pour tous les items de l'étagère. */
const POSTER_WIDTH =
  "w-[9.75rem] sm:w-[11.25rem] md:w-[12.5rem]";

type LandingPosterCardProps = {
  readonly id: string;
  readonly title: string;
  readonly image: StaticImageData | string;
  readonly href?: string;
};

export function LandingPosterCard({ title, image, href }: LandingPosterCardProps) {
  const card = (
    <article className={`group shrink-0 ${POSTER_WIDTH}`}>
      <div className="relative aspect-[2/3] overflow-hidden rounded-xl border border-white/90 bg-white shadow-[0_10px_32px_-10px_rgba(22,146,131,0.4)] transition duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_16px_40px_-10px_rgba(22,146,131,0.5)]">
        <BookCoverImage
          src={image}
          alt={title}
          className="object-cover"
          sizes="(max-width: 640px) 156px, 200px"
        />
      </div>
      <h3 className="mt-2.5 line-clamp-2 text-center text-[13px] font-semibold leading-snug text-[#111827] group-hover:text-[#169283] sm:text-sm">
        {title}
      </h3>
    </article>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {card}
      </Link>
    );
  }

  return card;
}
