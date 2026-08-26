/* eslint-disable @next/next/no-img-element -- approved local token and network marks */

import { walletAssets, walletNetworkSupport } from "./data";

export function WalletSupport({ context = "receive" }: { context?: "receive" | "send" }) {
  const supportedNetworks = context === "receive"
    ? walletNetworkSupport.filter((network) => network.name !== "Polygon")
    : walletNetworkSupport;
  const supportNote = context === "send"
    ? "The app confirms the stablecoin and network combinations available to you before you confirm a transfer."
    : "The app confirms the stablecoin and network combinations available to you before showing an address.";

  return (
    <div className="wallet-support">
      <section className="wallet-support-group" aria-labelledby="supported-networks-title">
        <h3 id="supported-networks-title">Supported networks</h3>
        <div className="wallet-network-list">
          {supportedNetworks.map((network) => (
            <article className={network.name === "Solana" ? "is-solana" : undefined} key={network.name}>
              <img src={network.logo} alt="" width="96" height="96" loading="lazy" decoding="async" />
              <h4>{network.name}</h4>
            </article>
          ))}
        </div>
      </section>

      <section className="wallet-support-group" aria-labelledby="supported-stablecoins-title">
        <h3 id="supported-stablecoins-title">Supported stablecoins</h3>
        <div className="wallet-assets">
          {walletAssets.map((asset) => (
            <div key={asset.name}>
              <img src={asset.logo} alt="" width="96" height="96" loading="lazy" decoding="async" />
              <strong>{asset.name}</strong>
            </div>
          ))}
        </div>
      </section>

      <p className="wallet-support-note">
        {supportNote} Eligibility, compliance, sanctions, and network controls apply.
      </p>
    </div>
  );
}
