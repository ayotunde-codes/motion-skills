# Codegrid Three.js Product Motion Patterns

Use these as concrete source patterns for GSAP-driven WebGL and product scenes.

## GLB Product Scroll Reveal

Archive example: `THIS 3D SCROLL ANIMATION MAKES YOUR PRODUCT PAGE FEEL ALIVE (GSAP & THREE.JS)` — 2025-06-14.

Mechanic:

- A full-viewport product section is pinned for a long scroll distance.
- Three.js renders a transparent canvas over the layout.
- A GLB model is loaded with `GLTFLoader`.
- The model is centered from its bounding box, with different positioning for mobile and desktop.
- Scroll progress drives header movement, circular mask reveal, tooltip entrances, and model rotation.
- Lenis feeds smooth scroll updates into ScrollTrigger.

Implementation shape:

```js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);

new GLTFLoader().load("/model.glb", (gltf) => {
  model = gltf.scene;
  scene.add(model);
  setupModelFromBounds(model);
});

ScrollTrigger.create({
  trigger: ".product-overview",
  start: "top top",
  end: `+=${window.innerHeight * 10}px`,
  pin: true,
  scrub: 1,
  onUpdate({ progress }) {
    updateDOMBeats(progress);
    if (model) rotateModelFromProgress(progress);
  },
});
```

Use for:

- product feature walkthroughs
- ecommerce hero inspection
- hardware/packaging reveals
- app/device product storytelling

Watch for:

- The inspected example rotates the model by applying rotation deltas against `currentRotation`. Preserve this pattern if using `rotateOnAxis`; setting absolute `rotation.y` is simpler when axis requirements allow it.
- Always cap pixel ratio.
- Dispose renderer, materials, geometries, textures, listeners, and RAF loops in componentized apps.
- Provide a poster image fallback for mobile/reduced-motion.

## Scroll-Controlled WebGL Image Slider

Archive example: `THE SMOOTHEST THREE.JS IMAGE SLIDER THAT BENDS AS YOU SCROLL (AND LOOPS FOREVER)` — 2025-03-31.

Mechanic:

- A WebGL plane/image stack bends or distorts in response to scroll velocity/progress.
- GSAP or a scroll listener updates shader uniforms, mesh position, or gallery index.
- Looping galleries need modular arithmetic and duplicated edge items.

Use for:

- portfolio galleries
- film/photo studios
- editorial visual indexes

Watch for:

- Shader effects need a non-WebGL fallback.
- Scroll velocity should be damped before becoming a uniform.
- Texture loading must complete before first render, or show a deliberate placeholder.

## Template-Scale Three.js Sites

Archive examples:

- `FUTURISTIC TECHWEAR E-COMMERCE WEBSITE TEMPLATE | NEXT.JS | THREE.JS, GSAP...` — 2025-12-31
- `FICTIONAL ARCHAEOLOGICAL ARCHIVE WEBSITE TEMPLATE | NEXT.JS | THREE.JS, GSAP...` — 2026-03-28
- `MODERN DUOTONE CREATIVE STUDIO WEBSITE TEMPLATE | HTML, CSS, JAVASCRIPT | THREE.JS...` — 2026-04-30

Lesson:

- Template-scale WebGL is not one effect. It is a system of scroll, transitions, media, loaders, and fallbacks.
- Before reusing one, extract the smallest scene mechanic. Do not drag the whole template architecture into another app unless the target app needs it.

Checklist:

- Is the Three.js scene the page's primary experience?
- Can the same product story work as a video/image fallback?
- Are fonts, media, and model assets licensed for the target?
- Is there one canvas per route/experience, not one canvas per small decorative element?

