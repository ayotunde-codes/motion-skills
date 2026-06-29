---
name: threejs-product-motion
description: Build GSAP-driven Three.js product and WebGL motion. Use for GLB model reveals, scroll-controlled 3D products, camera choreography, shader/image distortion, and canvas-backed premium landing sections.
---

# Three.js Product Motion

Use this skill when a 3D/WebGL scene is part of the product storytelling.

When the user is working from a Codegrid-style archive or asks for concrete examples, read [references/codegrid-patterns.md](references/codegrid-patterns.md).

## Process

1. Define the scene purpose:
   - product inspection
   - cinematic hero
   - scroll-controlled state changes
   - hover interaction
   - image/shader distortion

2. Set up scene fundamentals:
   - renderer
   - camera
   - lights
   - asset loader
   - resize handling
   - animation loop

3. Connect GSAP:
   - animate camera, model, material, uniforms, or scene groups
   - use ScrollTrigger for scroll-owned states
   - keep RAF rendering and GSAP state changes coordinated

4. Manage assets:
   - compress GLB/GLTF
   - lazy-load non-critical scenes
   - show loading/fallback states
   - dispose geometries, materials, textures, renderer on cleanup

5. Add fallbacks:
   - static image/video poster
   - reduced-motion version
   - mobile simplification

## Output

Provide:

- scene structure
- animation timeline
- asset requirements
- cleanup plan
- performance risks
- fallback implementation

## Rules

- Do not use WebGL for decoration alone.
- Keep the canvas full-bleed or clearly integrated into the page flow.
- Verify the canvas is nonblank and correctly framed after implementation.
