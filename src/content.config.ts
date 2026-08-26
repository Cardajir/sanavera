import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

/**
 * One shape for all four modals. Each entry is a panel: the sidebar shows
 * `navLabel`, the panel opens with `title` and `lead`, and the body is the
 * Markdown. All of it is generated from the artboards in sanavera_web_foto.xd.
 */
const panel = z.object({
  title: z.string(),
  navLabel: z.string(),
  order: z.number(),
  lead: z.string(),
  description: z.string().optional(),
  images: z.array(z.string()).default([]),
});

const collection = (dir: string) =>
  defineCollection({
    loader: glob({ base: `./src/content/${dir}`, pattern: "**/*.md" }),
    schema: panel,
  });

const tym = collection("tym");
const pristup = collection("pristup");
const vybaveni = collection("vybaveni");
const sluzby = collection("sluzby");

export const collections = { tym, pristup, vybaveni, sluzby };
