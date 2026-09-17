# Development Guide

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

This will start Vite's dev server at `http://localhost:3000` with hot module replacement (HMR).

### 3. Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

### 4. Preview Production Build

```bash
npm run preview
```

## Project Structure

```
atomizer/
├── src/
│   ├── components/        # React UI components
│   │   ├── Header.tsx    # Top navigation bar
│   │   ├── ControlPanel.tsx  # Left sidebar controls
│   │   ├── Stats.tsx     # Bottom-right FPS counter
│   │   ├── ModeSelector.tsx  # Mode selection grid
│   │   └── ui/           # Reusable UI components
│   │       └── Slider.tsx
│   │
│   ├── features/         # Feature-specific code
│   │   └── particle-engine/
│   │       ├── ParticleSystem.tsx  # Main Three.js component
│   │       └── shaders.ts          # GLSL vertex & fragment shaders
│   │
│   ├── hooks/            # Custom React hooks
│   │   └── useMouseTracking.ts
│   │
│   ├── store/            # Zustand state management
│   │   └── useAtomizerStore.ts
│   │
│   ├── styles/           # Global styles
│   │   └── index.css
│   │
│   ├── types/            # TypeScript type definitions
│   │   └── index.ts
│   │
│   ├── App.tsx           # Root component
│   └── main.tsx          # Entry point
│
├── index.html            # HTML template
├── package.json          # Dependencies & scripts
├── tsconfig.json         # TypeScript config
├── vite.config.ts        # Vite config
└── tailwind.config.js    # Tailwind config
```

## Adding New Modes

1. **Add mode to types** (`src/types/index.ts`):
   ```typescript
   export type ParticleMode = 
     | "existing-mode"
     | "new-mode"  // Add here
   ```

2. **Update mode map** in `ParticleSystem.tsx`:
   ```typescript
   const modeMap: Record<string, number> = {
     'existing-mode': 0,
     'new-mode': 14,  // Next number
   }
   ```

3. **Add mode selector** in `ModeSelector.tsx`:
   ```typescript
   { id: 'new-mode', label: 'New Mode', icon: '🎨' }
   ```

4. **Implement shader logic** in `shaders.ts` vertex shader:
   ```glsl
   } else if (uMode < 14.5) {
     // New mode animation
   }
   ```

## Adding New Controls

1. **Add to state** in `src/types/index.ts`:
   ```typescript
   export interface AtomizerState {
     newControl: number
   }
   ```

2. **Add default value** in `defaultState`:
   ```typescript
   newControl: 1.0,
   ```

3. **Add action** in `useAtomizerStore.ts`:
   ```typescript
   setNewControl: (value: number) => void
   
   // In the store:
   setNewControl: (value) => set({ newControl: value }),
   ```

4. **Add slider** in `ControlPanel.tsx`:
   ```tsx
   <Slider
     label="New Control"
     value={newControl}
     min={0}
     max={5}
     step={0.1}
     onChange={setNewControl}
   />
   ```

5. **Use in shader** via uniforms in `ParticleSystem.tsx`.

## Performance Tips

- Keep particle count reasonable for target devices
- Use GPU for all particle calculations
- Avoid CPU-GPU data transfer in the render loop
- Use `useMemo` for expensive computations
- Profile with Chrome DevTools Performance tab

## Common Issues

### Low FPS
- Reduce particle count
- Lower `dpr` in Canvas
- Simplify shader calculations

### Shader Compilation Errors
- Check browser console for GLSL errors
- Verify uniform names match between JS and GLSL
- Ensure all attributes are defined

### TypeScript Errors
- Run `npm run build` to see all type errors
- Check `tsconfig.json` settings

## Testing

```bash
# Lint code
npm run lint

# Type check
npx tsc --noEmit
```

## Deployment

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag dist/ folder to Netlify
```

### GitHub Pages
```bash
npm install -g gh-pages
npm run build
gh-pages -d dist
```

## Resources

- [Three.js Docs](https://threejs.org/docs/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)
- [GLSL Shaders](https://thebookofshaders.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Motion](https://motion.dev/)
