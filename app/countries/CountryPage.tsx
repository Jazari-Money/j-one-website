import Link from "next/link";
import Image from "next/image";
import { SiteHeader } from "../home/SiteHeader";
import { SiteFooter } from "../home/SiteFooter";
import { AccordionList } from "../home/AccordionList";
import { ResponsiveImage } from "../home/ResponsiveImage";
import { countries, type Country } from "./data";
import { countryGuides } from "./guides";
import { CountryDownloadLink } from "./CountryDownloadLink";
import "../styles/section.css";
import "../styles/faq.css";
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
      </div>
      <div className="country-hero-media">
        <ResponsiveImage fallback={`${stem}.webp`} stem={stem} widths={[480, 960, 1440]} width={1536} height={1024} alt={copy.photoAlt} sizes="(max-width: 900px) calc(100vw - 40px), 52vw" loading="eager" fetchPriority="high" />
      </div>
    </header>

    <section className="country-receive country-section" id="receive" aria-labelledby="country-receive-title">
      <div>
        <h2 id="country-receive-title">{copy.receiveTitle}</h2>
        <p className="country-description">{copy.receiveCopy}</p>
      </div>
      <ResponsiveImage pictureClassName="country-phone" fallback="/images/countries/receive-usd-chidi.webp" stem="/images/countries/receive-usd-chidi" widths={[320, 520, 800]} width={1263} height={2580} alt="USD account details for Chidi Okafor in the Jazari One app" sizes="(max-width: 900px) 280px, 340px" loading="lazy" />
    </section>

    <section className="country-wallet country-section" aria-labelledby="country-wallet-title">
      <Image className="country-product-art" src="/images/journeys/send-globe.png" width={1024} height={1024} alt="" />
      <div><h2 id="country-wallet-title">Send and receive USDT.</h2><p className="country-description">Client payments or money for family. Send, receive, and hold USDT on supported networks, all in one balance. Check the address, network, and fees before sending.</p><Link href="/send/#wallet" className="country-product-action neutral-control">Explore sending</Link></div>
    </section>

    <section className="country-savings country-section" id="savings" aria-labelledby="country-savings-title">
      <div><h2 id="country-savings-title">Savings</h2><p className="country-description">{copy.savingsCopy}</p><Link href="/yields/" className="country-product-action neutral-control">Explore Yields</Link><p className="country-risk">Yields are not insured savings accounts. Rates are variable, withdrawals may be delayed, and capital is at risk.</p></div>
      <Image className="country-product-art" src="/images/journeys/yields-wheat.png" width={1024} height={1024} alt="" />
    </section>

    <section className="country-guides country-section" aria-labelledby="country-guides-title">
      <div className="country-section-heading"><h2 id="country-guides-title">Blog</h2><Link href="/blog/" className="neutral-control">All Articles</Link></div>
      <div className="country-guide-list">{countryGuides.filter(guide => guide.country === country).map(guide => <Link href={`/blog/${guide.slug}/`} key={guide.slug}><h3>{guide.title}</h3><span>Read Article</span></Link>)}</div>
    </section>

    <section className="country-faq faq section" id="faq" aria-labelledby="country-faq-title"><header className="chapter-heading"><h2 id="country-faq-title">FAQ</h2><p className="faq-contact">Something we missed? <a href="mailto:hello@jazari.xyz">Email us</a></p></header><div className="faq-content"><AccordionList items={questions} /></div></section>
    <SiteFooter country={country} />
    <div className="country-mobile-download"><CountryDownloadLink country={country} placement="mobile-sticky" className="country-primary-action">Download App</CountryDownloadLink></div>
  </main>;
}
