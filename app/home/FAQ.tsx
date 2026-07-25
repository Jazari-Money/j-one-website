const questions = [
  {
    question: "What is a Jazari USD account?",
    answer:
      "It is one interface for holding supported digital dollars, receiving eligible payments, and sending through the routes available in your country.",
  },
  {
    question: "Where is Jazari available?",
    answer:
      "Availability is introduced country by country. The app shows the routes, currencies, limits, and eligibility available to you before you start a transfer.",
  },
  {
    question: "What does the recipient receive?",
    answer:
      "The transfer preview shows the destination currency, estimated recipient amount, applicable cost, and expected timing before you confirm.",
  },
  {
    question: "How are exchange rates and fees shown?",
    answer:
      "Jazari keeps the indicative exchange reference, transaction cost, recipient amount, and expected delivery together on one review screen. Final details are shown before confirmation.",
  },
  {
    question: "Is Jazari a bank?",
    answer:
      "No. Jazari is a technology service provider. Wallet, custody, and payment services are provided by licensed and regulated third parties where available.",
  },
  {
    question: "When will the virtual card and Remit Now Pay Later be available?",
    answer:
      "They are planned roadmap products. Availability, pricing, limits, terms, and eligibility will be announced for each supported country before launch.",
  },
] as const;

export function FAQ() {
  return (
    <section className="faq section" id="faq">
      <header className="chapter-heading">
        <h2>FAQ</h2>
        <p>Clear answers about the account, transfers, availability, and what comes next.</p>
      </header>
      <div className="faq-list">
        {questions.map((item) => (
          <details key={item.question}>
            <summary>
              <span>{item.question}</span>
              <span className="faq-icon" aria-hidden="true">
                <svg className="faq-plus" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5v14" />
                </svg>
                <svg className="faq-minus" viewBox="0 0 24 24">
                  <path d="M5 12h14" />
                </svg>
              </span>
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
