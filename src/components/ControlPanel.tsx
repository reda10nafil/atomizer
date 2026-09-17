import { motion } from 'motion/react'
import { useAtomizerStore } from '../store/useAtomizerStore'
import { Slider } from './ui/Slider'
import { ModeSelector } from './ModeSelector'
import { ColorPicker } from './ColorPicker'
import { ImageImport } from './ImageImport'
import { PresetManager } from './PresetManager'
import { WallpaperHub } from './WallpaperHub'
import { WallpaperScraper } from './WallpaperScraper'
import { useState } from 'react'
import { Settings, Palette, Image, FolderOpen, Monitor, Download } from 'lucide-react'

const tabs = [
  { id: 'modes', label: 'Modes', icon: Settings },
  { id: 'colors', label: 'Colors', icon: Palette },
  { id: 'image', label: 'Image', icon: Image },
  { id: 'presets', label: 'Presets', icon: FolderOpen },
  { id: 'hub', label: 'Hub', icon: Monitor },
  { id: 'scraper', label: 'Scraper', icon: Download },
]

export function ControlPanel() {
  const [activeTab, setActiveTab] = useState('modes')
  
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
      className="absolute left-0 top-20 bottom-20 w-80 z-10 flex flex-col"
    >
      {/* Tabs */}
      <div className="flex border-b border-white/10 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[60px] p-3 flex items-center justify-center gap-1 text-xs transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary/20 text-primary border-b-2 border-primary'
                  : 'hover:bg-white/5 text-muted-foreground'
              }`}
            >
              <Icon size={14} />
            </motion.button>
          )
        })}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'modes' && (
          <div className="p-4 space-y-6">
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
        )}

        {activeTab === 'colors' && <ColorPicker />}
        {activeTab === 'image' && <ImageImport />}
        {activeTab === 'presets' && <PresetManager />}
        {activeTab === 'hub' && <WallpaperHub />}
        {activeTab === 'scraper' && <WallpaperScraper />}
      </div>
    </motion.aside>
  )
}
