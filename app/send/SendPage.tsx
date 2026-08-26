import "../styles/send-page.css";
import { ContainedColorEvent } from "../home/ContainedColorEvent";
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
        <h1>Send</h1>
        <p>
          Send money to local bank accounts in 30+ countries or to supported
          stablecoin wallets, with the details shown before you confirm.
        </p>
      </header>

      <section className="product-method send-bank-method" id="bank-accounts" aria-labelledby="bank-accounts-title">
        <MethodFlow
          title="Bank transfer"
          titleId="bank-accounts-title"
          screen={withBasePath("/images/how-to/how-to-send-02.png")}
          stem="/images/how-to/how-to-send-02"
          alt="Bank transfer amount and local-currency estimate in Jazari One"
        >
          <p className="method-flow-description">
            Send from your Jazari One balance to bank accounts in 30+ countries.
            Review the exchange rate, estimated recipient amount, applicable fees,
            and delivery time before you confirm.
          </p>
          <dl className="method-flow-features">
            <div><dt>Destinations</dt><dd>30+ supported countries</dd></div>
            <div><dt>Recipient gets</dt><dd>Local currency in their bank account</dd></div>
            <div><dt>Before confirmation</dt><dd>Rate, fees, delivery time, and recipient amount</dd></div>
            <div><dt>Transfer fee</dt><dd>0%</dd></div>
          </dl>
        </MethodFlow>

        <RatesCalculator />
      </section>

      <section className="product-method product-method-wallet" id="wallet" aria-labelledby="send-wallet-title">
        <MethodFlow
          title="Stablecoin wallet"
          titleId="send-wallet-title"
          screen={withBasePath("/images/how-to/how-to-send-01.png")}
          stem="/images/how-to/how-to-send-01"
          alt="Adding a stablecoin wallet payment destination in Jazari One"
        >
          <p className="method-flow-description">
            Send USDC or USDT to a supported wallet worldwide. Choose the
            matching network and review the destination before you confirm.
          </p>
          <WalletSupport context="send" />
        </MethodFlow>
      </section>

      <ContainedColorEvent className="product-final-cta" labelledBy="send-final-title">
        <div className="color-event-cta-copy">
          <h2 id="send-final-title">Ready to send money?</h2>
        </div>
        <a className="neutral-control receive-final-action" href={appDownloadUrl} target="_blank" rel="noreferrer">
          Download App
        </a>
      </ContainedColorEvent>

      <SiteFooter />
    </main>
  );
}
