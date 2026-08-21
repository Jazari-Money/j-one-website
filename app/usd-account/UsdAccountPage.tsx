import "../styles/usd-account-page.css";
import { InternalSiteHeader } from "../home/InternalSiteHeader";
import { ResponsiveImage } from "../home/ResponsiveImage";
import { SiteFooter } from "../home/SiteFooter";
import { appDownloadUrl } from "../site-paths";

export function UsdAccountPage() {
  return (
    <main className="usd-account-shell">
      <InternalSiteHeader />

      <header className="usd-account-hero">
        <div className="usd-account-hero-copy">
          <span>Available now</span>
          <h1>USD account</h1>
          <p>Direct payments to your personal USD account in Jazari One.</p>
          <a
            className="realism-button"
            href={appDownloadUrl}
            target="_blank"
            rel="noreferrer"
          >
            Download App
          </a>
        </div>

        <div className="usd-account-hero-visual" aria-hidden="true">
          <ResponsiveImage
            fallback="/images/roadmap/usa-flag.png"
            stem="/images/roadmap/usa-flag"
            widths={[160, 320, 640]}
            width={1024}
            height={1024}
            sizes="(max-width: 620px) 300px, 460px"
            alt=""
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </div>
      </header>

      <section className="usd-account-details" aria-labelledby="usd-account-details-title">
        <div className="usd-account-details-copy">
          <span>Receive in dollars</span>
          <h2 id="usd-account-details-title">Your own US account details</h2>
          <p>
            Get a US routing and account number in your name through a licensed US
            bank partner. Receive payments by ACH, FedNow, domestic wire, or SWIFT.
          </p>
        </div>

        <dl>
          <div>
            <dt>Account details</dt>
            <dd>US routing and account number</dd>
          </div>
          <div>
            <dt>Payment methods</dt>
            <dd>ACH, FedNow, domestic wire, and SWIFT</dd>
          </div>
          <div>
            <dt>Eligibility</dt>
            <dd>No US residency required</dd>
          </div>
        </dl>
      </section>

      <SiteFooter />
    </main>
  );
}
