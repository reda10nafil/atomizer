import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei'
import { motion } from 'motion/react'
import { useAtomizerStore } from './store/useAtomizerStore'
import { ParticleSystem } from './features/particle-engine/ParticleSystem'
import { ControlPanel } from './components/ControlPanel'
import { Header } from './components/Header'
import { Stats } from './components/Stats'

function App() {
  const { backgroundColor, showUI } = useAtomizerStore()

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
    </div>
  )
}

export default App
