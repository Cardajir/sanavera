/**
 * Shared GSAP setup.
 *
 * Everything funnels through here so there is one place that decides whether
 * the site animates at all: with `prefers-reduced-motion` set, `reduced` is
 * true and every caller skips straight to the finished state rather than
 * playing a shortened version.
 */
import { gsap } from "gsap";

export const reduced = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

/** The house easing and durations, so timings stay consistent. */
export const EASE = "power3.out";
export const DUR = { fast: 0.4375, base: 0.75, slow: 1.125 };

/**
 * Play a tween the first time its trigger scrolls into view.
 *
 * This uses IntersectionObserver rather than GSAP's ScrollTrigger on purpose.
 * ScrollTrigger caches scroll positions, and this page's photographs load
 * lazily — every one that arrives changes the document height and invalidates
 * those positions. A reveal whose cached position has drifted never fires, and
 * because the "from" state is applied immediately the content it was meant to
 * reveal stays invisible for good. IntersectionObserver is the browser's own
 * tracking, so it cannot go stale.
 */
export function onReveal(trigger: Element, play: () => void) {
  if (!("IntersectionObserver" in window)) {
    play();
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        io.disconnect();
        play();
      }
    },
    /* Start a little before the element's top edge clears the fold. */
    { rootMargin: "0px 0px -8% 0px" },
  );
  io.observe(trigger);
}

export { gsap };
