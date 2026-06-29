---
name: svg-mask-lab
description: Build SVG mask, clip-path, gooey, path, and reveal effects. Use for paint-away reveals, SVG navs, image masks, text wipes, blob transitions, path morphs, and filter-based interactions.
---

# SVG Mask Lab

Use this skill when the effect depends on SVG geometry, masks, clip paths, paths, or filters.

When the user is working from a Codegrid-style archive or asks for concrete examples, read [references/codegrid-patterns.md](references/codegrid-patterns.md).

## Process

1. Identify the SVG role:
   - mask
   - clip path
   - filter
   - path/morph
   - text/path reveal
   - interactive overlay

2. Choose the coordinate strategy:
   - responsive `viewBox`
   - viewport-sized SVG
   - element-relative SVG
   - CSS clip-path when SVG is unnecessary

3. Build the effect:
   - create stable SVG structure
   - animate attributes or transforms deliberately
   - use GSAP for timeline orchestration
   - keep DOM layering understandable

4. Handle browser and device constraints:
   - test Safari behavior
   - avoid expensive filters over huge surfaces
   - provide fallback for reduced motion
   - ensure pointer events hit the intended layer

## Output

Provide:

- SVG structure
- mask/filter/path explanation
- animation timeline
- responsive strategy
- fallback strategy
- performance notes

## Common Mechanics

- Paint-away reveal: animated mask follows pointer or timeline.
- Gooey reveal: SVG filter merges moving circles/blobs.
- SVG nav: menu items revealed by clipping or path movement.
- Image portal: media revealed through animated clip geometry.
