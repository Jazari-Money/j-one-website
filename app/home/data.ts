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
  GBP: {
    country: "United Kingdom",
    name: "British pound",
    rate: 0.79,
    symbol: "£",
    flag: withBasePath("/images/flags/gb.png"),
  },
} as const;

export type CurrencyCode = keyof typeof currencies;

export const receivingCountries = [
  { name: "Andorra", flag: withBasePath("/images/flags/ad.png") },
  { name: "Austria", flag: withBasePath("/images/flags/at.png") },
  { name: "Belgium", flag: withBasePath("/images/flags/be.png") },
  { name: "Brazil", flag: withBasePath("/images/flags/br.png") },
  { name: "Colombia", flag: withBasePath("/images/flags/co.png") },
  { name: "Croatia", flag: withBasePath("/images/flags/hr.png") },
  { name: "Cyprus", flag: withBasePath("/images/flags/cy.png") },
  { name: "Estonia", flag: withBasePath("/images/flags/ee.png") },
  { name: "Finland", flag: withBasePath("/images/flags/fi.png") },
  { name: "France", flag: withBasePath("/images/flags/fr.png") },
  { name: "Germany", flag: withBasePath("/images/flags/de.png") },
  { name: "Greece", flag: withBasePath("/images/flags/gr.png") },
  { name: "Ireland", flag: withBasePath("/images/flags/ie.png") },
  { name: "Italy", flag: withBasePath("/images/flags/it.png") },
  { name: "Latvia", flag: withBasePath("/images/flags/lv.png") },
  { name: "Lithuania", flag: withBasePath("/images/flags/lt.png") },
  { name: "Luxembourg", flag: withBasePath("/images/flags/lu.png") },
  { name: "Malta", flag: withBasePath("/images/flags/mt.png") },
  { name: "Mexico", flag: withBasePath("/images/flags/mx.png") },
  { name: "Monaco", flag: withBasePath("/images/flags/mc.png") },
  { name: "Montenegro", flag: withBasePath("/images/flags/me.png") },
  { name: "Netherlands", flag: withBasePath("/images/flags/nl.png") },
  { name: "Poland", flag: withBasePath("/images/flags/pl.png") },
  { name: "Portugal", flag: withBasePath("/images/flags/pt.png") },
  { name: "Romania", flag: withBasePath("/images/flags/ro.png") },
  { name: "San Marino", flag: withBasePath("/images/flags/sm.png") },
  { name: "Slovakia", flag: withBasePath("/images/flags/sk.png") },
  { name: "Slovenia", flag: withBasePath("/images/flags/si.png") },
  { name: "Spain", flag: withBasePath("/images/flags/es.png") },
  { name: "United Kingdom", flag: withBasePath("/images/flags/gb.png") },
] as const;

export const queuedReceivingCountries = [
  { name: "India", flag: withBasePath("/images/flags/in.png") },
  { name: "Bangladesh", flag: withBasePath("/images/flags/bd.png") },
  { name: "Pakistan", flag: withBasePath("/images/flags/pk.png") },
  { name: "Nigeria", flag: withBasePath("/images/flags/ng.png") },
] as const;

export const jazariVisualProfile = {
  theme: "jazari",
  shader: "color-event",
  mesh: ["#000000", "#07150b", "#1ad959", "#4eff9e"],
} as const;

export const features = [
  {
    id: "dollar-balance",
    copy: "Hold digital dollars. Keep their value.",
    image: withBasePath("/images/features/dollar-01.png"),
  },
  {
    id: "local-money",
    copy: "Send to 30+ countries in local currency.",
    image: withBasePath("/images/features/planet-02.png"),
  },
  {
    id: "earn",
    copy: "Earn up to 6% with Yields",
    image: withBasePath("/images/features/plus-03.png"),
  },
  {
    id: "zero-fees",
    copy: "No transfer fees. No hidden fees.",
    image: withBasePath("/images/features/zero-04.png"),
  },
] as const;

export const howScenarios = {
  receive: {
    label: "Receive",
    steps: [
      {
        id: "receive-home",
        title: "Open Receive",
        copy: "Select Receive on the home screen",
        screen: withBasePath("/images/how-to/how-to-receive-01.png"),
        screenStem: "/images/how-to/how-to-receive-01",
        alt: "Jazari One balance with the receive action",
      },
      {
        id: "receive-stablecoins",
        title: "Choose network",
        copy: "Share your wallet address.",
        screen: withBasePath("/images/how-to/how-to-receive-02.png"),
        screenStem: "/images/how-to/how-to-receive-02",
        alt: "Stablecoin receive details in Jazari One",
      },
      {
        id: "receive-usd",
        title: "Share USD account",
        copy: "Open your personal USD account details for bank transfers.",
        screen: withBasePath("/images/how-to/how-to-receive-03.png"),
        screenStem: "/images/how-to/how-to-receive-03",
        alt: "USD account details in Jazari One",
      },
    ],
  },
  send: {
    label: "Send",
    steps: [
      {
        id: "send-recipient",
        title: "Pick a destination",
        copy: "Choose a stablecoin wallet or a bank account.",
        screen: withBasePath("/images/how-to/how-to-send-01.png"),
        screenStem: "/images/how-to/how-to-send-01",
        alt: "Recipient details in Jazari One",
      },
      {
        id: "send-amount",
        title: "Enter the amount",
        copy: "Preview the amount at the current rate",
        screen: withBasePath("/images/how-to/how-to-send-02.png"),
        screenStem: "/images/how-to/how-to-send-02",
        alt: "Transfer amount and local currency preview",
      },
      {
        id: "send-confirm",
        title: "Send it",
        copy: "One tap to send, with a receipt you can open anytime.",
        screen: withBasePath("/images/how-to/how-to-send-03.png"),
        screenStem: "/images/how-to/how-to-send-03",
        alt: "Transfer confirmation in Jazari One",
      },
    ],
  },
  yields: {
    label: "Yields",
    steps: [
      {
        id: "yield-strategy",
        title: "Open Yields",
        copy: "Review the vault, its current APY, and how it works.",
        screen: withBasePath("/images/how-to/how-to-yield-01.png"),
        screenStem: "/images/how-to/how-to-yield-01",
        alt: "Yields strategy in Jazari One",
      },
      {
        id: "yield-amount",
        title: "Add funds",
        copy: "Choose how much of your balance to put to work.",
        screen: withBasePath("/images/how-to/how-to-yield-02.png"),
        screenStem: "/images/how-to/how-to-yield-02",
        alt: "Adding funds to Yields in Jazari One",
      },
      {
        id: "yield-position",
        title: "Track your earnings",
        copy: "See what you've earned. Withdraw any time.",
        screen: withBasePath("/images/how-to/how-to-yield-03.png"),
        screenStem: "/images/how-to/how-to-yield-03",
        alt: "Yields position details in Jazari One",
      },
    ],
  },
} as const;

export type HowScenario = keyof typeof howScenarios;

export const audiences = [
  {
    title: "Remote workers",
    bullets: [
      "Paid by an employer abroad",
      "Losing money on every incoming transfer",
      "Want to keep your salary in dollars. Not forced to convert on arrival.",
    ],
    image: withBasePath("/images/audience/freelancer.webp"),
    imageStem: "/images/audience/freelancer",
    alt: "Remote worker at a desk",
  },
  {
    title: "Freelancers",
    bullets: [
      "Multiple clients, multiple countries",
      "Income doesn't arrive on time",
      "Want dollars that hold value between projects",
    ],
    image: withBasePath("/images/audience/freelancer-photographer.webp"),
    imageStem: "/images/audience/freelancer-photographer",
    alt: "Freelance photographer walking through a city",
  },
  {
    title: "You and your family",
    bullets: [
      "Send money to parents, siblings, or children back home",
      "Send, receive, and manage money across borders — together",
      "Pay bills and support family, wherever they are",
    ],
    image: withBasePath("/images/audience/family-support.webp"),
    imageStem: "/images/audience/family-support",
    alt: "Family members looking at a phone together",
  },
] as const;

export const guides = [
  {
    slug: "send-money-to-mexico",
    route: "Mexico",
    title: "How to send dollars to Mexico in 3 steps",
    deck: "Use the recipient’s full legal name and 18-digit CLABE for a SPEI payout.",
    image: withBasePath("/images/blog/mexico-transfer.webp"),
    imageStem: "/images/blog/mexico-transfer",
  },
  {
    slug: "send-money-to-brazil",
    route: "Brazil",
    title: "How to send dollars to Brazil in 3 steps",
    deck: "For a Pix payout, use the recipient’s full name and exact Pix key.",
    image: withBasePath("/images/blog/brazil.jpg"),
    imageStem: "/images/blog/brazil",
  },
  {
    slug: "send-money-to-colombia",
    route: "Colombia",
    title: "How to send dollars to Colombia in 3 steps",
    deck: "For a Bre-B payout, use the recipient’s full name and exact llave.",
    image: withBasePath("/images/blog/colombia.jpg"),
    imageStem: "/images/blog/colombia",
  },
  {
    slug: "send-money-to-europe",
    route: "Europe",
    title: "How to send dollars to Europe in 3 steps",
    deck: "For a SEPA payout, collect the full name, IBAN, and BIC or SWIFT code.",
    image: withBasePath("/images/blog/europe.jpg"),
    imageStem: "/images/blog/europe",
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
