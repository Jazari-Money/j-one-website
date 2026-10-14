import type { Country } from "./data";

type Section = { heading: string; paragraphs: string[]; bullets?: string[] };
export type CountryGuide = { slug: string; country: Country; route: Country; title: string; deck: string; quickAnswer: string; image: string; imageStem: string; sections: Section[]; sources?: { title: string; url: string }[] };

const bankSources = {
  Nigeria: { title: "GTBank individual account-opening form", url: "https://gtbank-plc.files.svdcdn.com/production/download-forms/Individual-Account-Opening-Form-Tier-3.pdf" },
  Kenya: { title: "Equity Bank Kenya: Current Account requirements", url: "https://equitygroupholdings-ke.azurewebsites.net/ke/open-an-account/personal/current-account/" },
};

function makeGuide(country: Country, topic: "open" | "receive" | "usdt" | "savings"): CountryGuide {
  const lower = country.toLowerCase();
  const imageStem = `/images/countries/${lower}-professional`;
  const common = { country, route: country, image: `${imageStem}.webp`, imageStem };
  if (topic === "open") return {
    ...common, slug: `how-to-open-dollar-account-in-${lower}`, title: `How to open a dollar account in ${country}`,
    deck: "Choose the account that fits how you get paid, then prepare for verification.",
    quickAnswer: `To open a dollar account in ${country}, first decide whether you need a local foreign-currency bank account or USD receiving details through an app. With Jazari One, download the app, complete the requested identity checks, and check your eligibility for USD account details in Receive. Your Jazari balance is held in stablecoins, not bank deposits.`,
    sections: [
      { heading: "Start with the payment you need to receive", paragraphs: [country === "Nigeria" ? "A Nigerian domiciliary account holds foreign currency at a local bank. A digital-dollar app can provide a different route for eligible USD bank payments and stablecoin payments. Compare the account type, payment methods, fees, and withdrawal options before choosing." : "A USD foreign-currency account at a Kenyan bank and USD receiving details through a digital-dollar app serve different needs. Decide whether you need bank deposits, eligible international client payments, or a stablecoin wallet. Check the payment methods your employer or client can use."] },
      { heading: "What are the requirements?", paragraphs: [country === "Nigeria" ? "Bank requirements vary. For example, GTBank’s individual account-opening form lists identification, address evidence, a photograph, and references. Ask the bank for its current checklist and any additional requirements for a USD domiciliary account." : "Requirements depend on the provider. Equity Bank Kenya lists an original identification document and KRA PIN for an individual current account, which can operate in USD. Confirm the bank’s current checklist before applying.", "For Jazari, use the identity and profile requirements shown during onboarding. A local bank’s checklist does not establish Jazari’s requirements. Approval, available payment routes, and limits depend on verification and eligibility."] },
      { heading: "1. Create and verify your profile", paragraphs: ["Download Jazari One from the official app link. Enter your details accurately and complete the checks requested in the app. Do not assume that signing up automatically activates every receiving route."] },
      { heading: "2. Open Receive and review your details", paragraphs: ["If eligible, view the US routing and account numbers provided in your name through a licensed US bank partner. Read the supported payment methods and instructions. If your sender uses USDT, use the stablecoin wallet instead of sharing bank details."] },
      { heading: "3. Check your first payment before sharing details", paragraphs: ["Confirm that the sender’s transfer method is supported and that the beneficiary name matches the app’s instructions. Review fees, limits, and expected timing. Keep a payment reference so you can follow up if the transfer is delayed."] },
      { heading: "Know what you are holding", paragraphs: ["Jazari is a technology service provider, not a bank. USD receiving details are a payment route; the balance you hold in Jazari is stablecoins. Stablecoins can lose value and are not insured bank deposits. Holding a balance does not automatically earn a return."] },
    ], sources: [bankSources[country]],
  };
  if (topic === "receive") return {
    ...common, slug: `how-to-receive-dollars-in-${lower}`, title: `How to receive dollars in ${country}`,
    deck: "USD bank payments and USDT payments use different receiving details. Here is how to choose.",
    quickAnswer: `You can receive dollars in ${country} through an eligible USD bank-payment route or receive digital dollars such as USDT on a supported wallet network. In Jazari One, open Receive and share the instructions for the method your sender will use. Never use a wallet address for a bank transfer or bank details for a USDT transfer.`,
    sections: [
      { heading: "Ask how your sender will pay", paragraphs: ["Before sending an invoice or payment request, ask whether your client, employer, or family member will send a bank transfer or stablecoins. Receiving details must match the method. A platform payment is eligible only if both the platform and receiving provider support the route."] },
      { heading: "Receive an eligible USD bank payment", paragraphs: ["Open Receive in Jazari and review the USD account details available to your profile. Share the beneficiary name, routing and account details, and any additional instructions shown for the supported transfer method. Ask the sender to follow those instructions exactly.", "Check fees and timing before requesting the payment. A payment can take longer because of sender-bank processing, weekends, or verification checks. Keep the invoice and transfer reference."] },
      { heading: "Receive USDT in your wallet", paragraphs: ["Choose USDT and a supported network in Receive. Copy the address and network name together. Ask the sender to select the same asset and network, and to compare the full address before sending. A small test transfer can help when using a new address, but it also incurs any applicable fees."] },
      { heading: "Hold dollars or send them onward", paragraphs: [country === "Nigeria" ? "After a supported payment arrives, you can hold digital dollars or send through an available wallet route. A USD or USDT receipt does not mean you have an NGN bank cash-out route. Check available destinations in the app before planning a withdrawal." : "After a supported payment arrives, you can hold digital dollars or use an available sending route. A USDT receipt does not automatically enable a Kenyan bank or M-PESA payout. Only use a local payout if it appears in your app."] },
      { heading: "If a payment has not arrived", paragraphs: ["Check the payment status, beneficiary details, and transfer reference with your sender. For a wallet payment, confirm the asset, network, and transaction hash. Contact support using the app or official support page. Do not create a duplicate payment while the first transfer is still being investigated."] },
    ],
  };
  if (topic === "usdt") return {
    ...common, slug: `send-receive-hold-usdt-in-${lower}`, title: `How to send, receive, and hold USDT in ${country}`,
    deck: "A practical guide to wallet addresses, networks, transfer costs, and keeping digital dollars.",
    quickAnswer: `To use USDT in ${country} with Jazari One, choose a supported USDT network in the app. To receive, share your wallet address and network. To send, enter a compatible recipient address and review the amount and costs. You can hold USDT without choosing Yields; it does not automatically earn interest.`,
    sections: [
      { heading: "USDT is a digital dollar, with risks", paragraphs: ["USDT is a stablecoin issued by Tether that aims to track the US dollar. It is a cryptoasset, not a USD bank deposit. Its market value can move away from a dollar, and issuer, custody, and network risks can affect your funds. Do not treat a dollar reference as a guarantee."] },
      { heading: "Receiving: share the asset and network together", paragraphs: ["Open Receive, select USDT, and choose a network actually supported in your app. Share the address and network name as one set of instructions. Your sender must use both correctly. An address alone is not enough to establish compatibility."] },
      { heading: "Sending: check the full payment", paragraphs: ["Ask your recipient for their USDT address and supported network. Enter them in the app and read the transfer preview before confirming."], bullets: ["Same asset: USDT", "Same supported network on both sides", "Full recipient address matches", "Amount and total costs are understood", "Recipient can access the receiving wallet"] },
      { heading: "Holding: separate your balance from Yields", paragraphs: ["You can leave digital dollars in your balance between payments. That balance does not automatically generate returns. Jazari’s supported Yields strategies use USDC, so do not send USDT directly to a USDC vault. Follow the app’s funding route if you decide to use an eligible strategy."] },
      { heading: "Local currency is a separate step", paragraphs: [country === "Nigeria" ? "Sending USDT to a wallet is not the same as paying naira into a Nigerian bank account. Check whether your intended destination and currency are available before planning a cash-out. This guide does not promise an NGN payout route." : "A USDT wallet transfer is not a Kenyan shilling payment to a bank or M-PESA. Those require separate supported payout routes. Use only the routes shown for your profile and check the quoted recipient amount and fees."] },
      { heading: "Avoid an irreversible mistake", paragraphs: ["Wallet transfers can be irreversible. Verify a changed address with your recipient through a trusted contact channel, and consider a small test payment before a larger transfer. Never share your password, verification codes, or wallet recovery details with someone claiming to help you receive money."] },
    ], sources: [{ title: "Tether: how USD₮ works", url: "https://tether.to/en/how-it-works/" }],
  };
  return {
    ...common, slug: `dollar-savings-and-yields-in-${lower}`, title: `Dollar savings and Yields in ${country}: what to know`,
    deck: "Holding digital dollars and choosing a yield strategy are two different decisions.",
    quickAnswer: `If you are exploring dollar savings in ${country}, distinguish a bank savings account from holding stablecoins and from investing in Yields. A Jazari digital-dollar balance is not a bank deposit and does not automatically earn interest. Eligible USDC Yields strategies offer variable returns with a risk of loss; they are not insured savings accounts.`,
    sections: [
      { heading: "Start with the purpose of your money", paragraphs: [country === "Nigeria" ? "You might be setting money aside for equipment, education, or a gap between client payments. Think about when you will need it and which currency your future expense uses. Holding digital dollars still leaves you exposed to stablecoin risks and changes in the dollar’s value against naira." : "You might be planning for a course, new work equipment, or time between freelance projects. Consider when you will need the money and whether the expense will be in dollars or Kenyan shillings. A digital-dollar balance still carries stablecoin risks and currency-conversion costs."] },
      { heading: "Holding is not the same as earning", paragraphs: ["Keeping USDT or USDC in your Jazari balance does not automatically earn returns. A bank savings account is a different product with its own terms and protections. Jazari balances are stablecoins, not bank deposits, and can lose value."] },
      { heading: "What choosing Yields changes", paragraphs: ["Yields allocates funds to an eligible third-party decentralised finance strategy. The supported funding asset is USDC. If you hold USDT, follow the funding or conversion route shown in the app; do not send it directly to a USDC vault.", "Read the current APY, strategy description, applicable network costs, and risk notice before confirming. APY is an annualized estimate, not a fixed return. It can change, including falling close to zero."] },
      { heading: "Understand access and loss risks", paragraphs: ["Withdrawals can be delayed by congestion, low liquidity, or market stress. Stablecoin, smart-contract, bridge, oracle, and strategy failures can lead to partial or total loss. Yields are not insured savings accounts and returns are not guaranteed. Review whether the risk and withdrawal conditions fit the money’s purpose."] },
      { heading: "Compare the complete cost", paragraphs: ["Compare funding, conversion, network, and withdrawal costs alongside the displayed rate. Small balances or short holding periods can make those costs significant. Review the app’s current figures rather than relying on a rate shown in an advertisement or an older article."] },
    ],
  };
}

export const countryGuides: CountryGuide[] = (["Nigeria", "Kenya"] as const).flatMap(country => (["open", "receive", "usdt", "savings"] as const).map(topic => makeGuide(country, topic)));

countryGuides.splice(1, 0, {
  country: "Nigeria", route: "Nigeria", slug: "requirements-for-dollar-account-in-nigeria", title: "Requirements for opening a dollar account in Nigeria",
  deck: "A checklist for a domiciliary bank account, and how app-based USD receiving details differ.",
  quickAnswer: "The requirements for a dollar account in Nigeria depend on the provider and account type. A local bank may ask for identification, address evidence, photographs, and references. Jazari uses its own in-app identity and eligibility checks. Confirm the current checklist with your chosen provider before applying.",
  image: "/images/countries/nigeria-professional.webp", imageStem: "/images/countries/nigeria-professional",
  sections: [
    { heading: "Which kind of dollar account do you mean?", paragraphs: ["A domiciliary account is a foreign-currency bank account in Nigeria. USD receiving details through an app provide a payment route with a different underlying balance and terms. In Jazari, your held balance is stablecoins, not bank deposits. Decide which arrangement fits your payment and withdrawal needs before gathering documents."] },
    { heading: "Prepare a bank’s current checklist", paragraphs: ["GTBank’s individual account-opening form lists an application form, a photograph, identity and address evidence, and references. This is one bank’s example, not a universal checklist. Ask your bank about its current USD domiciliary requirements, including any additional identity checks, opening balance, or supporting documents."], bullets: ["Accepted identity document", "Current proof of address", "Photograph and completed application, if required", "References or additional documents, if required", "Confirmation of fees, minimum balances, and supported transfers"] },
    { heading: "For Jazari, follow the app’s requirements", paragraphs: ["Create your profile in the official app and complete the identity checks it requests. Available USD account details and payment methods depend on verification and eligibility. Do not assume that a BVN, NIN, referee, or other local-bank requirement is automatically required by Jazari, or that verification is optional."] },
    { heading: "Before your first dollar payment", paragraphs: ["Check the beneficiary name, receiving details, and supported transfer method. Confirm the complete costs, expected timing, and the available route for sending funds onward. A wallet address receives stablecoins on a matching network; it cannot replace bank details for a USD bank transfer."] },
  ], sources: [bankSources.Nigeria],
});
