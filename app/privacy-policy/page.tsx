import Link from "next/link";
import { EmailLink, LegalTable } from "../legal/LegalElements";
import { LegalPage, type LegalSection } from "../legal/LegalPage";

export const metadata = {
  title: "Privacy Policy — Jazari One",
  description: "How Jazari One collects, uses, shares, and protects personal data.",
};

const sections: LegalSection[] = [
  {
    id: "about-us",
    title: "1. About Us",
    content: (
      <>
        <p>For data protection purposes, JAZARI FINTECH SERVICES - FZCO is the data controller for your personal data related to Jazari One services. Jazari One is a trading name of JAZARI FINTECH SERVICES - FZCO. Our registered address is:</p>
        <p>#78870, Building A1, IFZA Business Park, Dubai Silicon Oasis, Dubai, UAE</p>
        <p>Jazari One is a stablecoin wallet application that enables cross-border payments and remittances using USDC and USDT across Ethereum, Tron, and Solana networks.</p>
        <p>If you have any questions or requests regarding your personal data, you can contact us at: <EmailLink /></p>
      </>
    ),
  },
  {
    id: "data-collected",
    title: "2. What Data We Collect",
    content: (
      <>
        <p>We may collect and use the following types of personal data:</p>
        <h3>Information you provide directly:</h3>
        <ul>
          <li>Name, date of birth, address</li>
          <li>Contact information (email, phone number)</li>
          <li>Identification documents (e.g., passport, national ID, utility bill)</li>
          <li>Freelancer platform details (e.g., Fiverr account information, if connected)</li>
          <li>Any data you enter into our apps, forms, or communications</li>
        </ul>
        <h3>Information we collect automatically:</h3>
        <ul>
          <li>IP address, device details, and browser type</li>
          <li>Usage data (clicks, page views, time spent in app)</li>
          <li>Transactional data (payment amount, recipient details, time, location)</li>
          <li>Blockchain wallet addresses and on-chain transaction data</li>
        </ul>
        <h3>Information from others:</h3>
        <ul>
          <li>Identity verification data (via our licensed KYC provider)</li>
          <li>Stablecoin transaction and settlement data (via our licensed infrastructure partner)</li>
          <li>
            Google account information when you use Sign in with Google: typically your name,
            email address, profile picture, and a unique Google account identifier. We receive
            only the data you authorize Google to share with us. We do not receive your Google
            password.
          </li>
          <li>
            Apple account information when you use Sign in with Apple: typically your name,
            email address, and a unique Apple user identifier. If you choose Apple&apos;s
            &quot;Hide My Email&quot; option, Apple provides us with a private relay email
            address instead of your personal email; we use that relay address to communicate
            with you (including to confirm your email) without receiving your underlying Apple
            Account email. We do not receive your Apple Account password.
          </li>
        </ul>
        <p>We do not collect biometric data.</p>
      </>
    ),
  },
  {
    id: "legal-basis",
    title: "3. Legal Basis for Processing",
    content: (
      <>
        <p>We use your personal data under the following legal grounds:</p>
        <ul>
          <li><strong>Contractual necessity:</strong> To deliver services and fulfill our agreement with you</li>
          <li><strong>Legal obligation:</strong> To comply with financial regulations and anti-money laundering laws</li>
          <li><strong>Legitimate interest:</strong> To improve our services, prevent fraud, and understand our users</li>
          <li><strong>Consent:</strong> Where required (e.g., certain marketing or data sharing preferences, or when you choose Sign in with Google or Sign in with Apple)</li>
        </ul>
      </>
    ),
  },
  {
    id: "data-use",
    title: "4. How We Use Your Data",
    content: (
      <>
        <LegalTable
          headers={["Purpose", "Legal Basis"]}
          rows={[
            ["Account creation and identity verification", "Contract, Legal Obligation"],
            ["Sign in with Google or Sign in with Apple authentication, email confirmation, and account access", "Contract, Consent"],
            ["Transaction processing and stablecoin transfers", "Contract"],
            ["Freelancer platform integration (e.g., Fiverr)", "Contract, Consent"],
            ["Customer support", "Contract, Legitimate Interest"],
            ["Fraud prevention and AML screening", "Legal Obligation, Legitimate Interest"],
            ["Service improvements", "Legitimate Interest"],
            ["Marketing communications", "Consent, Legitimate Interest"],
            ["Legal compliance and enforcement", "Legal Obligation"],
          ]}
        />
        <h3>Third-party sign-in (Google and Apple)</h3>
        <p>
          When you sign in with Google or Sign in with Apple, we use the account information
          you authorize solely to create and authenticate your Jazari One account, confirm your
          email address, pre-fill account details (such as name and email), communicate with you
          about your account, and help secure access and prevent fraud.
        </p>
        <p>
          We use Google and Apple user data only to provide or improve user-facing features of
          Jazari One. We do not sell that data; use it for advertising, personalized ads, or
          retargeting; transfer it to data brokers or information resellers; use it to determine
          credit-worthiness or for lending decisions; or use it to develop, improve, or train
          generalized or non-personalized AI and/or ML models.
        </p>
      </>
    ),
  },
  {
    id: "data-sharing",
    title: "5. Who We Share Your Data With",
    content: (
      <>
        <p>We only share your data with trusted partners when necessary:</p>
        <LegalTable
          headers={["Partner", "Purpose"]}
          rows={[
            ["Licensed Infrastructure Partner", "Stablecoin transaction processing and settlement across Ethereum, Tron, and Solana networks"],
            ["Licensed KYC Provider", "Identity verification and AML/KYC screening"],
            ["Google", "Sign in with Google authentication and related identity services"],
            ["Apple", "Sign in with Apple authentication and related identity services, including Hide My Email relay where you choose that option"],
            ["Privy", "Embedded authentication and wallet infrastructure, including processing Sign in with Google or Sign in with Apple where you choose those methods"],
            ["Google Cloud", "Platform hosting and infrastructure"],
            ["Google Workspace & Auth0", "Identity and access management for back-office operations"],
            ["Intercom", "Customer support chat and automation"],
            ["SendGrid", "Email notifications and verification"],
            ["TeleSign", "OTP and authentication services for login and fraud protection"],
            ["Framer", "Website hosting for jazari.xyz"],
            ["OneSignal", "Push notification platform"],
          ]}
        />
        <p>
          We do not transfer or disclose Google or Apple user data to third parties for purposes
          other than providing or improving Jazari One, as described in this policy. All partners
          are required to meet strict data security and privacy obligations in line with
          applicable data protection standards.
        </p>
      </>
    ),
  },
  {
    id: "blockchain-data",
    title: "6. Stablecoin Transactions and Blockchain Data",
    content: <p>When you send or receive stablecoins (USDC or USDT) through Jazari One, transactions are recorded on public blockchain networks (Ethereum, Tron, Solana). Blockchain transactions are immutable and publicly visible by nature. We have no ability to delete or alter on-chain transaction records. However, we limit what personal data is directly linked to blockchain activity within our own systems.</p>,
  },
  {
    id: "international-transfers",
    title: "7. International Data Transfers",
    content: <p>We may transfer your data outside the UAE when required for international payments or outsourced services. These transfers are protected using secure systems and standard contractual safeguards to ensure an equivalent level of protection.</p>,
  },
  {
    id: "security",
    title: "8. How We Protect Your Data",
    content: (
      <>
        <p>
          We maintain technical and organizational security measures designed to protect the
          confidentiality, integrity, and availability of personal data, including Google and
          Apple user data obtained through third-party sign-in. These measures include encryption
          in transit, access controls and authentication for systems that process personal data,
          monitoring for unauthorized access, and limiting access to personnel who need it to
          operate our services.
        </p>
        <p>
          No method of transmission or storage is completely secure. If you believe your account
          has been compromised, contact us immediately at <EmailLink />.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    title: "9. Data Retention",
    content: (
      <>
        <p>
          We retain personal data for up to 7 years after your relationship with us ends, in
          line with applicable financial and legal requirements.
        </p>
        <p>
          Account information obtained through Sign in with Google or Sign in with Apple
          (including any Apple Hide My Email relay address) is retained while your account
          remains active and for as long as needed to provide authentication, email
          confirmation, and account services. After account closure, we delete or anonymize
          that data when it is no longer required, except where a longer retention period is
          required or permitted by law (for example, fraud prevention or regulatory
          record-keeping).
        </p>
        <p>
          When a retention period expires for a given type of data, we delete or destroy it, or
          anonymize it so it can no longer be associated with you.
        </p>
      </>
    ),
  },
  {
    id: "rights",
    title: "10. Your Rights",
    content: (
      <>
        <p>You have the right to:</p>
        <ul>
          <li>Access the personal data we hold about you</li>
          <li>Request correction or deletion of your data</li>
          <li>Object to or restrict certain types of processing</li>
          <li>Request data portability</li>
          <li>
            Withdraw consent at any time (where applicable), including by disconnecting Sign in
            with Google or Sign in with Apple where available (for Apple, you can also manage
            apps using Sign in with Apple in your Apple Account settings)
          </li>
        </ul>
        <p>
          To exercise these rights, contact us at: <EmailLink />. To delete your account and
          associated data, follow the steps at{" "}
          <Link href="/how-to-delete-account">Delete Your Account</Link>.
        </p>
      </>
    ),
  },
  {
    id: "fraud-prevention",
    title: "11. Fraud Prevention",
    content: (
      <>
        <p>We are required by law and regulation to protect our customers and the financial system against fraud and financial crime. To do this, we may share personal data with fraud prevention agencies where required.</p>
        <p>As part of the processing of your personal data, decisions may be made by automated means. This means we may automatically decline to provide services if processing reveals behaviour consistent with money laundering or known fraudulent conduct. You have rights in relation to automated decision-making — contact us at <EmailLink /> for more information.</p>
        <p>Legal Basis: Processing personal data for fraud prevention is necessary to comply with our legal obligations and is in our legitimate interests to protect our business and customers against financial crime.</p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "12. Cookies",
    content: (
      <>
        <p>We use cookies and similar technologies on <a href="https://jazari.xyz">jazari.xyz</a> to keep the site working and, where you allow it, measure usage with Google Analytics. On your first visit we ask for your consent; until you accept, only essential cookies are set.</p>
        <LegalTable
          headers={["Category", "Used for", "Stored for"]}
          rows={[
            ["Essential", "Core site functionality and your saved cookie choice", "Up to 1 year"],
            ["Analytics", "Google Analytics", "Up to 2 years"],
          ]}
        />
        <p>Cookies set by third-party services on our site include:</p>
        <ul>
          <li><code>_ga</code>, <code>_ga_*</code> — Google Analytics</li>
          <li><code>jazari_cookie_consent</code> — your saved cookie preferences (set by us)</li>
        </ul>
        <p>You can change or withdraw your consent at any time using the <strong>Cookie Preferences</strong> link in the footer, or through your browser settings.</p>
      </>
    ),
  },
  {
    id: "updates",
    title: "13. Updates",
    content: (
      <>
        <p>
          We may occasionally update this policy. If we change how we access, use, store, or
          share Google or Apple user data, we will update this policy and notify you via the
          app, email, or our website at <a href="https://jazari.xyz">jazari.xyz</a>, and where
          required we will ask for your consent before using that data in a new way.
        </p>
        <p>If you have any concerns about how your data is used, please contact: <EmailLink /></p>
        <p>Jazari One is a trading name of JAZARI FINTECH SERVICES - FZCO. Its registered address is: #78870, Building A1, IFZA Business Park, Dubai Silicon Oasis, Dubai, UAE.</p>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      date="Last updated: October 2026"
      introduction={
        <p>
          At Jazari, we are committed to protecting and respecting your privacy.
          This policy explains how we collect, use, share, and protect your personal
          data when you use our products and services, including when you sign in with Google
          or Sign in with Apple.
        </p>
      }
      sections={sections}
    />
  );
}
