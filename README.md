# Atomizer 🌀

**Interactive Particle Engine & Live Wallpaper Creator**

Create stunning interactive particle animations with real-time GPU acceleration. Built with React, TypeScript, Three.js, GLSL shaders, and Motion.

![Atomizer](https://img.shields.io/badge/version-0.1.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

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

### Controls
- **Particle Count**: 10k - 500k particles
- **Particle Size**: Adjust individual particle size
- **Animation Speed**: Control time scaling
- **Dispersion**: Radial expansion/contraction
- **Intensity**: Overall effect strength
- **Turbulence**: Noise-based movement
- **Rotation**: Spin direction and speed
- **Mouse Influence**: Interactive cursor effects

### Performance
- GPU-accelerated rendering
- Adaptive quality based on FPS
- Real-time FPS monitoring
- Optimized for 60+ FPS

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/reda10nafil/atomizer.git
cd atomizer

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview
```

## 🎮 Usage

### Basic Controls
1. **Select a mode** from the left panel
2. **Adjust sliders** to customize the effect
3. **Move your mouse** to interact with particles
4. **Click and drag** to rotate the view
5. **Scroll** to zoom in/out

### Keyboard Shortcuts
- `Space`: Play/Pause
- `R`: Reset to defaults
- `H`: Toggle UI visibility

## 🏗️ Architecture

```
src/
├── components/          # UI components
│   ├── Header.tsx
│   ├── ControlPanel.tsx
│   ├── Stats.tsx
│   ├── ModeSelector.tsx
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
├── styles/
│   └── index.css
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
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Useful Three.js helpers
- **Motion** - UI animations
- **Zustand** - State management
- **Tailwind CSS v4** - Styling

## 📱 Roadmap

### Phase 1 - Core (Current)
- ✅ Basic particle system
- ✅ 14 visual modes
- ✅ Interactive controls
- ✅ Mouse tracking
- ✅ Performance monitoring

### Phase 2 - Enhanced Features
- [ ] Image import & particle conversion
- [ ] Color picker
- [ ] Preset system (save/load JSON)
- [ ] Screenshot export
- [ ] Fullscreen mode
- [ ] Video recording

### Phase 3 - Desktop App
- [ ] Electron wrapper
- [ ] Live wallpaper mode
- [ ] System tray integration
- [ ] Auto-start on boot
- [ ] Multi-monitor support
- [ ] Windows/macOS/Linux builds

### Phase 4 - Mobile
- [ ] Flutter/Dart version
- [ ] Touch-optimized controls
- [ ] Mobile performance optimization
- [ ] iOS/Android apps

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Three.js](https://threejs.org/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)
- [React Three Drei](https://github.com/pmndrs/drei)
- [Motion](https://motion.dev/)
- [Zustand](https://zustand-demo.pmnd.rs/)

## 📬 Contact

- **GitHub**: [@reda10nafil](https://github.com/reda10nafil)
- **Repository**: [github.com/reda10nafil/atomizer](https://github.com/reda10nafil/atomizer)

---

Built with ❤️ using React, Three.js, and GLSL shaders
