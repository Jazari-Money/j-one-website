export function FooterLegalInformation({ country }: { country?: "Kenya" | "Nigeria" }) {
  return (
    <div className="footer-addresses-content">
      <address>
        <span>Jazari One, Inc.,</span>{" "}
        <span>1111B S Governors Ave #93312, Dover, DE 19904, United States</span>
      </address>
      <p className="footer-registration">
        Jazari One holds a FinCEN MSB registration (No. MRX26-00006547)
        reflecting its compliance obligations as an entity operating in the payments ecosystem.
      </p>
      <address>
        <span>Jazari Fintech Services FZCO,</span>{" "}
        <span>#78870, Building A1, IFZA Business Park, Dubai Silicon Oasis, Dubai, UAE</span>
      </address>
      <p className="footer-registration">
        Jazari Fintech Services FZCO is a subsidiary of Jazari One, Inc.
      </p>
      <ol className="footer-registration footer-disclosures">
        <li>1. Jazari One is a technology service provider, not a bank, deposit-taker, e-money institution, or investment adviser.</li>
        <li>2. Balances held in Jazari One are stablecoins, not bank deposits. The value of a cryptoasset, including one that references a fiat currency, may fall to zero.</li>
        <li>{`3. ${country ? "Yields" : "Earn"} is an interface to third-party decentralised finance protocols. Rates are variable, capital is at risk, and returns are not guaranteed.`}</li>
        <li>4. Geographic, regulatory and eligibility limits apply and may change.</li>
      </ol>
    </div>
  );
}
