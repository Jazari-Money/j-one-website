import type { Metadata } from "next";
import { GuideArticle } from "../GuideArticle";

const description =
  "Send dollars to Europe through SEPA in three steps. Learn which IBAN, BIC or SWIFT details you need, what to review, and typical bank payout timing.";

export const metadata: Metadata = {
  title: "How to send dollars to Europe in 3 steps — Jazari One",
  description,
  openGraph: {
    title: "How to send dollars to Europe in 3 steps",
    description,
  },
};

export default function EuropeGuide() {
  return <GuideArticle article="europe" />;
}
