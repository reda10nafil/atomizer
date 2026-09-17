import { motion } from 'motion/react'
import { useAtomizerStore } from '../store/useAtomizerStore'
import { Slider } from './ui/Slider'
import { ModeSelector } from './ModeSelector'

export function ControlPanel() {
  const {
    particleCount,
    particleSize,
    animationSpeed,
    dispersionSpeed,
    intensity,
    turbulence,
    rotation,
    mouseInfluence,
    setParticleCount,
    setParticleSize,
    setAnimationSpeed,
    setDispersionSpeed,
    setIntensity,
    setTurbulence,
    setRotation,
    setMouseInfluence,
  } = useAtomizerStore()

  return (
    <motion.aside
      initial={{ x: -400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
      className="absolute left-0 top-20 bottom-20 w-80 z-10 p-4 overflow-y-auto"
    >
      <div className="glass rounded-xl p-4 space-y-6">
        <ModeSelector />

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground">Particles</h3>
          
          <Slider
            label="Count"
            value={particleCount}
            min={10000}
            max={500000}
            step={10000}
            onChange={setParticleCount}
            formatValue={(v) => (v / 1000).toFixed(0) + 'k'}
          />

          <Slider
            label="Size"
            value={particleSize}
            min={0.5}
            max={5}
            step={0.1}
            onChange={setParticleSize}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground">Animation</h3>
          
          <Slider
            label="Speed"
            value={animationSpeed}
            min={0}
            max={3}
            step={0.1}
            onChange={setAnimationSpeed}
          />

          <Slider
            label="Dispersion"
            value={dispersionSpeed}
            min={0}
            max={5}
            step={0.1}
            onChange={setDispersionSpeed}
          />

          <Slider
            label="Intensity"
            value={intensity}
            min={0}
            max={1}
            step={0.05}
            onChange={setIntensity}
          />

          <Slider
            label="Turbulence"
            value={turbulence}
            min={0}
            max={1}
            step={0.05}
            onChange={setTurbulence}
          />

          <Slider
            label="Rotation"
            value={rotation}
            min={-3}
            max={3}
            step={0.1}
            onChange={setRotation}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground">Mouse</h3>
          
          <Slider
            label="Influence"
            value={mouseInfluence}
            min={0}
            max={1}
            step={0.05}
            onChange={setMouseInfluence}
          />
        </div>
      </div>
    </motion.aside>
  )
}
