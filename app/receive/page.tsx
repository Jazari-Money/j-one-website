import type { Metadata } from "next";
import { ReceivePage } from "./ReceivePage";

export const metadata: Metadata = {
  title: "Receive — Jazari One",
  description:
    "Add your own money or receive bank transfers and digital dollars into one Jazari One balance.",
  alternates: {
    canonical: "/receive/",
  },
};

export default function Page() {
  return <ReceivePage />;
}
