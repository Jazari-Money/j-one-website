import type { Metadata } from "next";
import { CodexCompare } from "../CodexCompare";

export const metadata: Metadata = {
  title: "Compare — Codex Hero Lab — Jazari One",
  description: "Compare two independent Codex hero studies.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <CodexCompare />;
}
