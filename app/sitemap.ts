import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://chaoticallyorganizedai.com";
  return [
    "/",
    "/services",
    "/website-design",
    "/pricing",
    "/portfolio",
    "/faq",
    "/about",
    "/contact",
    "/intake",
    "/intake/confirmation",
    "/jax",
    "/privacy",
    "/terms"
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.8
  }));
}
