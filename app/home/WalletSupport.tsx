/* eslint-disable @next/next/no-img-element -- approved local token and network marks */

import { walletAssets, walletNetworkSupport } from "./data";

export function WalletSupport() {
  return (
    <div className="wallet-support">
      <div className="wallet-assets" aria-label="Supported digital dollars">
        {walletAssets.map((asset) => (
          <div key={asset.name}>
            <img src={asset.logo} alt="" width="96" height="96" loading="lazy" decoding="async" />
            <strong>{asset.name}</strong>
          </div>
        ))}
      </div>

      <div className="wallet-network-list" aria-label="Supported wallet networks">
        {walletNetworkSupport.map((network) => (
          <article key={network.name}>
            <img src={network.logo} alt="" width="96" height="96" loading="lazy" decoding="async" />
            <div>
              <h3>{network.name}</h3>
              <p>Available asset combinations shown in app</p>
            </div>
          </article>
        ))}
      </div>

      <p className="wallet-support-note">
        Select the same asset and network on both sides of a transfer. The app
        confirms the combinations available to you before showing an address;
        eligibility, compliance, sanctions, and network controls apply.
      </p>
    </div>
  );
}
