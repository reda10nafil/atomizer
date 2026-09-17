import { useState } from 'react'
import { motion } from 'motion/react'
import { Save, FolderOpen, Download, Upload, Star } from 'lucide-react'
import { useAtomizerStore } from '../store/useAtomizerStore'
import { Preset } from '../types'

const builtinPresets: Preset[] = [
  {
    id: '1',
    name: 'Blue Galaxy',
    particleCount: 250000,
    particleSize: 1.8,
    animationSpeed: 0.8,
    dispersionSpeed: 1.2,
    intensity: 0.75,
    turbulence: 0.35,
    rotation: 1.1,
    mode: 'galaxy',
    primaryColor: '#00a8ff',
    secondaryColor: '#00d2ff',
    backgroundColor: '#0a0a0f',
    mouseInfluence: 0.6,
    audioEnabled: false,
    audioSensitivity: 0.5,
  },
  {
    id: '2',
    name: 'Fire Storm',
    particleCount: 300000,
    particleSize: 2.0,
    animationSpeed: 1.5,
    dispersionSpeed: 2.0,
    intensity: 0.9,
    turbulence: 0.7,
    rotation: -0.5,
    mode: 'fire',
    primaryColor: '#ff6b6b',
    secondaryColor: '#fcc419',
    backgroundColor: '#1a0a0a',
    mouseInfluence: 0.8,
    audioEnabled: false,
    audioSensitivity: 0.5,
  },
  {
    id: '3',
    name: 'Neural Network',
    particleCount: 200000,
    particleSize: 1.2,
    animationSpeed: 0.6,
    dispersionSpeed: 0.8,
    intensity: 0.6,
    turbulence: 0.2,
    rotation: 0.3,
    mode: 'dna',
    primaryColor: '#51cf66',
    secondaryColor: '#00d2ff',
    backgroundColor: '#0a1a0f',
    mouseInfluence: 0.4,
    audioEnabled: false,
    audioSensitivity: 0.5,
  },
  {
    id: '4',
    name: 'Black Hole',
    particleCount: 400000,
    particleSize: 1.5,
    animationSpeed: 1.2,
    dispersionSpeed: 1.5,
    intensity: 0.85,
    turbulence: 0.5,
    rotation: 2.0,
    mode: 'black-hole',
    primaryColor: '#ffffff',
    secondaryColor: '#da77f2',
    backgroundColor: '#000000',
    mouseInfluence: 0.9,
    audioEnabled: false,
    audioSensitivity: 0.5,
  },
  {
    id: '5',
    name: 'Peaceful Rain',
    particleCount: 150000,
    particleSize: 1.0,
    animationSpeed: 0.5,
    dispersionSpeed: 1.0,
    intensity: 0.5,
    turbulence: 0.1,
    rotation: 0,
    mode: 'rain',
    primaryColor: '#74c0fc',
    secondaryColor: '#a5d8ff',
    backgroundColor: '#1a2a3a',
    mouseInfluence: 0.3,
    audioEnabled: false,
    audioSensitivity: 0.5,
  },
]

export function PresetManager() {
  const { loadPreset, savePreset, exportPreset, importPreset } = useAtomizerStore()
  const [presetName, setPresetName] = useState('')
  const fileInputRef = useState<HTMLInputElement | null>(null)

  const handleSave = () => {
    if (presetName.trim()) {
      savePreset(presetName)
      setPresetName('')
    }
  }

  const handleExport = () => {
    const json = exportPreset()
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'atomizer-preset.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const json = event.target?.result as string
        importPreset(json)
      }
      reader.readAsText(file)
    }
  }

  return (
    <div className="p-4 space-y-4">
      <h3 className="text-sm font-semibold">Presets</h3>

      {/* Built-in Presets */}
      <div className="space-y-2">
        <h4 className="text-xs text-muted-foreground">Built-in</h4>
        <div className="grid grid-cols-2 gap-2">
          {builtinPresets.map((preset) => (
            <motion.button
              key={preset.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => loadPreset(preset)}
              className="p-3 glass rounded-lg text-left hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-2 mb-1">
                <Star size={12} className="text-yellow-400" />
                <span className="text-sm font-medium">{preset.name}</span>
              </div>
              <div className="text-xs text-muted-foreground">
                {(preset.particleCount / 1000).toFixed(0)}k particles • {preset.mode}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Save Preset */}
      <div className="space-y-2">
        <h4 className="text-xs text-muted-foreground">Save Custom</h4>
        <div className="flex gap-2">
          <input
            type="text"
            value={presetName}
            onChange={(e) => setPresetName(e.target.value)}
            placeholder="Preset name..."
            className="flex-1 px-3 py-2 glass rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            className="p-2 glass rounded hover:bg-white/10"
          >
            <Save size={18} />
          </motion.button>
        </div>
      </div>

      {/* Import/Export */}
      <div className="flex gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleExport}
          className="flex-1 p-3 glass rounded-lg flex items-center justify-center gap-2 hover:bg-white/10"
        >
          <Download size={18} />
          <span className="text-sm">Export</span>
        </motion.button>
        
        <label className="flex-1 p-3 glass rounded-lg flex items-center justify-center gap-2 hover:bg-white/10 cursor-pointer">
          <Upload size={18} />
          <span className="text-sm">Import</span>
          <input
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
          />
        </label>
      </div>
    </div>
  )
}
