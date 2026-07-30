import type { Metadata } from "next";
import { AboutPage } from "./AboutPage";

export const metadata: Metadata = {
  title: "About us — Jazari One",
  description:
    "See who holds and moves your money, runs your wallet, and manages yield strategies when you use Jazari One.",
  openGraph: {
    title: "Who you’re trusting with your money — Jazari One",
    description:
      "See the public, regulated partners responsible for custody, payouts, wallet controls, and yield strategies.",
  },
};

export default function Page() {
  return <AboutPage />;
}
