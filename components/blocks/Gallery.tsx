import { availableImages } from "@/lib/images";
import { MediaFrame } from "@/components/ui/Media";

/**
 * Real job photos. Any path in the list that has not been supplied yet is
 * skipped, so a half-filled gallery still looks deliberate. If none have
 * been supplied, nothing renders.
 */
export function Gallery({
  paths,
  serviceName,
}: {
  paths: string[];
  serviceName: string;
}) {
  const ready = availableImages(paths);

  if (ready.length === 0) return null;

  return (
    <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-16">
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
