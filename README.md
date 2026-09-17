# Atomizer 🌀

**Interactive Particle Engine, Visual Editor & Live Wallpaper Creator**

Create interactive GPU-accelerated particle animations, export visual compositions, and prepare them for future desktop live-wallpaper use. Built with React, TypeScript, Three.js, GLSL shaders, Motion, and Vite.

![Version](https://img.shields.io/badge/version-0.3.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

> **Current status:** the public deployment renders the WebGL scene, but the complete editor UI needs stabilization. The minimal particle-only appearance is intended to become **Clean Canvas Mode**; it must not replace the default Editor Mode.

## Deployment and UI status

The current deployment displays the WebGL particle renderer, but the header, controls, presets, image import, wallpaper browser, and other editor tools may not be visible. The visual scene itself is useful and matches the intended clean wallpaper aesthetic, but the default experience must be a usable editor.

The most likely causes to verify are CSS utility generation, canvas/UI stacking order, layout overflow, stale deployment commits, and TypeScript or dependency inconsistencies introduced while prototyping. The stabilization plan below makes the interface explicit, testable, and independent from the canvas layer.

### Intended modes

| Mode | Purpose | Default |
|---|---|---|
| **Editor Mode** | Full interface for building and configuring a particle scene | Yes |
| **Clean Canvas Mode** | Particle scene only, for immersive preview, screenshots, and future wallpaper playback | No |

### Editor Mode layout

```text
┌──────────────────────────────────────────────────────────────────────┐
│ Atomizer   Presets   Import   Wallpaper Hub   Play   Screenshot   ⛶ │
├──────────────┬───────────────────────────────────────────────────────┤
│ Modes        │                                                       │
│ Particles    │                    Canvas WebGL                       │
│ Animation    │             scene and mouse interaction               │
│ Mouse        │                                                       │
│ Colors       │                                                       │
├──────────────┴───────────────────────────────────────────────────────┤
│ FPS · particle count · quality profile · GPU/WebGL                   │
└──────────────────────────────────────────────────────────────────────┘
```

The editor should present:

- A header with Play/Pause, reset, screenshot, fullscreen, UI toggle, and navigation.
- A sidebar for visual mode, particles, animation, mouse interaction, colors, and performance.
- A central Three.js/WebGL canvas with mouse and touch interaction.
- A preset manager with built-in presets plus JSON import/export.
- Local image import, with point-cloud conversion and palette extraction completed in the renderer.
- A large wallpaper browser view, rather than forcing catalog browsing into a narrow sidebar.
- Performance information: FPS, particles, resolution, WebGL/GPU capability, and quality profile.

## Features

### Visual modes

- 🌀 Spherical Vortex
- 💥 Radial Explosion
- 🌊 Turbulence
- 🌌 Galaxy
- 🧲 Magnetic
- ☁️ Nebula
- ⚫ Black Hole
- ⚡ Plasma
- 🔥 Fire
- ✨ Stars
- 🌧️ Rain
- 🧬 DNA
- 🔷 Fractal
- 🕳️ Tunnel

### Interactive controls

- Particle count and particle size
- Animation speed and dispersion speed
- Intensity, turbulence, and rotation
- Mouse influence and interactive movement
- Orbit controls for rotate and zoom
- Primary, secondary, and background colors
- Play/Pause, reset, fullscreen, and clean-canvas toggle

### Creation tools

- Local image selection and preview
- Color palette selection
- Built-in visual presets
- JSON preset import/export
- PNG screenshot export
- Keyboard shortcuts and future command palette

### Future desktop functions

- Electron desktop wrapper
- Interactive live wallpaper mode, initially targeted at Windows
- Window placement behind desktop icons where supported
- System tray, autostart, multi-monitor support, and performance profiles
- Automatic pause when a fullscreen application is active, when on battery, or when GPU load is high

## Wallpaper browser and sources

Atomizer can provide a unified, Netflix-style wallpaper browser. Users should be able to add their preferred sources or URLs, search, filter, inspect metadata, preview images, and follow legitimate download links.

Supported catalog features should include:

- Search by keyword, category, tag, dominant color, resolution, orientation, and static/live type.
- Collections, favorites, history, and local source lists.
- Preview at large size with available source, author, license, format, resolution, and tags.
- Separation of static images, animated videos, and live wallpapers.
- Opening the original source and using public, authorized download URLs.

### Important scraper limitation

A browser-only scraper cannot reliably or appropriately download from every wallpaper site. Browsers enforce CORS; sites may block hotlinking, rely on dynamic rendering, require login, use bot protection, or impose terms and licenses that prohibit automated collection.

The correct all-in-one design is therefore:

1. Let the user add and organize source URLs in Atomizer.
2. Use public, documented APIs only where the source allows it.
3. Build individual source connectors that respect each provider's terms, attribution, and rate limits.
4. Keep the original source page and authorized download link visible.
5. In the desktop app, optionally use a local connector for authorized sources without exposing credentials in the web frontend.

This gives users one interface without claiming that a universal client-side scraper can bypass every site's technical or legal restrictions.

## Quick start

```bash
git clone https://github.com/reda10nafil/atomizer.git
cd atomizer
npm install
npm run dev
```

Open the local Vite URL shown in the terminal, normally `http://localhost:3000`.

### Production build

```bash
npm run build
npm run preview
```

## Keyboard shortcuts

| Key | Action |
|---|---|
| `Space` | Play/Pause |
| `R` | Reset settings |
| `F` | Toggle fullscreen |
| `S` | Take screenshot |
| `H` | Show shortcuts / planned Clean Canvas toggle behavior |
| `U` | Toggle editor UI |
| `Esc` | Close modal or exit fullscreen |

## Stack

| Area | Technology |
|---|---|
| Web UI | React + TypeScript + Vite |
| UI motion | Motion |
| GPU scene | Three.js + React Three Fiber + GLSL |
| State | Zustand |
| Styling | Tailwind CSS with explicit CSS fallbacks where required |
| Desktop | Electron, after frontend stabilization |
| Mobile | Flutter/Dart with native shaders |
| Hosting | Vercel |

## Architecture

```text
src/
├── components/                # Header, panels, modals and reusable UI
├── features/particle-engine/  # Renderer, geometry and GLSL shaders
├── hooks/                     # Input and interaction hooks
├── store/                     # Zustand state
├── styles/                    # Global and explicit layout styles
├── types/                     # Shared TypeScript models
├── utils/                     # Export and utility functions
├── App.tsx
└── main.tsx
```

## Stabilization plan

### Phase A — Repair the web app

1. Run complete build, lint, and type-check locally and in CI.
2. Make the layout stack explicit: canvas at the base layer, UI overlays above it with tested z-index values.
3. Split the root application into `EditorView` and `CleanCanvasView`.
4. Make Editor Mode the default and expose Clean Canvas as a deliberate control.
5. Resolve duplicate, unused, or inconsistent dependencies and imports.
6. Label mock gallery data clearly as demo data until source connectors exist.
7. Verify resource cleanup for `URL.createObjectURL`, image import, and screenshot generation.
8. Deploy a clean build to Vercel and confirm that Vercel is serving the latest commit.

### Phase B — Complete the editor

1. Finish image-to-particle geometry and image color sampling.
2. Persist presets locally and validate imported JSON files.
3. Add undo/redo, toast feedback, onboarding, accessible controls, and responsive behavior.
4. Implement genuine high-resolution export via a dedicated render pass instead of only scaling an existing canvas.
5. Add quality profiles: Battery, Balanced, and Performance.

### Phase C — Wallpaper browser

1. Add a full-width catalog/overlay for browsing wallpaper sources.
2. Implement allowed providers and public APIs per source.
3. Support custom source lists, filters, and local collections.
4. Present source, author, license, and resolution before downloading or applying an item.
5. Keep static, video, and live content as distinct categories.

### Phase D — Desktop application

1. Wrap the stable web editor in Electron.
2. Add tray controls, autostart, per-monitor settings, and performance profiles.
3. Implement Windows live-wallpaper support first.
4. Request and use global mouse tracking only while the user enables wallpaper interaction.
5. Pause/reduce rendering automatically for fullscreen apps, battery mode, and high GPU load.

### Phase E — Flutter/Dart

1. Share the preset JSON format.
2. Rebuild the mobile UI natively with Flutter.
3. Use Flutter/Impeller shader rendering rather than embedding the web interface.
4. Optimize for touch input, device capability, and battery life.

## Roadmap

### Phase 1 — Core visual engine

- [x] React, TypeScript, Vite, Three.js, React Three Fiber foundation
- [x] Core particle modes and controls
- [x] Basic mouse interaction and FPS display

### Phase 2 — Stable editor and creation tools

- [ ] Repair deployment UI and make Editor Mode visible by default
- [ ] Image-to-particle conversion
- [ ] Persistent presets and JSON validation
- [ ] Color tools and screenshot export verification
- [ ] Fullscreen, clean-canvas mode, responsive UI, and accessibility

### Phase 3 — Wallpaper browser

- [ ] Source list and provider connectors
- [ ] Authorized public-API integrations where available
- [ ] Advanced filtering, metadata, collections, and download handoff
- [ ] Static/video/live categorization

### Phase 4 — Desktop

- [ ] Electron wrapper
- [ ] Windows live wallpaper prototype
- [ ] Tray, autostart, multi-monitor, and quality profiles
- [ ] Installers for supported operating systems

### Phase 5 — Flutter/Dart

- [ ] Native mobile UI
- [ ] Shader-driven renderer
- [ ] Touch optimization and export/share flow

## Contributing

Before adding more experimental features, the immediate priority is a reliable build and an editor UI that is fully visible at startup. When reporting an issue, include a screenshot, browser, operating system, deployed commit/version, and any console error.

## License

MIT License.

---

Atomizer aims to be an elegant visual editor on the web, an immersive clean canvas for display, and eventually a responsive desktop application for interactive live wallpapers.