import { withBasePath } from "../site-paths";

export const currencies = {
  MXN: { name: "Mexican peso", rate: 18.72, symbol: "$" },
  COP: { name: "Colombian peso", rate: 4175, symbol: "$" },
  BRL: { name: "Brazilian real", rate: 5.49, symbol: "R$" },
  EUR: { name: "Euro", rate: 0.92, symbol: "€" },
} as const;

export type CurrencyCode = keyof typeof currencies;

export const themeOptions = [
  {
    key: "black",
    name: "Pure Black",
    family: "Calm",
    mesh: ["#000000", "#111111", "#f7f7f2", "#525252"],
  },
  {
    key: "dark",
    name: "Deep Graphite",
    family: "Calm",
    mesh: ["#07090f", "#151c2c", "#4c7dff", "#b7c9ff"],
  },
  {
    key: "blue",
    name: "Cobalt",
    family: "Calm",
    mesh: ["#020a1f", "#07338f", "#1578ff", "#a8d8ff"],
  },
  {
    key: "sea",
    name: "Digital Cyan",
    family: "Calm",
    mesh: ["#001417", "#006e79", "#00e5ff", "#a7fff7"],
  },
  {
    key: "toxic",
    name: "Acid Lime",
    family: "Wild",
    mesh: ["#071000", "#3f7900", "#b9ff24", "#efffb8"],
  },
  {
    key: "solar",
    name: "Solar Flare",
    family: "Wild",
    mesh: ["#170500", "#b52a00", "#ff6a00", "#ffd36b"],
  },
  {
    key: "magenta",
    name: "Hot Coral",
    family: "Wild",
    mesh: ["#17000b", "#b00043", "#ff3d72", "#ffb199"],
  },
  {
    key: "violet",
    name: "Ultraviolet",
    family: "Experimental",
    mesh: ["#080018", "#4a00c7", "#8f39ff", "#d7b4ff"],
  },
  {
    key: "infrared",
    name: "Signal Red",
    family: "Experimental",
    mesh: ["#170002", "#a80014", "#ff2942", "#ffc0a8"],
  },
  {
    key: "aurora",
    name: "Aurora Pulse",
    family: "Experimental",
    mesh: ["#00130f", "#007d61", "#00f0bd", "#6b8cff"],
  },
] as const;

export type ThemeKey = (typeof themeOptions)[number]["key"];
export type ThemeOption = (typeof themeOptions)[number];

export const shaderOptions = [
  { key: "horizon", name: "Horizon", description: "A low, open field" },
  { key: "orbital", name: "Orbital", description: "A centered luminous form" },
  { key: "ribbon", name: "Ribbon", description: "A quiet diagonal sweep" },
  { key: "beam", name: "Beam", description: "A precise vertical light" },
] as const;

export type ShaderKey = (typeof shaderOptions)[number]["key"];

export const features = [
  {
    title: "Keep a dollar balance",
    copy: "Hold supported digital dollars instead of converting every payment immediately.",
    image: withBasePath("/images/features/new/dollar-balance.webp"),
  },
  {
    title: "Get paid in one place",
    copy: "Receive eligible client and platform payments into the same clear balance.",
    image: withBasePath("/images/features/new/get-paid.webp"),
  },
  {
    title: "Send to supported banks",
    copy: "Choose a recipient, enter an amount, and use the routes available for their country.",
    image: withBasePath("/images/features/new/send.webp"),
  },
  {
    title: "Know before you send",
    copy: "Review the rate, cost, recipient amount, and expected timing together.",
    image: withBasePath("/images/features/new/know.webp"),
  },
  {
    title: "Specialist infrastructure",
    copy: "Identity, wallets, stablecoins, and payment rails work behind one experience.",
    image: withBasePath("/images/features/new/infrastructure.webp"),
  },
] as const;

export const howSteps = [
  {
    id: "account",
    title: "Create an account",
    copy: "Enter phone number and complete the checks required for your country.",
    screen: withBasePath("/images/screens/home.webp"),
    alt: "Jazari One account creation screen",
  },
  {
    id: "amount",
    title: "Enter the amount",
    copy: "Type the amount and see exactly what arrives in local currency.",
    screen: withBasePath("/images/screens/amount-entry.webp"),
    alt: "Jazari One amount and exchange preview screen",
  },
  {
    id: "arrival",
    title: "Done!",
    copy: "Transaction details are always there if you need to check or follow up.",
    screen: withBasePath("/images/screens/send-success.webp"),
    alt: "Jazari One completed transaction screen",
  },
] as const;

export const audiences = [
  {
    title: "Freelancers",
    line: "Get paid in dollars, hold them, and put what’s sitting idle to work at a variable rate.",
    image: withBasePath("/images/audience/freelancer.webp"),
    alt: "Freelancer working at a desk",
  },
  {
    title: "Migrants",
    line: "One dollar balance that follows you across countries without heavy bank cuts, hidden FX spreads, or transfer fees.",
    image: withBasePath("/images/audience/global-mover.webp"),
    alt: "Traveler moving between countries",
  },
  {
    title: "Their families",
    line: "More of what was sent actually arrives. Held in dollars, not a falling local currency.",
    image: withBasePath("/images/audience/family-support.webp"),
    alt: "Older couple looking at a phone together",
  },
] as const;

export const guides = [
  {
    slug: "send-money-to-mexico",
    route: "Mexico",
    title: "Sending dollars to Mexico: five checks before you confirm",
    deck: "A CLABE is an 18-digit standardized banking code used in Mexico to ensure secure domestic electronic fund transfers and wire payments. It consists of three key parts: a 3-digit bank code, a 3-digit city/branch code, and an 11-digit individual account number followed by a control digit.",
  },
  {
    slug: "send-money-to-brazil",
    route: "Brazil",
    title: "Sending money to Brazil: a cleaner Pix and bank checklist",
    deck: "Use the exact recipient identifier, read the BRL amount, and keep one reliable record.",
  },
  {
    slug: "send-money-to-colombia",
    route: "Colombia",
    title: "Planning a transfer to Colombia without avoidable delays",
    deck: "Account type and recipient details matter as much as the account number.",
  },
  {
    slug: "send-money-to-europe",
    route: "Europe",
    title: "Sending to Europe: choose the right currency and bank route",
    deck: "Europe is not one currency or one payment route. Check the destination first.",
  },
  {
    slug: "compare-transfer-costs",
    route: "Planning",
    title: "How to compare a transfer beyond the headline rate",
    deck: "The amount received, total cost, and delivery estimate belong in one comparison.",
  },
  {
    slug: "verify-recipient-details",
    route: "Safety",
    title: "What to verify before sending money to a new recipient",
    deck: "A short recipient check prevents most avoidable transfer problems.",
  },
  {
    slug: "digital-dollars-bank-payouts",
    route: "Basics",
    title: "Digital dollars and bank payouts: what each part does",
    deck: "Understand what stays in dollars, what converts, and what reaches the bank.",
  },
] as const;

export const networkStories = [
  {
    name: "Bridge",
    logo: withBasePath("/images/rails/bridge-mark.png"),
    logoFormat: "mark",
    logoScale: 1,
    wordmarkOnly: true,
    kind: "Infrastructure",
    short: "Stablecoin, fiat, conversion, and payout infrastructure.",
  },
  {
    name: "Privy",
    logo: withBasePath("/images/rails/privy.svg"),
    logoFormat: "wide",
    logoScale: 0.56,
    wordmarkOnly: true,
    kind: "Wallet access",
    short: "Authentication, embedded wallets, and transaction controls.",
  },
  {
    name: "Gauntlet",
    logo: withBasePath("/images/rails/gauntlet-mark.svg"),
    logoFormat: "mark",
    logoScale: 0.78,
    kind: "Risk",
    short: "Onchain risk and financial modeling.",
  },
  {
    name: "USDT",
    logo: withBasePath("/images/rails/usdt.svg"),
    logoFormat: "mark",
    logoScale: 0.98,
    kind: "Digital dollar",
    short: "A dollar-referenced token issued by Tether.",
  },
  {
    name: "USDC",
    logo: withBasePath("/images/rails/usdc.svg"),
    logoFormat: "mark",
    logoScale: 0.96,
    kind: "Digital dollar",
    short: "A digital dollar issued by Circle for payments and settlement.",
  },
  {
    name: "Ethereum",
    logo: withBasePath("/images/rails/ethereum.svg"),
    logoFormat: "mark",
    logoScale: 0.92,
    kind: "Public network",
    short: "Smart-contract and digital-asset settlement.",
  },
  {
    name: "TRON",
    logo: withBasePath("/images/rails/tron.svg"),
    logoFormat: "mark",
    logoScale: 1.08,
    kind: "Public network",
    short: "Public network supporting TRC-20 asset transfers.",
  },
  {
    name: "Solana",
    logo: withBasePath("/images/rails/solana.svg"),
    logoFormat: "mark",
    logoScale: 0.72,
    kind: "Public network",
    short: "High-performance network used for payments and apps.",
  },
  {
    name: "Polygon",
    logo: withBasePath("/images/rails/polygon-symbol.svg"),
    logoFormat: "mark",
    logoScale: 0.94,
    kind: "Public network",
    short: "EVM-compatible proof-of-stake rails.",
  },
  {
    name: "Base",
    logo: withBasePath("/images/rails/base-mark.svg"),
    logoFormat: "mark",
    logoScale: 0.74,
    kind: "Layer 2",
    short: "An Ethereum Layer 2 incubated by Coinbase.",
  },
] as const;
