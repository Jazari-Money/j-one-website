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
    name: "Emerald Voltage",
    family: "Calm",
    mesh: ["#020b08", "#007a45", "#00ff94", "#5b8cff"],
  },
  {
    key: "stone",
    name: "Cobalt Signal",
    family: "Calm",
    mesh: ["#050817", "#1748ff", "#4e7dff", "#00e5ff"],
  },
  {
    key: "blue",
    name: "Signal Blue",
    family: "Calm",
    mesh: ["#020817", "#0068ff", "#37a4ff", "#6dffea"],
  },
  {
    key: "sea",
    name: "Cyan Current",
    family: "Calm",
    mesh: ["#00110f", "#00a884", "#00f5d4", "#a8ff2d"],
  },
  {
    key: "toxic",
    name: "Acid Lime",
    family: "Wild",
    mesh: ["#071000", "#58b800", "#b8ff00", "#00f5d4"],
  },
  {
    key: "solar",
    name: "Solar Flare",
    family: "Wild",
    mesh: ["#180400", "#ff3d00", "#ff7a00", "#ffe600"],
  },
  {
    key: "magenta",
    name: "Hot Magenta",
    family: "Wild",
    mesh: ["#130015", "#d500c8", "#ff2bd6", "#ff7a00"],
  },
  {
    key: "violet",
    name: "Plasma Violet",
    family: "Experimental",
    mesh: ["#090018", "#5b20ff", "#9b4dff", "#00e5ff"],
  },
  {
    key: "infrared",
    name: "Laser Red",
    family: "Experimental",
    mesh: ["#180003", "#ff003d", "#ff3b30", "#ffb000"],
  },
  {
    key: "aurora",
    name: "Aurora Electric",
    family: "Experimental",
    mesh: ["#00100c", "#00d49a", "#00f5d4", "#7c4dff"],
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
