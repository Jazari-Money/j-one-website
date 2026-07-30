import type { Metadata } from "next";
import { AboutPage } from "./AboutPage";

export const metadata: Metadata = {
  title: "About us — Jazari One",
  description:
    "Why we are building Jazari One, where our businesses are registered, and who helps us move and manage money.",
  openGraph: {
    title: "About us — Jazari One",
    description:
      "Our manifesto, our registered businesses in the United States and UAE, and the partners behind Jazari One.",
  },
};

export default function Page() {
  return <AboutPage />;
}
