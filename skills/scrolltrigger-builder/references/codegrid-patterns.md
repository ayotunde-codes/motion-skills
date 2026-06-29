# Codegrid ScrollTrigger Patterns

Use these as concrete source patterns when building or diagnosing scroll-driven motion.

## Sticky Card Timeline

Archive example: `THIS STICKY SCROLL ANIMATION UNFOLDS LIKE A MINI TIMELINE OF CARDS (SCROLLTRIGGER)` — 2025-11-10.

Mechanic:

- One full-viewport section owns the scroll story.
- `ScrollTrigger.create` pins the section for a long distance, e.g. `window.innerHeight * 6`.
- `onUpdate` reads `self.progress` and maps ranges of progress into transforms.
- Each card/image has staggered phase offsets, so the same formula runs with different start times.
- Cards enter from below, pause near center, then spread into final positions while rotations decay to `0deg`.

Implementation shape:

```ts
ScrollTrigger.create({
  trigger: ".spotlight",
  start: "top top",
  end: `+=${window.innerHeight * 6}px`,
  pin: true,
  scrub: 1,
  onUpdate(self) {
    const progress = self.progress;
    items.forEach((item, index) => {
      const phaseStart = offsets[index];
      const phaseProgress = clamp01((progress - phaseStart) / phaseLength);
      gsap.set(item, {
        xPercent: lerp(startX, finalX[index], easeOut(phaseProgress)),
        yPercent: lerp(startY, finalY[index], easeOut(phaseProgress)),
        rotation: lerp(initialRotation[index], 0, phaseProgress),
      });
    });
  },
});
```

Use for:

- project cards that unfold into a gallery
- product feature cards
- timeline cards
- editorial chapter previews

Watch for:

- Too much imperative logic inside `onUpdate`; extract mapping helpers.
- Hardcoded progress thresholds that fail when item count changes.
- Using `gsap.to` repeatedly inside `onUpdate` for every frame. Prefer `gsap.set` or quick setters unless tween smoothing is intentional.

## Horizontal Parallax Scroll

Archive examples:

- `HORIZONTAL PARALLAX SCROLL ANIMATION SUPERCHARGED BY SCROLLTRIGGER` — 2024-10-20
- `WHEN PARALLAX EFFECT MET HORIZONTAL SCROLL (GSAP & SCROLLTRIGGER)` — 2024-05-13
- `HORIZONTAL IMAGE SCROLL SLIDER | GSAP HORIZONTAL SCROLL` — 2023-11-17

Mechanic:

- A wide content row is translated along `x` while the page scrolls vertically.
- The `end` distance should be derived from overflow width, not guessed.
- Foreground/background layers move at different rates for parallax.

Implementation shape:

```ts
const track = document.querySelector(".track");
const distance = track.scrollWidth - window.innerWidth;

gsap.to(track, {
  x: -distance,
  ease: "none",
  scrollTrigger: {
    trigger: ".horizontal-section",
    start: "top top",
    end: () => `+=${distance}`,
    pin: true,
    scrub: true,
    invalidateOnRefresh: true,
  },
});
```

Watch for:

- `100vw` causing horizontal scrollbars on Windows. Prefer `width: 100%` where possible.
- Images loading after trigger calculation. Reserve dimensions and refresh after layout-critical assets load.
- Touch devices where horizontal translation feels like hijacked scroll. Consider a native horizontal carousel on mobile.

## Product Reveal Scroll

Archive examples:

- `THE AWARD-WINNING STICKY SECTION SCROLL ANIMATION WITH GSAP & SCROLLTRIGGER` — 2024-12-09
- `SCROLL TO REVEAL — A NEXT.JS SCROLL ANIMATION THAT PEELS CARDS TO LIFE` — 2025-03-30
- `THIS SCROLL ANIMATION TURNS ONE IMAGE INTO THREE PERFECTLY FLIPPING CARDS` — 2025-10-26

Mechanic:

- Pin a product/hero section.
- Use progress ranges for reveal, split, flip, peel, or mask phases.
- Treat each visual beat as a named phase.

Phase map:

```txt
0.00-0.15: establish hero
0.15-0.35: reveal mask/card split
0.35-0.70: main transform
0.70-0.90: supporting copy/tooltips
0.90-1.00: settle into next section
```

Watch for:

- ScrollTrigger is layout-sensitive. Build static layout first, then animate.
- Long pinned sections need obvious progress; otherwise users feel trapped.
- Always provide a static reduced-motion state for pinned product narratives.

