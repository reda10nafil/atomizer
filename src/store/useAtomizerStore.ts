import { create } from 'zustand'
import { AtomizerState, defaultState, ParticleMode } from '../types'

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
}))
