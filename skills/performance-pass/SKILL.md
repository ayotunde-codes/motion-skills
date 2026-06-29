---
name: performance-pass
description: Audit and optimize animation-heavy frontend work. Use when a GSAP, ScrollTrigger, SVG, cursor, video, or Three.js page feels janky, heavy, unstable, inaccessible, or ready for final polish.
---

# Performance Pass

Use this skill before considering a motion-heavy page done.

## Audit

Check:

- large images/videos
- uncompressed GLB/GLTF files
- layout shifts after media/font load
- too many ScrollTriggers
- duplicate timelines after route transitions
- unremoved event listeners
- RAF loops that never stop
- expensive SVG filters over large areas
- canvas pixel ratio too high
- React state updates inside pointer/scroll loops
- missing reduced-motion behavior

## Optimization Moves

- animate transform/opacity over layout properties
- reserve media dimensions
- use GSAP quick setters for high-frequency pointer updates
- batch related ScrollTrigger work into one timeline
- lazy-load heavy scenes
- cap Three.js pixel ratio
- dispose Three.js resources
- compress media and 3D assets
- split desktop-only motion from mobile behavior
- provide static fallbacks for reduced motion

## Verification

Run or request:

- local browser test
- desktop and mobile viewport check
- route navigation/unmount test
- reduced-motion test
- CPU throttling check for heavy scenes

## Output

Return:

- prioritized issues
- likely cause
- fix
- files/lines if available
- residual risk

Lead with bugs and jank risks before polish suggestions.

