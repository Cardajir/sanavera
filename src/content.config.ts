import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const sluzby = defineCollection({
  loader: glob({ base: "./src/content/sluzby", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    lead: z.string(),
    description: z.string().optional(),
  }),
});

const technologie = defineCollection({
  loader: glob({ base: "./src/content/technologie", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    navLabel: z.string(),
    order: z.number(),
    lead: z.string(),
    description: z.string().optional(),
    images: z.array(z.string()).default([]),
  }),
});

export const collections = { sluzby, technologie };
