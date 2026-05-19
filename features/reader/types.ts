import type { StaticImageData } from "next/image";

export type ReaderBookData = {
  readonly id: string;
  readonly title: string;
  readonly author?: string;
  readonly description?: string;
  readonly cover: string | StaticImageData;
  readonly categoryName?: string;
  readonly language?: string;
  readonly views: number;
  readonly likes: number;
  readonly commentsCount: number;
  readonly previewPageCount: number;
  readonly price?: number;
  readonly tags: readonly string[];
};
