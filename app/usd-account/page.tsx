import { redirect } from "next/navigation";
import { withBasePath } from "../site-paths";

export const metadata = {
  title: "Receive — Jazari One",
  description:
    "Get US routing and account details in your name to add your own money or receive ACH, FedNow, wire, and SWIFT transfers.",
  alternates: {
    canonical: "/receive/",
  },
};

export default function Page() {
  redirect(withBasePath("/receive/#usd-account"));
}
