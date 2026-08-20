import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "../legal/LegalPage";

/* eslint-disable react/no-unescaped-entities -- FCA-prescribed punctuation must remain verbatim */

export const metadata: Metadata = {
  title: "Risk information for customers in the United Kingdom | Jazari One",
  description:
    "Important risk information for anyone using Jazari One from the United Kingdom, including FCA risk warnings, stablecoin risks, and Earn risks.",
  robots: {
    index: true,
    follow: true,
  },
};

const externalLinkProps = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;

const sections: LegalSection[] = [
  {
    id: "lose-all-money",
    title: "1. You could lose all the money you invest",
    content: (
      <ul>
        <li>The performance of most cryptoassets can be highly volatile, with their value dropping as quickly as it can rise. You should be prepared to lose all the money you invest in cryptoassets.</li>
        <li>The cryptoasset market is largely unregulated. There is a risk of losing money or any cryptoassets you purchase due to risks such as cyber-attacks, financial crime and firm failure.</li>
      </ul>
    ),
  },
  {
    id: "no-protection",
    title: "2. You should not expect to be protected if something goes wrong",
    content: (
      <ul>
        <li>The Financial Services Compensation Scheme (FSCS) doesn't protect this type of investment because it's not a 'specified investment' under the UK regulatory regime – in other words, this type of investment isn't recognised as the sort of investment that the FSCS can protect. Learn more by using the FSCS investment protection checker <a href="https://www.fscs.org.uk/check/investment-protection-checker/" {...externalLinkProps}>here</a>.</li>
        <li>The Financial Ombudsman Service (FOS) will not be able to consider complaints related to this firm. Learn more about FOS protection <a href="https://www.financial-ombudsman.org.uk/consumers" {...externalLinkProps}>here</a>.</li>
      </ul>
    ),
  },
  {
    id: "unable-to-sell",
    title: "3. You may not be able to sell your investment when you want to",
    content: (
      <ul>
        <li>There is no guarantee that investments in cryptoassets can be easily sold at any given time. The ability to sell a cryptoasset depends on various factors, including the supply and demand in the market at that time.</li>
        <li>Operational failings such as technology outages, cyber-attacks and comingling of funds could cause unwanted delay and you may be unable to sell your cryptoassets at the time you want.</li>
      </ul>
    ),
  },
  {
    id: "complex-investments",
    title: "4. Cryptoasset investments can be complex",
    content: (
      <ul>
        <li>Investments in cryptoassets can be complex, making it difficult to understand the risks associated with the investment.</li>
        <li>You should do your own research before investing. If something sounds too good to be true, it probably is.</li>
      </ul>
    ),
  },
  {
    id: "diversify",
    title: "5. Don't put all your eggs in one basket",
    content: (
      <>
        <ul>
          <li>Putting all your money into a single type of investment is risky. Spreading your money across different investments makes you less dependent on any one to do well.</li>
          <li>A good rule of thumb is not to invest more than 10% of your money in high-risk investments. Learn more <a href="https://www.fca.org.uk/investsmart/5-questions-ask-you-invest" {...externalLinkProps}>here</a>.</li>
        </ul>
        <p>If you are interested in learning more about how to protect yourself, visit the FCA's website <a href="https://www.fca.org.uk/investsmart" {...externalLinkProps}>here</a>. For further information about cryptoassets, visit the FCA's website <a href="https://www.fca.org.uk/investsmart/crypto-basics" {...externalLinkProps}>here</a>.</p>
      </>
    ),
  },
  {
    id: "what-jazari-one-is",
    title: "A. What Jazari One is, and what it is not",
    content: (
      <>
        <p>Jazari One is a technology service. It is not a bank, it is not a building society, and it is not an e-money institution. We do not hold your money as a deposit and we do not lend it out.</p>
        <p>Jazari One is not authorised or registered by the Financial Conduct Authority. Wallet, custody, conversion and payout services are delivered by licensed third-party providers, each regulated in its own jurisdiction — not by us.</p>
        <p>The balance shown in the app as &quot;digital dollars&quot; is a holding of stablecoins (USDC or USDT). A stablecoin is a cryptoasset that aims to track the value of a currency. It is not a pound sterling balance, it is not a US dollar bank balance, and it does not carry the protections that either would.</p>
      </>
    ),
  },
  {
    id: "stablecoin-risks",
    title: "B. Risks specific to stablecoins",
    content: (
      <>
        <p><strong>Peg risk.</strong> A stablecoin aims to hold a stable value. Aiming is not achieving. Stablecoins have historically traded above and below their target value, sometimes sharply, and a stablecoin can fail to recover its value at all.</p>
        <p><strong>Issuer and counterparty risk.</strong> The value of a stablecoin depends on the issuer and on whoever holds the assets backing it. If the issuer or a custodian of those assets fails, becomes insolvent, or is subject to enforcement action, your balance may lose value or become inaccessible.</p>
        <p><strong>Redemption risk.</strong> Your ability to convert a stablecoin back into currency can be delayed, limited, or suspended — most likely at exactly the moment markets are stressed.</p>
        <p><strong>Currency risk.</strong> Our balances reference the US dollar. If you live in the UK and your costs are in pounds, movements in the GBP/USD rate change what your balance is worth to you, independently of anything the stablecoin does.</p>
        <p><strong>Network risk.</strong> Balances move on public blockchains. Network congestion, protocol failures, or an error in a destination address can delay a transfer or make funds permanently unrecoverable. Blockchain transactions cannot be reversed.</p>
      </>
    ),
  },
  {
    id: "earn-risks",
    title: "C. Risks specific to Earn",
    content: (
      <>
        <p>Earn is not a savings account, not a deposit, and not a product with a fixed or promised return.</p>
        <p>When you use Earn, your balance is routed to third-party decentralised finance protocols through third-party strategy providers. We do not operate, control, or underwrite those protocols.</p>
        <ul>
          <li>The rate is variable. It changes with market conditions and can fall to zero.</li>
          <li>Past rates tell you nothing about future rates.</li>
          <li>Your capital is at risk. Smart contract failure, protocol insolvency, liquidity shortfalls, or counterparty default can result in the loss of some or all of the amount you allocate.</li>
          <li>Neither the FSCS nor any equivalent scheme covers amounts allocated to Earn.</li>
          <li>Withdrawals may be delayed where the underlying protocol restricts them.</li>
        </ul>
      </>
    ),
  },
  {
    id: "complaints",
    title: "D. Complaints",
    content: (
      <>
        <p>If something goes wrong, write to us at [COMPLAINTS EMAIL] and we will respond in line with our complaints procedure.</p>
        <p>The Financial Ombudsman Service cannot consider a complaint about Jazari One. Where a complaint concerns a service provided to you by one of our regulated partners, we will tell you which firm it is and how to contact them.</p>
      </>
    ),
  },
];

export default function UkRiskInformationPage() {
  return (
    <LegalPage
      title="Risk information for customers in the United Kingdom"
      date="Reading time: about 2 minutes. Last updated: [DATE]"
      introduction={
        <p>This page explains what Jazari One is, what it is not, and what can go wrong. It applies to anyone accessing Jazari One from the United Kingdom. Read it before you hold a balance with us, before you send a transfer, and before you use Earn.</p>
      }
      documentIntroduction={
        <>
          <p>Due to the potential for losses, the Financial Conduct Authority (FCA) considers this investment to be high risk.</p>
          <p><strong>What are the key risks?</strong></p>
        </>
      }
      sections={sections}
    />
  );
}
