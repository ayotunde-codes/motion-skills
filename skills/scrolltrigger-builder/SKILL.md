---
name: scrolltrigger-builder
description: Build or repair GSAP ScrollTrigger animations. Use for pinned sections, scrubbed timelines, sticky cards, horizontal scroll, image sequences, text reveals, section transitions, or scroll-controlled motion.
---

# ScrollTrigger Builder

Use this skill for scroll-driven motion where layout and trigger geometry matter as much as the timeline.

## Process

1. Define the scroll story:
   - what changes as the user scrolls
   - which section owns the trigger
   - where pinning starts and ends
   - whether scrub should be direct or eased

2. Stabilize layout first:
   - set section heights deliberately
   - prevent dynamic content from shifting trigger positions
   - reserve media dimensions
   - avoid nested scrollers unless necessary

3. Build the timeline:
   - set initial states before creating triggers
   - use one timeline per scroll story
   - avoid many tiny independent triggers for one sequence
   - name labels for major beats

4. Configure ScrollTrigger:
   - `trigger`
   - `start`
   - `end`
   - `scrub`
   - `pin`
   - `anticipatePin`
   - `invalidateOnRefresh`
   - `refreshPriority` only when needed

5. Add fallbacks:
   - mobile simplified sequence
   - reduced-motion static state
   - cleanup on unmount/route change

## Debug Checklist

- Markers align with the intended section.
- Pinned content has enough scroll distance.
- No layout shift occurs after images/fonts load.
- `ScrollTrigger.refresh()` happens only when needed.
- No duplicate triggers survive route navigation.

## Common Patterns

- Sticky cards: one pinned container, staggered card transforms.
- Horizontal scroll: content width drives `end`, transform x by overflow amount.
- Product reveal: pinned scene, scrub timeline through states.
- Text reveal: split text once, animate scoped chars/words, revert on cleanup.

