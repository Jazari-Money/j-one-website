import "../styles/receive-page.css";
import { ContainedColorEvent } from "../home/ContainedColorEvent";
import { InternalSiteHeader } from "../home/InternalSiteHeader";
import { MethodFlow } from "../home/MethodFlow";
import { SiteFooter } from "../home/SiteFooter";
import { WalletSupport } from "../home/WalletSupport";
import { appDownloadUrl, withBasePath } from "../site-paths";

export function ReceivePage() {
  return (
    <main className="receive-shell">
      <InternalSiteHeader />

      <header className="receive-hero">
        <h1>Receive</h1>
        <p>
          Add your own dollars or receive payments through a USD account or
          supported wallets—all in one balance.
        </p>
        <a className="realism-button" href={appDownloadUrl} target="_blank" rel="noreferrer">
          Download App
        </a>
      </header>

      <section className="product-method" id="usd-account" aria-labelledby="usd-account-title">
        <header className="product-method-heading">
          <h2 id="usd-account-title">USD Account</h2>
          <p>
            Get US routing and account numbers in your name through a licensed
            US bank partner. Use them to add your own money or receive ACH,
            FedNow, domestic wire, and SWIFT transfers from clients, employers,
            or other people.
          </p>
        </header>

        <MethodFlow
          title="Use your USD account details"
          screen={withBasePath("/images/how-to/receive-usd-account.png")}
          stem="/images/how-to/receive-usd-account"
          alt="USD account routing and account details in Jazari One"
        >
          <dl className="method-flow-features">
            <div><dt>Account details</dt><dd>US routing and account number in your name</dd></div>
            <div><dt>Transfer methods</dt><dd>ACH, FedNow, domestic wire, and SWIFT</dd></div>
            <div><dt>Availability</dt><dd>Eligible users in 190+ countries; no US residency required</dd></div>
          </dl>
        </MethodFlow>

        <p className="product-eligibility">
          Availability is subject to identity verification, eligibility, and
          supported-country requirements.
        </p>
      </section>

      <section className="product-method product-method-wallet" id="wallet" aria-labelledby="wallet-title">
        <header className="product-method-heading">
          <h2 id="wallet-title">Stablecoin wallet</h2>
          <p>
            Receive USDC or USDT on a supported network and see it in the same
            Jazari One balance as your bank transfers.
          </p>
        </header>

        <MethodFlow
          reverse
          screen={withBasePath("/images/how-to/receive-stablecoins-account.png")}
          stem="/images/how-to/receive-stablecoins-account"
          alt="Wallet address and network selection in Jazari One"
        >
          <WalletSupport />
        </MethodFlow>
      </section>

      <ContainedColorEvent className="product-final-cta" labelledBy="receive-final-title">
        <div className="color-event-cta-copy">
          <h2 id="receive-final-title">Ready to receive money?</h2>
        </div>
        <a className="neutral-control receive-final-action" href={appDownloadUrl} target="_blank" rel="noreferrer">
          Download App
        </a>
      </ContainedColorEvent>

      <SiteFooter />
    </main>
  );
}
