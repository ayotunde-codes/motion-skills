---
name: cursor-interaction-lab
description: Build tactile cursor and pointer interactions. Use for cursor trails, magnetic buttons, direction-aware hover, image-follow cursors, tilt cards, mousemove parallax, ASCII/pixel effects, or fluid pointer simulations.
---

# Cursor Interaction Lab

Use this skill for pointer-driven microinteractions and hero interactions.

When the user is working from a Codegrid-style archive or asks for concrete examples, read [references/codegrid-patterns.md](references/codegrid-patterns.md).

## Process

1. Choose the interaction type:
   - magnetic element
   - cursor trail
   - hover image follower
   - direction-aware reveal
   - tilt/parallax card
   - canvas/WebGL/fluid cursor

2. Define input mapping:
   - pointer position
   - pointer velocity
   - entry direction
   - hover state
   - distance from target center

3. Smooth motion:
   - use lerp or GSAP quick setters
   - avoid state updates every pointer event in React
   - write transforms, opacity, and CSS variables rather than layout properties

4. Scope and cleanup:
   - attach listeners only while needed
   - remove listeners on unmount
   - pause/disable on touch-only devices when the effect does not translate

5. Accessibility:
   - do not hide the real cursor unless necessary
   - preserve focus states
   - provide non-pointer behavior for keyboard users
   - respect reduced motion

## Output

Provide:

- interaction mechanic
- event model
- DOM/CSS requirements
- implementation code
- mobile behavior
- cleanup notes

## Taste Rules

- Cursor effects should make the UI feel tactile, not hard to use.
- Keep pointer latency low.
- Do not put heavy canvas effects on every page.
