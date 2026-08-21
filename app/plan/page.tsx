import { PricingPage } from "../pricing/PricingPage";

export const metadata = {
  title: "Plan — Jazari One",
  description: "See what you pay to receive, send, hold dollars, and use Yields with Jazari One.",
  alternates: {
    canonical: "/pricing/",
  },
};

export default function Page() {
  return <PricingPage />;
}
