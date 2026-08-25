import { audiences } from "./data";
import { ResponsiveImage } from "./ResponsiveImage";

export function AudienceExplorer() {
  return (
    <section className="audience section" id="audience">
      <header className="chapter-heading">
        <h2>For your work and the life you&apos;re building</h2>
      </header>

      <div className="audience-explorer">
        {audiences.map((item) => (
          <article
            className="audience-panel pointer-card"
            key={item.title}
          >
            <ResponsiveImage
              className="audience-image"
              pictureClassName="audience-media"
              fallback={item.image}
              stem={item.imageStem}
              widths={[480, 960]}
              width={1024}
              height={1536}
              sizes="(max-width: 700px) min(520px, 100vw), (max-width: 1120px) 50vw, 33vw"
              alt={item.alt}
              loading="lazy"
              decoding="async"
            />
            <div className="audience-caption">
              <h3>{item.title}</h3>
              <ul>
                {item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
