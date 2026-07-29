import Link from "next/link";
import { codexConcepts } from "./data";

export function CodexOverview() {
  return (
    <main className="xlab-overview">
      <header className="xlab-overview-head">
        <div>
          <p className="xlab-kicker">Jazari One · Codex direction study</p>
          <h1>Hero Lab / Codex</h1>
        </div>
        <p>
          Independent implementation of ten first-screen directions. The grid
          uses lightweight static studies; only the opened concept starts its
          animation renderer.
        </p>
        <div className="xlab-overview-actions">
          <Link href="/hero-lab-codex/compare/">Compare two</Link>
          <Link href="/hero-lab/">Choose another lab</Link>
        </div>
      </header>

      <ol className="xlab-grid">
        {codexConcepts.map((concept) => (
          <li key={concept.id}>
            <Link href={`/hero-lab-codex/${concept.id}/`} className={`xlab-card xlab-card-${concept.id}`}>
              <span className="xlab-card-art" aria-hidden="true">
                <i />
                <b>{concept.id}</b>
                <em>{concept.composition}</em>
              </span>
              <span className="xlab-card-copy">
                <strong>{concept.name}</strong>
                <span>{concept.thesis}</span>
                <small>{concept.tech}</small>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </main>
  );
}
