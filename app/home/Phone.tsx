"use client";

/* eslint-disable @next/next/no-img-element -- local, art-directed assets use exact source files */

export function Phone({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`phone ${className}`}>
      <img src={src} alt={alt} />
    </div>
  );
}
