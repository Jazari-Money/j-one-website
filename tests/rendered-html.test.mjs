import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const route = path === "/" ? "" : `${path.replace(/\/$/, "")}/`;
  const html = await readFile(
    new URL(`../out/${route}index.html`, import.meta.url),
    "utf8",
  );

  return new Response(html, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

test("server-renders the Jazari One landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Jazari One — Get paid in USD\. Earn\. Send worldwide\.<\/title>/i);
  assert.match(html, /Get paid in USD\. Earn\./);
  assert.match(html, /Send worldwide\./);
  assert.match(html, /Your own USD account and stablecoin wallet\. Up to 7% APY with Yields\./);
  assert.equal((html.match(/class="hero-description-line"/g) ?? []).length, 3);
  assert.match(html, /<span>Earn\. Send<\/span>/);
  assert.match(html, /j-one-app-main\.png/);
  assert.match(html, /Download App/);
  const instagramSocial = html.indexOf("Jazari One on Instagram");
  const linkedinSocial = html.indexOf("Jazari One on LinkedIn");
  const facebookSocial = html.indexOf("Jazari One on Facebook");
  const xSocial = html.indexOf("Jazari One on X");
  assert.ok(instagramSocial < linkedinSocial);
  assert.ok(linkedinSocial < facebookSocial);
  assert.ok(facebookSocial < xSocial);
  assert.match(html, /https:\/\/uk\.linkedin\.com\/company\/jazarimoney/);
  assert.doesNotMatch(html, /What do you want to do\?/);
  assert.doesNotMatch(html, /One balance\. Three ways to move\./);
  assert.match(html, /<h3>Receive<\/h3>/);
  assert.match(html, /<h3>Earn<\/h3>/);
  assert.match(html, /<h3>Send<\/h3>/);
  assert.match(html, /Explore receiving/);
  assert.match(html, /Explore sending/);
  assert.match(html, /Explore Yields/);
  assert.match(html, /href="\/receive\/?"/);
  assert.match(html, /href="\/send\/?"/);
  assert.match(html, /href="\/send\/#rates"/);
  assert.match(html, /href="\/yields\/?"/);
  assert.match(html, /send-globe\.png/);
  assert.match(html, /yields-wheat\.png/);
  assert.match(html, />Product<\/summary>/);
  assert.match(html, /<strong>Receive<\/strong><small>Receive money into your own USD account and stablecoin wallet<\/small>/);
  assert.match(html, /<strong>Earn<\/strong><small>Earn up to 7% APY on your balance<\/small>/);
  assert.match(html, /<strong>Send<\/strong><small>Send money to stablecoin wallets and to local bank accounts in 30\+ countries<\/small>/);
  const productMenu = html.slice(html.indexOf('<div class="nav-dropdown-menu">'), html.indexOf('</div></details>'));
  assert.equal((productMenu.match(/class="nav-product-entry"/g) ?? []).length, 3);
  assert.doesNotMatch(productMenu, /USD account<\/a>|Digital dollars<\/a>|Rates &amp; destinations<\/a>/);
  assert.doesNotMatch(html, /Select Receive on the home screen/);
  assert.doesNotMatch(html, /Calculate your rate/);
  assert.match(html, /Coming soon/);
  assert.match(html, />Yields<\/a>/);
  assert.match(html, /Coming soon/);
  assert.match(html, /USD account/);
  assert.match(html, /Additional payout countries/);
  assert.match(html, /Philippines/);
  assert.match(html, /Higher-return Yields/);
  assert.match(html, /More Yields options, with higher APY/);
  assert.match(html, /Choose a loan amount and repayment plan at confirmation/);
  assert.match(html, /Visa card/);
  assert.ok(html.indexOf("Remit Now Pay Later") < html.indexOf("Visa card"));
  assert.match(html, /Want to keep your salary in dollars\. Not forced to convert on arrival\./);
  assert.match(html, /Multiple clients, multiple countries/);
  assert.match(html, /Income doesn&#x27;t arrive on time/);
  assert.match(html, /dollar-balance\.webp/);
  assert.match(html, /mexico-transfer\.webp/);
  assert.match(html, /brazil\.jpg/);
  assert.match(html, /colombia\.jpg/);
  assert.match(html, /europe\.jpg/);
  assert.doesNotMatch(html, /How to compare a transfer beyond the headline rate/);
  assert.doesNotMatch(html, /What to verify before sending money to a new recipient/);
  assert.doesNotMatch(html, /Digital dollars and bank payouts: what each part does/);
  assert.match(html, /Tips and guides to help you get the most from Jazari One/);
  assert.match(html, /href="mailto:hello@jazari\.xyz"/);
  assert.match(html, /Tell us what you(?:<!--.*?-->)?&#x27;d like to see/);
  assert.match(html, />Partners</);
  assert.match(html, />About us</);
  assert.match(html, />FAQ</);
  assert.match(html, />Support</);
  assert.match(html, /href="\/help\/?">Help<\/a>/);
  assert.match(html, /href="mailto:hello@jazary\.xyz">hello@jazary\.xyz<\/a>/);
  assert.match(html, />Email us<\/a>/);
  assert.doesNotMatch(html, />Email us\.<\/a>/);
  assert.ok(html.indexOf('id="roadmap"') < html.indexOf('id="blog"'));
  assert.ok(html.indexOf('id="blog"') < html.indexOf('id="networks"'));
  assert.ok(html.indexOf('id="networks"') < html.indexOf('id="faq"'));
  assert.match(html, />Blog</);
  assert.match(html, /Bridge/);
  assert.match(html, /Lido/);
  assert.doesNotMatch(html, /Hidden FX rate fee/);
  assert.doesNotMatch(
    html,
    /Private beta · No commitment · Availability varies by country/,
  );
  assert.match(html, /For your work and the life you(?:<!--.*?-->)?&#x27;re building<\/h2>/);
  assert.doesNotMatch(html, /building every day/);
  assert.doesNotMatch(html, /audience-index/);
  assert.match(html, /analytics_storage:'denied'/);
  assert.doesNotMatch(html, /https:\/\/www\.googletagmanager\.com\/gtag\/js/);

  const footer = html.slice(
    html.indexOf('<footer class="site-footer">'),
    html.indexOf("</footer>") + "</footer>".length,
  );
  assert.doesNotMatch(footer, />Contact<\/a>/);
  assert.equal((footer.match(/href="https:\/\/jazarione\.app\.link\/web-launch"/g) ?? []).length, 2);
  const footerMeta = footer.slice(footer.indexOf('<div class="footer-meta">'));
  const parentAddress = footerMeta.indexOf("Jazari One, Inc.,");
  const fincen = footerMeta.indexOf("Jazari One holds a FinCEN MSB registration (No. MRX26-00006547)");
  const fzcoAddress = footerMeta.indexOf("Jazari Fintech Services FZCO,");
  const subsidiary = footerMeta.indexOf("Jazari Fintech Services FZCO is a subsidiary of Jazari One, Inc.");
  const disclosures = footerMeta.indexOf('<ol class="footer-registration footer-disclosures">');
  assert.ok(parentAddress < fincen);
  assert.ok(fincen < fzcoAddress);
  assert.ok(fzcoAddress < subsidiary);
  assert.ok(subsidiary < disclosures);
  assert.doesNotMatch(footerMeta, /<strong>|<\/strong>|—/);
  assert.equal((footerMeta.match(/<li>/g) ?? []).length, 4);
  assert.match(footerMeta, /<li>1\. Jazari One is a technology service provider/);
  assert.match(footerMeta, /<li>2\. Balances held in Jazari One are stablecoins/);
  assert.match(footerMeta, /<li>3\. Earn is an interface to third-party decentralised finance protocols/);
  assert.match(footerMeta, /<li>4\. Geographic, regulatory and eligibility limits apply and may change\.<\/li>/);
  assert.doesNotMatch(footerMeta, /Wallet, custody, conversion and payout services are provided/);
  assert.doesNotMatch(footerMeta, /Cryptoasset balances and Earn allocations are not covered/);
});

test("server-renders product, coming soon, partners, about, and help pages", async () => {
  const [planResponse, yieldsResponse, receiveResponse, usdAccountResponse, sendResponse, roadmapResponse, partnersResponse, aboutResponse, helpResponse] = await Promise.all([
    render("/plan"),
    render("/yields"),
    render("/receive"),
    render("/usd-account"),
    render("/send"),
    render("/roadmap"),
    render("/partners"),
    render("/about"),
    render("/help"),
  ]);
  const [plan, yields, receive, usdAccount, send, roadmap, partners, about, help] = await Promise.all([
    planResponse.text(),
    yieldsResponse.text(),
    receiveResponse.text(),
    usdAccountResponse.text(),
    sendResponse.text(),
    roadmapResponse.text(),
    partnersResponse.text(),
    aboutResponse.text(),
    helpResponse.text(),
  ]);

  assert.match(plan, /<h1>Pricing<\/h1>/);
  assert.match(plan, /Pricing valid as of August 27, 2026 and subject to change\./);
  assert.match(plan, /Jazari One reserves the right to change pricing at any time\./);
  assert.ok(plan.indexOf("<h2>Money movement</h2>") < plan.indexOf("<h2>Payment rails</h2>"));
  assert.ok(plan.indexOf("<h2>Payment rails</h2>") < plan.indexOf("<h2>USD account</h2>"));
  assert.ok(plan.indexOf("<h2>USD account</h2>") < plan.indexOf("<h2>Yields</h2>"));
  assert.match(plan, /Receive supported stablecoins/);
  assert.match(plan, /No transfer fee¹/);
  assert.match(plan, /Free over \$10/);
  assert.match(plan, /USDT support charge/);
  assert.match(plan, /0\.10%/);
  assert.match(plan, /US bank account — ACH, FedWire and FedNow/);
  assert.match(plan, /UK Faster Payments — GBP FPS/);
  assert.match(plan, /COP Bre-B/);
  assert.match(plan, /<h2>Yields<\/h2>/);
  assert.match(plan, /Performance fee/);
  assert.match(plan, /Deposit and withdrawal/);

  assert.match(yields, /Gauntlet USD Alpha/);
  assert.match(yields, /Put your balance to work/);
  assert.match(yields, /Rates adjust daily and returns are never guaranteed/);
  assert.match(yields, /An independently managed, Base-based strategy/);
  assert.match(yields, />Learn more<\/a>/);
  assert.doesNotMatch(yields, /<dt>Funding assets?<\/dt>/);
  assert.doesNotMatch(yields, /USDC or USDT|USDC · USDT/);
  assert.match(yields, /Gauntlet USD Alpha <span class="yield-inline-rate">· 4\.66% APY<\/span>/);
  assert.match(yields, /Lido EarnUSD/);
  assert.match(yields, /\/images\/rails\/lido-white\.svg/);
  assert.match(yields, /Lido EarnUSD <span class="yield-inline-rate">· 7% APY<\/span>/);
  assert.doesNotMatch(yields, /<strong>Variable<\/strong><span>APY<\/span>/);
  assert.match(yields, /https:\/\/stake\.lido\.fi\/earn\/usd\/deposit/);
  assert.equal((yields.match(/Instant or up to 72 hours/g) ?? []).length, 2);
  assert.match(yields, /<dt>Protection<\/dt><dd>Not deposit-insured<\/dd>/);
  assert.doesNotMatch(yields, /Illustrative rate supplied by Jazari/);
  assert.match(yields, /<title>Earn with Yields — Jazari One<\/title>/);
  assert.match(yields, /<h1>Earn with Yields<\/h1>/);
  assert.doesNotMatch(yields, /Return and risk move together/);
  assert.match(yields, /What are Yields\?/);
  assert.match(yields, /Where do Yields come from\?/);
  assert.match(yields, /How Yields work/);
  assert.match(yields, /How to open your Yields/);
  assert.doesNotMatch(yields, /<header class="scenario-how-heading"><p>Yields<\/p>/);
  assert.match(yields, /Review a strategy, choose how much to add/);
  assert.match(yields, /Open Yields/);
  assert.match(yields, /how-to-yield-01\.png/);
  assert.match(yields, /how-to-yield-02\.png/);
  assert.match(yields, /how-to-yield-03\.png/);
  assert.match(yields, /Ready to open Yields\?/);

  assert.match(receive, /<title>Receive — Jazari One<\/title>/);
  assert.match(receive, /<h1>Receive<\/h1>/);
  assert.match(receive, /<h3 id="usd-account-title">USD Account<\/h3>/);
  assert.match(receive, /ACH\/Wire, ACH Same day, FedNow, Swift/);
  assert.doesNotMatch(receive, /ACH, FedNow, domestic wire, and SWIFT/);
  assert.match(receive, /licensed US bank partner/);
  assert.match(receive, /Open to US and non-US residents, in 190\+ countries/);
  assert.match(receive, /id="wallet"/);
  assert.match(receive, /<h3 id="wallet-title">Stablecoin wallet<\/h3>/);
  assert.match(receive, /Supported networks/);
  assert.match(receive, /Supported stablecoins/);
  assert.match(receive, /\/images\/rails\/usdc\.svg/);
  assert.match(receive, /\/images\/rails\/usdt\.svg/);
  assert.match(receive, /Ethereum/);
  assert.match(receive, /TRON/);
  assert.match(receive, /Solana/);
  assert.doesNotMatch(receive, /Polygon/);
  assert.match(receive, /Base/);
  assert.match(receive, /Incoming fee<\/dt><dd>\$0\*/);
  assert.match(receive, /\* \$0 at launch\. Pricing may change later\./);
  assert.doesNotMatch(receive, /Use your USD account details/);
  assert.match(receive, /receive-usd-account\.png/);
  assert.match(receive, /receive-stablecoins-account\.png/);
  assert.match(receive, /product-final-cta color-event-cta/);
  assert.match(receive, /neutral-control receive-final-action/);
  assert.doesNotMatch(receive, /Receive through a wallet|Open Jazari One and choose Add Funds/);
  assert.doesNotMatch(receive, /Availability is subject to identity verification/);
  assert.doesNotMatch(receive, /Two reasons to receive|Receiving methods|Two ways in\. One balance\.|<h2[^>]*>How it works<\/h2>/);

  assert.match(usdAccount, /NEXT_REDIRECT;replace;\/receive\/#usd-account;307/);
  assert.doesNotMatch(usdAccount, /<main class="usd-account-shell">/);

  assert.match(send, /<title>Send money — Jazari One<\/title>/);
  assert.match(send, /<h1>Send<\/h1>/);
  assert.doesNotMatch(send, /<header class="send-hero">[\s\S]*?<a class="realism-button"/);
  assert.match(send, /30\+ countries/);
  assert.match(send, /<h3 id="bank-accounts-title">Bank transfer<\/h3>/);
  assert.match(send, /<h3 id="send-wallet-title">Stablecoin wallet<\/h3>/);
  assert.match(send, /how-to-send-02\.png/);
  assert.match(send, /how-to-send-01\.png/);
  assert.match(send, /Supported networks/);
  assert.match(send, /Supported stablecoins/);
  assert.match(send, /before you confirm a transfer/);
  assert.doesNotMatch(send, /before showing an address/);
  assert.match(send, /Know what arrives before you send/);
  assert.match(send, /Estimated recipient amount/);
  assert.match(send, /All receiving countries/);
  assert.match(send, /product-final-cta color-event-cta/);
  assert.match(send, /neutral-control receive-final-action/);
  assert.doesNotMatch(send, /<h2[^>]*>How it works<\/h2>|International transfers/);

  assert.match(roadmap, /<h1>Coming soon<\/h1>/);
  assert.doesNotMatch(roadmap, /<h2>USD account<\/h2>/);
  assert.match(roadmap, /<h2>Visa card<\/h2>/);
  assert.match(roadmap, /Additional payout countries/);
  assert.match(roadmap, /Philippines/);
  assert.match(roadmap, /Higher-return Yields/);
  assert.match(roadmap, /Remit Now Pay Later/);
  assert.ok(roadmap.indexOf("Remit Now Pay Later") < roadmap.indexOf("Visa card"));

  assert.match(partners, /<h1>Partners<\/h1>/);
  assert.match(partners, /Lido/);
  assert.match(partners, /ComplyAdvantage/);
  assert.match(partners, /Transaction monitoring and financial crime risk intelligence/);
  assert.match(partners, /Sumsub/);
  assert.match(partners, /KYC and identity verification/);
  assert.match(partners, /Supported networks/);
  assert.match(partners, /USDC/);
  assert.match(partners, /A digital dollar pegged at 1:1 with USD\. Issued by Tether/);
  assert.match(partners, /A digital dollar pegged at 1:1 with USD\. Issued by Circle/);

  assert.match(about, /<h1>About us<\/h1>/);
  assert.match(about, /<h2 id="about-manifest-title">Manifesto<\/h2>/);
  assert.match(about, /Every transfer begins with something real/);
  assert.match(about, /Alex and Has, founders of Jazari One/);
  assert.match(about, /jazari-founders\.webp/);
  assert.match(about, /jazari-founders-2560\.avif/);
  assert.match(about, /Built in the United States and UAE/);
  assert.match(about, /Registered in Dover, Delaware/);
  assert.match(about, /Registration #78870/);
  assert.doesNotMatch(about, /United States entity/);
  assert.doesNotMatch(about, /UAE entity/);
  assert.match(about, /<h2 id="about-trust-title">Our partners<\/h2>/);
  assert.match(about, /We&#x27;re not a bank/);
  assert.match(about, /with our licensed and regulated partners/);
  assert.ok(about.indexOf("jazari-founders.webp") < about.indexOf("about-manifest-title"));
  assert.match(about, /Bridge, a Stripe company/);
  assert.match(about, /Lido logo/);
  assert.match(about, /Your account, your keys\./);
  assert.match(about, /not a bank and not us/);
  assert.match(about, /href="\/partners\/?"/);

  assert.match(help, /<title>Help — Jazari One<\/title>/);
  assert.match(help, /<h1 id="help-title">Help<\/h1>/);
  assert.match(help, /Have a question\?/);
  assert.match(help, /If you have any questions, please reach us/);
  assert.match(help, /href="mailto:hello@jazari\.xyz">hello@jazari\.xyz<\/a>/);
});

test("server-renders the standalone component board", async () => {
  const response = await render("/storyboard");
  const html = await response.text();

  assert.match(html, /<title>Jazari One Component Board<\/title>/);
  assert.match(html, /Jazari One/);
  assert.match(html, /component board/);
  assert.match(html, /Atomic UI inventory/);
  assert.match(html, /Use digital dollars\. Anywhere\./);
  assert.match(html, /Typography/);
  assert.match(html, /Fields &amp; values/);
  assert.match(html, /Dropdowns/);
  assert.match(html, /Segmented controls/);
  assert.match(html, /Accordions/);
  assert.match(html, /Badges &amp; media/);
  assert.match(html, /Desktop/);
  assert.match(html, /Mobile/);
});

test("server-renders the internal legal pages", async () => {
  const [termsResponse, nonUsTermsResponse, privacyResponse, ukRiskResponse] = await Promise.all([
    render("/terms"),
    render("/terms/non-us"),
    render("/privacy-policy"),
    render("/uk-risk-information"),
  ]);
  const [terms, nonUsTerms, privacy, ukRisk] = await Promise.all([
    termsResponse.text(),
    nonUsTermsResponse.text(),
    privacyResponse.text(),
    ukRiskResponse.text(),
  ]);

  assert.match(terms, /<h1>Terms &amp; Conditions<\/h1>/);
  assert.match(terms, /aria-current="page" class="is-active" href="\/terms\/">US Terms<\/a>/);
  assert.match(terms, /href="\/terms\/non-us\/">Non-US Terms<\/a>/);
  assert.doesNotMatch(terms, /Version 1\. These Terms apply/);
  assert.match(terms, /Effective date: 21 April 2026/);
  assert.match(terms, /1\. Introduction/);
  assert.match(terms, /FinCEN MSB registration/);
  assert.match(terms, /29\. State-specific disclosures/);
  assert.match(terms, /30\. Contact information/);
  assert.match(terms, /Bridge Building Inc/);
  assert.match(terms, /2120 University Ave\., Suite 213, Berkeley, CA 94704/);
  assert.match(terms, /23\. Arbitration agreement and class action waive/);
  assert.match(terms, /IMPORTANT - PLEASE READ THIS SECTION CAREFULLY\. IT AFFECTS YOUR LEGAL RIGHTS\./);
  assert.equal((terms.match(/<table>/g) ?? []).length, 8);
  assert.doesNotMatch(terms, /\[US Issuer \/ Regulated Partner\]/);
  assert.doesNotMatch(terms, />INTRODUCTION<|>DEFINITION</);
  assert.doesNotMatch(terms, /JAZARI FINTECH SERVICES - FZCO/);

  assert.match(nonUsTerms, /<title>Terms and Conditions — Jazari One<\/title>/);
  assert.match(nonUsTerms, /<h1>Terms &amp; Conditions<\/h1>/);
  assert.match(nonUsTerms, /href="\/terms\/">US Terms<\/a>/);
  assert.match(nonUsTerms, /aria-current="page" class="is-active" href="\/terms\/non-us\/">Non-US Terms<\/a>/);
  assert.match(nonUsTerms, /Effective date: April 2026/);
  assert.match(nonUsTerms, /JAZARI FINTECH SERVICES - FZCO/);
  assert.match(nonUsTerms, /1\. Introduction/);
  assert.match(nonUsTerms, /20\. How We Use Your Information/);
  assert.match(nonUsTerms, /href="#how-we-use-your-information"/);
  assert.match(nonUsTerms, /governed by the laws of the United Arab/);
  assert.doesNotMatch(nonUsTerms, /29\. State-specific disclosures/);

  assert.match(privacy, /<h1>Privacy Policy<\/h1>/);
  assert.match(privacy, /Last updated: April 2026/);
  assert.match(privacy, /11\. Cookies/);
  assert.match(privacy, /jazari_cookie_consent/);
  assert.match(privacy, /href="\/terms\/?"/);

  assert.match(ukRisk, /<title>Risk information for customers in the United Kingdom \| Jazari One<\/title>/);
  assert.match(ukRisk, /name="robots" content="index, follow"/);
  assert.match(ukRisk, /<h1>Risk information for customers in the United Kingdom<\/h1>/);
  assert.doesNotMatch(ukRisk, /Reading time: about 2 minutes\. Last updated: 20 Aug 2026/);
  assert.match(ukRisk, /Last updated: 20 Aug 2026/);
  assert.doesNotMatch(ukRisk, /Due to the potential for losses/);
  assert.doesNotMatch(ukRisk, /What are the key risks\?/);
  assert.match(ukRisk, /Operational failings such as technology outages, cyber-attacks and comingling of funds/);
  assert.match(ukRisk, /href="mailto:hello@jazari\.xyz">hello@jazari\.xyz<\/a>/);
  assert.match(ukRisk, /href="\/uk-risk-information\/?"/);
  assert.match(ukRisk, /href="https:\/\/www\.fca\.org\.uk\/investsmart" target="_blank" rel="noopener noreferrer"/);
});

test("server-renders the account deletion page without indexing it", async () => {
  const response = await render("/how-to-delete-account");
  const html = await response.text();

  assert.match(html, /<title>Delete Account — Jazari One<\/title>/);
  assert.match(html, /name="robots" content="noindex, nofollow"/);
  assert.match(html, /<h1>Delete Your Account<\/h1>/);
  assert.match(html, /1\. Requesting account deletion/);
  assert.match(html, /2\. Processing time/);
  assert.match(html, /3\. What happens after deletion/);
  assert.match(html, /4\. Need help/);
  assert.match(html, /href="mailto:hello@jazari\.xyz">hello@jazari\.xyz<\/a>/);
  assert.match(html, /href="\/privacy-policy\/?"/);

  const sitemap = await readFile(
    new URL("../out/sitemap.xml", import.meta.url),
    "utf8",
  );
  assert.doesNotMatch(sitemap, /how-to-delete-account/);
});

test("publishes the email confirmation handoff page and iOS universal link", async () => {
  const response = await render("/email-confirm");
  const html = await response.text();

  assert.match(html, /<title>Finish creating your Jazari One account<\/title>/);
  assert.match(html, /<h1 class="h1">Email confirmed<\/h1>/);
  assert.match(html, /src="qr\.svg"/);
  assert.match(html, /https:\/\/jazarione\.app\.link\/WkuNVbyKr4b/);
  assert.match(html, /window\.setTimeout/);
  assert.match(html, /name="robots" content="noindex,nofollow"/);

  const association = JSON.parse(
    await readFile(
      new URL("../out/.well-known/apple-app-site-association", import.meta.url),
      "utf8",
    ),
  );
  assert.deepEqual(association.applinks.details[0].appIDs, [
    "Q2Y9X7ZNXN.money.jazari.global",
    "Q2Y9X7ZNXN.money.jazari.global.dev",
  ]);
  assert.equal(association.applinks.details[0].components[1]["/"], "/email-confirm");
});

test("publishes internal support and product pages in the sitemap", async () => {
  const sitemap = await readFile(
    new URL("../out/sitemap.xml", import.meta.url),
    "utf8",
  );

  assert.match(
    sitemap,
    /<loc>https:\/\/jazari\.xyz\/uk-risk-information<\/loc>/,
  );
  assert.match(
    sitemap,
    /<loc>https:\/\/jazari\.xyz\/help<\/loc>/,
  );
  assert.doesNotMatch(sitemap, /<loc>[^<]*\/usd-account<\/loc>/);
  assert.match(
    sitemap,
    /<loc>https:\/\/jazari\.xyz\/receive<\/loc>/,
  );
  assert.match(
    sitemap,
    /<loc>https:\/\/jazari\.xyz\/send<\/loc>/,
  );
  assert.match(
    sitemap,
    /<loc>https:\/\/jazari\.xyz\/terms\/non-us<\/loc>/,
  );
  assert.doesNotMatch(sitemap, /compare-transfer-costs|verify-recipient-details|digital-dollars-bank-payouts/);
});

test("keeps the restrained interactions and clear content hierarchy in source", async () => {
  const homeDirectory = new URL("../app/home/", import.meta.url);
  const homeFiles = (await readdir(homeDirectory))
    .filter((file) => /\.(?:ts|tsx)$/.test(file))
    .sort();
  const homeSource = (
    await Promise.all(
      homeFiles.map((file) => readFile(new URL(file, homeDirectory), "utf8")),
    )
  ).join("\n");

  const stylesDirectory = new URL("../app/styles/", import.meta.url);
  const styleFiles = (await readdir(stylesDirectory))
    .filter((file) => file.endsWith(".css"))
    .sort();
  const stylesSource = (
    await Promise.all(
      styleFiles.map((file) => readFile(new URL(file, stylesDirectory), "utf8")),
    )
  ).join("\n");

  const [pageEntry, globals, packageJson, heroColorEventSource] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../app/home/HeroColorEvent.tsx", import.meta.url), "utf8"),
  ]);
  const page = `${pageEntry}\n${homeSource}`;
  const css = `${globals}\n${stylesSource}`;

  assert.match(page, /HeroColorEvent/);
  assert.match(page, /className="hero-shader"/);
  assert.match(page, /className="hero-title-line"/);
  assert.match(page, /vec3\(1\., \.3, \.16\)/);
  assert.match(heroColorEventSource, /u_dust_time \* 9\.5 \/ cssHeight/);
  assert.match(heroColorEventSource, /u_dust_time \* 12\.5 \/ cssHeight/);
  assert.doesNotMatch(heroColorEventSource, /u_ptr|pointerTarget|pointerSmooth/);
  assert.doesNotMatch(heroColorEventSource, /addEventListener\("pointermove"/);
  assert.doesNotMatch(page, /accessOpen|Join Waitlist|Email address/);
  assert.match(page, /className="scenario-step-grid"/);
  assert.match(page, /className="scenario-step-note"/);
  assert.doesNotMatch(page, /role="tablist"/);
  assert.doesNotMatch(page, /View screen|Showing screen/);
  assert.match(page, /className="review-fee"/);
  assert.match(page, /className="numeric"/);
  assert.match(page, /title: "Open Yields"/);
  assert.match(page, /Know what arrives before you send/);
  assert.match(page, /Live rate from our payment partner/);
  assert.match(page, /rate-freshness/);
  assert.match(page, /\/images\/features\/new\/dollar-balance\.webp/);
  assert.match(page, /\/images\/journeys\/send-globe\.png/);
  assert.match(page, /\/images\/journeys\/yields-wheat\.png/);
  assert.doesNotMatch(page, /\/images\/features\/new\/send\.webp/);
  assert.match(page, /guides\.slice\(0, 4\)/);
  assert.match(page, /\/images\/stores\/app-store-badge\.avif/);
  assert.match(page, /\/images\/stores\/google-play-badge\.avif/);
  assert.match(page, /\/images\/brand\/visa-white\.svg/);
  assert.match(page, /className="audience-caption"/);
  assert.match(page, /\/images\/rails\/bridge\.svg/);
  assert.match(page, /\/images\/rails\/privy\.svg/);
  assert.match(page, /\/images\/rails\/gauntlet-mark\.svg/);
  assert.match(page, /\/images\/rails\/usdt\.svg/);
  assert.match(page, /\/images\/rails\/usdc\.svg/);
  assert.match(page, /\/images\/rails\/ethereum\.svg/);
  assert.match(page, /\/images\/rails\/tron\.svg/);
  assert.match(page, /\/images\/rails\/solana\.svg/);
  assert.match(page, /\/images\/rails\/polygon-symbol\.svg/);
  assert.match(page, /\/images\/rails\/base-mark\.svg/);
  assert.match(page, /src=\{item\.logo\}/);
  assert.match(page, /--card-rx/);
  assert.match(page, /createShader/);
  assert.match(page, /playSweep/);
  assert.match(page, /bandTight:\s*40/);

  assert.match(css, /\.journey-card/);
  assert.match(css, /\.card-object/);
  assert.match(css, /\.pointer-card::after/);
  assert.match(css, /\.provider-logo img/);
  assert.match(css, /\.faq-list/);
  assert.match(css, /@media \(min-width: 901px\)/);
  assert.match(css, /--page:\s*min\(1320px/);
  assert.match(css, /\.hero-download-control/);
  assert.match(css, /\.hero-shader/);
  assert.match(css, /\.usd-account-hero-visual picture/);
  assert.match(css, /mask-image:\s*linear-gradient\(to bottom/);
  assert.match(css, /hero-event-line/);
  assert.match(css, /"Instrument Serif"/);
  assert.match(css, /\[data-theme="jazari"\]/);
  assert.doesNotMatch(css, /\[data-theme="(?:black|dark|blue|sea|toxic|solar|magenta|violet|infrared|aurora)"\]/);
  assert.doesNotMatch(css, /\[data-shader="(?:horizon|orbital|ribbon)"\]/);
  assert.doesNotMatch(page, /Choose color theme|themeOptions|shaderOptions/);
  assert.doesNotMatch(page, /GodRays|GrainGradient/);
  assert.doesNotMatch(page, /→|↗/);
  assert.doesNotMatch(page, /story\.name\.slice\(0, 2\)/);
  assert.doesNotMatch(page, /<i>\$<\/i>/);
  assert.doesNotMatch(page, /className="network-flow"/);
  assert.doesNotMatch(page, /className="step-screen-copy"/);
  assert.doesNotMatch(page, /PageLoadSweep/);
  assert.doesNotMatch(page, /LiquidMetal|LiquidFadeLayer/);
  assert.doesNotMatch(page, /className="hero-proof"/);
  assert.doesNotMatch(page, /className="audience-details"/);
  assert.doesNotMatch(page, /className="card-(?:shader|chip|number|holder)"/);
  assert.doesNotMatch(css, /\.liquid-metal-layer|\.hero-proof|\.audience-details/);
  assert.match(packageJson, /"glimm"/);
  assert.match(css, /filter:\s*grayscale\(1\)\s*brightness\(0\)\s*invert\(1\)/);
  assert.match(css, /\.hero-device-image/);
  assert.match(css, /rgba\(0, 0, 0, 0\.8\) 82%/);
});

test("ships local provider marks and product artwork", async () => {
  const svgAssets = [
    "privy.svg",
    "gauntlet-mark.svg",
    "usdt.svg",
    "usdc.svg",
    "ethereum.svg",
    "tron.svg",
    "solana.svg",
    "polygon-symbol.svg",
    "base-mark.svg",
  ];

  for (const asset of svgAssets) {
    const svg = await readFile(
      new URL(`../public/images/rails/${asset}`, import.meta.url),
      "utf8",
    );
    assert.match(svg, /<svg\b/i, asset);
  }

  const visa = await readFile(
    new URL("../public/images/brand/visa-white.svg", import.meta.url),
    "utf8",
  );
  assert.match(visa, /<svg\b/i);

  const bridge = await readFile(
    new URL("../public/images/rails/bridge.svg", import.meta.url),
    "utf8",
  );
  assert.match(bridge, /<svg\b/i);
  assert.match(bridge, /<path\b/i);
  assert.doesNotMatch(bridge, /data:image|<image\b/i);
});

test("renders the Blog index and the four corridor guides", async () => {
  const indexResponse = await render("/blog");
  assert.equal(indexResponse.status, 200);
  const indexHtml = await indexResponse.text();
  assert.match(indexHtml, /Tips and guides to help you get the most from Jazari One/);
  assert.match(indexHtml, /Something missing\?/);
  assert.match(indexHtml, /href="mailto:hello@jazari\.xyz"/);
  assert.match(indexHtml, /Tell us what you(?:<!--.*?-->)?&#x27;d like to see/);
  assert.equal((indexHtml.match(/Read Article/g) ?? []).length, 4);
  assert.match(indexHtml, /mexico-transfer\.webp/);
  assert.doesNotMatch(indexHtml, /min read/i);
  assert.doesNotMatch(indexHtml, /<span>Mexico<\/span>/);
  assert.doesNotMatch(indexHtml, /<span>Brazil<\/span>/);

  const routes = [
    ["/blog/send-money-to-mexico", /How to send dollars to Mexico in 3 steps/],
    ["/blog/send-money-to-brazil", /How to send dollars to Brazil in 3 steps/],
    ["/blog/send-money-to-colombia", /How to send dollars to Colombia in 3 steps/],
    ["/blog/send-money-to-europe", /How to send dollars to Europe in 3 steps/],
  ];

  for (const [path, title] of routes) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.match(html, title);
    assert.match(html, /aria-label="Breadcrumb"/);
    assert.match(html, /Ready to join Jazari One\?/);
    assert.match(html, /Jazari Fintech Services/);
    assert.doesNotMatch(html, /At a glance/);
    assert.doesNotMatch(html, /class="article-note"/);
    assert.doesNotMatch(html, /min read/i);
    assert.match(html, /href="\/#top"/);
    assert.match(html, /href="\/blog\/?"/);
    assert.match(html, /href="https:\/\/jazarione\.app\.link\/web-launch"/);
    assert.doesNotMatch(html, /\/j-one-website\//);
  }

  const mexico = await (await render("/blog/send-money-to-mexico")).text();
  assert.match(mexico, /mexico-transfer\.webp/);

  const corridorGuides = [
    {
      path: "/blog/send-money-to-mexico",
      rail: "SPEI",
      description:
        "Send dollars to Mexico through SPEI in three steps. Learn which 18-digit CLABE and recipient details you need, plus timing and confirmation checks.",
    },
    {
      path: "/blog/send-money-to-brazil",
      rail: "Pix",
      description:
        "Send dollars to Brazil through Pix in three steps. Learn which Pix key and recipient details you need, what to review, and when the reais should arrive.",
    },
    {
      path: "/blog/send-money-to-colombia",
      rail: "Bre-B",
      description:
        "Send dollars to Colombia through Bre-B in three steps. Learn which llave and recipient details you need, what to check, and typical payout timing.",
    },
    {
      path: "/blog/send-money-to-europe",
      rail: "SEPA",
      description:
        "Send dollars to Europe through SEPA in three steps. Learn which IBAN, BIC or SWIFT details you need, what to review, and typical bank payout timing.",
    },
  ];

  for (const guide of corridorGuides) {
    const html = await (await render(guide.path)).text();
    assert.match(html, /class="quick-answer"/);
    assert.match(html, /<h2>Short answer<\/h2>/);
    assert.match(html, new RegExp(guide.rail));
    assert.ok(html.includes(`<meta name="description" content="${guide.description}"/>`));
    assert.ok(html.includes(`<meta property="og:description" content="${guide.description}"/>`));

    const quickAnswer = html.match(
      /<div class="quick-answer"><h2>Short answer<\/h2><p>(.*?)<\/p><\/div>/,
    )?.[1];
    assert.ok(quickAnswer, guide.path);
    const wordCount = quickAnswer.replace(/<[^>]+>/g, "").trim().split(/\s+/).length;
    assert.ok(wordCount >= 40 && wordCount <= 60, `${guide.path}: ${wordCount} words`);
    assert.ok(guide.description.length >= 140 && guide.description.length <= 155);
  }
});
