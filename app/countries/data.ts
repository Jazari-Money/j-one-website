export type Country = "Kenya" | "Nigeria";

export const countries = {
  Kenya: {
    headline: "Your dollar account in Kenya.",
    description: "Get paid by clients abroad. Send and receive USDT. Keep digital dollars for your next project, or your savings goals.",
    photoAlt: "Illustrative Kenyan professional checking her phone beside a laptop in a Nairobi workspace",
    receiveTitle: "Receive dollars from abroad.",
    receiveCopy: "Working with clients outside Kenya? Get USD account details in your name through our bank partner, subject to verification. Share them for eligible payments and keep your income in digital dollars.",
    savingsCopy: "Keep digital dollars between projects, or set some aside for your next course or new equipment. If you choose Yields, review a supported USDC strategy, its current rate, and its risks in the app.",
    localAnswer: "USDT transfers go to supported wallets. A Kenyan bank payout or M-PESA transfer is a different route: only use it if it appears in your app. Review the destination currency, fees, and timing before confirming.",
  },
  Nigeria: {
    headline: "Your dollar account in Nigeria.",
    description: "Receive USD from clients abroad. Send and receive USDT. Hold digital dollars for your next payment, or your savings goals.",
    photoAlt: "Illustrative Nigerian freelancer checking his phone beside a laptop in a Lagos workspace",
    receiveTitle: "Receive dollars from abroad.",
    receiveCopy: "Get US routing and account details in your name through our bank partner, subject to verification. Receive eligible payments from clients outside Nigeria and keep your income in digital dollars.",
    savingsCopy: "Set digital dollars aside for a course, equipment, or longer-term plans. If you choose Yields, review a supported USDC strategy, its current rate, and its risks in the app.",
    localAnswer: "A USDT wallet payment is different from a naira bank payout. This page does not offer an NGN cash-out route. Check the app for the destinations and currencies available to you before making a transfer.",
  },
} as const;
