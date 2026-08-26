import "../styles/receive-page.css";
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
        <h1>Receive money</h1>
        <p>
          Add your own dollars or receive payments through a US account or
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

        <dl className="product-facts product-facts-three">
          <div><dt>Account details</dt><dd>US routing and account number in your name</dd></div>
          <div><dt>Transfer methods</dt><dd>ACH, FedNow, domestic wire, and SWIFT</dd></div>
          <div><dt>Availability</dt><dd>Eligible users in 190+ countries; no US residency required</dd></div>
        </dl>

        <MethodFlow
          title="Use your US account details"
          steps={[
            "Open Add Funds.",
            "Open your USD account details.",
            "Use the details yourself or share them with a payer.",
          ]}
          screen={withBasePath("/images/how-to/how-to-receive-03.png")}
          stem="/images/how-to/how-to-receive-03"
          alt="US account routing and account details in Jazari One"
          screenOverlay="add-funds-usd"
        />

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

        <WalletSupport />

        <MethodFlow
          reverse
          title="Receive through a wallet"
          steps={[
            "Open Add Funds.",
            "Choose USDC or USDT and a supported network.",
            "Copy the address or share the QR code.",
          ]}
          screen={withBasePath("/images/how-to/how-to-receive-02.png")}
          stem="/images/how-to/how-to-receive-02"
          alt="Wallet address and network selection in Jazari One"
          screenOverlay="add-funds-wallet"
        />
      </section>

      <section className="product-final-cta" aria-labelledby="receive-final-title">
        <h2 id="receive-final-title">Ready to receive money?</h2>
        <p>Open Jazari One and choose Add Funds to see the receiving methods available to you.</p>
        <a className="realism-button" href={appDownloadUrl} target="_blank" rel="noreferrer">
          Download App
        </a>
      </section>

      <SiteFooter />
    </main>
  );
}
