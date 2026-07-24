/* eslint-disable @next/next/no-img-element -- local brand artwork uses its exact source */

import Link from "next/link";
import { withBasePath } from "../site-paths";

type ArticleSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

type GuideArticleData = {
  route: string;
  read: string;
  title: string;
  deck: string;
  checks: string[];
  sections: ArticleSection[];
};

const articleData: Record<string, GuideArticleData> = {
  mexico: {
    route: "Mexico",
    read: "3 min read",
    title: "Sending dollars to Mexico: five checks before you confirm",
    deck: "The right recipient details and a clear MXN preview do most of the work.",
    checks: [
      "Correct recipient name and bank",
      "18-digit CLABE when the route requests it",
      "Clear MXN estimate and saved reference",
    ],
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
    route: "Brazil",
    read: "3 min read",
    title: "Sending money to Brazil: a cleaner Pix and bank checklist",
    deck: "Use the exact recipient identifier, read the BRL amount, and keep one reliable record.",
    checks: [
      "Exact Pix key or requested bank details",
      "Recipient name matches the intended person",
      "Clear BRL estimate and no duplicate transfer",
    ],
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
    route: "Colombia",
    read: "3 min read",
    title: "Planning a transfer to Colombia without avoidable delays",
    deck: "Account type and recipient details matter as much as the account number.",
    checks: [
      "Correct bank and account type",
      "Exact account number and matching recipient",
      "Current COP estimate reviewed",
    ],
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
    route: "Europe",
    read: "4 min read",
    title: "Sending to Europe: choose the right currency and bank route",
    deck: "Europe is not one currency or one payment route. Check the destination before the account.",
    checks: [
      "Correct country and destination currency",
      "Exact IBAN and matching recipient name",
      "Complete delivery estimate reviewed",
    ],
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
};

export function GuideArticle({ article }: { article: keyof typeof articleData }) {
  const guide = articleData[article];

  return (
    <main className="article-shell">
      <nav className="article-nav" aria-label="Article navigation">
        <Link href={withBasePath("/#top")} aria-label="Jazari One home">
          <img src={withBasePath("/images/brand/jazari-one-logo.svg")} alt="Jazari One" />
        </Link>
        <Link href={withBasePath("/#blog")}>Back to Blog</Link>
      </nav>

      <article className="guide-article">
        <header className="article-header">
          <div className="article-meta">
            <span>Blog</span>
            <span>{guide.route}</span>
            <span>{guide.read}</span>
          </div>
          <h1>{guide.title}</h1>
          <p>{guide.deck}</p>
        </header>

        <div className="article-layout">
          <aside className="article-checklist">
            <span>At a glance</span>
            <ul>
              {guide.checks.map((check) => <li key={check}>{check}</li>)}
            </ul>
          </aside>

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
            <div className="article-note">
              <strong>Before confirming</strong>
              <p>
                Availability, fees, exchange rates, limits, eligibility, and
                delivery times vary by route. Review the current information
                shown in Jazari One before every transfer.
              </p>
            </div>
          </div>
        </div>
      </article>

      <footer className="article-footer">
        <p>Ready to hold and move dollars across borders?</p>
        <Link href={withBasePath("/#access")}>Get early access</Link>
      </footer>
    </main>
  );
}
