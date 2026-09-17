import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react'
import './styles/index.css'

type Mode = 'Vortex' | 'Galaxy' | 'Explosion' | 'Stars'
type Particle = { x: number; y: number; phase: number; color: string }
type Preset = { version: 1; mode: Mode; count: number; speed: number; primary: string; background: string }

const modes: Mode[] = ['Vortex', 'Galaxy', 'Explosion', 'Stars']
const defaults: Preset = { version: 1, mode: 'Vortex', count: 6000, speed: 1, primary: '#bfe8ff', background: '#020407' }

function createParticles(count: number, mode: Mode, color: string): Particle[] {
  return Array.from({ length: count }, (_, index) => {
    const angle = (index / count) * Math.PI * 2
    const radius = Math.sqrt(Math.random())
    const phase = Math.random() * Math.PI * 2
    if (mode === 'Stars') return { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1, phase, color }
    if (mode === 'Galaxy') return { x: Math.cos(angle * 3 + radius * 9) * radius, y: Math.sin(angle * 3 + radius * 9) * radius, phase, color }
    return { x: Math.cos(angle + phase) * radius, y: Math.sin(angle + phase) * radius, phase, color }
  })
}

function isPreset(value: unknown): value is Preset {
  if (!value || typeof value !== 'object') return false
  const preset = value as Partial<Preset>
  return preset.version === 1 && modes.includes(preset.mode as Mode) && typeof preset.count === 'number' && preset.count >= 1000 && preset.count <= 16000 && typeof preset.speed === 'number' && preset.speed >= 0 && preset.speed <= 2 && typeof preset.primary === 'string' && typeof preset.background === 'string'
}

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageParticlesRef = useRef<Particle[] | null>(null)
  const pointerRef = useRef({ x: 0, y: 0, active: false })
  const [mode, setMode] = useState<Mode>(defaults.mode)
  const [count, setCount] = useState(defaults.count)
  const [speed, setSpeed] = useState(defaults.speed)
  const [primary, setPrimary] = useState(defaults.primary)
  const [background, setBackground] = useState(defaults.background)
  const [playing, setPlaying] = useState(true)
  const [clean, setClean] = useState(false)
  const [panelOpen, setPanelOpen] = useState(true)
  const [fps, setFps] = useState(0)
  const [imageName, setImageName] = useState('')
  const [notice, setNotice] = useState('Canvas renderer ready')

  const particles = useMemo(() => createParticles(count, mode, primary), [count, mode, primary])

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return
    let frame = 0
    let previous = performance.now()
    let elapsed = 0
    let frames = 0
    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.floor(rect.width * dpr))
      canvas.height = Math.max(1, Math.floor(rect.height * dpr))
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const draw = (now: number) => {
      const rect = canvas.getBoundingClientRect()
      const width = rect.width
      const height = rect.height
      const dt = Math.min((now - previous) / 1000, 0.05)
      previous = now
      elapsed += dt
      frames += 1
      if (elapsed > 0.5) {
        setFps(Math.round(frames / elapsed))
        elapsed = 0
        frames = 0
      }
      context.fillStyle = background
      context.fillRect(0, 0, width, height)
      context.globalCompositeOperation = 'lighter'
      const active = imageParticlesRef.current ?? particles
      const time = now * 0.001 * speed
      const scale = Math.min(width, height) * 0.42
      for (const particle of active) {
        let x = particle.x
        let y = particle.y
        if (!imageParticlesRef.current) {
          if (mode === 'Vortex') { x += Math.cos(time + particle.phase) * particle.y * 0.12; y += Math.sin(time + particle.phase) * particle.x * 0.12 }
          if (mode === 'Galaxy') { x += Math.cos(time * 0.7 + particle.phase) * 0.08; y += Math.sin(time * 0.7 + particle.phase) * 0.08 }
          if (mode === 'Explosion') { const factor = 1 + Math.sin(time + particle.phase) * 0.16; x *= factor; y *= factor }
          if (mode === 'Stars') { x += Math.sin(time + particle.phase) * 0.01; y += Math.cos(time + particle.phase) * 0.01 }
        }
        if (pointerRef.current.active) {
          const dx = pointerRef.current.x - width / 2 - x * scale
          const dy = pointerRef.current.y - height / 2 - y * scale
          const distance = Math.hypot(dx, dy)
          if (distance < 180 && distance > 1) { x -= (dx / distance) * (1 - distance / 180) * 0.1; y -= (dy / distance) * (1 - distance / 180) * 0.1 }
        }
        context.fillStyle = particle.color
        context.beginPath()
        context.arc(width / 2 + x * scale, height / 2 + y * scale, imageParticlesRef.current ? 1.5 : 1.1, 0, Math.PI * 2)
        context.fill()
      }
      context.globalCompositeOperation = 'source-over'
      if (playing) frame = requestAnimationFrame(draw)
    }
    resize()
    window.addEventListener('resize', resize)
    if (playing) frame = requestAnimationFrame(draw)
    else draw(performance.now())
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize) }
  }, [background, mode, particles, playing, speed])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement) return
      if (event.code === 'Space') { event.preventDefault(); setPlaying((value) => !value) }
      if (event.key === 'Escape') setClean(false)
      if (event.key.toLowerCase() === 'u') setClean((value) => !value)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const reset = () => { imageParticlesRef.current = null; setImageName(''); setMode(defaults.mode); setCount(defaults.count); setSpeed(defaults.speed); setPrimary(defaults.primary); setBackground(defaults.background); setPlaying(true); setNotice('Settings reset') }
  const currentPreset = (): Preset => ({ version: 1, mode, count, speed, primary, background })
  const savePreset = () => { localStorage.setItem('atomizer-preset', JSON.stringify(currentPreset())); setNotice('Preset saved locally') }
  const loadPreset = () => { try { const value = JSON.parse(localStorage.getItem('atomizer-preset') || 'null'); if (!isPreset(value)) throw new Error('Invalid preset'); setMode(value.mode); setCount(value.count); setSpeed(value.speed); setPrimary(value.primary); setBackground(value.background); setNotice('Preset loaded') } catch { setNotice('Invalid or missing preset') } }
  const exportPreset = () => { const blob = new Blob([JSON.stringify(currentPreset(), null, 2)], { type: 'application/json' }); const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = 'atomizer-preset.json'; link.click(); URL.revokeObjectURL(url); setNotice('Preset exported') }
  const importPreset = (event: ChangeEvent<HTMLInputElement>) => { const file = event.target.files?.[0]; if (!file) return; const reader = new FileReader(); reader.onload = () => { try { const value = JSON.parse(String(reader.result)); if (!isPreset(value)) throw new Error('Invalid preset'); setMode(value.mode); setCount(value.count); setSpeed(value.speed); setPrimary(value.primary); setBackground(value.background); setNotice('Preset imported') } catch { setNotice('Invalid preset JSON') } }; reader.readAsText(file) }
  const importImage = (event: ChangeEvent<HTMLInputElement>) => { const file = event.target.files?.[0]; if (!file) return; const url = URL.createObjectURL(file); const image = new Image(); image.onload = () => { const offscreen = document.createElement('canvas'); const context = offscreen.getContext('2d'); if (!context) return; offscreen.width = 140; offscreen.height = Math.max(1, Math.round(140 * image.height / image.width)); context.drawImage(image, 0, 0, offscreen.width, offscreen.height); const data = context.getImageData(0, 0, offscreen.width, offscreen.height).data; const result: Particle[] = []; for (let y = 0; y < offscreen.height; y += 2) for (let x = 0; x < offscreen.width; x += 2) { const index = (y * offscreen.width + x) * 4; if (data[index + 3] > 100 && data[index] + data[index + 1] + data[index + 2] > 90) result.push({ x: (x / offscreen.width - 0.5) * 1.7, y: (y / offscreen.height - 0.5) * -1.7, phase: Math.random() * 7, color: `rgb(${data[index]},${data[index + 1]},${data[index + 2]})` }) } imageParticlesRef.current = result; setImageName(`${file.name} · ${result.length.toLocaleString()} particles`); setNotice('Image atomized'); URL.revokeObjectURL(url) }; image.onerror = () => { URL.revokeObjectURL(url); setNotice('Image could not be read') }; image.src = url }
  const screenshot = () => canvasRef.current?.toBlob((blob) => { if (!blob) return; const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = 'atomizer.png'; link.click(); URL.revokeObjectURL(url); setNotice('Screenshot exported') })
  const fullscreen = async () => { try { if (document.fullscreenElement) await document.exitFullscreen(); else await document.documentElement.requestFullscreen() } catch { setNotice('Fullscreen unavailable') } }

  return <main className={clean ? 'app clean' : 'app'}><canvas ref={canvasRef} className='canvas' onPointerMove={(event) => { const rect = event.currentTarget.getBoundingClientRect(); pointerRef.current = { x: event.clientX - rect.left, y: event.clientY - rect.top, active: true } }} onPointerLeave={() => { pointerRef.current.active = false }} />{!clean && <header><button className='brand' onClick={() => setPanelOpen(true)}>ATOMIZER <span>Canvas Lab</span></button><nav><button onClick={() => setPlaying((value) => !value)}>{playing ? 'Pause' : 'Play'}</button><button onClick={screenshot}>Screenshot</button><button onClick={fullscreen}>Fullscreen</button><button onClick={() => setClean(true)}>Clean Canvas</button></nav></header>}{!clean && panelOpen && <aside><div className='head'>Particle engine<button onClick={() => setPanelOpen(false)}>×</button></div><h2>{imageName || mode}</h2><div className='modes'>{modes.map((item) => <button key={item} className={item === mode && !imageName ? 'active' : ''} onClick={() => { imageParticlesRef.current = null; setImageName(''); setMode(item) }}>{item}</button>)}</div><label>Particles <output>{imageName || count.toLocaleString()}</output><input type='range' min='1000' max='16000' step='500' value={count} onChange={(event) => { imageParticlesRef.current = null; setImageName(''); setCount(Number(event.target.value)) }} /></label><label>Speed <output>{speed.toFixed(1)}</output><input type='range' min='0' max='2' step='.1' value={speed} onChange={(event) => setSpeed(Number(event.target.value))} /></label><label>Particle color<input type='color' value={primary} onChange={(event) => setPrimary(event.target.value)} /></label><label>Background<input type='color' value={background} onChange={(event) => setBackground(event.target.value)} /></label><label className='upload'>Import image<input type='file' accept='image/*' onChange={importImage} /></label>{imageName && <button onClick={() => { imageParticlesRef.current = null; setImageName(''); setNotice('Image particles removed') }}>Remove image</button>}<div className='bottom'><button onClick={reset}>Reset</button><button onClick={savePreset}>Save</button><button onClick={loadPreset}>Load</button><button onClick={exportPreset}>Export JSON</button><label className='upload'>Import JSON<input type='file' accept='application/json' onChange={importPreset} /></label></div></aside>}{!clean && !panelOpen && <button className='settings' onClick={() => setPanelOpen(true)}>Settings</button>}{clean && <button className='editor' onClick={() => setClean(false)}>Editor</button>}{!clean && <footer>{playing ? 'Running' : 'Paused'} · {fps} FPS · {imageName || `${count.toLocaleString()} particles`} · {notice}</footer>}</main>
}
