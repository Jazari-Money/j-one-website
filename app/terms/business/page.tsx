import { LegalPage } from "../../legal/LegalPage";
import BusinessTermsContent, { businessTermsIndex } from "./BusinessTermsContent";

export const metadata = {
  title: "Business Terms and Conditions — Jazari One",
  description:
    "Version 1.0 of the Jazari One Business Terms and Conditions, effective 21 October 2026.",
};

export default function BusinessTermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      date="Effective date: 21 October 2026"
      introduction={null}
      indexSections={businessTermsIndex}
      termsVersion="business"
      document={<BusinessTermsContent />}
    />
  );
}
