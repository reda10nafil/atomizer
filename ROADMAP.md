# Atomizer Roadmap

## Phase 1 - Core ✅ (COMPLETED)

### Completed Features
- ✅ React + TypeScript + Vite setup
- ✅ Three.js + React Three Fiber integration
- ✅ 14 particle animation modes
- ✅ Interactive controls (sliders, mode selector)
- ✅ Mouse tracking and influence
- ✅ Performance monitoring (FPS counter)
- ✅ Responsive UI with Motion animations
- ✅ Zustand state management
- ✅ Tailwind CSS styling
- ✅ GitHub repository setup

### Current Limitations
- No image import
- No preset system
- No color picker
- No screenshot/export
- No fullscreen mode
- No desktop app

---

## Phase 2 - Enhanced Web Features (NEXT)

### Priority 1 - Image Import
- [ ] Add file input for image upload
- [ ] Load image as texture
- [ ] Sample image colors for particle colors
- [ ] Convert image to particle point cloud
- [ ] Maintain aspect ratio
- [ ] Support common formats (PNG, JPG, WebP)
- [ ] Image preview in UI
- [ ] Reset particles to sphere option

### Priority 2 - Preset System
- [ ] Save current settings as JSON preset
- [ ] Load preset from JSON file
- [ ] Built-in preset library (10+ presets)
- [ ] Preset thumbnails/screenshots
- [ ] Share presets via URL parameters
- [ ] Import/export presets
- [ ] Community preset gallery (future)

### Priority 3 - Color Controls
- [ ] Color picker for primary color
- [ ] Color picker for secondary color
- [ ] Color picker for background
- [ ] Gradient preview
- [ ] Color palette presets
- [ ] Randomize colors button
- [ ] Sync with image dominant colors

### Priority 4 - Export & Sharing
- [ ] Screenshot button (PNG, high-res)
- [ ] Video recording (WebM, MP4)
- [ ] GIF export (short loops)
- [ ] Fullscreen toggle
- [ ] Hide UI for clean screenshots
- [ ] Custom resolution export
- [ ] Social media share buttons

### Priority 5 - Additional Modes
- [ ] Audio reactive (microphone input)
- [ ] Waveform visualization
- [ ] Clock/time-based animations
- [ ] Weather-based effects
- [ ] Mathematical patterns (Lissajous, etc.)
- [ ] Cellular automata
- [ ] Flow fields

### Priority 6 - UI/UX Improvements
- [ ] Settings panel (advanced options)
- [ ] Keyboard shortcuts overlay
- [ ] Tutorial/tooltips for first-time users
- [ ] Undo/Redo system
- [ ] History of recent changes
- [ ] Search/filter modes
- [ ] Favorites system
- [ ] Dark/Light theme toggle

### Estimated Time: 2-3 weeks

---

## Phase 3 - Desktop App (Electron)

### Core Desktop Features
- [ ] Electron wrapper setup
- [ ] Main process configuration
- [ ] Renderer process (web app)
- [ ] Preload script for IPC
- [ ] Window management (borderless, fullscreen)
- [ ] System tray integration
- [ ] Auto-start on boot
- [ ] Single instance enforcement

### Live Wallpaper Mode
- [ ] Detect desktop environment (Windows/macOS/Linux)
- [ ] Create worker window behind desktop icons
- [ ] Windows: Use `SetParent` to attach to WorkerW/Progman
- [ ] macOS: Use desktop picture API or third-party lib
- [ ] Linux: Support GNOME, KDE, XFCE wallpapers
- [ ] Pause when fullscreen app detected
- [ ] Pause when battery low
- [ ] Performance profiles (Gaming, Battery, Balanced)

### Desktop-Specific Features
- [ ] Multi-monitor support
- [ ] Different wallpaper per monitor
- [ ] Monitor detection and hot-plug
- [ ] DPI scaling awareness
- [ ] Native file dialogs
- [ ] Auto-update mechanism
- [ ] Crash reporting
- [ ] Native notifications

### Installer & Distribution
- [ ] Windows: NSIS or MSI installer
- [ ] macOS: DMG with app signing
- [ ] Linux: AppImage, DEB, RPM
- [ ] Auto-updater (electron-updater)
- [ ] Code signing certificates
- [ ] Notarization for macOS
- [ ] Distribution via website
- [ ] Optional: Steam, Microsoft Store

### Estimated Time: 3-4 weeks

---

## Phase 4 - Mobile App (Flutter)

### Core Flutter App
- [ ] Flutter project setup
- [ ] Shared JSON preset format
- [ ] UI recreation with Flutter widgets
- [ ] Custom painter or shader implementation
- [ ] Touch gesture support
- [ ] Performance optimization for mobile
- [ ] Adaptive layout (phone/tablet)

### Mobile Features
- [ ] Image picker (camera & gallery)
- [ ] Save to gallery
- [ ] Share to social media
- [ ] Haptic feedback
- [ ] Orientation support (portrait/landscape)
- [ ] Offline support
- [ ] Low-power mode

### Platform-Specific
- [ ] iOS: App Store submission
- [ ] Android: Play Store submission
- [ ] iPad optimization
- [ ] Android tablet optimization
- [ ] Widget support (iOS/Android)
- [ ] Live wallpaper (Android)
- [ ] Dynamic Island (iOS, future)

### Estimated Time: 3-4 weeks

---

## Phase 5 - Advanced Features

### AI Integration
- [ ] AI preset generator (text-to-preset)
- [ ] Style transfer from images
- [ ] Automatic color palette extraction
- [ ] Smart mode recommendations
- [ ] AI upscaling for exports

### Collaboration & Community
- [ ] User accounts (optional)
- [ ] Cloud preset sync
- [ ] Community gallery
- [ ] Like/comment on presets
- [ ] Follow creators
- [ ] Trending presets
- [ ] Daily challenges

### Pro Features (Monetization)
- [ ] Atomizer Pro tier
- [ ] 4K/8K export
- [ ] Unlimited video length
- [ ] Advanced modes
- [ ] Priority support
- [ ] Commercial license
- [ ] Team features

### Estimated Time: 4-6 weeks

---

## Phase 6 - Desktop 2.0 (Enhanced)

### Advanced Desktop Features
- [ ] Plugin system for custom modes
- [ ] Scripting API (JavaScript/TypeScript)
- [ ] Integration with Wallpaper Engine
- [ ] Steam Workshop support
- [ ] Discord Rich Presence
- [ ] OBS plugin for streaming
- [ ] Spotify integration (audio reactive)
- [ ] System stats overlay (optional)

### Performance
- [ ] Vulkan/Metal backend option
- [ ] DLSS/FSR support
- [ ] Advanced GPU detection
- [ ] Automatic quality adjustment
- [ ] Background rendering optimization

### Estimated Time: 2-3 weeks

---

## Long-term Vision

### Atomizer Ecosystem
- Cross-platform particle engine
- Web, Desktop, Mobile parity
- Plugin marketplace
- Community-driven content
- Educational resources
- API for developers
- Integration with design tools

### Potential Integrations
- Figma plugin
- After Effects plugin
- Blender addon
- Unity package
- Unreal Engine plugin
- TouchDesigner component

---

## Technical Debt & Improvements

### Code Quality
- [ ] Add comprehensive tests (Vitest, React Testing Library)
- [ ] E2E tests (Playwright)
- [ ] Accessibility audit (WCAG 2.1)
- [ ] Performance profiling and optimization
- [ ] Bundle size optimization
- [ ] Tree shaking improvements
- [ ] Code splitting
- [ ] Lazy loading

### Documentation
- [ ] API documentation
- [ ] Contributing guidelines
- [ ] Code of conduct
- [ ] Security policy
- [ ] Changelog
- [ ] Migration guides
- [ ] Video tutorials

### DevOps
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Automated testing
- [ ] Automated deployments
- [ ] Error tracking (Sentry)
- [ ] Analytics (privacy-focused)
- [ ] Performance monitoring
- [ ] A/B testing framework

---

## Success Metrics

### User Metrics
- Daily Active Users (DAU)
- Monthly Active Users (MAU)
- Retention rate (D1, D7, D30)
- Session duration
- Presets created per user
- Exports per user

### Technical Metrics
- Average FPS (target: 60+)
- Load time (target: <3s)
- Bundle size (target: <500KB gzipped)
- Crash rate (target: <0.1%)
- Error rate (target: <1%)

### Business Metrics
- GitHub stars
- NPM downloads
- Desktop app downloads
- Mobile app installs
- Pro conversions (future)
- Revenue (future)

---

## Next Steps (Immediate)

1. **Test current web app** - Verify all modes work correctly
2. **Fix any bugs** - Address issues found during testing
3. **Add image import** - Phase 2, Priority 1
4. **Add preset system** - Phase 2, Priority 2
5. **Design desktop architecture** - Plan Electron implementation
6. **Gather feedback** - Share with users, collect input

---

**Last Updated:** September 2026
**Version:** 1.0.0
