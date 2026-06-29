---
name: motion-to-component
description: Convert raw animation prototypes into reusable React or Next.js components. Use when the user wants a Codegrid-style HTML/Vite/vanilla GSAP effect turned into maintainable component code.
---

# Motion To Component

Use this skill to convert a prototype into a reusable component without dragging tutorial clutter into the app.

## Process

1. Identify the runtime:
   - vanilla/Vite
   - React
   - Next.js App Router
   - other

2. Extract the component boundary:
   - props/data
   - local refs
   - required CSS
   - assets
   - animation lifecycle

3. Convert safely:
   - move DOM queries to refs or scoped selectors
   - initialize GSAP in an effect hook
   - clean up timelines, ScrollTriggers, listeners, RAF loops, and Three.js resources
   - avoid global selectors unless the component owns the whole page
   - make asset lists data-driven

4. Add control surfaces:
   - `items`
   - `duration`
   - `ease`
   - `className`
   - `disabled` or reduced-motion override
   - optional callbacks for active item changes

5. Verify:
   - mounts/unmounts cleanly
   - works after route transitions
   - resizes correctly
   - does not create duplicate ScrollTriggers
   - has a mobile/reduced-motion path

## Output

Produce:

- component file
- styles/module file if needed
- usage example
- dependency notes
- cleanup notes
- assumptions

## React/Next Notes

- Prefer `useLayoutEffect` or a local isomorphic layout effect for visual initialization.
- Use `gsap.context` when available.
- For Next.js App Router, mark interactive motion components with `"use client"`.
- Do not import browser-only libraries into server components.

