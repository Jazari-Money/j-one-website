import "../styles/send-page.css";
import { InternalSiteHeader } from "../home/InternalSiteHeader";
import { MethodFlow } from "../home/MethodFlow";
import { RatesCalculator } from "../home/RatesCalculator";
import { SiteFooter } from "../home/SiteFooter";
import { WalletSupport } from "../home/WalletSupport";
import { appDownloadUrl, withBasePath } from "../site-paths";

export function SendPage() {
  return (
    <main className="send-shell">
      <InternalSiteHeader />

      <header className="send-hero">
        <h1>Send money</h1>
        <p>
          Send to bank accounts in local currency or to supported digital
          wallets, with the rate shown before you confirm.
        </p>
        <a className="realism-button" href={appDownloadUrl} target="_blank" rel="noreferrer">
          Download App
        </a>
      </header>

      <section className="product-method send-bank-method" id="bank-accounts" aria-labelledby="bank-accounts-title">
        <header className="product-method-heading">
          <h2 id="bank-accounts-title">Bank accounts.<br />Local currency.</h2>
          <p>
            Send from your Jazari One balance to bank accounts in 30+ countries.
            Review the exchange rate, estimated recipient amount, applicable fees,
            and delivery time before you confirm.
          </p>
        </header>

        <dl className="product-facts product-facts-three">
          <div><dt>Destinations</dt><dd>30+ supported countries</dd></div>
          <div><dt>Recipient gets</dt><dd>Local currency in their bank account</dd></div>
          <div><dt>Before confirmation</dt><dd>Rate, fees, and estimated recipient amount</dd></div>
        </dl>

        <MethodFlow
          title="Send to a bank account"
          steps={[
            "Choose a country and bank account.",
            "Enter the amount and review the local-currency estimate.",
            "Confirm the transfer and keep the receipt in the app.",
          ]}
          screen={withBasePath("/images/how-to/how-to-send-02.png")}
          stem="/images/how-to/how-to-send-02"
          alt="Bank transfer amount and local-currency estimate in Jazari One"
        />

        <RatesCalculator />
      </section>

      <section className="product-method product-method-wallet" id="wallet" aria-labelledby="send-wallet-title">
        <header className="product-method-heading">
          <h2 id="send-wallet-title">USDC and USDT.<br />Wallet to wallet.</h2>
          <p>
            Send digital dollars to a supported wallet worldwide. Choose the
            correct asset and network, then review the destination before you confirm.
          </p>
        </header>

        <WalletSupport />

        <MethodFlow
          reverse
          title="Send to a wallet"
          steps={[
            "Open Send and choose a digital wallet.",
            "Choose USDC or USDT and the matching supported network.",
            "Paste the address or scan its QR code, then review and confirm.",
          ]}
          screen={withBasePath("/images/how-to/how-to-send-01.png")}
          stem="/images/how-to/how-to-send-01"
          alt="Wallet destination selection in Jazari One"
        />
      </section>

      <section className="product-final-cta" aria-labelledby="send-final-title">
        <h2 id="send-final-title">Ready to send money?</h2>
        <p>Open Jazari One to see the destinations, assets, and networks available to you.</p>
        <a className="realism-button" href={appDownloadUrl} target="_blank" rel="noreferrer">
          Download App
        </a>
      </section>

      <SiteFooter />
    </main>
  );
}
