export type ParticleMode =
  | "spherical-vortex"
  | "radial-explosion"
  | "turbulence"
  | "galaxy"
  | "magnetic"
  | "nebula"
  | "black-hole"
  | "plasma"
  | "fire"
  | "stars"
  | "rain"
  | "dna"
  | "fractal"
  | "tunnel";

export interface AtomizerState {
  particleCount: number;
  particleSize: number;
  animationSpeed: number;
  dispersionSpeed: number;
  intensity: number;
  turbulence: number;
  rotation: number;
  mode: ParticleMode;
  isPlaying: boolean;
  progress: number;
  mouseX: number;
  mouseY: number;
  mouseInfluence: number;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  showUI: boolean;
  fps: number;
}

export interface Preset {
  id: string;
  name: string;
  description?: string;
  particleCount: number;
  particleSize: number;
  animationSpeed: number;
  dispersionSpeed: number;
  intensity: number;
  turbulence: number;
  rotation: number;
  mode: ParticleMode;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  mouseInfluence: number;
}

export const defaultState: AtomizerState = {
  particleCount: 150000,
  particleSize: 1.5,
  animationSpeed: 1.0,
  dispersionSpeed: 1.5,
  intensity: 0.8,
  turbulence: 0.4,
  rotation: 1.0,
  mode: "spherical-vortex",
  isPlaying: true,
  progress: 0,
  mouseX: 0,
  mouseY: 0,
  mouseInfluence: 0.6,
  primaryColor: "#00a8ff",
  secondaryColor: "#00d2ff",
  backgroundColor: "#0a0a0f",
  showUI: true,
  fps: 60,
};
