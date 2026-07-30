import type { Metadata } from "next";
import { GuideArticle } from "../GuideArticle";

const description =
  "Send dollars to Mexico through SPEI in three steps. Learn which 18-digit CLABE and recipient details you need, plus timing and confirmation checks.";

export const metadata: Metadata = {
  title: "How to send dollars to Mexico in 3 steps — Jazari One",
  description,
  openGraph: {
    title: "How to send dollars to Mexico in 3 steps",
    description,
  },
};

export default function MexicoGuide() {
  return <GuideArticle article="mexico" />;
}
