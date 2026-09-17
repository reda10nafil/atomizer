import { useRef } from 'react';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

export function ParticleSystem() {
  const positions = new Float32Array(3000);
  const colors = new Float32Array(3000);
  const ref = useRef<THREE.Points>(null);
  return <Points ref={ref} positions={positions} stride={3} frustumCulled={false}><PointMaterial transparent color="#ffffff" size={0.03} /></Points>;
}
