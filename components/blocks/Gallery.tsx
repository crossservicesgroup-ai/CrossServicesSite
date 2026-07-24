import { ImageOff } from "lucide-react";
import { availableImages } from "@/lib/images";
import { MediaFrame } from "@/components/ui/Media";

/**
 * Real job photos. Any path in the list that has not been supplied yet is
 * skipped, so a half-filled gallery still looks deliberate. If none have
 * been supplied, a single compact note lists the paths we are waiting on
 * rather than filling the page with empty boxes.
 */
export function Gallery({
  paths,
  serviceName,
}: {
  paths: string[];
  serviceName: string;
}) {
  const ready = availableImages(paths);

  if (ready.length === 0) {
    return (
      <div className="flex items-start gap-3 rounded-[3px] border border-dashed border-line bg-paper p-5">
        <ImageOff aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-muted/70" />
        <div>
          <p className="type-eyebrow text-muted">Job photos needed</p>
          <p className="mt-2 text-[15px] text-muted">
            Save {serviceName.toLowerCase()} photos to these paths and they appear here
            automatically:
          </p>
          <ul className="mt-2 flex flex-col gap-1">
            {paths.map((path) => (
              <li key={path} className="font-mono text-[12px] text-muted">
                {path}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {ready.map((path, i) => (
        <li key={path}>
          <MediaFrame
            src={path}
            alt={`${serviceName} work by Cross Services Group, photo ${i + 1}`}
            ratio="3/2"
            sizes="(min-width: 1024px) 340px, (min-width: 640px) 45vw, 90vw"
          />
        </li>
      ))}
    </ul>
  );
}
