---
name: codegrid-archive-navigator
description: Search and navigate a local Codegrid-style animation archive. Use when the user wants to find GSAP, ScrollTrigger, SVG, cursor, Three.js, source-code, or website-template examples from a downloaded Discord/archive manifest.
---

# Codegrid Archive Navigator

Use this skill to find relevant motion examples inside a local archive before writing new code.

## Inputs

Look for a manifest in this order:

1. User-provided `manifest.json` path
2. `discord-archive/manifest.json` in the current repo
3. Any nearby `manifest.json` that contains `messages` with `title`, `files`, and `channelName`

## Search

Use `scripts/search_archive.js` when available:

```sh
node scripts/search_archive.js --manifest /path/to/manifest.json --query "scrolltrigger sticky cards" --limit 10
```

If the script is unavailable, inspect the manifest directly.

## Output

Return a ranked list with:

- title
- channel
- date
- matching reason
- local folder or ZIP path when inferable
- files included
- YouTube/reference links when present
- suggested next skill:
  - `gsap-recipe-extractor` to understand a ZIP
  - `remix-this-effect` to adapt the mechanic
  - `motion-to-component` to convert it into a reusable component

## Ranking Heuristics

Prefer examples whose titles or content mention the requested mechanic:

- `gsap`, `scrolltrigger`, `splittext`, `lenis`
- `three.js`, `webgl`, `glb`, `shader`
- `svg`, `mask`, `clip-path`, `gooey`, `filter`
- `cursor`, `hover`, `magnetic`, `trail`, `mousemove`
- `slider`, `gallery`, `page transition`, `reveal`, `pinned`, `sticky`

Prefer newer examples when the user asks for modern/premium/current patterns. Prefer smaller older examples when the user asks to learn a mechanic from first principles.

