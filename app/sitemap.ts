import type { MetadataRoute } from "next";
import { countryGuides } from "./countries/guides";

export const dynamic = "force-static";

const siteUrl = "https://jazari.xyz";

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
  "/terms/non-us",
  "/terms/business",
  "/uk-risk-information",
  "/yields",
  "/Kenya/",
  "/Nigeria/",
  ...countryGuides.map(({ slug }) => `/blog/${slug}/`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
  }));
}
