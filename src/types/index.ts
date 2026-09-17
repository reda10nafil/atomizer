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
  | "tunnel"
  | "audio-reactive"
  | "webcam"
  | "weather"
  | "clock";

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
  fullscreen: boolean;
  showShortcuts: boolean;
  audioEnabled: boolean;
  audioSensitivity: number;
  showStats: boolean;
  weatherMode: 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'stormy';
  timeMode: 'day' | 'night' | 'auto';
  pomodoroActive: boolean;
  pomodoroTime: number;
  imageUrl: string | null;
  imageParticles: boolean;
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
  audioEnabled: boolean;
  audioSensitivity: number;
  imageUrl?: string | null;
  createdAt?: string;
  author?: string;
  downloads?: number;
  rating?: number;
}

export interface WallpaperItem {
  id: string;
  title: string;
  author: string;
  thumbnail: string;
  preview: string;
  downloadUrl: string;
  resolution: string;
  category: string;
  tags: string[];
  downloads: number;
  rating: number;
  source: 'wallpaper-abyss' | 'wallpaper-engine' | 'lively' | 'community';
  isLive: boolean;
  fileSize?: string;
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
  fullscreen: false,
  showShortcuts: false,
  audioEnabled: false,
  audioSensitivity: 0.5,
  showStats: false,
  weatherMode: 'sunny',
  timeMode: 'auto',
  pomodoroActive: false,
  pomodoroTime: 25 * 60,
  imageUrl: null,
  imageParticles: false,
};
