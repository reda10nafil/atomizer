# Atomizer 🌀

**Interactive Particle Engine & Live Wallpaper Creator**

Create stunning interactive particle animations with real-time GPU acceleration. Built with React, TypeScript, Three.js, GLSL shaders, and Motion.

![Version](https://img.shields.io/badge/version-0.2.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ New Features v0.2.0

### 🎨 Enhanced Creation Tools
- **Color Picker** - Visual color selection with presets
- **Image Import** - Drag & drop images, convert to particles
- **Preset System** - Save/load custom configurations as JSON
- **Built-in Presets** - 5 professional presets included
- **Screenshot Export** - High-resolution PNG export (up to 4K)

### 🖼️ Wallpaper Hub
- **Online Gallery** - Browse 1000s of wallpapers
- **4K/8K Downloads** - Ultra HD static wallpapers
- **Live Wallpapers** - Animated backgrounds from Wallpaper Engine
- **Categories** - Nature, Sci-Fi, Abstract, Space, and more
- **Rating System** - Community-rated content
- **Search & Filters** - Find exactly what you want

### ⌨️ Productivity
- **Keyboard Shortcuts** - Full keyboard control
- **Command Palette** - Quick access (Ctrl+K)
- **Fullscreen Mode** - Immersive experience
- **Focus Mode** - Minimal UI for distraction-free work

### 🔧 Technical
- **Audio Reactive** - Particles respond to music/microphone
- **Weather Mode** - Real-time weather-based animations
- **Time Mode** - Auto day/night themes
- **Pomodoro Timer** - Built-in productivity timer
- **System Stats** - Optional FPS/GPU monitoring

## 🎮 Quick Start

```bash
# Clone
git clone https://github.com/reda10nafil/atomizer.git
cd atomizer

# Install
npm install

# Run
npm run dev
```

Visit `http://localhost:3000`

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` | Play/Pause |
| `R` | Reset |
| `F` | Fullscreen |
| `S` | Screenshot |
| `H` | Show shortcuts |
| `U` | Toggle UI |
| `1-9` | Switch mode |
| `+/-` | Particle count |
| `Ctrl+K` | Command palette |
| `Ctrl+S` | Save preset |

## 🎨 Features

### Visual Modes (14+)
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
- 🎵 Audio Reactive (NEW)
- 🌤️ Weather-based (NEW)
- 🕐 Clock/Time (NEW)

### Creation Tools
- **Particle Controls**: Count (10k-500k), Size, Speed, Dispersion, Intensity, Turbulence, Rotation
- **Color System**: Primary, Secondary, Background with visual picker
- **Image Import**: Drag & drop, auto color extraction
- **Preset Manager**: Save, load, export, import JSON presets
- **Wallpaper Hub**: Online gallery with 4K/8K downloads

### Interactivity
- **Mouse Tracking**: Real-time particle response
- **Orbit Controls**: Rotate, zoom, pan
- **Audio Input**: Microphone reactive mode
- **Touch Support**: Mobile and tablet optimized

### Export & Share
- **Screenshots**: PNG up to 4K resolution
- **Presets**: JSON export/import
- **Fullscreen**: Immersive mode
- **Recording**: Video export (coming soon)

## 🏗️ Architecture

```
src/
├── components/          # UI components
│   ├── Header.tsx
│   ├── ControlPanel.tsx
│   ├── Stats.tsx
│   ├── ModeSelector.tsx
│   ├── ColorPicker.tsx
│   ├── ImageImport.tsx
│   ├── PresetManager.tsx
│   ├── WallpaperHub.tsx
│   ├── KeyboardShortcuts.tsx
│   └── ui/
│       └── Slider.tsx
├── features/
│   └── particle-engine/
│       ├── ParticleSystem.tsx
│       └── shaders.ts
├── hooks/
│   └── useMouseTracking.ts
├── store/
│   └── useAtomizerStore.ts
├── utils/
│   └── screenshot.ts
├── types/
│   └── index.ts
├── App.tsx
└── main.tsx
```

## 🛠️ Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Three.js** - 3D graphics
- **React Three Fiber** - React renderer
- **React Three Drei** - Three.js helpers
- **Motion** - UI animations
- **Zustand** - State management
- **Tailwind CSS v4** - Styling

## 📱 Roadmap

### Phase 1 - Core ✅ (DONE)
- ✅ Basic particle system
- ✅ 14+ visual modes
- ✅ Interactive controls
- ✅ Mouse tracking
- ✅ Performance monitoring

### Phase 2 - Enhanced Web ✅ (DONE)
- ✅ Image import & particle conversion
- ✅ Color picker UI
- ✅ Preset system (save/load JSON)
- ✅ Screenshot export
- ✅ Fullscreen mode
- ✅ Keyboard shortcuts
- ✅ Wallpaper Hub integration

### Phase 3 - Desktop App (NEXT)
- [ ] Electron wrapper
- [ ] Live wallpaper mode
- [ ] System tray integration
- [ ] Auto-start on boot
- [ ] Multi-monitor support
- [ ] Windows/macOS/Linux builds
- [ ] Wallpaper Engine integration

### Phase 4 - Mobile
- [ ] Flutter/Dart version
- [ ] Touch-optimized controls
- [ ] Mobile performance optimization
- [ ] iOS/Android apps
- [ ] Live wallpaper (Android)

## 🎯 Usage Tips

### Best Practices
1. Start with lower particle counts (100k) for better performance
2. Use preset system to save your favorite configurations
3. Try image import for unique color palettes
4. Browse Wallpaper Hub for inspiration
5. Use fullscreen mode for immersive experience
6. Take screenshots with `S` key for sharing

### Performance
- **Low-end GPU**: Use 50k-100k particles
- **Mid-range GPU**: Use 150k-250k particles
- **High-end GPU**: Use 300k-500k particles
- **Integrated graphics**: Stick to simpler modes (Vortex, Rain)

### Creative Ideas
- Import album covers for music visualizations
- Create branded color schemes for projects
- Use weather mode for ambient backgrounds
- Combine presets for unique effects
- Export presets to share with community

## 🤝 Contributing

Contributions welcome! See [DEVELOPMENT.md](./DEVELOPMENT.md)

## 📄 License

MIT License - See LICENSE file

## 🙏 Acknowledgments

- [Three.js](https://threejs.org/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)
- [Wallpaper Abyss](https://www.alphacoders.com/)
- [Wallpaper Engine](https://store.steampowered.com/app/431960/)
- [Lively Wallpaper](https://github.com/rocksdanister/lively)

## 📬 Contact

- **GitHub**: [@reda10nafil](https://github.com/reda10nafil)
- **Repository**: [github.com/reda10nafil/atomizer](https://github.com/reda10nafil/atomizer)
- **Issues**: [Report bugs](https://github.com/reda10nafil/atomizer/issues)

---

**Built with ❤️** using React, Three.js, and GLSL shaders

**v0.2.0** - September 2026
