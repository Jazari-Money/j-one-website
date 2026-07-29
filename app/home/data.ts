import { withBasePath } from "../site-paths";

export const currencies = {
  MXN: {
    country: "Mexico",
    name: "Mexican peso",
    rate: 18.72,
    symbol: "$",
    flag: withBasePath("/images/flags/mx.png"),
  },
  COP: {
    country: "Colombia",
    name: "Colombian peso",
    rate: 4175,
    symbol: "$",
    flag: withBasePath("/images/flags/co.png"),
  },
  BRL: {
    country: "Brazil",
    name: "Brazilian real",
    rate: 5.49,
    symbol: "R$",
    flag: withBasePath("/images/flags/br.png"),
  },
  EUR: {
    country: "Europe",
    name: "Euro",
    rate: 0.92,
    symbol: "€",
    flag: withBasePath("/images/flags/eu.png"),
  },
} as const;

export type CurrencyCode = keyof typeof currencies;

export const jazariVisualProfile = {
  theme: "jazari",
  shader: "beam",
  mesh: ["#000000", "#07150b", "#1ad959", "#4eff9e"],
} as const;

export const features = [
  {
    id: "dollar-balance",
    copy: "Hold in dollars. Keep its value.",
    image: withBasePath("/images/features/new/dollar-balance.webp"),
  },
  {
    id: "local-money",
    copy: "Send to 30+ countries in local currency.",
    image: withBasePath("/images/features/new/get-paid.webp"),
  },
  {
    id: "earn",
    copy: "Earn on the dollars you're not using.",
    image: withBasePath("/images/features/hand-coin.webp"),
  },
  {
    id: "zero-fees",
    copy: "No transfer fees. No hidden fees.",
    image: withBasePath("/images/features/new/zero.png"),
  },
] as const;

export const howScenarios = {
  receive: {
    label: "Receive",
    steps: [
      {
        id: "receive-home",
        title: "Open Receive",
        copy: "Choose Receive from your dollar balance.",
        screen: withBasePath("/images/how-to/how-to-receive-01.png"),
        alt: "Jazari One balance with the receive action",
      },
      {
        id: "receive-stablecoins",
        title: "Share wallet details",
        copy: "Use a QR code or address for supported stablecoins.",
        screen: withBasePath("/images/how-to/how-to-receive-02.png"),
        alt: "Stablecoin receive details in Jazari One",
      },
      {
        id: "receive-usd",
        title: "Use USD details",
        copy: "Open your personal USD account details for bank transfers.",
        screen: withBasePath("/images/how-to/how-to-receive-03.png"),
        alt: "USD account details in Jazari One",
      },
    ],
  },
  send: {
    label: "Send",
    steps: [
      {
        id: "send-recipient",
        title: "Choose a recipient",
        copy: "Start with the recipient and their destination.",
        screen: withBasePath("/images/how-to/how-to-send-01.png"),
        alt: "Recipient details in Jazari One",
      },
      {
        id: "send-amount",
        title: "Enter the amount",
        copy: "See the local amount and live rate before continuing.",
        screen: withBasePath("/images/how-to/how-to-send-02.png"),
        alt: "Transfer amount and local currency preview",
      },
      {
        id: "send-confirm",
        title: "Review and send",
        copy: "Confirm the destination, total, and delivery estimate.",
        screen: withBasePath("/images/how-to/how-to-send-03.png"),
        alt: "Transfer confirmation in Jazari One",
      },
    ],
  },
  yields: {
    label: "Yields",
    steps: [
      {
        id: "yield-strategy",
        title: "Choose a yield",
        copy: "Open an available strategy from your balance.",
        screen: withBasePath("/images/how-to/how-to-yield-01.png"),
        alt: "Available yield strategy in Jazari One",
      },
      {
        id: "yield-amount",
        title: "Add funds",
        copy: "Choose how much USDC or USDT to put to work.",
        screen: withBasePath("/images/how-to/how-to-yield-02.png"),
        alt: "Adding funds to a yield in Jazari One",
      },
      {
        id: "yield-position",
        title: "Track your yield",
        copy: "See your position and withdraw when you need to.",
        screen: withBasePath("/images/how-to/how-to-yield-03.png"),
        alt: "Yield position details in Jazari One",
      },
    ],
  },
} as const;

export type HowScenario = keyof typeof howScenarios;

export const audiences = [
  {
    title: "Freelancers",
    line: "Get paid in dollars, hold them, and put what’s sitting idle to work at a variable rate.",
    image: withBasePath("/images/audience/freelancer.webp"),
    alt: "Freelancer working at a desk",
  },
  {
    title: "Solopreneurs",
    line: "One dollar balance that follows you across countries without heavy bank cuts, hidden FX spreads, or transfer fees.",
    image: withBasePath("/images/audience/solopreneur.jpg"),
    alt: "Independent barber working with a client",
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
    title: "How to send dollars to Mexico: 3 steps before you confirm",
    deck: "Use the recipient’s full legal name and 18-digit CLABE for a SPEI payout.",
    image: withBasePath("/images/blog/mexico-transfer.webp"),
  },
  {
    slug: "send-money-to-brazil",
    route: "Brazil",
    title: "How to send dollars to Brazil: 3 steps before you confirm",
    deck: "For a Pix payout, use the recipient’s full name and exact Pix key.",
    image: withBasePath("/images/blog/brazil.jpg"),
  },
  {
    slug: "send-money-to-colombia",
    route: "Colombia",
    title: "How to send dollars to Colombia: 3 steps before you confirm",
    deck: "For a Bre-B payout, use the recipient’s full name and exact llave.",
    image: withBasePath("/images/blog/colombia.jpg"),
  },
  {
    slug: "send-money-to-europe",
    route: "Europe",
    title: "How to send dollars to Europe: 3 steps before you confirm",
    deck: "For a SEPA payout, collect the full name, IBAN, and BIC or SWIFT code.",
    image: withBasePath("/images/blog/europe.jpg"),
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

export const partnerStories = [
  {
    name: "Bridge",
    logo: withBasePath("/images/rails/bridge.svg"),
    logoFormat: "bridge",
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
    name: "Lido",
    logo: withBasePath("/images/rails/lido.svg"),
    logoFormat: "mark",
    logoScale: 0.94,
    kind: "Liquid staking",
    short: "Liquid staking and onchain reward infrastructure.",
  },
] as const;

export const networkStories = [
  {
    name: "USDT",
    logo: withBasePath("/images/rails/usdt.svg"),
    logoFormat: "mark",
    logoScale: 1.13,
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

export const allPartnerStories = [...partnerStories, ...networkStories] as const;
