"use client";

import { KeyboardEvent, useRef, useState } from "react";
import { howScenarios, type HowScenario } from "./data";
import { Phone } from "./Phone";

export function ScenarioWalkthrough({
  scenarioKey,
  description,
}: {
  scenarioKey: HowScenario;
  description: string;
}) {
  const scenario = howScenarios[scenarioKey];
  const [activeStep, setActiveStep] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const step = scenario.steps[activeStep];

  function moveStep(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      next = (index + 1) % scenario.steps.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      next = (index - 1 + scenario.steps.length) % scenario.steps.length;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = scenario.steps.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    setActiveStep(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <section className="scenario-how section" id="how-it-works" aria-labelledby={`${scenarioKey}-how-title`}>
      <header className="scenario-how-heading">
        <p>{scenario.label}</p>
        <h2 id={`${scenarioKey}-how-title`}>How it works</h2>
        <span>{description}</span>
      </header>

      <div className="how-experience">
        <div className="step-copy-column">
          <div className="step-tabs" role="tablist" aria-label={`${scenario.label} steps`}>
            {scenario.steps.map((item, index) => (
              <div className={`step-tab-item ${activeStep === index ? "is-active" : ""}`} key={item.id}>
                <button
                  ref={(node) => { tabRefs.current[index] = node; }}
                  id={`${scenarioKey}-step-tab-${item.id}`}
                  type="button"
                  role="tab"
                  aria-selected={activeStep === index}
                  aria-controls={`${scenarioKey}-step-screen`}
                  tabIndex={activeStep === index ? 0 : -1}
                  onClick={() => setActiveStep(index)}
                  onKeyDown={(event) => moveStep(event, index)}
                >
                  <span className="step-title-line">
                    <span>{item.title}</span>
                  </span>
                  <small>{item.copy}</small>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div
          className="step-screen"
          id={`${scenarioKey}-step-screen`}
          role="tabpanel"
          aria-labelledby={`${scenarioKey}-step-tab-${step.id}`}
        >
          <div className="step-screen-stack">
            <Phone
              key={step.id}
              src={step.screen}
              stem={step.screenStem}
              alt={step.alt}
              className="active-step-phone is-active"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
