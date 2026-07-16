import type { NextConfig } from "next";

const isPagesBuild = process.env.PAGES_BUILD === "true";
const basePath = isPagesBuild ? "/sentient-agency-hub" : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
