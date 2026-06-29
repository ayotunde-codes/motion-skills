# Codegrid SVG Mask Patterns

Use these as concrete source patterns for SVG masks, clip paths, filters, and path effects.

## Gooey Smudge Revealer

Archive example: `THIS GOOEY SVG ANIMATION LETS YOU PAINT AWAY THE SCREEN TO REVEAL HIDDEN CONTENT (POWERED BY GSAP)` — 2026-05-06.

Mechanic:

- Foreground and background content layers overlap.
- The background layer is revealed with `mask: url(#smudge-mask)` / `-webkit-mask`.
- An absolutely positioned SVG matches the viewport.
- Pointer movement is smoothed with interpolation.
- When pointer speed exceeds a threshold, stamp an SVG `circle` into the mask.
- Each circle expands, then dissolves to radius `0`, then removes itself.

Implementation shape:

```js
const pointer = { x: 0, y: 0 };
const smooth = { x: 0, y: 0 };

function stamp(x, y, radius) {
  const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("cx", x);
  circle.setAttribute("cy", y);
  circle.setAttribute("r", radius);
  circle.setAttribute("fill", "#fff");
  maskGroup.prepend(circle);

  const state = { r: radius };
  gsap.timeline({
    onUpdate: () => circle.setAttribute("r", Math.max(0, state.r)),
    onComplete: () => circle.remove(),
  })
    .to(state, { r: radius * 2, duration: 2, ease: "power1.inOut" })
    .to(state, { r: 0, duration: 3, ease: "power3.in" }, 2);
}

function tick() {
  smooth.x += (pointer.x - smooth.x) * 0.1;
  smooth.y += (pointer.y - smooth.y) * 0.1;
  const speed = Math.hypot(pointer.x - smooth.x, pointer.y - smooth.y);
  if (speed > 0.01) stamp(smooth.x, smooth.y, speed * 0.2);
  requestAnimationFrame(tick);
}
```

Use for:

- hidden content reveals
- hero intros
- gallery reveals
- interactive brand signatures

Watch for:

- Unbounded SVG circles. Remove nodes on timeline completion.
- Mask sizing must match viewport on resize.
- Touch handlers often need `passive: false` if preventing scroll, but do this only inside the controlled surface.

## Clip-Path Scroll Reveals

Archive examples:

- `GSAP SCROLLTRIGGER ANIMATION | REVEAL ON SCROLL | CLIP PATH ANIMATION` — 2023-11-26
- `WEBSITE INTRO ANIMATION | CLIP PATH ANIMATION | WEBSITE REVEAL ANIMATION` — 2023-06-25
- `SUBSCRIPTION PAGE HTML CSS | CLIP PATH ANIMATION GSAP` — 2023-05-07

Mechanic:

- Use CSS `clip-path` for simple rectangular, polygon, or circle reveals.
- Use SVG masks only when the reveal shape needs reusable SVG geometry or filters.
- Animate clip-path values with GSAP, usually from closed to open.

Implementation shape:

```js
gsap.fromTo(
  ".reveal",
  { clipPath: "inset(100% 0 0 0)" },
  {
    clipPath: "inset(0% 0 0 0)",
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".reveal",
      start: "top 80%",
    },
  },
);
```

Watch for:

- Complex polygon interpolation can be brittle; keep point counts identical.
- Safari can be stricter with SVG mask and clip-path syntax.
- Clip-path reveals often need overflow-hidden wrappers to avoid edge artifacts.

## SVG Path Drawing And Menus

Archive examples:

- `WATCH GSAP EFFORTLESSLY DRAW THIS SVG PATH ON SCROLL WITHOUT BREAKING A SWEAT` — 2025-12-07
- `FULL SCREEN OVERLAY MENU (W/ SVG PATH ANIMATION)` — 2023-05-14
- `SVG PATHS GO ROGUE AND DOMINATE THIS IMAGE HOVER EFFECT (GSAP)` — 2026-02-08

Mechanic:

- Path drawing uses stroke dash length and offset.
- Path menus often animate the `d` attribute or use a path as a moving overlay boundary.
- Image hover with SVG paths usually maps pointer position into path control points.

Watch for:

- Path morphing needs compatible path structures.
- Path drawing should cache path length instead of recomputing repeatedly.
- SVG overlays should not block underlying links unless intentionally interactive.

