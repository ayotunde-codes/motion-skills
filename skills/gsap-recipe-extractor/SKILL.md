---
name: gsap-recipe-extractor
description: Extract reusable animation recipes from GSAP, ScrollTrigger, SVG, cursor, or Three.js prototype projects. Use when the user gives a ZIP/folder/source code and wants to understand the effect or reuse the mechanic.
---

# GSAP Recipe Extractor

Turn a motion prototype into a clear, reusable recipe.

## Process

1. Inventory the project:
   - framework/build tool
   - entry files
   - dependencies
   - assets
   - preview media if present

2. Locate animation code:
   - `gsap.timeline`, `gsap.to`, `gsap.from`, `gsap.set`
   - `ScrollTrigger.create` or `scrollTrigger` configs
   - `requestAnimationFrame`
   - pointer/wheel/resize listeners
   - SVG path/mask/filter manipulation
   - Three.js renderer, camera, scene, model loading

3. Extract the recipe:
   - effect name
   - visual outcome
   - DOM/CSS prerequisites
   - animation states
   - timeline sequence
   - interaction inputs
   - cleanup requirements
   - safe parameters to change
   - fragile assumptions

4. Produce a concise implementation map:
   - what to copy
   - what to rewrite
   - what to delete
   - how to adapt content/assets

## Output Format

```md
## Recipe

Name:
Best used for:
Core mechanic:
Dependencies:

## Structure

DOM:
CSS:
Assets:

## Motion Logic

Timeline:
Triggers:
State:
Events:

## Reuse

Safe knobs:
Fragile parts:
Component extraction plan:
Performance risks:
```

## Rules

- Do not stop at summarizing files. Explain the mechanic.
- Preserve the smallest reusable core.
- Call out hardcoded dimensions, asset names, magic numbers, and global listeners.
- If the project is a tutorial prototype, separate the lesson from the throwaway implementation.

