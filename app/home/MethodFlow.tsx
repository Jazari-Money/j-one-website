import { Phone } from "./Phone";

export function MethodFlow({
  title,
  steps,
  screen,
  stem,
  alt,
  reverse = false,
  screenOverlay,
}: {
  title: string;
  steps: readonly string[];
  screen: string;
  stem: string;
  alt: string;
  reverse?: boolean;
  screenOverlay?: "add-funds-wallet" | "add-funds-usd";
}) {
  return (
    <div className={`method-flow ${reverse ? "is-reversed" : ""}`}>
      <div className="method-flow-copy">
        <h3>{title}</h3>
        <ol>
          {steps.map((step) => <li key={step}>{step}</li>)}
        </ol>
      </div>
      <div className="method-flow-screen">
        <div className={`method-flow-phone-shell ${screenOverlay ? `has-${screenOverlay}` : ""}`}>
          <Phone src={screen} stem={stem} alt={alt} />
          {screenOverlay && (
            <div className="phone-copy-corrections" aria-hidden="true">
              <span className="phone-copy-title">Add Funds</span>
              <span className="phone-copy-asset">Digital dollars</span>
              {screenOverlay === "add-funds-usd" && (
                <span className="phone-copy-bullet">• Adds digital dollars to your balance</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
