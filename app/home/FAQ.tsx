import { AccordionList } from "./AccordionList";

const questions = [
  {
    question: "What can I do with a Jazari USD account?",
    answer:
      "You can hold USDC or USDT, receive payments, and send money through the routes shown for your country.",
  },
  {
    question: "Can I use Jazari where I live?",
    answer:
      "Open the app to see the routes, currencies, and limits you can use before you start a transfer.",
  },
  {
    question: "What does the recipient receive?",
    answer:
      "The transfer preview shows the destination currency, estimated recipient amount, applicable cost, and expected timing before you confirm.",
  },
  {
    question: "How are exchange rates and fees shown?",
    answer:
      "Before you confirm, you see the exchange reference, transaction cost, recipient amount, and expected delivery together on one screen.",
  },
  {
    question: "Is Jazari a bank?",
    answer:
      "No. Jazari is a technology service provider. Licensed and regulated third parties provide wallet, custody, and payment services.",
  },
  {
    question: "When can I use the virtual card and Remit Now Pay Later?",
    answer:
      "They’re coming later. You’ll see pricing, limits, terms, and country access before either product launches.",
  },
] as const;

export function FAQ() {
  return (
    <section className="faq section" id="faq">
      <header className="chapter-heading">
        <h2>FAQ</h2>
        <p className="faq-contact">
          Something we missed?{" "}
          <a href="mailto:hello@jazari.xyz">Email us</a>
        </p>
      </header>
      <div className="faq-content">
        <AccordionList items={questions} />
      </div>
    </section>
  );
}
