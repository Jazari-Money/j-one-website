import type { Metadata } from "next";
import { EmailLink, PrivacyLink } from "../legal/LegalElements";
import { LegalPage, type LegalSection } from "../legal/LegalPage";

export const metadata: Metadata = {
  title: "Delete Account — Jazari One",
  description: "How to delete your Jazari One account.",
  robots: {
    index: false,
    follow: false,
  },
};

const sections: LegalSection[] = [
  {
    id: "requesting-deletion",
    title: "1. Requesting account deletion",
    content: (
      <>
        <p>To delete your Jazari One account, send an email to our support team at <EmailLink />.</p>
        <p>Please include the following in your email:</p>
        <ul>
          <li>Your phone number, as registered in the app</li>
          <li>Your registered email address</li>
          <li>A short request stating that you wish to delete your account</li>
        </ul>
      </>
    ),
  },
  {
    id: "processing-time",
    title: "2. Processing time",
    content: (
      <>
        <p>We will respond to your request within three working days.</p>
        <p>Once your request is verified, we will delete your account and associated data in accordance with our <PrivacyLink />.</p>
      </>
    ),
  },
  {
    id: "after-deletion",
    title: "3. What happens after deletion",
    content: (
      <ul>
        <li>You will no longer have access to your Jazari One account.</li>
        <li>Any stored data will be permanently removed, except where we are required by law to retain it.</li>
        <li>If you wish to use Jazari One again, you will need to create a new account.</li>
      </ul>
    ),
  },
  {
    id: "need-help",
    title: "4. Need help",
    content: (
      <p>If you have any questions about deleting your account, contact us at <EmailLink />.</p>
    ),
  },
];

export default function DeleteAccountPage() {
  return (
    <LegalPage
      title="Delete Your Account"
      date="Last updated: 27 Aug 2026"
      introduction={
        <p>How to permanently remove your Jazari One account and the data associated with it.</p>
      }
      sections={sections}
    />
  );
}
