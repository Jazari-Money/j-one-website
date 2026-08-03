import { ResponsiveImage } from "./ResponsiveImage";

export function Phone({
  src,
  stem,
  alt,
  className = "",
}: {
  src: string;
  stem: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`phone ${className}`}>
      <ResponsiveImage
        fallback={src}
        stem={stem}
        widths={[320, 520]}
        width={520}
        height={1063}
        sizes="(max-width: 620px) 82vw, 322px"
        alt={alt}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
