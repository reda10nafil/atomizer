import { create } from 'zustand'
import { AtomizerState, defaultState, ParticleMode, Preset } from '../types'

interface AtomizerActions {
  setParticleCount: (count: number) => void
  setParticleSize: (size: number) => void
  setAnimationSpeed: (speed: number) => void
  setDispersionSpeed: (speed: number) => void
  setIntensity: (intensity: number) => void
  setTurbulence: (turbulence: number) => void
  setRotation: (rotation: number) => void
  setMode: (mode: ParticleMode) => void
  togglePlay: () => void
  setProgress: (progress: number) => void
  setMousePosition: (x: number, y: number) => void
  setMouseInfluence: (influence: number) => void
  setPrimaryColor: (color: string) => void
  setSecondaryColor: (color: string) => void
  setBackgroundColor: (color: string) => void
  toggleUI: () => void
  setFPS: (fps: number) => void
  reset: () => void
  loadPreset: (preset: Partial<AtomizerState>) => void
  toggleFullscreen: () => void
  toggleShortcuts: () => void
  toggleAudio: () => void
  setAudioSensitivity: (sensitivity: number) => void
  toggleStats: () => void
  setWeatherMode: (mode: 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'stormy') => void
  setTimeMode: (mode: 'day' | 'night' | 'auto') => void
  togglePomodoro: () => void
  setPomodoroTime: (seconds: number) => void
  setImageUrl: (url: string | null) => void
  setImageParticles: (enabled: boolean) => void
  savePreset: (name: string) => Preset
  exportPreset: () => string
  importPreset: (json: string) => void
}

export type AtomizerStore = AtomizerState & AtomizerActions

export const useAtomizerStore = create<AtomizerStore>()((set, get) => ({
  ...defaultState,
  
  setParticleCount: (count) => set({ particleCount: count }),
  setParticleSize: (size) => set({ particleSize: size }),
  setAnimationSpeed: (speed) => set({ animationSpeed: speed }),
  setDispersionSpeed: (speed) => set({ dispersionSpeed: speed }),
  setIntensity: (intensity) => set({ intensity }),
  setTurbulence: (turbulence) => set({ turbulence }),
  setRotation: (rotation) => set({ rotation }),
  setMode: (mode) => set({ mode }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setProgress: (progress) => set({ progress }),
  setMousePosition: (x, y) => set({ mouseX: x, mouseY: y }),
  setMouseInfluence: (influence) => set({ mouseInfluence: influence }),
  setPrimaryColor: (color) => set({ primaryColor: color }),
  setSecondaryColor: (color) => set({ secondaryColor: color }),
  setBackgroundColor: (color) => set({ backgroundColor: color }),
  toggleUI: () => set((state) => ({ showUI: !state.showUI })),
  setFPS: (fps) => set({ fps }),
  
  reset: () => set(defaultState),
  
  loadPreset: (preset) => set((state) => ({
    ...state,
    ...preset,
  })),
  
  toggleFullscreen: () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      set({ fullscreen: true })
    } else {
      document.exitFullscreen()
      set({ fullscreen: false })
    }
  },
  
  toggleShortcuts: () => set((state) => ({ showShortcuts: !state.showShortcuts })),
  
  toggleAudio: () => set((state) => ({ audioEnabled: !state.audioEnabled })),
  
  setAudioSensitivity: (sensitivity) => set({ audioSensitivity: sensitivity }),
  
  toggleStats: () => set((state) => ({ showStats: !state.showStats })),
  
  setWeatherMode: (mode) => set({ weatherMode: mode }),
  
  setTimeMode: (mode) => set({ timeMode: mode }),
  
  togglePomodoro: () => set((state) => ({ pomodoroActive: !state.pomodoroActive })),
  
  setPomodoroTime: (seconds) => set({ pomodoroTime: seconds }),
  
  setImageUrl: (url) => set({ imageUrl: url }),
  
  setImageParticles: (enabled) => set({ imageParticles: enabled }),
  
  savePreset: (name) => {
    const state = get()
    const preset: Preset = {
      id: crypto.randomUUID(),
      name,
      particleCount: state.particleCount,
      particleSize: state.particleSize,
      animationSpeed: state.animationSpeed,
      dispersionSpeed: state.dispersionSpeed,
      intensity: state.intensity,
      turbulence: state.turbulence,
      rotation: state.rotation,
      mode: state.mode,
      primaryColor: state.primaryColor,
      secondaryColor: state.secondaryColor,
      backgroundColor: state.backgroundColor,
      mouseInfluence: state.mouseInfluence,
      audioEnabled: state.audioEnabled,
      audioSensitivity: state.audioSensitivity,
      imageUrl: state.imageUrl,
      createdAt: new Date().toISOString(),
    }
    
    // Download as JSON file
    const blob = new Blob([JSON.stringify(preset, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${name.toLowerCase().replace(/\s+/g, '-')}-preset.json`
    a.click()
    URL.revokeObjectURL(url)
    
    return preset
  },
  
  exportPreset: () => {
    const state = get()
    return JSON.stringify({
      particleCount: state.particleCount,
      particleSize: state.particleSize,
      animationSpeed: state.animationSpeed,
      dispersionSpeed: state.dispersionSpeed,
      intensity: state.intensity,
      turbulence: state.turbulence,
      rotation: state.rotation,
      mode: state.mode,
      primaryColor: state.primaryColor,
      secondaryColor: state.secondaryColor,
      backgroundColor: state.backgroundColor,
      mouseInfluence: state.mouseInfluence,
      audioEnabled: state.audioEnabled,
      audioSensitivity: state.audioSensitivity,
    }, null, 2)
  },
  
  importPreset: (json) => {
    try {
      const preset = JSON.parse(json)
      set((state) => ({
        ...state,
        ...preset,
      }))
    } catch (e) {
      console.error('Failed to import preset:', e)
    }
  },
}))
