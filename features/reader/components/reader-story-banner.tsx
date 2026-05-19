import Image from "next/image";
import type { StaticImageData } from "next/image";

type ReaderStoryBannerProps = {
  readonly title: string;
  readonly description?: string;
  readonly cover: string | StaticImageData;
  readonly categoryName?: string;
  readonly tags: readonly string[];
};

export function ReaderStoryBanner({
  title,
  description,
  cover,
  categoryName,
  tags,
}: ReaderStoryBannerProps) {
  const coverUrl = typeof cover === "string" ? cover : cover.src;

  return (
    <section className="relative overflow-hidden border-b border-[#e5e7eb] bg-[#f3f4f6]">
      <div
        className="absolute inset-0 scale-110 bg-cover bg-center blur-2xl brightness-90"
        style={{ backgroundImage: `url(${coverUrl})` }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/70" />

      <div className="relative mx-auto flex max-w-6xl gap-6 px-4 py-8 sm:px-6 sm:py-10">
        <div className="relative h-36 w-24 shrink-0 overflow-hidden rounded-md border border-white/80 shadow-xl sm:h-44 sm:w-28">
          {typeof cover === "string" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={cover} alt={title} className="h-full w-full object-cover" />
          ) : (
            <Image src={cover} alt={title} fill className="object-cover" sizes="112px" priority />
          )}
        </div>

        <div className="min-w-0 flex-1 py-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#6b7280]">
            Vous lisez
          </p>
          <h1 className="mt-1 font-[var(--font-poppins)] text-xl font-bold leading-tight text-[#111827] sm:text-2xl">
            {title}
          </h1>
          {categoryName ? (
            <span className="mt-2 inline-block rounded bg-[#111827] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
              {categoryName}
            </span>
          ) : null}
          {description ? (
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#4b5563]">{description}</p>
          ) : null}
          {tags.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded bg-white/80 px-2 py-0.5 text-xs font-medium text-[#374151] shadow-sm"
                >
                  #{tag.replace(/\s+/g, "").toLowerCase()}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
