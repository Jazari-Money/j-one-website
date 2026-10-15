export type Country = "Kenya" | "Nigeria";

export const countries = {
  Kenya: {
    headline: "Your dollar account in Kenya.",
    description: "Send and receive USD, USDT, USDC, and OUSD. Open an account in minutes.",
    photoAlt: "Illustrative Kenyan professional checking her phone beside a laptop in a Nairobi workspace",
    receiveTitle: "Receive money from anyone.",
    receiveCopy: "Family, friends, or anyone sending you money. Get USD account details in your name through our bank partner, subject to verification, and share them for eligible transfers. Or receive digital dollars through your supported wallet.",
    savingsCopy: "Set money aside for what matters to you. With Yields, choose Gauntlet USD Alpha at 4.66% APY or Lido EarnUSD at 7% APY. Review the current rates and strategy details in the app.",
    localAnswer: "USDT transfers go to supported wallets. A Kenyan bank payout or M-PESA transfer is a different route: only use it if it appears in your app. Review the destination currency, fees, and timing before confirming.",
  },
  Nigeria: {
    headline: "Your dollar account in Nigeria.",
    description: "Send and receive USD, USDT, USDC, and OUSD. Open an account in minutes.",
    photoAlt: "Illustrative Nigerian freelancer checking his phone beside a laptop in a Lagos workspace",
    receiveTitle: "Receive money from anyone.",
    receiveCopy: "Family, friends, or anyone sending you money. Get US routing and account details in your name through our bank partner, subject to verification, and share them for eligible transfers. Or receive digital dollars through your supported wallet.",
    savingsCopy: "Set money aside for what matters to you. With Yields, choose Gauntlet USD Alpha at 4.66% APY or Lido EarnUSD at 7% APY. Review the current rates and strategy details in the app.",
    localAnswer: "A USDT wallet payment is different from a naira bank payout. This page does not offer an NGN cash-out route. Check the app for the destinations and currencies available to you before making a transfer.",
  },
} as const;
