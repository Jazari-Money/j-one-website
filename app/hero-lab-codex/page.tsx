import type { Metadata } from "next";
import { CodexOverview } from "./CodexOverview";

export const metadata: Metadata = {
  title: "Codex Hero Lab — Jazari One",
  description: "Independent Codex direction studies for the Jazari One hero section.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <CodexOverview />;
}
