import Image from "next/image";
import { Camera } from "lucide-react";
import { imageExists } from "@/lib/images";

/* --------------------------------------------------------------------------
   MediaFrame renders a real photo if the file exists in /public, and a
   clearly labelled placeholder if it does not. No stock photography, no
   broken images, and no layout shift either way — the frame reserves the
   space using its aspect ratio.

   To replace a placeholder with the real thing: save the photo to the path
   shown on the placeholder and refresh.
   -------------------------------------------------------------------------- */

type Ratio = "16/9" | "4/3" | "3/2" | "1/1" | "21/9";

const ratioClass: Record<Ratio, string> = {
  "16/9": "aspect-[16/9]",
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
  "1/1": "aspect-square",
  "21/9": "aspect-[21/9]",
};

export function MediaFrame({
  src,
  alt,
  ratio = "3/2",
  sizes,
  priority = false,
  className = "",
  rounded = "rounded-[3px]",
  /** Shown on the placeholder so it is obvious what photo is missing. */
  note,
}: {
  src: string;
  alt: string;
  ratio?: Ratio;
  sizes: string;
  priority?: boolean;
  className?: string;
  rounded?: string;
  note?: string;
}) {
  const exists = imageExists(src);

  return (
    <div
      className={`relative overflow-hidden ${ratioClass[ratio]} ${rounded} ${
        exists ? "bg-line" : "border border-dashed border-line bg-paper"
      } ${className}`}
    >
      {exists ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className="object-cover"
        />
      ) : (
        <ImagePlaceholder alt={alt} src={src} note={note} />
      )}
    </div>
  );
}

function ImagePlaceholder({
  alt,
  src,
  note,
}: {
  alt: string;
  src: string;
  note?: string;
}) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-5 text-center">
      <Camera aria-hidden="true" className="size-6 text-muted/60" strokeWidth={1.5} />
      <p className="type-eyebrow text-muted">Photo needed</p>
      <p className="max-w-[38ch] text-[15px] leading-snug text-muted">{note ?? alt}</p>
      <code className="mt-1 max-w-full truncate font-mono text-[12px] text-muted/70">
        {src}
      </code>
    </div>
  );
}

/** True if at least one of these images has actually been supplied. */
export function anyImageExists(paths: string[]): boolean {
  return paths.some(imageExists);
}

export { imageExists };
