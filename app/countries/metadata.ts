import type { Metadata } from "next";
import { countries, type Country } from "./data";

export function countryMetadata(country: Country): Metadata {
  const title = `Dollar account & USDT in ${country} — Jazari One`;
  const description = countries[country].description;
  const image = `/images/countries/${country.toLowerCase()}-professional.webp`;
  return { title, description, alternates: { canonical: `/${country}/` },
    openGraph: { title, description, url: `/${country}/`, images: [{ url: image, width: 1536, height: 1024 }], type: "website" },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
