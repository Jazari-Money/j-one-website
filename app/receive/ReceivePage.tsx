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
      </header>

      <section className="product-method" id="usd-account" aria-labelledby="usd-account-title">
        <MethodFlow
          title="USD Account"
          titleId="usd-account-title"
          screen={withBasePath("/images/how-to/receive-usd-account.png")}
          stem="/images/how-to/receive-usd-account"
          alt="USD account routing and account details in Jazari One"
        >
          <p className="method-flow-description">
            Get US routing and account numbers in your name through a licensed
            US bank partner. Use them to add your own money or receive transfers
            from clients, or other people.
          </p>
          <dl className="method-flow-features">
            <div><dt>Account details</dt><dd>US routing and account number in your name</dd></div>
            <div><dt>Transfer methods</dt><dd>ACH/Wire, ACH Same day, FedNow, Swift</dd></div>
            <div><dt>Availability</dt><dd>Open to US and non-US residents, in 190+ countries</dd></div>
            <div><dt>Incoming fee</dt><dd>$0*</dd></div>
          </dl>
          <p className="method-flow-footnote">* $0 at launch. Pricing may change later.</p>
        </MethodFlow>
      </section>

      <section className="product-method product-method-wallet" id="wallet" aria-labelledby="wallet-title">
        <MethodFlow
          title="Stablecoin wallet"
          titleId="wallet-title"
          screen={withBasePath("/images/how-to/receive-stablecoins-account.png")}
          stem="/images/how-to/receive-stablecoins-account"
          alt="Wallet address and network selection in Jazari One"
        >
          <p className="method-flow-description">
            Receive USDC or USDT on a supported network and see it in the same
            Jazari One balance as your bank transfers.
          </p>
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
