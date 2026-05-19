"use client";

type ReaderPdfPanelProps = {
  readonly title: string;
  readonly previewUrl: string;
};

/** Zone de lecture centrale — PDF extrait dans une colonne type Wattpad. */
export function ReaderPdfPanel({ title, previewUrl }: ReaderPdfPanelProps) {
  return (
    <div className="w-full">
      <div className="mx-auto max-w-[42rem] px-2 sm:px-0">
        <iframe
          title={`Lecture — ${title}`}
          src={`${previewUrl}#toolbar=0&navpanes=0&scrollbar=1`}
          className="min-h-[75vh] w-full rounded-sm border border-[#e5e7eb] bg-white shadow-sm"
        />
      </div>
    </div>
  );
}
