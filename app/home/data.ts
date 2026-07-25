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
    key: "carbon",
    name: "Pre-Dawn",
    family: "Calm",
    mesh: ["#07112a", "#315cff", "#86b8ff", "#ffd79a"],
  },
  {
    key: "stone",
    name: "Sunrise",
    family: "Calm",
    mesh: ["#fff0c2", "#ffc65c", "#ff7557", "#7469ff"],
  },
  {
    key: "blue",
    name: "Daylight",
    family: "Calm",
    mesh: ["#d8ecff", "#6bb6ff", "#315cff", "#ffe09b"],
  },
  {
    key: "sea",
    name: "Glacier",
    family: "Calm",
    mesh: ["#d7f8ff", "#56d9d1", "#3b86ff", "#bcdfff"],
  },
  {
    key: "toxic",
    name: "Electric Lime",
    family: "Wild",
    mesh: ["#ecffba", "#b9f342", "#38d5a5", "#315cff"],
  },
  {
    key: "solar",
    name: "Golden Hour",
    family: "Wild",
    mesh: ["#fff0b8", "#ffb84d", "#ff6b4a", "#7665ff"],
  },
  {
    key: "magenta",
    name: "Afterglow",
    family: "Wild",
    mesh: ["#ffd0e5", "#ff5fa2", "#ff8a4c", "#735cff"],
  },
  {
    key: "violet",
    name: "Dusk",
    family: "Experimental",
    mesh: ["#c7d2ff", "#806dff", "#4c5dff", "#ffbd73"],
  },
  {
    key: "infrared",
    name: "Ember",
    family: "Experimental",
    mesh: ["#ffd1c7", "#ff5a5f", "#ff8a3d", "#7b61ff"],
  },
  {
    key: "aurora",
    name: "Aurora",
    family: "Experimental",
    mesh: ["#c9fff3", "#24d6b0", "#5b7cff", "#d9b8ff"],
  },
] as const;

export type ThemeKey = (typeof themeOptions)[number]["key"];
export type ThemeOption = (typeof themeOptions)[number];

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
    logoFormat: "wide",
    logoScale: 1.28,
    kind: "Infrastructure",
    short: "Stablecoin, fiat, conversion, and payout infrastructure.",
  },
  {
    name: "Privy",
    logo: withBasePath("/images/rails/privy.svg"),
    logoFormat: "wide",
    logoScale: 0.72,
    kind: "Wallet access",
    short: "Authentication, embedded wallets, and transaction controls.",
  },
  {
    name: "Gauntlet",
    logo: withBasePath("/images/rails/gauntlet.svg"),
    logoFormat: "wide",
    logoScale: 0.8,
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
    logo: withBasePath("/images/rails/base.svg"),
    logoFormat: "wide",
    logoScale: 0.7,
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
