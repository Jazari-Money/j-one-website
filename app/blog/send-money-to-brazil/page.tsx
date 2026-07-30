import type { Metadata } from "next";
import { GuideArticle } from "../GuideArticle";

const description =
  "Send dollars to Brazil through Pix in three steps. Learn which Pix key and recipient details you need, what to review, and when the reais should arrive.";

export const metadata: Metadata = {
  title: "How to send dollars to Brazil in 3 steps — Jazari One",
  description,
  openGraph: {
    title: "How to send dollars to Brazil in 3 steps",
    description,
  },
};

export default function BrazilGuide() {
  return <GuideArticle article="brazil" />;
}
