import Link from "next/link";
import { guides } from "./data";
import { ResponsiveImage } from "./ResponsiveImage";

export function Blog() {
  return (
    <section className="blog section" id="blog">
      <header className="chapter-heading">
        <div className="blog-heading-copy">
          <h2>Blog</h2>
          <p>
            Tips and guides to help you get the most from Jazari One. Something
            missing?{" "}
            <a href="mailto:hello@jazari.xyz">Tell us what you&apos;d like to see</a>
          </p>
        </div>
        <Link className="blog-all-link neutral-control" href="/blog">All Articles</Link>
      </header>
      <div className="blog-grid">
        {guides.slice(0, 4).map((guide, index) => (
          <Link
            className={`blog-card pointer-card ${index === 0 ? "blog-card-featured" : ""} ${"image" in guide ? "has-image" : ""}`}
            href={`/blog/${guide.slug}`}
            key={guide.slug}
          >
            {"image" in guide && (
              <ResponsiveImage
                className="blog-card-image"
                pictureClassName="blog-card-media"
                fallback={guide.image}
                stem={guide.imageStem}
                widths={[480, 960, 1440]}
                width={guide.slug === "send-money-to-mexico" ? 1800 : 1536}
                height={guide.slug === "send-money-to-mexico" ? 1800 : 1024}
                sizes="(max-width: 620px) calc(100vw - 40px), 50vw"
                alt={`${guide.route} transfer guide`}
                loading="lazy"
                decoding="async"
              />
            )}
            <div className="blog-card-copy">
              <h3>{guide.title}</h3>
              <span className="blog-read neutral-control">Read Article</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
