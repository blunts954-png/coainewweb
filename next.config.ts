import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // Pin tracing to this app when a parent directory has another lockfile (avoids wrong root on CI/Vercel).
  outputFileTracingRoot: __dirname,
  images: {
    formats: ["image/avif", "image/webp"]
  }
};

export default nextConfig;
