"use client";

import { resetPointer, trackPointer } from "./hooks";

export type AccordionItem = {
  question: string;
  answer: string;
};

export function AccordionList({ items }: { items: readonly AccordionItem[] }) {
  return (
    <div className="yield-question-list faq-list">
      {items.map((item) => (
        <details
          className="pointer-card"
          key={item.question}
          onPointerMove={trackPointer}
          onPointerLeave={resetPointer}
        >
          <summary>
            <span>{item.question}</span>
            <span className="yield-question-icon neutral-control" aria-hidden="true">
              <svg className="yield-question-plus" viewBox="0 0 24 24">
                <path d="M12 5v14M5 12h14" />
              </svg>
              <svg className="yield-question-minus" viewBox="0 0 24 24">
                <path d="M5 12h14" />
              </svg>
            </span>
          </summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
