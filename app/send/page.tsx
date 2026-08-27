import type { Metadata } from "next";
import { SendPage } from "./SendPage";

export const metadata: Metadata = {
  title: "Send money — Jazari One",
  description:
    "Send stablecoins or deliver local currency to 30+ countries, with rates and estimated recipient amounts shown before confirmation.",
  alternates: {
    canonical: "/send/",
  },
};

export default function Page() {
  return <SendPage />;
}
