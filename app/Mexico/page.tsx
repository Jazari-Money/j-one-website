import type { Metadata } from "next";
import { LatamPage } from "../countries/LatamPage";
import { latamCountries } from "../countries/latam";

const c = latamCountries.Mexico;
const image = "/images/countries/mexico-sender.webp";
export const metadata: Metadata = {
  title: c.title.es, description: c.description.es, alternates: { canonical: "/Mexico/" },
  openGraph: { title: c.title.es, description: c.description.es, url: "/Mexico/", locale: "es_US", images: [{ url: image, width: 1536, height: 1024 }], type: "website" },
  twitter: { card: "summary_large_image", title: c.title.es, description: c.description.es, images: [image] },
};
export default function MexicoPage() { return <LatamPage country="Mexico" />; }
