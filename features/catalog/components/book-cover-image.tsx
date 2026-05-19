import Image, { type StaticImageData } from "next/image";

type BookCoverImageProps = {
  readonly src: string | StaticImageData;
  readonly alt: string;
  readonly className?: string;
  readonly sizes?: string;
  readonly priority?: boolean;
};

export function BookCoverImage({
  src,
  alt,
  className = "h-full w-full object-cover",
  sizes = "(max-width: 768px) 42vw, 240px",
  priority = false,
}: BookCoverImageProps) {
  if (typeof src === "string") {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- URLs distantes non connues à la build.
      <img
        src={src}
        alt={alt}
        className={`absolute inset-0 h-full w-full ${className}`}
        loading={priority ? "eager" : "lazy"}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={className}
      sizes={sizes}
      priority={priority}
    />
  );
}
