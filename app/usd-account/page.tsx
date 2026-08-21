import { UsdAccountPage } from "./UsdAccountPage";

export const metadata = {
  title: "USD account — Jazari One",
  description:
    "Receive payments through US routing and account details in your name with Jazari One.",
  alternates: {
    canonical: "/usd-account/",
  },
};

export default function Page() {
  return <UsdAccountPage />;
}
