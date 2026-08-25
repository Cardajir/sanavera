/**
 * Photography and product shots exported from sanavera_web.xd, looked up by
 * file stem so content files and data modules can name an image as a string.
 */
const modules = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/img/*.webp",
  { eager: true },
);

const byName = new Map<string, ImageMetadata>(
  Object.entries(modules).map(([path, mod]) => [
    path
      .split("/")
      .pop()!
      .replace(/\.webp$/, ""),
    mod.default,
  ]),
);

/** Throws at build time rather than shipping a page with a missing image. */
export function image(name: string): ImageMetadata {
  const found = byName.get(name);
  if (!found) {
    throw new Error(
      `Unknown image "${name}". Available: ${[...byName.keys()].sort().join(", ")}`,
    );
  }
  return found;
}
