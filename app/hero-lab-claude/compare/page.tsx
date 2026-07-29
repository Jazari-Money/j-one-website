import type { Metadata } from "next";
import { LabCompare } from "../../hero-lab/compare/LabCompare";

export const metadata: Metadata = {
  title: "Compare — Claude Hero Lab — Jazari One",
  description: "Compare two Claude hero direction studies.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <LabCompare basePath="/hero-lab-claude" />;
}
