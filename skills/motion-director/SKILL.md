---
name: motion-director
description: Motion direction router. Use when the user wants a premium animated website, asks which animation pattern fits a product, wants Codegrid/Awwwards-style motion, or needs a plan combining GSAP, ScrollTrigger, SVG, cursor, and Three.js effects.
---

# Motion Director

Use this skill to choose motion patterns before implementation. The goal is not to add more animation; it is to pick the few motion moments that make the product feel intentional.

## Process

1. Identify the product surface:
   - landing page
   - portfolio
   - ecommerce/product page
   - editorial/story page
   - dashboard/tool
   - case study/gallery

2. Identify the user's desired motion role:
   - orientation: explain structure or sequence
   - delight: tactile hover/cursor moments
   - drama: hero reveals and transitions
   - comprehension: scroll-driven product/state changes
   - identity: a signature brand interaction

3. Pick at most three primary motion systems:
   - `scrolltrigger-builder` for pinned scroll, scrubbed timelines, sticky cards, horizontal scroll, or section reveals
   - `cursor-interaction-lab` for pointer trails, magnetic buttons, direction-aware hovers, or tactile cards
   - `svg-mask-lab` for wipes, masks, gooey reveals, clip-paths, or SVG nav transitions
   - `threejs-product-motion` for GLB/model/canvas product scenes
   - `gsap-awwwards-website` when the user wants to bootstrap a React/Vite/Tailwind Awwwards-style product landing page
   - `motion-to-component` when adapting a prototype into a real React/Next component
   - `performance-pass` before final delivery

4. Produce a motion brief:
   - goal of each motion moment
   - page section where it belongs
   - source pattern to study, if known
   - implementation risk
   - mobile/reduced-motion fallback

## Constraints

- Prefer one signature moment plus small supporting interactions.
- Do not animate every section.
- Do not use heavy WebGL where a CSS/GSAP effect communicates the same idea.
- Treat performance, readability, and user control as part of the motion design.
