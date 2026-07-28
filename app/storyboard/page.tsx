import type { Metadata } from "next";
import { StoryboardPage } from "./StoryboardPage";

export const metadata: Metadata = {
  title: "Jazari One Component Board",
  description: "An internal review surface for the Jazari One website component system.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <StoryboardPage />;
}
