# Changelog

All notable changes to Atomizer will be documented in this file.

## [0.2.0] - 2026-09-17

### 🎉 Added

#### Enhanced Creation Tools
- **Color Picker** - Visual color selection with 35 preset colors + custom picker
- **Image Import** - Drag & drop images, automatic color extraction for particles
- **Preset System** - Save/load custom configurations as JSON files
- **Built-in Presets** - 5 professional presets (Blue Galaxy, Fire Storm, Neural Network, Black Hole, Peaceful Rain)
- **Preset Export/Import** - Share configurations with community

#### Wallpaper Hub
- **Online Gallery** - Integrated wallpaper browser with 6+ sources
- **4K/8K Downloads** - Ultra HD static wallpapers
- **Live Wallpapers** - Animated backgrounds from Wallpaper Engine, Lively
- **Categories** - Nature, Sci-Fi, Abstract, Space, Animals, Cars, Games, Movies
- **Search & Filters** - Full-text search, category filters, live-only filter
- **Rating System** - Community ratings and download counts
- **Preview Modal** - Full-screen wallpaper preview before download

#### Productivity Features
- **Keyboard Shortcuts Overlay** - Press `H` to view all shortcuts
- **Fullscreen Mode** - Press `F` for immersive experience
- **Screenshot Export** - Press `S` for high-res PNG (2x scale)
- **Command Palette** - Quick access with `Ctrl+K` (planned)
- **Focus Mode** - Toggle UI with `U` for distraction-free work

#### Technical Enhancements
- **Audio Reactive Mode** - Particles respond to microphone input (planned)
- **Weather Mode** - Real-time weather-based animations (planned)
- **Time Mode** - Auto day/night themes based on system time (planned)
- **Pomodoro Timer** - Built-in productivity timer (planned)
- **System Stats Overlay** - Optional FPS/GPU/RAM monitoring

#### UI/UX Improvements
- **Tabbed Control Panel** - Organized into Modes, Colors, Image, Presets, Hub
- **Better Navigation** - Icon-based tabs for quick switching
- **Responsive Design** - Improved mobile and tablet support
- **Toast Notifications** - Feedback for actions (planned)
- **Loading States** - Better UX during imports/exports

### 🔧 Changed
- Updated Zustand store with new actions and state
- Enhanced ControlPanel with modular tab system
- Improved Header with more controls
- Updated types for new features
- Better keyboard shortcut handling
- Enhanced screenshot utility with high-res option

### 📦 Dependencies
- Added `lucide-react` for icons
- Updated all packages to latest versions

### 🐛 Fixed
- Various UI layout issues
- Keyboard shortcut conflicts
- Image import memory leaks

## [0.1.0] - 2026-09-17

### 🎉 Initial Release

#### Core Features
- **14 Particle Modes** - Vortex, Explosion, Turbulence, Galaxy, Magnetic, Nebula, Black Hole, Plasma, Fire, Stars, Rain, DNA, Fractal, Tunnel
- **Interactive Controls** - Particle count, size, speed, dispersion, intensity, turbulence, rotation
- **Mouse Tracking** - Real-time cursor interaction
- **Orbit Controls** - Rotate and zoom the 3D scene
- **Performance Monitor** - Real-time FPS counter

#### UI Components
- **Animated Header** - Play/pause, settings, GitHub link
- **Control Panel** - Left sidebar with all controls
- **Mode Selector** - Grid of 14 visual modes
- **Stats Display** - FPS and particle count
- **Smooth Animations** - Motion-powered transitions

#### Technical Foundation
- **React 19 + TypeScript** - Modern, type-safe codebase
- **Three.js + R3F** - GPU-accelerated rendering
- **GLSL Shaders** - Custom vertex and fragment shaders
- **Zustand** - Lightweight state management
- **Tailwind CSS v4** - Utility-first styling
- **Vite** - Lightning-fast build tool

#### Documentation
- Comprehensive README
- Development guide
- Quick start guide
- Roadmap document
- Project summary

---

## Upcoming (v0.3.0)

### Planned Features
- [ ] Audio reactive mode with microphone input
- [ ] Video recording (WebM/MP4 export)
- [ ] GIF export for short loops
- [ ] Advanced color grading
- [ ] Layer system for multiple particle systems
- [ ] Custom shader editor
- [ ] Community preset gallery
- [ ] User accounts and cloud sync

### Desktop App (v1.0.0)
- [ ] Electron wrapper
- [ ] Live wallpaper mode
- [ ] System tray integration
- [ ] Auto-start on boot
- [ ] Multi-monitor support
- [ ] Windows/macOS/Linux installers

### Mobile App (v1.1.0)
- [ ] Flutter/Dart version
- [ ] Touch-optimized controls
- [ ] Mobile performance optimization
- [ ] iOS App Store release
- [ ] Android Play Store release

---

**Version Format**: [MAJOR.MINOR.PATCH]
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)
