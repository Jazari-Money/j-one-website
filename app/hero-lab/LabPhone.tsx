"use client";

/* eslint-disable @next/next/no-img-element -- local, art-directed assets use exact source files */

import { useEffect, useRef } from "react";
import { withBasePath } from "../site-paths";

/**
 * The production phone: graphite frame + the original Jazari One app video.
 * Pauses with the lab's Play/Pause control and under reduced motion.
 */
export function LabPhone({
  paused,
  reduced,
  className = "",
}: {
  paused: boolean;
  reduced: boolean;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (paused || reduced) {
      video.pause();
    } else {
      video.play().catch(() => {});
    }
  }, [paused, reduced]);

  return (
    <div className={`hlab-phone ${className}`} aria-label="Jazari One app preview">
      <img
        className="hlab-phone-frame"
        src={withBasePath("/images/iphone-12-pro-graphite.webp")}
        alt=""
        aria-hidden="true"
      />
      <video
        ref={videoRef}
        className="hlab-phone-video"
        autoPlay={!paused && !reduced}
        loop
        muted
        playsInline
        poster={withBasePath("/images/screens/hero-video-poster.png")}
        preload="metadata"
        aria-label="Jazari One app experience"
      >
        <source src={withBasePath("/videos/jazari-app.mp4")} type="video/mp4" />
      </video>
    </div>
  );
}
