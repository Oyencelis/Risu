import type { MetadataRoute } from "next";
import { realProjects } from "@/content/site";

const base =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/about", "/works", ...realProjects.map((p) => `/works/${p.slug}`)];
  return paths.map((path) => ({ url: `${base}${path}` }));
}
