import { useEffect } from 'react'
import { motion } from 'motion/react'
import { useAtomizerStore } from '../store/useAtomizerStore'

export function Stats() {
  const { fps, particleCount, setFPS } = useAtomizerStore()

  useEffect(() => {
    let frameCount = 0
    let lastTime = performance.now()

    const measureFPS = () => {
      frameCount++
      const now = performance.now()
      const delta = now - lastTime

      if (delta >= 1000) {
        setFPS(frameCount)
        frameCount = 0
        lastTime = now
      }

      requestAnimationFrame(measureFPS)
    }

    measureFPS()
  }, [setFPS])

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
      className="absolute bottom-4 right-4 z-10"
    >
      <div className="glass rounded-lg px-4 py-2 text-xs space-y-1">
        <div className="flex gap-4">
          <span>
            <span className="text-muted-foreground">FPS: </span>
            <span className="font-mono">{fps}</span>
          </span>
          <span>
            <span className="text-muted-foreground">Particles: </span>
            <span className="font-mono">{(particleCount / 1000).toFixed(0)}k</span>
          </span>
        </div>
      </div>
    </motion.div>
  )
}
