import type { MetadataRoute } from "next";
export const dynamic = "force-static";

const base = "https://hammamnash.site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/projects/runees`, changeFrequency: "monthly", priority: 0.8 },
  ];
}