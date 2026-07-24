"use client";

import {
  type PointerEvent as ReactPointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";

export function trackPointer(event: ReactPointerEvent<HTMLElement>) {
  if (event.pointerType !== "mouse") return;

  const node = event.currentTarget;
  const rect = node.getBoundingClientRect();
  const x = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
  const y = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));

  node.style.setProperty("--pointer-x", `${x * 100}%`);
  node.style.setProperty("--pointer-y", `${y * 100}%`);
  node.style.setProperty("--tilt-x", `${(0.5 - y) * 1.4}deg`);
  node.style.setProperty("--tilt-y", `${(x - 0.5) * 1.6}deg`);
}

export function resetPointer(event: ReactPointerEvent<HTMLElement>) {
  const node = event.currentTarget;
  node.style.setProperty("--pointer-x", "50%");
  node.style.setProperty("--pointer-y", "50%");
  node.style.setProperty("--tilt-x", "0deg");
  node.style.setProperty("--tilt-y", "0deg");
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}

export function useInViewport<T extends Element>(rootMargin = "240px") {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      const timer = globalThis.setTimeout(() => setVisible(true), 0);
      return () => globalThis.clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return [ref, visible] as const;
}
