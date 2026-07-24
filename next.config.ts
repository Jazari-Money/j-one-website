import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const githubPagesBasePath = "/j-one-website";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  ...(isGitHubPages
    ? {
        basePath: githubPagesBasePath,
        assetPrefix: githubPagesBasePath,
      }
    : {}),
};

export default nextConfig;
