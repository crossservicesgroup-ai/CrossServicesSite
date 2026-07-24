/* ==========================================================================
   IMAGE AVAILABILITY

   The site is built before the real photography exists. Rather than ship
   broken images or use stock photos, every image slot checks whether the
   file is actually sitting in /public. If it is, the photo renders. If it is
   not, a clearly labelled "photo needed" panel renders in its place.

   That means: to add a photo, just drop the file into /public/images/... at
   the path named in content/services.ts. Nothing else to change.

   This only ever runs on the server, at build time.
   ========================================================================== */

import fs from "node:fs";
import path from "node:path";

const publicDir = path.join(process.cwd(), "public");
const cache = new Map<string, boolean>();

/** True when the file named by a /public path actually exists on disk. */
export function imageExists(publicPath: string | null | undefined): boolean {
  if (!publicPath) return false;
  const cached = cache.get(publicPath);
  if (cached !== undefined) return cached;

  const clean = publicPath.split("?")[0].replace(/^\//, "");
  let exists = false;
  try {
    exists = fs.statSync(path.join(publicDir, clean)).isFile();
  } catch {
    exists = false;
  }
  cache.set(publicPath, exists);
  return exists;
}

/** Filters a gallery down to the images that have actually been supplied. */
export function availableImages(paths: string[]): string[] {
  return paths.filter(imageExists);
}
