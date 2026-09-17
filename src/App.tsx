import { useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei'
import { motion, AnimatePresence } from 'motion/react'
import { useAtomizerStore } from './store/useAtomizerStore'
import { ParticleSystem } from './features/particle-engine/ParticleSystem'
import { ControlPanel } from './components/ControlPanel'
import { Header } from './components/Header'
import { Stats } from './components/Stats'
import { useMouseTracking } from './hooks/useMouseTracking'
import { KeyboardShortcuts } from './components/KeyboardShortcuts'

function App() {
  const { backgroundColor, showUI, showShortcuts } = useAtomizerStore()
  useMouseTracking()

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in inputs
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

      switch (e.code) {
        case 'Space':
          e.preventDefault()
          useAtomizerStore.getState().togglePlay()
          break
        case 'KeyR':
          useAtomizerStore.getState().reset()
          break
        case 'KeyF':
          useAtomizerStore.getState().toggleFullscreen()
          break
        case 'KeyS':
          if (!e.ctrlKey && !e.shiftKey) {
            const canvas = document.querySelector('canvas')
            if (canvas) {
              import('./utils/screenshot').then(({ takeHighResScreenshot }) => {
                takeHighResScreenshot(canvas as HTMLCanvasElement, 2, 'atomizer-screenshot.png')
              })
            }
          }
          break
        case 'KeyH':
          useAtomizerStore.getState().toggleShortcuts()
          break
        case 'KeyU':
          useAtomizerStore.getState().toggleUI()
          break
        case 'Escape':
          if (showShortcuts) {
            useAtomizerStore.getState().toggleShortcuts()
          }
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [showShortcuts])

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Canvas 3D */}
      <div className="absolute inset-0">
        <Canvas
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: false }}
          camera={{ position: [0, 0, 5], fov: 60 }}
        >
          <color attach="background" args={[backgroundColor]} />
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={60} />
          <ParticleSystem />
          <OrbitControls 
            enableZoom={true}
            enablePan={false}
            minDistance={2}
            maxDistance={10}
          />
          <Environment preset="night" />
        </Canvas>
      </div>

      {/* UI Overlay */}
      {showUI && (
        <>
          <Header />
          <ControlPanel />
          <Stats />
        </>
      )}

      {/* Modals */}
      <AnimatePresence>
        <KeyboardShortcuts />
      </AnimatePresence>
    </div>
  )
}

export default App
