import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://chaoticallyorganizedai.com";
  return [
    "/",
    "/services",
    "/website-design",
    "/website-design/kern-county",
    "/website-design/bakersfield",
    "/website-design/delano",
    "/website-design/shafter",
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
