import { EmailLink, PrivacyLink } from "../legal/LegalElements";
import { LegalPage, type LegalSection } from "../legal/LegalPage";

export const metadata = {
  title: "Terms & Conditions — Jazari One",
  description: "The terms governing use of Jazari One products and services.",
};

const sections: LegalSection[] = [
  {
    id: "introduction",
    title: "1. Introduction",
    content: (
      <>
        <p>1.1. Jazari One is a trading name of JAZARI FINTECH SERVICES - FZCO. Its registered address is: #78870, Building A1, IFZA Business Park, Dubai Silicon Oasis, Dubai, UAE.</p>
        <p>1.2. Jazari One provides a stablecoin wallet application enabling users to hold, send, and receive USDC and USDT across Ethereum, Tron, and Solana networks. Stablecoin transaction infrastructure and identity verification services are provided by licensed third-party partners.</p>
        <p>1.3. These terms are available at <a href="https://jazari.xyz/terms">jazari.xyz/terms</a>.</p>
        <p>1.4. All Jazari One wallets remain associated with and subject to the governance of JAZARI FINTECH SERVICES - FZCO.</p>
        <p>1.5. No interest will be paid on your wallet balance unless explicitly stated in a separate savings or yield product agreement.</p>
      </>
    ),
  },
  {
    id: "definitions",
    title: "2. Definitions",
    content: (
      <>
        <p>2.1. Account Balance: The total amount of stablecoin funds currently held in your Jazari One wallet and available for use.</p>
        <p>2.2. Infrastructure Partner: A licensed third-party provider engaged by Jazari One to process and settle stablecoin transactions on supported blockchain networks.</p>
        <p>2.3. Customer Service: The Jazari support team, reachable via email at <EmailLink /> or through the in-app chat feature.</p>
        <p>2.4. Jazari App: The official Jazari One mobile application through which you access and manage your stablecoin wallet.</p>
        <p>2.5. Recipient: The individual or entity you send stablecoins to from your Jazari One wallet.</p>
        <p>2.6. Remittance: The process of sending stablecoins from your Jazari One wallet to another individual, typically overseas.</p>
        <p>2.7. Stablecoin: A digital asset pegged to a fiat currency — specifically USDC or USDT as supported by Jazari One.</p>
        <p>2.8. KYC Provider: The licensed third-party identity verification and AML/KYC provider engaged by Jazari One.</p>
        <p>2.9. Verification and Identity: The process of confirming your personal details through electronic checks or by submitting identification documents, conducted via our licensed KYC provider.</p>
        <p>2.10. Website: The official Jazari website at <a href="https://jazari.xyz">jazari.xyz</a>.</p>
      </>
    ),
  },
  {
    id: "wallet-account",
    title: "3. Jazari One Wallet Account",
    content: (
      <>
        <p>3.1. Your Jazari One account is a non-custodial stablecoin wallet that allows you to hold, send, and receive USDC and USDT.</p>
        <p>3.2. This document outlines the general terms and conditions for your Jazari One wallet. It is a legal agreement between you and us. By submitting your application, you confirm acceptance. By agreeing, you confirm:</p>
        <ul>
          <li>All the information you have provided is true, accurate, and belongs to you.</li>
          <li>You are legally able to enter into a binding agreement.</li>
          <li>You will only use your Jazari One wallet for the purposes outlined in these terms.</li>
          <li>You are 18 or over and legally able to manage your own actions.</li>
          <li>You are acting on your own behalf, not for anyone else.</li>
          <li>You allow us to verify your identity through our licensed KYC provider.</li>
        </ul>
        <p>3.3. You must provide all required information and pass our identity and anti-money laundering checks, as required by applicable law.</p>
        <p>3.4. We may decline your application at our discretion and are not required to provide a reason.</p>
      </>
    ),
  },
  {
    id: "payments",
    title: "4. Payments In and Out",
    content: (
      <>
        <p>4.1. You can add stablecoins to your Jazari One wallet by receiving USDC or USDT from any external wallet or exchange.</p>
        <p>4.2. You can send stablecoins from your Jazari One wallet to any valid wallet address on a supported network (Ethereum, Tron, Solana).</p>
        <p>4.3. Only verified Jazari One account holders are authorised to send stablecoins from their wallets.</p>
        <p>4.4. You are responsible for ensuring that recipient wallet addresses and network selections are correct when making transfers.</p>
        <p>4.5. If you send stablecoins to an incorrect address, we will attempt to help you but cannot guarantee recovery. Blockchain transactions are generally irreversible once confirmed.</p>
        <p>4.6. You cannot send stablecoins that would result in a negative wallet balance.</p>
        <p>4.7. Transactions cannot be cancelled once confirmed on-chain.</p>
        <p>4.8. We or our infrastructure partners may refuse to process a transaction if:</p>
        <ul>
          <li>It does not comply with these terms or applicable regulations.</li>
          <li>The recipient is subject to legal restrictions or our infrastructure partner does not support transfers to that address.</li>
          <li>The transaction raises compliance, fraud, or AML concerns.</li>
        </ul>
      </>
    ),
  },
  {
    id: "remittances",
    title: "5. International Remittances",
    content: (
      <>
        <p>5.1. Where currency conversion is applicable, the rate will be provided at the time of initiating the transaction. Rates are time-sensitive and may change based on market conditions.</p>
        <p>5.2. Jazari One aims to minimise fees. Near-zero network fees apply to stablecoin transfers. Any applicable fees will be clearly displayed before you confirm a transaction.</p>
        <p>5.3. Delivery times vary depending on the destination, network selected, and regulatory requirements.</p>
        <p>5.4. Transaction monitoring is applied to detect fraud, money laundering, and other prohibited activities.</p>
        <p>5.5. In certain scenarios, Jazari One may reverse a transaction after initiation, including where required by regulation, fraud is detected, or technical errors occur.</p>
      </>
    ),
  },
  {
    id: "wallet-use",
    title: "6. Use of the Jazari One Wallet",
    content: (
      <>
        <p>6.1. Your Jazari One wallet can be used to hold, send, and receive USDC and USDT across Ethereum, Tron, and Solana networks.</p>
        <p>You must not use your Jazari One wallet for:</p>
        <ul>
          <li>Illegal transactions of any kind</li>
          <li>Transactions restricted on our website or app</li>
          <li>Commercial or business use unless explicitly approved</li>
          <li>Circumventing sanctions, AML laws, or other financial regulations</li>
        </ul>
      </>
    ),
  },
  {
    id: "blockchain-data",
    title: "7. Blockchain Transactions and On-Chain Data",
    content: (
      <>
        <p>7.1. All stablecoin transfers made via Jazari One are recorded on public blockchain networks. Blockchain transactions are immutable. Once confirmed on-chain, transactions cannot be reversed, edited, or deleted.</p>
        <p>7.2. We limit what personal data is directly linked to blockchain activity within our own systems.</p>
        <p>7.3. You are solely responsible for selecting the correct blockchain network when initiating transfers.</p>
      </>
    ),
  },
  {
    id: "transactions",
    title: "8. Transactions",
    content: (
      <>
        <p>8.1. Any use of your Jazari One wallet will be treated as your consent to the transaction. Once confirmed on-chain, it cannot be cancelled.</p>
        <p>8.2. We may refuse or suspend a transaction due to system issues, compliance requirements, insufficient balance, or suspected fraud.</p>
      </>
    ),
  },
  {
    id: "liability",
    title: "9. Liability",
    content: (
      <>
        <p>9.1. Nothing in these terms limits liability for fraud or actions that cannot lawfully be limited.</p>
        <p>9.2. We are only liable for losses that are foreseeable and result directly from a breach of these terms.</p>
        <p>9.3. We are not liable for events outside our control, including blockchain network failures, infrastructure outages, or regulatory changes.</p>
        <p>9.4. These liability limitations also apply to our licensed third-party partners including stablecoin infrastructure and identity verification providers.</p>
      </>
    ),
  },
  {
    id: "security",
    title: "10. Your Security Responsibilities",
    content: <p>10.1. You must keep your account credentials, access codes, and any linked device secure. Do not share your account credentials with anyone. Report any suspected unauthorised access immediately.</p>,
  },
  {
    id: "third-parties",
    title: "11. Third-Party Providers",
    content: (
      <>
        <p>11.1. You may give consent to regulated third-party providers to access your Jazari One wallet information where permitted by applicable law.</p>
        <p>11.2. We may block third-party access if we believe the provider is unauthorised or poses a security risk.</p>
      </>
    ),
  },
  {
    id: "kyc",
    title: "12. Know Your Customer (KYC) Review",
    content: <p>12.1. Jazari One is legally required to monitor customer activity and verify identities on an ongoing basis through KYC procedures, conducted via our licensed KYC provider. KYC refresher checks may be conducted periodically. Failure to complete a required KYC check may result in account suspension or termination.</p>,
  },
  {
    id: "changes",
    title: "13. Changing These Terms",
    content: <p>13.1. We may update these terms by notifying you via email or through the app. For significant changes, we will give 30 days notice. The latest version of these terms will always be available at <a href="https://jazari.xyz/terms">jazari.xyz/terms</a>.</p>,
  },
  {
    id: "closure",
    title: "14. Cancellation and Account Closure",
    content: (
      <>
        <p>14.1. You may close your Jazari One account at any time by contacting us via the app or at <EmailLink />. Before your account can be closed, you must ensure your wallet balance is transferred out.</p>
        <p>14.2. We may terminate this agreement and close your account for breach of terms, abusive behaviour, suspected fraud, or as required by applicable law. We will provide at least 30 days prior notice unless exceptional circumstances require immediate termination.</p>
      </>
    ),
  },
  {
    id: "referrals",
    title: "15. Jazari Referral Programme and Rewards",
    content: <p>15.1. Upon joining Jazari One, you may receive a unique referral code. For each successful referral, you will earn a reward. Rewards are not cash and cannot be withdrawn. They may only be redeemed against eligible features within the Jazari app. Rewards are valid for 24 months from the date they are earned.</p>,
  },
  {
    id: "general",
    title: "16. General",
    content: (
      <>
        <p>16.1. By entering into this agreement, you agree that we may use your information as outlined in our <PrivacyLink />.</p>
        <p>16.2. We may monitor and record communications between you and us.</p>
        <p>16.3. You must provide and maintain a valid email address and phone number.</p>
        <p>16.4. This agreement is governed by the laws of the United Arab Emirates. Any disputes shall be subject to the non-exclusive jurisdiction of the courts of the Dubai International Financial Centre (DIFC).</p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "17. Intellectual Property",
    content: <p>17.1. We own or license all intellectual property rights in the Website, App, Jazari One wallet, and any associated materials. “Jazari One” and the Jazari One logo are trademarks of JAZARI FINTECH SERVICES - FZCO.</p>,
  },
  {
    id: "complaints",
    title: "18. Complaints and How to Contact Us",
    content: (
      <>
        <p>18.1. A complaint is any expression of dissatisfaction relating to our services. We aim to resolve complaints within 15 business days.</p>
        <p>To raise a complaint, please contact us at:</p>
        <ul>
          <li>Email: <EmailLink /></li>
          <li>In-app chat: Available within the Jazari One app</li>
        </ul>
      </>
    ),
  },
  {
    id: "emergency-contact",
    title: "19. Contacting You in an Emergency",
    content: <p>19.1. In the event of suspected fraud or a security threat, we may urgently contact you via SMS, email, or in-app notification.</p>,
  },
  {
    id: "information-use",
    title: "20. How We Use Your Information",
    content: (
      <>
        <p>20.1. KYC and identity verification checks are conducted via our licensed third-party KYC provider.</p>
        <p>We may use your data to:</p>
        <ul>
          <li>Perform identity verification to manage your account</li>
          <li>Process stablecoin transactions via our licensed infrastructure partner</li>
          <li>Operate and improve our services</li>
          <li>Prevent fraud, money laundering, and financial crime</li>
          <li>Comply with legal or regulatory obligations</li>
        </ul>
        <p>For full details, refer to our <PrivacyLink />.</p>
        <p>If you have any questions or concerns about these terms, please contact us at <EmailLink />.</p>
        <p>Jazari One is a trading name of JAZARI FINTECH SERVICES - FZCO. Its registered address is: #78870, Building A1, IFZA Business Park, Dubai Silicon Oasis, Dubai, UAE.</p>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      date="Effective date: April 2026"
      introduction={
        <p>
          These Terms and Conditions govern your use of the Jazari One stablecoin
          wallet application and all related services. Please read them carefully
          before creating your account. By registering, you confirm that you have
          read, understood, and agreed to be bound by these terms.
        </p>
      }
      sections={sections}
    />
  );
}
