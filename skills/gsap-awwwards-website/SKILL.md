---
name: gsap-awwwards-website
description: Bootstrap, adapt, and ship an Awwwards-style GSAP product landing page. Use when the user wants the Eng0AI SPYLT-style React/Vite/Tailwind template, a premium animated product landing page, or a starting point for GSAP scroll animation work.
---

# GSAP Awwwards Website

Use this skill to start from the Eng0AI GSAP Awwwards product landing template and turn it into a project-specific animated site.

Upstream template:

```txt
https://github.com/Eng0AI/gsap-awwwards-website-template
```

## Fit

Use this template when the user wants:

- a premium product landing page
- Awwwards-style scroll motion
- a React + Vite frontend starter
- GSAP-driven hero and section transitions
- Tailwind CSS styling
- a motion-heavy site that can be remixed into a real product brand

Do not use it blindly for dashboards, dense tools, or content-heavy docs. For those, use `motion-director` first to decide whether the animation weight is appropriate.

## Setup

1. Confirm where the project should be created.
2. If the target directory already contains files, ask whether to create a new subfolder or merge into the current directory.
3. Clone the upstream template:

```sh
git clone --depth 1 https://github.com/Eng0AI/gsap-awwwards-website-template.git .
```

4. If the template was cloned into a temporary directory, copy the project files into the target and remove the temporary directory.
5. Remove upstream git history only after confirming the user wants a fresh repo:

```sh
rm -rf .git
git init
```

6. Install dependencies:

```sh
npm install
```

7. Verify the project builds:

```sh
npm run build
```

8. For local development:

```sh
npm run dev
```

Default Vite dev server: `http://localhost:5173`.

## Remix Workflow

After setup, treat the template as a motion starting point rather than a final brand.

1. Inventory the motion:
   - GSAP timelines
   - ScrollTrigger sections
   - hero animation
   - pinned/scrubbed sequences
   - asset and text dependencies

2. Replace product identity:
   - brand name
   - copy
   - product imagery
   - colors
   - typography
   - calls to action

3. Preserve the strongest mechanic:
   - keep one signature scroll or hero motion
   - simplify secondary effects
   - remove animation that does not support the product story

4. Use companion skills:
   - `gsap-recipe-extractor` to understand the template's motion system
   - `remix-this-effect` to adapt the template for a new brand
   - `scrolltrigger-builder` for pinned/scrubbed section repairs
   - `performance-pass` before shipping

## Deploy

For Vercel, prefer a prebuilt deploy:

```sh
vercel pull --yes
vercel build --prod
vercel deploy --prebuilt --prod --yes
```

For Netlify:

```sh
netlify deploy --prod --dir=dist
```

## Verification

Before calling the site ready:

- `npm run build` passes
- local dev server renders without console errors
- scroll animations work on desktop
- mobile layout has a simplified motion path if needed
- reduced-motion users get a usable page
- image/video assets are optimized
- no copied placeholder copy remains

## Notes

- The upstream skill from `eng0ai/eng0-template-skills` is a compact template setup skill. This version is adapted for the broader `motion-skills` workflow.
- Keep licensing and asset provenance in mind before using template media, fonts, or brand assets commercially.
