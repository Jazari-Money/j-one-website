import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const siteUrl = process.env.GITHUB_PAGES === "true"
  ? "https://jazari-money.github.io/j-one-website"
  : "https://jazari.xyz";

const routes = [
  "",
  "/about",
  "/blog",
  "/blog/compare-transfer-costs",
  "/blog/digital-dollars-bank-payouts",
  "/blog/send-money-to-brazil",
  "/blog/send-money-to-colombia",
  "/blog/send-money-to-europe",
  "/blog/send-money-to-mexico",
  "/blog/verify-recipient-details",
  "/help",
  "/partners",
  "/plan",
  "/pricing",
  "/privacy-policy",
  "/roadmap",
  "/terms",
  "/uk-risk-information",
  "/usd-account",
  "/yields",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
  }));
}
