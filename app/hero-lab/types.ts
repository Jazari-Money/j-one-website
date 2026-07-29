export type VariantProps = {
  /** Effect amplitude multiplier, 0.4–1.5, default 1. */
  intensity: number;
  /** Freeze all motion (scene + DOM animation + video). */
  paused: boolean;
  /** Forced or system reduced motion: static scene, instant intro. */
  reduced: boolean;
  /** Whether the scene may react to the pointer. */
  cursor: boolean;
};
