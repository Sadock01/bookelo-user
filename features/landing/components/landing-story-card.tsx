import Link from "next/link";
import type { StaticImageData } from "next/image";

import { BookCoverImage } from "@/features/catalog/components/book-cover-image";

type LandingStoryCardProps = {
  readonly id: string;
  readonly title: string;
  readonly image: StaticImageData | string;
  readonly href?: string;
  readonly className?: string;
  readonly titleClassName?: string;
};

export function LandingStoryCard({
  id,
  title,
  image,
  href,
  className = "",
  titleClassName = "line-clamp-3 text-sm font-semibold leading-snug",
}: LandingStoryCardProps) {
  const card = (
    <article
      className={`group overflow-hidden rounded-2xl border border-[#fdeee5] bg-white shadow-lg shadow-orange-950/5 transition hover:-translate-y-1 hover:shadow-xl ${className}`}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <BookCoverImage src={image} alt={title} />
      </div>
      <div className="p-3.5">
        <h3 className={titleClassName}>{title}</h3>
      </div>
    </article>
  );

  if (href) {
    return (
      <Link key={id} href={href} className="block">
        {card}
      </Link>
    );
  }

  return card;
}
