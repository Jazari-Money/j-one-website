"use client";

/**
 * Shared hero copy block. Real production content; each variant restyles the
 * reveal, alignment and hierarchy through its own CSS scope. Headline lines
 * are wrapped in mask spans so variants can choreograph per-line reveals.
 */
export function HeroCopy({
  layout = "center",
  lines = ["Use dollars.", "Anywhere."],
  sub = "Hold them. Send them. Grow them.",
  chips,
  ctaTone = "light",
}: {
  layout?: "center" | "left";
  lines?: string[];
  sub?: string;
  chips?: string[];
  ctaTone?: "light" | "dark";
}) {
  return (
    <div className={`hlab-copy is-${layout}`}>
      <h1>
        {lines.map((line) => (
          <span className="hlab-line" key={line}>
            <span>{line}</span>
          </span>
        ))}
      </h1>
      <p className="hlab-sub">{sub}</p>
      {chips && (
        <ul className="hlab-chips">
          {chips.map((chip) => (
            <li key={chip}>{chip}</li>
          ))}
        </ul>
      )}
      <div className="hlab-cta-row">
        <a
          className={`hlab-cta is-${ctaTone}`}
          href="https://apps.apple.com/"
          target="_blank"
          rel="noreferrer"
        >
          Download App
        </a>
      </div>
    </div>
  );
}
