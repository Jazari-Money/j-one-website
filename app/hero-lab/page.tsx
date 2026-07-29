import type { Metadata } from "next";
import { HeroLabChooser } from "./HeroLabChooser";

export const metadata: Metadata = {
  title: "Hero Labs — Jazari One",
  description: "Choose between two independent Jazari One hero laboratories.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <HeroLabChooser />;
}
