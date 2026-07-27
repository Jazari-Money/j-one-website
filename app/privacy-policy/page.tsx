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
          <li><strong>Consent:</strong> Where required (e.g., certain marketing or data sharing preferences)</li>
        </ul>
      </>
    ),
  },
  {
    id: "data-use",
    title: "4. How We Use Your Data",
    content: (
      <LegalTable
        headers={["Purpose", "Legal Basis"]}
        rows={[
          ["Account creation and identity verification", "Contract, Legal Obligation"],
          ["Transaction processing and stablecoin transfers", "Contract"],
          ["Freelancer platform integration (e.g., Fiverr)", "Contract, Consent"],
          ["Customer support", "Contract, Legitimate Interest"],
          ["Fraud prevention and AML screening", "Legal Obligation, Legitimate Interest"],
          ["Service improvements", "Legitimate Interest"],
          ["Marketing communications", "Consent, Legitimate Interest"],
          ["Legal compliance and enforcement", "Legal Obligation"],
        ]}
      />
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
            ["Google Cloud", "Platform hosting and infrastructure"],
            ["Google Workspace & Auth0", "Identity and access management for back-office operations"],
            ["Intercom", "Customer support chat and automation"],
            ["SendGrid", "Email notifications and verification"],
            ["TeleSign", "OTP and authentication services for login and fraud protection"],
            ["Manychat", "Waitlist and WhatsApp messaging"],
            ["Framer", "Website hosting for jazari.xyz"],
            ["OneSignal", "Push notification platform"],
          ]}
        />
        <p>All partners are required to meet strict data security and privacy obligations in line with applicable data protection standards.</p>
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
    id: "retention",
    title: "8. Data Retention",
    content: <p>We retain personal data for up to 7 years after your relationship with us ends, in line with applicable financial and legal requirements.</p>,
  },
  {
    id: "rights",
    title: "9. Your Rights",
    content: (
      <>
        <p>You have the right to:</p>
        <ul>
          <li>Access the personal data we hold about you</li>
          <li>Request correction or deletion of your data</li>
          <li>Object to or restrict certain types of processing</li>
          <li>Request data portability</li>
          <li>Withdraw consent at any time (where applicable)</li>
        </ul>
        <p>To exercise these rights, contact us at: <EmailLink /></p>
      </>
    ),
  },
  {
    id: "fraud-prevention",
    title: "10. Fraud Prevention",
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
    title: "11. Cookies",
    content: (
      <>
        <p>We use cookies and similar technologies on <a href="https://jazari.xyz">jazari.xyz</a> to keep the site working, measure usage, and—where you allow it—support our marketing. On your first visit we ask for your consent; until you accept, only essential cookies are set.</p>
        <LegalTable
          headers={["Category", "Used for", "Stored for"]}
          rows={[
            ["Essential", "Core site functionality and your saved cookie choice", "Up to 1 year"],
            ["Analytics", "Google Analytics (directly and via Google Tag Manager)", "Up to 2 years"],
            ["Marketing", "Meta (Facebook) Pixel and advertising, via Google Tag Manager", "Up to 1 year"],
          ]}
        />
        <p>Cookies set by third-party services on our site include:</p>
        <ul>
          <li><code>_ga</code>, <code>_gid</code>, <code>_gat</code> — Google Analytics</li>
          <li><code>_fbp</code>, <code>_fbc</code> — Meta (Facebook) Pixel</li>
          <li><code>jazari_cookie_consent</code> — your saved cookie preferences (set by us)</li>
        </ul>
        <p>You can change or withdraw your consent at any time using the <strong>Cookie Preferences</strong> link in the footer, or through your browser settings.</p>
      </>
    ),
  },
  {
    id: "updates",
    title: "12. Updates",
    content: (
      <>
        <p>We may occasionally update this policy. If we do, we will notify you via the app, email, or our website at <a href="https://jazari.xyz">jazari.xyz</a>.</p>
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
      date="Last updated: April 2026"
      introduction={
        <p>
          At Jazari, we are committed to protecting and respecting your privacy.
          This policy explains how we collect, use, share, and protect your personal
          data when you use our products and services.
        </p>
      }
      sections={sections}
    />
  );
}
