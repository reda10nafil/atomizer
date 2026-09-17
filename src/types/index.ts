export type ParticleMode = 'spherical-vortex' | 'explosion' | 'turbulence' | 'galaxy' | 'magnetic' | 'nebula' | 'black-hole' | 'plasma' | 'fire' | 'stars' | 'rain' | 'dna' | 'fractal' | 'tunnel';

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
  mouseInfluence: number;
  mousePosition: { x: number; y: number };
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  imageUrl: string | null;
  imageParticles: boolean;
  fps: number;
}

export interface Wallpaper {
  id: string;
  title: string;
  url: string;
  thumbnailUrl?: string;
  sourceUrl?: string;
  source?: string;
  type?: 'static' | 'live';
  width?: number;
  height?: number;
  resolution?: string;
  tags?: string[];
  rating?: number;
  downloads?: number;
}

export const defaultState: AtomizerState = {
  particleCount: 150000,
  particleSize: 0.03,
  animationSpeed: 0.8,
  dispersionSpeed: 0.5,
  intensity: 0.7,
  turbulence: 0.4,
  rotation: 0.2,
  mode: 'spherical-vortex',
  isPlaying: true,
  mouseInfluence: 0.5,
  mousePosition: { x: 0, y: 0 },
  primaryColor: '#ffffff',
  secondaryColor: '#b788ff',
  backgroundColor: '#000000',
  imageUrl: null,
  imageParticles: false,
  fps: 60,
};
