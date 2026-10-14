export type Country = "Kenya" | "Nigeria";

export const countries = {
  Kenya: {
    headline: "Your work is global. Your dollars can be too.",
    description: "A USD account and USDT wallet for life in Kenya. Receive payments from abroad, hold digital dollars, and send on your terms.",
    benefit: "Get paid in USD. Hold USDT. Earn with Yields.",
    personaTitle: "From your desk in Nairobi to clients worldwide.",
    personaCopy: "Freelance projects. A remote salary. Family across borders. Keep international income in digital dollars between payments, and choose when and how to send it onward.",
    photoAlt: "Illustrative Kenyan professional checking her phone beside a laptop in a Nairobi workspace",
    receiveTitle: "A dollar account for your next client payment.",
    receiveCopy: "Working with clients outside Kenya? Share your USD account details for an eligible bank transfer, or your wallet address for a supported USDT payment. Keep the payment in digital dollars instead of converting it on arrival.",
    savingsLabel: "Earn",
    savingsTitle: "Put part of your dollars to work.",
    savingsCopy: "Between projects, you decide how much to keep in your balance and how much to allocate to Yields. Review the current rate and risks before choosing a USDC strategy.",
    localAnswer: "USDT transfers go to supported wallets. A Kenyan bank payout or M-PESA transfer is a different route: only use it if it appears in your app. Review the destination currency, fees, and timing before confirming.",
    closing: "Your next payment. Your own dollar account.",
  },
  Nigeria: {
    headline: "Receive dollars. Keep more possibilities open.",
    description: "A USD account and USDT wallet for life in Nigeria. Get paid by clients abroad, hold digital dollars, and plan for what’s next.",
    benefit: "Receive USD. Send USDT. Plan your savings.",
    personaTitle: "Built around the way you work in Lagos.",
    personaCopy: "A design brief from London. A remote team in New York. Your next project at home. Bring eligible USD and USDT payments into one digital-dollar balance, with room for your plans beyond payday.",
    photoAlt: "Illustrative Nigerian freelancer checking his phone beside a laptop in a Lagos workspace",
    receiveTitle: "Receive USD without a US address.",
    receiveCopy: "Looking for a dollar account in Nigeria? Get US routing and account details in your name through Jazari’s bank partner, subject to verification and eligibility. Receive eligible bank payments or share a supported USDT wallet address with your sender.",
    savingsLabel: "Savings",
    savingsTitle: "Savings goals, in digital dollars.",
    savingsCopy: "Set dollars aside for your next course, equipment, or longer-term plans. Holding a balance and earning a yield are separate choices. If you choose Yields, review a supported USDC strategy before moving funds.",
    localAnswer: "A USDT wallet payment is different from a naira bank payout. This page does not offer an NGN cash-out route. Check the app for the destinations and currencies available to you before making a transfer.",
    closing: "Make room for your next chapter.",
  },
} as const;
