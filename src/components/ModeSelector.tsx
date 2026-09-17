import { motion } from 'motion/react'
import { useAtomizerStore } from '../store/useAtomizerStore'
import { ParticleMode } from '../types'

const modes: { id: ParticleMode; label: string; icon: string }[] = [
  { id: 'spherical-vortex', label: 'Vortex', icon: '🌀' },
  { id: 'radial-explosion', label: 'Explosion', icon: '💥' },
  { id: 'turbulence', label: 'Turbulence', icon: '🌊' },
  { id: 'galaxy', label: 'Galaxy', icon: '🌌' },
  { id: 'magnetic', label: 'Magnetic', icon: '🧲' },
  { id: 'nebula', label: 'Nebula', icon: '☁️' },
  { id: 'black-hole', label: 'Black Hole', icon: '⚫' },
  { id: 'plasma', label: 'Plasma', icon: '⚡' },
  { id: 'fire', label: 'Fire', icon: '🔥' },
  { id: 'stars', label: 'Stars', icon: '✨' },
  { id: 'rain', label: 'Rain', icon: '🌧️' },
  { id: 'dna', label: 'DNA', icon: '🧬' },
  { id: 'fractal', label: 'Fractal', icon: '🔷' },
  { id: 'tunnel', label: 'Tunnel', icon: '🕳️' },
]

export function ModeSelector() {
  const { mode, setMode } = useAtomizerStore()

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-muted-foreground">Mode</h3>
      
      <div className="grid grid-cols-2 gap-2">
        {modes.map((m) => (
          <motion.button
            key={m.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setMode(m.id)}
            className={`
              p-2 rounded-lg text-xs font-medium transition-all
              ${mode === m.id 
                ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white' 
                : 'glass hover:bg-white/10 text-muted-foreground'
              }
            `}
          >
            <span className="mr-1">{m.icon}</span>
            {m.label}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
