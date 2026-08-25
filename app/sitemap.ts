import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const siteUrl = process.env.GITHUB_PAGES === "true"
  ? "https://jazari-money.github.io/j-one-website"
  : "https://jazari.xyz";

const routes = [
  "",
  "/about",
  "/blog",
  "/blog/send-money-to-brazil",
  "/blog/send-money-to-colombia",
  "/blog/send-money-to-europe",
  "/blog/send-money-to-mexico",
  "/help",
  "/partners",
  "/plan",
  "/pricing",
  "/privacy-policy",
  "/receive",
  "/roadmap",
  "/send",
  "/terms",
  "/uk-risk-information",
  "/yields",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
  }));
}
