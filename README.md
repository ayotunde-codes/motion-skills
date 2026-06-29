# Motion Skills

Installable agent skills for turning GSAP, ScrollTrigger, SVG, cursor, and Three.js animation prototypes into reusable motion systems.

## Install

After publishing this folder as a GitHub repo:

```sh
npx skills@latest add yourname/motion-skills
```

Install one skill:

```sh
npx skills@latest add yourname/motion-skills --skill gsap-recipe-extractor
```

## Included Skills

- `motion-director` - choose the right motion workflow
- `codegrid-archive-navigator` - search a local Codegrid-style archive manifest
- `gsap-recipe-extractor` - turn a prototype into an implementation recipe
- `remix-this-effect` - adapt an effect for a new product or brand context
- `motion-to-component` - convert prototypes into reusable React/Next components
- `scrolltrigger-builder` - build pinned, scrubbed, scroll-driven timelines
- `cursor-interaction-lab` - create cursor trails, magnetic hovers, and pointer effects
- `svg-mask-lab` - build mask, clip-path, gooey, and SVG reveal effects
- `threejs-product-motion` - combine Three.js scenes with GSAP product motion
- `performance-pass` - make motion-heavy pages fast, stable, and respectful of reduced motion

## Local Archive Search

This repo includes a helper script for the downloaded Discord archive:

```sh
node skills/codegrid-archive-navigator/scripts/search_archive.js \
  --manifest ../discord-archive/manifest.json \
  --query "scrolltrigger sticky cards" \
  --limit 5
```

Example queries:

```sh
node skills/codegrid-archive-navigator/scripts/search_archive.js --query "cursor trail mouse movement"
node skills/codegrid-archive-navigator/scripts/search_archive.js --query "three.js product scroll animation"
node skills/codegrid-archive-navigator/scripts/search_archive.js --query "svg mask gooey reveal"
```

## Publish Checklist

1. Create a GitHub repo, for example `motion-skills`.
2. Copy this folder's contents into the repo root.
3. Push to GitHub.
4. Test discovery:

```sh
npx skills@latest add yourname/motion-skills --list
```

5. Install one skill:

```sh
npx skills@latest add yourname/motion-skills --skill motion-director
```
