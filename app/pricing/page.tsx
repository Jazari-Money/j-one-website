import { PricingPage } from "./PricingPage";

export const metadata = {
  title: "Pricing — Jazari One",
  description: "See what you pay to receive, send, hold dollars, and use Yields with Jazari One.",
  alternates: {
    canonical: "/pricing/",
  },
};

export default function Page() {
  return <PricingPage />;
}
