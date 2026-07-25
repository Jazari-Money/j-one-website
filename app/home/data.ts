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
    image: withBasePath("/images/features/card-plate.webp"),
  },
  {
    title: "Get paid in one place",
    copy: "Receive eligible client and platform payments into the same clear balance.",
    image: withBasePath("/images/features/globe.webp"),
  },
  {
    title: "Send to supported banks",
    copy: "Choose a recipient, enter an amount, and use the routes available for their country.",
    image: withBasePath("/images/features/paper-plane.webp"),
  },
  {
    title: "Know before you send",
    copy: "Review the rate, cost, recipient amount, and expected timing together.",
    image: withBasePath("/images/features/hand-coin.webp"),
  },
  {
    title: "An account in your name",
    copy: "A personal dollar account designed for people whose money crosses borders.",
    image: withBasePath("/images/features/head.webp"),
  },
  {
    title: "Specialist infrastructure",
    copy: "Identity, wallets, stablecoins, and payment rails work behind one experience.",
    image: withBasePath("/images/features/shield.webp"),
  },
] as const;

export const howSteps = [
  {
    id: "account",
    title: "Set Up Your Account",
    copy: "Open your account and complete the checks required for your country.",
    screen: withBasePath("/images/screens/home.webp"),
    alt: "Jazari One dollar account home screen",
  },
  {
    id: "amount",
    title: "Build The Transfer",
    copy: "Choose a recipient and amount, then review the rate and expected result.",
    screen: withBasePath("/images/screens/amount-entry.webp"),
    alt: "Jazari One transfer amount screen",
  },
  {
    id: "arrival",
    title: "Follow The Payment",
    copy: "See when money arrives and keep one reference if you need to follow up.",
    screen: withBasePath("/images/screens/send-success.webp"),
    alt: "Jazari One successful transfer screen",
  },
] as const;

export const audiences = [
  {
    title: "Freelancers",
    line: "Get paid. Hold dollars. Move money when you choose.",
    image: withBasePath("/images/audience/freelancer.webp"),
    alt: "Freelancer working on her laptop in a café",
  },
  {
    title: "Global movers",
    line: "Take one familiar balance across changing countries.",
    image: withBasePath("/images/audience/global-mover.webp"),
    alt: "Remote professional working abroad",
  },
  {
    title: "Families across borders",
    line: "Make regular support easier to plan and understand.",
    image: withBasePath("/images/audience/family-support.webp"),
    alt: "Family looking at a phone together",
  },
] as const;

export const guides = [
  {
    slug: "send-money-to-mexico",
    route: "Mexico",
    title: "Sending dollars to Mexico: five checks before you confirm",
    deck: "The right recipient details and a clear MXN preview do most of the work.",
    read: "3 min read",
  },
  {
    slug: "send-money-to-brazil",
    route: "Brazil",
    title: "Sending money to Brazil: a cleaner Pix and bank checklist",
    deck: "Use the exact recipient identifier, read the BRL amount, and keep one reliable record.",
    read: "3 min read",
  },
  {
    slug: "send-money-to-colombia",
    route: "Colombia",
    title: "Planning a transfer to Colombia without avoidable delays",
    deck: "Account type and recipient details matter as much as the account number.",
    read: "3 min read",
  },
  {
    slug: "send-money-to-europe",
    route: "Europe",
    title: "Sending to Europe: choose the right currency and bank route",
    deck: "Europe is not one currency or one payment route. Check the destination first.",
    read: "4 min read",
  },
  {
    slug: "compare-transfer-costs",
    route: "Planning",
    title: "How to compare a transfer beyond the headline rate",
    deck: "The amount received, total cost, and delivery estimate belong in one comparison.",
    read: "4 min read",
  },
  {
    slug: "verify-recipient-details",
    route: "Safety",
    title: "What to verify before sending money to a new recipient",
    deck: "A short recipient check prevents most avoidable transfer problems.",
    read: "3 min read",
  },
  {
    slug: "digital-dollars-bank-payouts",
    route: "Basics",
    title: "Digital dollars and bank payouts: what each part does",
    deck: "Understand what stays in dollars, what converts, and what reaches the bank.",
    read: "5 min read",
  },
] as const;

export const networkStories = [
  {
    name: "Bridge",
    logo: withBasePath("/images/rails/bridge.svg"),
    logoFormat: "bridge",
    logoScale: 1,
    kind: "Infrastructure",
    short: "Stablecoin, fiat, conversion, and payout infrastructure.",
  },
  {
    name: "Privy",
    logo: withBasePath("/images/rails/privy.svg"),
    logoFormat: "wide",
    logoScale: 0.56,
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
    name: "USD₮",
    logo: withBasePath("/images/rails/usdt.svg"),
    logoFormat: "mark",
    logoScale: 0.75,
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
    logoScale: 0.82,
    kind: "Public network",
    short: "Public network supporting TRC-20 asset transfers.",
  },
  {
    name: "Solana",
    logo: withBasePath("/images/rails/solana.svg"),
    logoFormat: "mark",
    logoScale: 0.92,
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

export const coinSeeds = Array.from({ length: 28 }, (_, index) => ({
  left: (index * 37 + 5) % 96,
  delay: (index % 7) * 0.11,
  duration: 1.8 + (index % 5) * 0.2,
  size: 26 + (index % 6) * 7,
  drift: -72 + ((index * 29) % 144),
  spin: 400 + ((index * 83) % 680),
}));
