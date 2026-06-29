# Codegrid Cursor Interaction Patterns

Use these as concrete source patterns for pointer-driven interactions.

## Direction-Aware Magnetic Grid Highlight

Archive example: `NEXT.JS DIRECTION-AWARE HOVER EFFECT THAT MAGNETICALLY TRACKS YOUR CURSOR` — 2025-04-27.

Mechanic:

- A container holds a grid of hover targets.
- A separate `.highlight` layer sits absolutely above/below the grid.
- On `mousemove`, use `document.elementFromPoint(x, y)` to discover the current `.grid-item`.
- Move the highlight to the target's bounding box relative to the container.
- Use CSS transitions for transform, width, height, and background color.

Implementation shape:

```ts
const container = containerRef.current;
const highlight = highlightRef.current;

function moveToElement(element) {
  const rect = element.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  highlight.style.transform = `translate(${rect.left - containerRect.left}px, ${
    rect.top - containerRect.top
  }px)`;
  highlight.style.width = `${rect.width}px`;
  highlight.style.height = `${rect.height}px`;
  highlight.style.backgroundColor = element.dataset.color;
}

function onMove(event) {
  const hovered = document.elementFromPoint(event.clientX, event.clientY);
  const item = hovered?.closest?.(".grid-item");
  if (item) moveToElement(item);
}
```

Use for:

- capability grids
- nav menus
- pricing/feature matrices
- interactive tech stacks

Watch for:

- `elementFromPoint` returns child nodes; always climb with `closest`.
- Hide or simplify the highlight on stacked mobile layouts.
- Preserve focus states for keyboard users; this pattern is pointer-only by default.

## Cursor Trail / Image Trail

Archive examples:

- `THIS CURSOR TRAIL EFFECT MOVES LIKE IT HAS A MIND OF ITS OWN` — 2025-03-16
- `NEXT.JS ANIMATED CURSOR TRAIL WHERE EVERY IMAGE UNFOLDS AND CHOPS UP MID-AIR` — 2025-05-27
- `BUILDING THE MOST SATISFYING CURSOR TRAIL ON THE WEB (FLUID SIMULATION)` — 2026-04-19

Mechanic:

- Track pointer position and velocity.
- Spawn DOM/canvas/WebGL particles or image fragments when distance from last spawn exceeds a threshold.
- Animate spawned elements independently and remove them on completion.
- Use interpolation so the trail feels smooth rather than locked to raw events.

Implementation shape:

```ts
let last = { x: 0, y: 0 };
let pointer = { x: 0, y: 0 };

window.addEventListener("pointermove", (event) => {
  pointer = { x: event.clientX, y: event.clientY };
});

function tick() {
  const distance = Math.hypot(pointer.x - last.x, pointer.y - last.y);
  if (distance > threshold) {
    spawnTrailItem(pointer, distance);
    last = { ...pointer };
  }
  requestAnimationFrame(tick);
}
```

Watch for:

- React state in pointer loops will jank. Use refs, CSS variables, quick setters, or canvas state.
- Cap spawned elements. Remove nodes on animation completion.
- Disable high-density trails on touch devices and reduced-motion contexts.

## Mousemove Fighting Scroll

Archive example: `SCROLLTRIGGER PIN BUT ENDED UP FIGHTING MOUSE MOVEMENT MIDWAY` — 2025-03-24.

Lesson:

- When scroll and pointer both control the same elements, define ownership by phase.
- During pinned scroll phases, pointer effects should modulate small offsets only.
- Never let pointer transforms overwrite scroll-owned transforms.

Pattern:

```txt
Scroll owns: x/y/scale/rotation main position
Pointer owns: small CSS variable offsets or child-layer parallax
Composition: parent gets scroll transform, child gets pointer transform
```

