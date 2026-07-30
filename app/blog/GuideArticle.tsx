/* eslint-disable @next/next/no-img-element -- local editorial imagery */

import Link from "next/link";
import { ContainedColorEvent } from "../home/ContainedColorEvent";
import { InternalSiteHeader } from "../home/InternalSiteHeader";
import { SiteFooter } from "../home/SiteFooter";
import { withBasePath } from "../site-paths";

type ArticleSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

type GuideArticleData = {
  title: string;
  deck: string;
  quickAnswer?: string;
  image?: string;
  imageAlt?: string;
  sections: ArticleSection[];
};

const articleData: Record<string, GuideArticleData> = {
  mexico: {
    title: "How to send dollars to Mexico in 3 steps",
    deck: "Use the recipient’s full legal name and 18-digit CLABE for a SPEI payout.",
    quickAnswer:
      "To send dollars to Mexico, choose Mexico, enter the recipient’s full legal name and 18-digit CLABE, review the peso amount and live rate, then confirm. The payout travels through SPEI to the recipient’s bank account and typically arrives within minutes, although bank checks can sometimes take longer.",
    image: "/images/blog/mexico-transfer.webp",
    imageAlt: "Family walking together in Mexico",
    sections: [
      {
        heading: "What you need",
        paragraphs: [
          "Your payout reaches a Mexican bank account through SPEI, Mexico’s real-time payment rail. Ask for the recipient’s full legal name and complete 18-digit CLABE. The CLABE identifies the bank and account, so you do not need a separate bank name. Most payouts arrive within minutes, though a recipient-bank or compliance check can take longer.",
        ],
        bullets: ["Full legal name", "18-digit CLABE"],
      },
      {
        heading: "1. Add the recipient",
        paragraphs: [
          "Enter the name and CLABE exactly as the recipient provided them. A CLABE is not a card number or phone number, and there is no separate bank-name field for this route.",
        ],
      },
      {
        heading: "2. Enter dollars and check MXN",
        paragraphs: [
          "Enter the dollars you want to send. Read the MXN amount, rate, transaction cost, and delivery estimate together before continuing.",
        ],
      },
      {
        heading: "3. Confirm and track",
        paragraphs: [
          "Check the recipient and CLABE one final time, then confirm. Keep the transfer reference until the recipient confirms that the pesos arrived.",
        ],
      },
    ],
  },
  brazil: {
    title: "How to send dollars to Brazil in 3 steps",
    deck: "For a Pix payout, use the recipient’s full name and exact Pix key.",
    quickAnswer:
      "To send dollars to Brazil, choose Brazil, enter the recipient’s full legal name and exact Pix key, review the reais amount and live rate, then confirm. The payout travels through Pix and typically reaches the linked Brazilian account within minutes, though occasional compliance or bank checks can delay it.",
    image: "/images/blog/brazil.jpg",
    imageAlt: "People using a phone in Brazil",
    sections: [
      {
        heading: "What you need",
        paragraphs: [
          "Your payout reaches a Brazilian account through Pix, Brazil’s instant-payment rail. Ask for the recipient’s full legal name and exact Pix key, which may be a CPF or CNPJ, email address, phone number, or random key. The key points to the linked account, so you do not need separate bank details. Most payouts arrive within minutes, though a bank or compliance check can take longer.",
        ],
        bullets: ["Full legal name", "Exact Pix key"],
      },
      {
        heading: "1. Add the recipient",
        paragraphs: [
          "Choose Brazil, enter the recipient’s full name, and copy the Pix key exactly. Compare any returned recipient name with the person or business you intend to pay.",
        ],
      },
      {
        heading: "2. Enter dollars and check BRL",
        paragraphs: [
          "Enter the dollars you want to send. Review the BRL amount, live rate, transaction cost, and expected delivery before continuing.",
        ],
      },
      {
        heading: "3. Confirm and track",
        paragraphs: [
          "Check the name and Pix key once more, then confirm. Use the transfer status and reference instead of creating a duplicate payment while the first is processing.",
        ],
      },
    ],
  },
  colombia: {
    title: "How to send dollars to Colombia in 3 steps",
    deck: "For a Bre-B payout, use the recipient’s full name and exact llave.",
    quickAnswer:
      "To send dollars to Colombia, choose Colombia, enter the recipient’s full legal name and exact Bre-B llave, review the peso amount and live rate, then confirm. The payout uses Bre-B to reach the linked Colombian account and typically arrives within minutes, subject to bank or compliance checks.",
    image: "/images/blog/colombia.jpg",
    imageAlt: "Friends together in Colombia",
    sections: [
      {
        heading: "What you need",
        paragraphs: [
          "Your payout reaches a Colombian account through Bre-B, Colombia’s interoperable instant-payment rail. Ask for the recipient’s full legal name and exact llave. The llave points to the linked account, so you do not need a separate account type or account number. Most payouts arrive within minutes, though a bank or compliance check can take longer.",
        ],
        bullets: ["Full legal name", "Exact Bre-B llave"],
      },
      {
        heading: "1. Add the recipient",
        paragraphs: [
          "Choose Colombia, enter the recipient’s full name, and copy the llave exactly as supplied. Do not substitute an account number or other identifier.",
        ],
      },
      {
        heading: "2. Enter dollars and check COP",
        paragraphs: [
          "Enter the dollars you want to send, then review the COP amount, live rate, transaction cost, and delivery estimate.",
        ],
      },
      {
        heading: "3. Confirm and track",
        paragraphs: [
          "Check the recipient name and llave one final time. After sending, keep the transfer reference until the recipient confirms receipt.",
        ],
      },
    ],
  },
  europe: {
    title: "How to send dollars to Europe in 3 steps",
    deck: "For a SEPA payout, collect the full name, IBAN, and BIC or SWIFT code.",
    quickAnswer:
      "To send dollars to Europe, choose the destination, enter the recipient’s full legal name, IBAN, and BIC or SWIFT code, review the euro amount and live rate, then confirm. The payout travels through SEPA and typically arrives the same day or next business day, depending on the receiving bank.",
    image: "/images/blog/europe.jpg",
    imageAlt: "Person walking through a European city",
    sections: [
      {
        heading: "What you need",
        paragraphs: [
          "Your euro payout reaches the recipient through SEPA, Europe’s bank-transfer network. Ask for the recipient’s full legal name, complete IBAN, and BIC or SWIFT code. The IBAN identifies the account and the BIC or SWIFT code identifies the bank; add an address only when the route asks for it. Most payouts arrive the same day or next business day, depending on the receiving bank and cutoff time.",
        ],
        bullets: ["Full legal name", "Complete IBAN", "BIC or SWIFT code", "Address only if requested"],
      },
      {
        heading: "1. Add the recipient",
        paragraphs: [
          "Choose the European destination and enter the full name, complete IBAN, and BIC or SWIFT code. Preserve the country prefix and any leading zeros, and provide an address only when prompted.",
        ],
      },
      {
        heading: "2. Enter dollars and check EUR",
        paragraphs: [
          "Enter the dollars you want to send. Review the EUR amount, live rate, transaction cost, and expected delivery before continuing.",
        ],
      },
      {
        heading: "3. Confirm and track",
        paragraphs: [
          "Check the recipient and IBAN once more, then confirm. Save the transfer reference until the recipient verifies that the euros arrived.",
        ],
      },
    ],
  },
  costs: {
    title: "How to compare a transfer beyond the headline rate",
    deck: "The useful number is what arrives, when it arrives, and what the full transfer costs.",
    sections: [
      {
        heading: "Start with the recipient amount",
        paragraphs: [
          "A strong-looking exchange rate does not always produce the best result. Compare the final amount the recipient is expected to receive after applicable costs.",
          "Use the same source amount and destination currency for every comparison so the numbers describe the same transfer.",
        ],
      },
      {
        heading: "Put cost and timing on one line",
        paragraphs: [
          "Review the transfer fee, conversion, and estimated delivery together. A route can be inexpensive but unsuitable when the payment is time-sensitive.",
        ],
        bullets: [
          "Amount leaving your dollar balance",
          "Amount expected at the destination",
          "Fee, conversion, and delivery estimate",
        ],
      },
      {
        heading: "Compare the confirmation screens",
        paragraphs: [
          "Quotes can change. Make the final decision using current confirmation screens, then keep the reference for the route you selected.",
        ],
      },
    ],
  },
  recipient: {
    title: "What to verify before sending money to a new recipient",
    deck: "A short recipient check is usually faster than correcting a transfer later.",
    sections: [
      {
        heading: "Verify through a trusted channel",
        paragraphs: [
          "Ask the recipient for their current account information directly. If payment instructions changed unexpectedly, confirm them through a second familiar channel before sending.",
        ],
      },
      {
        heading: "Match every field",
        paragraphs: [
          "Compare the recipient name, bank, account type, account number, and destination currency with the information shown in the transfer.",
          "Do not substitute a card number, phone number, or email address unless the selected route explicitly requests it.",
        ],
      },
      {
        heading: "Use a smaller first payment when appropriate",
        paragraphs: [
          "For a new or unusually large transfer, a smaller initial payment can confirm the route and recipient details. Wait for confirmation before sending the remainder.",
        ],
      },
    ],
  },
  "digital-dollars": {
    title: "Digital dollars and bank payouts: what each part does",
    deck: "Your balance, the transfer rail, and the destination bank each have a different job.",
    sections: [
      {
        heading: "The balance holds the dollar value",
        paragraphs: [
          "Your USDC or USDT balance lets you keep dollar-denominated value without converting each incoming payment into local currency.",
          "What you can hold depends on your account and country.",
        ],
      },
      {
        heading: "The route moves the payment",
        paragraphs: [
          "When you choose a destination, your transfer follows the matching infrastructure and local payment route. That route determines which recipient details you enter and the delivery estimate you see.",
        ],
      },
      {
        heading: "The bank receives locally",
        paragraphs: [
          "Your recipient gets funds through the destination’s local route. Before you confirm, review the local-currency estimate, cost, recipient account, and expected delivery.",
        ],
      },
    ],
  },
};

export function GuideArticle({ article }: { article: keyof typeof articleData }) {
  const guide = articleData[article];

  return (
    <main className="article-shell">
      <InternalSiteHeader />

      <article className="guide-article">
        <nav className="article-breadcrumbs" aria-label="Breadcrumb">
          <Link href="/blog">Blog</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{guide.title}</span>
        </nav>
        <header className="article-header">
          <h1>{guide.title}</h1>
          {guide.quickAnswer && (
            <div className="quick-answer">
              <h2>Short answer</h2>
              <p>{guide.quickAnswer}</p>
            </div>
          )}
          <p>{guide.deck}</p>
        </header>

        {guide.image && (
          <figure className="article-hero-image">
            <img
              src={withBasePath(guide.image)}
              alt={guide.imageAlt ?? ""}
            />
          </figure>
        )}

        <div className="article-layout">
          <div className="article-copy">
            {guide.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets && (
                  <ul>
                    {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>
      </article>

      <ContainedColorEvent className="article-cta" labelledBy="article-cta-title">
        <div className="color-event-cta-copy">
          <h2 id="article-cta-title">Ready to join Jazari One?</h2>
        </div>
        <Link className="article-cta-link neutral-control" href="/#access">Download App</Link>
      </ContainedColorEvent>
      <SiteFooter />
    </main>
  );
}
