import Link from "next/link";
import { SiteHeader } from "../home/SiteHeader";
import { SiteFooter } from "../home/SiteFooter";
import { AccordionList } from "../home/AccordionList";
import { ResponsiveImage } from "../home/ResponsiveImage";
import { countries, type Country } from "./data";
import { countryGuides } from "./guides";
import { CountryDownloadLink } from "./CountryDownloadLink";
import "../styles/country-pages.css";

export function CountryPage({ country }: { country: Country }) {
  const copy = countries[country];
  const stem = `/images/countries/${country.toLowerCase()}-professional`;
  const questions = [
    { question: `How do I open a dollar account in ${country}?`, answer: "Download Jazari One, create your profile, and complete the identity checks requested in the app. If eligible, open Receive to view the USD account details provided through a licensed US bank partner. Requirements and access depend on your profile." },
    { question: `How do I receive dollars in ${country}?`, answer: "For an eligible USD bank transfer, share the account details and payment instructions shown in Receive. For USDT, share the address for the exact asset and network displayed in your wallet. A bank transfer and a stablecoin transfer use different details." },
    { question: "Can I send, receive, and hold USDT?", answer: "Yes, on the routes and networks supported in your app. The sender and recipient must use the same asset and network. Check fees and the recipient address before confirming. USDT is a stablecoin, not a bank deposit, and it can lose value." },
    { question: country === "Nigeria" ? "Are Savings and Yields the same thing?" : "Can my USDT balance earn a yield?", answer: "Holding digital dollars does not automatically earn returns. Jazari’s Yields use supported USDC strategies; do not send USDT directly into a USDC vault. Yields are investments, not insured savings accounts. Rates vary, withdrawals may be delayed, and capital is at risk." },
    { question: country === "Nigeria" ? "Can I withdraw to a Nigerian bank account?" : "Can I send to a Kenyan bank account or M-PESA?", answer: copy.localAnswer },
    { question: "What will it cost?", answer: "Review the app’s current quote and the Pricing page. Bank-transfer, conversion, USDT support, and network costs can differ. Check the total cost and expected timing before sending." },
  ];

  return <main className={`country-shell country-${country.toLowerCase()}`}>
    <SiteHeader mode="internal" country={country} />
    <header className="country-hero" id="top">
      <div className="country-hero-copy">
        <h1>{copy.headline}</h1>
        <p>{copy.description}</p>
        <CountryDownloadLink country={country} placement="hero" className="country-primary-action">Download App</CountryDownloadLink>
        <a href="#receive" className="country-secondary-action">How it works</a>
        <span className="country-hero-note">For {country} · Subject to verification and eligibility</span>
      </div>
      <div className="country-hero-media">
        <ResponsiveImage fallback={`${stem}.webp`} stem={stem} widths={[480, 960, 1440]} width={1536} height={1024} alt={copy.photoAlt} sizes="(max-width: 900px) calc(100vw - 40px), 52vw" loading="eager" fetchPriority="high" />
        <div className="country-photo-caption"><span>Jazari One in {country}</span><p>{copy.benefit}</p></div>
      </div>
    </header>

    <section className="country-story country-section" aria-labelledby="country-story-title">
      <h2 id="country-story-title">{copy.personaTitle}</h2>
      <p>{copy.personaCopy}</p>
    </section>

    <section className="country-receive country-section" id="receive" aria-labelledby="country-receive-title">
      <div>
        <h2 id="country-receive-title">{copy.receiveTitle}</h2>
        <p className="country-description">{copy.receiveCopy}</p>
        <ol className="country-steps">
          <li><span>01</span><div><h3>Create your account</h3><p>Download the app and complete your profile and identity verification.</p></div></li>
          <li><span>02</span><div><h3>Choose how to receive</h3><p>USD bank payment? Share your account details. USDT? Share the exact wallet address and supported network.</p></div></li>
          <li><span>03</span><div><h3>Keep your next move open</h3><p>Hold digital dollars, send to a supported wallet, or explore eligible Yields separately.</p></div></li>
        </ol>
        <Link href="/receive/#usd-account" className="country-text-link">Explore your USD account</Link>
      </div>
      <ResponsiveImage pictureClassName="country-phone" fallback="/images/how-to/receive-usd-account.png" stem="/images/how-to/receive-usd-account" widths={[320, 520]} width={520} height={1126} alt="USD account details in the Jazari One app" sizes="(max-width: 900px) 260px, 340px" loading="lazy" />
    </section>

    <section className="country-wallet country-section" aria-labelledby="country-wallet-title">
      <div className="country-wallet-heading"><h2 id="country-wallet-title">USDT, for the way your money moves.</h2><p className="country-description">Client payments. Money for family. Dollars between projects. Start with the wallet routes available in your app.</p></div>
      <div className="country-wallet-ledger">
        <div><h3>Receive</h3><p>Share a supported USDT address and the network name. Ask your sender to match both.</p></div>
        <div><h3>Hold</h3><p>Keep digital dollars in your balance. USDT aims to track USD; its value is not guaranteed.</p></div>
        <div><h3>Send</h3><p>Pay a supported wallet. Review the address, network, amount, and costs before confirming.</p></div>
      </div>
      <Link href="/send/#wallet" className="country-text-link">Explore stablecoin transfers</Link>
    </section>

    <section className="country-savings country-section" id="savings" aria-labelledby="country-savings-title">
      <div><span className="country-section-label">{copy.savingsLabel}</span><h2 id="country-savings-title">{copy.savingsTitle}</h2></div>
      <div><p className="country-description">{copy.savingsCopy}</p><Link href="/yields/" className="country-text-link">Explore Yields</Link><p className="country-risk">Digital-dollar balances are not bank deposits. Yields are not insured savings accounts: rates are variable, returns are not guaranteed, withdrawals may be delayed, and you could lose your capital.</p></div>
    </section>

    <section className="country-guides country-section" aria-labelledby="country-guides-title">
      <div className="country-section-heading"><h2 id="country-guides-title">Your dollar questions, answered.</h2><Link href="/blog/" className="neutral-control">All Articles</Link></div>
      <div className="country-guide-list">{countryGuides.filter(guide => guide.country === country).map(guide => <Link href={`/blog/${guide.slug}/`} key={guide.slug}><h3>{guide.title}</h3><span>Read Article</span></Link>)}</div>
    </section>

    <section className="country-faq country-section" id="faq" aria-labelledby="country-faq-title"><h2 id="country-faq-title">A few things to know.</h2><AccordionList items={questions} /></section>
    <section className="country-closing country-section"><h2>{copy.closing}</h2><p>Start with the routes available to you in {country}.</p><CountryDownloadLink country={country} placement="closing" className="country-primary-action">Download App</CountryDownloadLink></section>
    <SiteFooter country={country} />
  </main>;
}
