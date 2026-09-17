import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useAtomizerStore } from '../../store/useAtomizerStore'
import { particleVertexShader, particleFragmentShader } from './shaders'

export function ParticleSystem() {
  const meshRef = useRef<THREE.Points>(null!)
  const { size } = useThree()
  
  const {
    particleCount,
    particleSize,
    animationSpeed,
    dispersionSpeed,
    intensity,
    turbulence,
    rotation,
    mode,
    isPlaying,
    mouseX,
    mouseY,
    mouseInfluence,
    primaryColor,
    secondaryColor,
  } = useAtomizerStore()

  // Create particles
  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)

    const color1 = new THREE.Color(primaryColor)
    const color2 = new THREE.Color(secondaryColor)

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      
      // Spherical distribution
      const radius = 2 * Math.cbrt(Math.random())
      const theta = Math.random() * 2 * Math.PI
      const phi = Math.acos(2 * Math.random() - 1)

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = radius * Math.cos(phi)

      // Gradient colors
      const t = Math.random()
      colors[i3] = THREE.MathUtils.lerp(color1.r, color2.r, t)
      colors[i3 + 1] = THREE.MathUtils.lerp(color1.g, color2.g, t)
      colors[i3 + 2] = THREE.MathUtils.lerp(color1.b, color2.b, t)

      sizes[i] = Math.random()
    }

    return { positions, colors, sizes }
  }, [particleCount, primaryColor, secondaryColor])

  // Update uniforms
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: particleSize },
      uSpeed: { value: animationSpeed },
      uDispersion: { value: dispersionSpeed },
      uIntensity: { value: intensity },
      uTurbulence: { value: turbulence },
      uRotation: { value: rotation },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uMouseInfluence: { value: mouseInfluence },
      uMode: { value: 0 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
    }),
    []
  )

  // Update mode uniform
  useMemo(() => {
    const modeMap: Record<string, number> = {
      'spherical-vortex': 0,
      'radial-explosion': 1,
      'turbulence': 2,
      'galaxy': 3,
      'magnetic': 4,
      'nebula': 5,
      'black-hole': 6,
      'plasma': 7,
      'fire': 8,
      'stars': 9,
      'rain': 10,
      'dna': 11,
      'fractal': 12,
      'tunnel': 13,
    }
    uniforms.uMode.value = modeMap[mode] ?? 0
  }, [mode, uniforms])

  // Animation loop
  useFrame((state, delta) => {
    if (!meshRef.current || !isPlaying) return

    uniforms.uTime.value += delta * animationSpeed
    uniforms.uSize.value = particleSize
    uniforms.uSpeed.value = animationSpeed
    uniforms.uDispersion.value = dispersionSpeed
    uniforms.uIntensity.value = intensity
    uniforms.uTurbulence.value = turbulence
    uniforms.uRotation.value = rotation
    uniforms.uMouse.value.set(mouseX, mouseY)
    uniforms.uMouseInfluence.value = mouseInfluence
    uniforms.uResolution.value.set(size.width, size.height)

    meshRef.current.rotation.y += delta * 0.1 * rotation
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={sizes.length}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
