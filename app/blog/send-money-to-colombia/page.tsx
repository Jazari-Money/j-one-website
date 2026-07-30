import type { Metadata } from "next";
import { GuideArticle } from "../GuideArticle";

const description =
  "Send dollars to Colombia through Bre-B in three steps. Learn which llave and recipient details you need, what to check, and typical payout timing.";

export const metadata: Metadata = {
  title: "How to send dollars to Colombia in 3 steps — Jazari One",
  description,
  openGraph: {
    title: "How to send dollars to Colombia in 3 steps",
    description,
  },
};

export default function ColombiaGuide() {
  return <GuideArticle article="colombia" />;
}
