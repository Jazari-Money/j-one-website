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
    name: "Carbon Mint",
    family: "Calm",
    mesh: ["#07100b", "#0e5534", "#49ef92", "#78a7ff"],
  },
  {
    key: "stone",
    name: "Warm Stone",
    family: "Calm",
    mesh: ["#0d0c0a", "#66503b", "#d8c5a2", "#9ab7ce"],
  },
  {
    key: "blue",
    name: "Blue Hour",
    family: "Calm",
    mesh: ["#07101f", "#2359ac", "#78a7ff", "#80e1d1"],
  },
  {
    key: "sea",
    name: "Sea Glass",
    family: "Calm",
    mesh: ["#071512", "#12705d", "#54e0ba", "#d3d88e"],
  },
  {
    key: "toxic",
    name: "Toxic Bloom",
    family: "Wild",
    mesh: ["#0a1308", "#4c8f28", "#a6ff38", "#00d9ad"],
  },
  {
    key: "solar",
    name: "Solar Heat",
    family: "Wild",
    mesh: ["#180a05", "#ad3708", "#ff6a00", "#ffcc70"],
  },
  {
    key: "magenta",
    name: "Magenta Current",
    family: "Wild",
    mesh: ["#160918", "#8d2493", "#f44dff", "#ff9a7a"],
  },
  {
    key: "violet",
    name: "Ultraviolet",
    family: "Experimental",
    mesh: ["#0d0b1c", "#4637b7", "#7b61ff", "#20d6d2"],
  },
  {
    key: "infrared",
    name: "Infrared",
    family: "Experimental",
    mesh: ["#19080b", "#a31e34", "#ff334d", "#ff9b54"],
  },
  {
    key: "aurora",
    name: "Aurora Glass",
    family: "Experimental",
    mesh: ["#071614", "#0b8c79", "#00e6c7", "#7b61ff"],
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
    logoScale: 1.2,
    featureScale: 0.86,
    kind: "Infrastructure",
    short: "Connects fiat and stablecoin rails.",
    detail:
      "Transfer, conversion, wallet, and payout infrastructure can be combined behind a simpler Jazari experience.",
  },
  {
    name: "Privy",
    logo: withBasePath("/images/rails/privy.svg"),
    logoFormat: "wide",
    logoScale: 0.88,
    featureScale: 0.82,
    kind: "Infrastructure",
    short: "Embedded authentication and wallets.",
    detail:
      "Familiar account access can connect to controlled wallet actions without exposing the infrastructure underneath.",
  },
  {
    name: "Gauntlet",
    logo: withBasePath("/images/rails/gauntlet.svg"),
    logoFormat: "wide",
    logoScale: 0.86,
    featureScale: 0.9,
    kind: "Infrastructure",
    short: "Onchain risk and financial modeling.",
    detail:
      "Specialist modeling and risk tooling help make digital-asset systems easier to monitor and reason about.",
  },
  {
    name: "USD₮",
    logo: withBasePath("/images/rails/usdt.svg"),
    logoFormat: "mark",
    logoScale: 0.75,
    featureScale: 0.74,
    kind: "Digital dollar",
    short: "A dollar-referenced token issued by Tether.",
    detail:
      "USD₮ is available across multiple public networks. Access, fees, redemption, and network availability depend on the route.",
  },
  {
    name: "USDC",
    logo: withBasePath("/images/rails/usdc.svg"),
    logoFormat: "mark",
    logoScale: 0.96,
    featureScale: 0.84,
    kind: "Digital dollar",
    short: "A digital dollar issued by Circle.",
    detail:
      "Circle states that USDC is backed by highly liquid cash and cash-equivalent reserves. Route and provider conditions still apply.",
  },
  {
    name: "Ethereum",
    logo: withBasePath("/images/rails/ethereum.svg"),
    logoFormat: "mark",
    logoScale: 0.92,
    featureScale: 0.92,
    kind: "Network",
    short: "Broad stablecoin and application support.",
    detail:
      "An established public settlement network whose transaction cost and confirmation time vary with network demand.",
  },
  {
    name: "TRON",
    logo: withBasePath("/images/rails/tron.svg"),
    logoFormat: "mark",
    logoScale: 0.82,
    featureScale: 0.76,
    kind: "Network",
    short: "Widely used for TRC-20 transfers.",
    detail:
      "A public network used for token transfers. Transactions consume network resources and fees may apply.",
  },
  {
    name: "Solana",
    logo: withBasePath("/images/rails/solana.svg"),
    logoFormat: "mark",
    logoScale: 0.92,
    featureScale: 0.93,
    kind: "Network",
    short: "Fast, low-cost payment settlement.",
    detail:
      "A high-throughput public network designed for fast transactions and payment applications.",
  },
  {
    name: "Polygon",
    logo: withBasePath("/images/rails/polygon-symbol.svg"),
    logoFormat: "mark",
    logoScale: 0.94,
    featureScale: 0.93,
    kind: "Network",
    short: "EVM-compatible proof-of-stake rails.",
    detail:
      "Transactions are processed away from Ethereum mainnet while network state is periodically anchored to Ethereum.",
  },
  {
    name: "Base",
    logo: withBasePath("/images/rails/base.svg"),
    logoFormat: "wide",
    logoScale: 0.84,
    featureScale: 0.84,
    kind: "Network",
    short: "An Ethereum Layer 2 for low-cost activity.",
    detail:
      "An Ethereum Layer 2 incubated by Coinbase and designed for lower-cost onchain transactions and stablecoin payments.",
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
