import type { Metadata } from "next";
import { LabOverview } from "../hero-lab/LabOverview";

export const metadata: Metadata = {
  title: "Claude Hero Lab — Jazari One",
  description: "Claude direction studies for the Jazari One hero section.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <LabOverview basePath="/hero-lab-claude" />;
}
