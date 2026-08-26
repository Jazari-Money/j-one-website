import { howScenarios, type HowScenario } from "./data";
import { Phone } from "./Phone";

export function ScenarioWalkthrough({
  scenarioKey,
  title,
  description,
}: {
  scenarioKey: HowScenario;
  title: string;
  description: string;
}) {
  const scenario = howScenarios[scenarioKey];

  return (
    <section className="scenario-how section" id="how-it-works" aria-labelledby={`${scenarioKey}-how-title`}>
      <header className="scenario-how-heading">
        <h2 id={`${scenarioKey}-how-title`}>{title}</h2>
        <span>{description}</span>
      </header>

      <div className="scenario-step-grid">
        {scenario.steps.map((step, index) => (
          <article className="scenario-step" key={step.id}>
            <header className="scenario-step-note">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </header>
            <Phone
              src={step.screen}
              stem={step.screenStem}
              alt={step.alt}
              loading="eager"
            />
          </article>
        ))}
      </div>
    </section>
  );
}
