/* eslint-disable @next/next/no-img-element -- local editorial imagery */

import Link from "next/link";
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
  sections: ArticleSection[];
};

const articleData: Record<string, GuideArticleData> = {
  mexico: {
    title: "Sending dollars to Mexico: five checks before you confirm",
    deck: "A CLABE is an 18-digit standardized banking code used in Mexico to ensure secure domestic electronic fund transfers and wire payments. It consists of three key parts: a 3-digit bank code, a 3-digit city/branch code, and an 11-digit individual account number followed by a control digit.",
    sections: [
      {
        heading: "Ask for the bank details directly",
        paragraphs: [
          "Get the recipient’s full name as it appears on their account and the bank information requested in Jazari. If the route asks for a CLABE, enter all 18 digits.",
          "A CLABE identifies a specific Mexican bank account. Do not replace it with a card number or phone number unless the current transfer flow explicitly supports that option.",
        ],
      },
      {
        heading: "Read the complete MXN preview",
        paragraphs: [
          "The recipient estimate is usually more useful than looking at the exchange rate alone. Use the final confirmation screen rather than an earlier quote or screenshot.",
        ],
        bullets: [
          "The dollars leaving your balance",
          "The reference rate and estimated Mexican-peso amount",
          "Applicable costs and the expected delivery window",
        ],
      },
      {
        heading: "Confirm once, then keep the reference",
        paragraphs: [
          "Tell the recipient the estimated MXN amount and the account you selected. This is one final chance to catch an old or incorrect account.",
          "Save the confirmation until the recipient verifies receipt. One reference and one verified set of details make any follow-up much simpler.",
        ],
      },
    ],
  },
  brazil: {
    title: "Sending money to Brazil: a cleaner Pix and bank checklist",
    deck: "Use the exact recipient identifier, read the BRL amount, and keep one reliable record.",
    sections: [
      {
        heading: "Use the recipient method Jazari requests",
        paragraphs: [
          "If Jazari offers Pix for the route, the recipient may provide a CPF or CNPJ, email address, mobile number, or random Pix key. Copy the key exactly.",
          "If the route asks for bank details instead, enter the bank, branch, account type, and account number exactly as shown in the flow.",
        ],
      },
      {
        heading: "Check the recipient before the amount",
        paragraphs: [
          "Where a recipient name is returned, compare it with the person or business you intend to pay. A familiar phone number is not enough on its own.",
          "Then review the amount leaving your dollar balance, the estimated BRL amount, the reference rate, applicable costs, and expected delivery time together.",
        ],
      },
      {
        heading: "Send once, then track",
        paragraphs: [
          "Avoid submitting a second transfer because the first one does not appear immediately. Check its status and reference first.",
          "Keep the confirmation until the recipient verifies the payment.",
        ],
      },
    ],
  },
  colombia: {
    title: "Planning a transfer to Colombia without avoidable delays",
    deck: "Account type and recipient details matter as much as the account number.",
    sections: [
      {
        heading: "Confirm the complete account",
        paragraphs: [
          "Ask for the recipient’s full legal name, bank, account type, and account number. Provide identification details only when the current route requests them.",
          "Savings and current accounts are not interchangeable. Select the account type the recipient confirms.",
        ],
      },
      {
        heading: "Copy the details; do not interpret them",
        paragraphs: [
          "Enter the account number exactly as provided, including leading zeros. Do not add spaces or punctuation unless the form does so automatically.",
          "Review the dollars sent, reference conversion, estimated Colombian pesos, applicable costs, and expected delivery on the same preview.",
        ],
      },
      {
        heading: "Keep one source for status",
        paragraphs: [
          "Use the Jazari transfer status as the source of truth. Keep the reference until the recipient confirms receipt.",
          "Avoid creating a duplicate payment while the first remains in progress.",
        ],
      },
    ],
  },
  europe: {
    title: "Sending to Europe: choose the right currency and bank route",
    deck: "Europe is not one currency or one payment route. Check the destination before the account.",
    sections: [
      {
        heading: "Choose the destination currency first",
        paragraphs: [
          "Many European accounts receive euros through SEPA, but not every European country uses the euro. Confirm whether the recipient expects EUR or another local currency.",
          "Then select the matching route currently available in Jazari.",
        ],
      },
      {
        heading: "Copy the IBAN exactly",
        paragraphs: [
          "For a route that requests an IBAN, enter the complete value, including its country prefix and leading zeros. Use the recipient’s full account name.",
          "Enter a BIC or SWIFT code only when the current form requests one.",
        ],
      },
      {
        heading: "Review the route, not only the rate",
        paragraphs: [
          "Check the source amount, destination currency, reference rate, estimated recipient amount, applicable costs, and expected delivery time.",
          "Save the final confirmation and the IBAN you used. If the recipient has several accounts, this prevents confusion about which one received the payment.",
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
          "Supported digital dollars let you keep a dollar-denominated balance without immediately converting each incoming payment into local currency.",
          "Availability and the supported asset can vary by account and country.",
        ],
      },
      {
        heading: "The route moves the payment",
        paragraphs: [
          "Jazari can select from available infrastructure and local payment routes according to the destination. The route determines which recipient details are required and the delivery estimate shown.",
        ],
      },
      {
        heading: "The bank receives locally",
        paragraphs: [
          "The recipient receives funds through the available destination route. Before confirming, review the local-currency estimate, applicable cost, recipient account, and expected delivery.",
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
          <p>{guide.deck}</p>
        </header>

        {article === "mexico" && (
          <figure className="article-hero-image">
            <img
              src={withBasePath("/images/blog/mexico-transfer.webp")}
              alt="Family walking together in Mexico"
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

      <section className="article-cta" aria-labelledby="article-cta-title">
        <h2 id="article-cta-title">Ready to join Jazari One?</h2>
        <Link className="article-cta-link neutral-control" href="/#access">Download App</Link>
      </section>
      <SiteFooter />
    </main>
  );
}
