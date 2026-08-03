import type { ImgHTMLAttributes } from "react";
import { siteBasePath, withBasePath } from "../site-paths";

type ResponsiveImageProps = {
  alt: string;
  fallback: string;
  height: number;
  stem: string;
  widths: readonly number[];
  width: number;
  pictureClassName?: string;
} & Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "alt" | "height" | "src" | "srcSet" | "width"
>;

function sourceSet(stem: string, widths: readonly number[], extension: "avif" | "webp") {
  return widths
    .map((width) => `${withBasePath(`${stem}-${width}.${extension}`)} ${width}w`)
    .join(", ");
}

function resolvedAsset(path: string) {
  if (
    !path.startsWith("/") ||
    (siteBasePath && (path === siteBasePath || path.startsWith(`${siteBasePath}/`)))
  ) {
    return path;
  }

  return withBasePath(path);
}

export function ResponsiveImage({
  alt,
  fallback,
  height,
  stem,
  widths,
  width,
  pictureClassName,
  ...imageProps
}: ResponsiveImageProps) {
  return (
    <picture className={pictureClassName}>
      <source
        type="image/avif"
        srcSet={sourceSet(stem, widths, "avif")}
        sizes={imageProps.sizes}
      />
      <source
        type="image/webp"
        srcSet={sourceSet(stem, widths, "webp")}
        sizes={imageProps.sizes}
      />
      <img
        {...imageProps}
        alt={alt}
        width={width}
        height={height}
        src={resolvedAsset(fallback)}
      />
    </picture>
  );
}
