import Link from "next/link";

export function HeroLabChooser() {
  return (
    <main className="lab-choice">
      <header>
        <p>Jazari One · internal review</p>
        <h1>Choose an independent hero lab</h1>
        <span>
          The two studies live on separate route trees, use different scene
          implementations, and can be reviewed without mixing authorship.
        </span>
      </header>
      <div className="lab-choice-grid">
        <Link href="/hero-lab-claude/">
          <i>Version A</i>
          <strong>Hero Lab / Claude</strong>
          <span>Original implementation and its ten live art-direction studies.</span>
          <b>Open Claude lab →</b>
        </Link>
        <Link href="/hero-lab-codex/">
          <i>Version B</i>
          <strong>Hero Lab / Codex</strong>
          <span>Independent implementation with its own renderer, choreography and comparison UI.</span>
          <b>Open Codex lab →</b>
        </Link>
      </div>
      <Link className="lab-choice-home" href="/">
        Back to production site
      </Link>
    </main>
  );
}
