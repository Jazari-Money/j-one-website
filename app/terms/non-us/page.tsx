import { LegalPage } from "../../legal/LegalPage";
import NonUsTermsContent, {
  nonUsTermsIndex,
} from "./NonUsTermsContent";

export const metadata = {
  title: "Terms and Conditions — Jazari One",
  description:
    "Terms governing the use of Jazari One services outside the United States.",
};

export default function NonUsTermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      date="Effective date: April 2026"
      introduction={null}
      indexSections={nonUsTermsIndex}
      termsVersion="non-us"
      document={<NonUsTermsContent />}
    />
  );
}
