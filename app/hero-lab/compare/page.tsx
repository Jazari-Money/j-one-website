import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Compare — Hero Lab — Jazari One",
  description: "Side-by-side comparison of two hero direction studies.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  redirect("/hero-lab-claude/compare/");
}
