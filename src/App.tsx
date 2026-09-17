import { useEffect, useState } from 'react';
import './styles/index.css';

type Panel = 'editor' | 'wallpapers' | 'scraper';
const modes = ['Vortex', 'Explosion', 'Turbulence', 'Galaxy', 'Nebula', 'Plasma', 'Stars', 'DNA'];

function MotionScene({ onOpen }: { onOpen?: () => void }) {
  return <div className="motion-scene" onClick={onOpen} role={onOpen ? 'button' : undefined} tabIndex={onOpen ? 0 : undefined}>
    <div className="motion-orbit motion-orbit-a" /><div className="motion-orbit motion-orbit-b" /><div className="motion-particles" /><div className="motion-core" />
    {onOpen && <div className="motion-hint">Click to open Atomizer</div>}
  </div>;
}

function Editor({ setPanel }: { setPanel: (panel: Panel) => void }) {
  const [mode, setMode] = useState('Vortex');
  const [playing, setPlaying] = useState(true);
  const [showHelp, setShowHelp] = useState(false);
  const [particles, setParticles] = useState(150000);
  const [speed, setSpeed] = useState(0.8);
  const [intensity, setIntensity] = useState(0.7);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === ' ') { event.preventDefault(); setPlaying(value => !value); }
      if (event.key.toLowerCase() === 'h') setPanel('editor');
      if (event.key === '?') setShowHelp(value => !value);
      if (event.key === 'Escape') setShowHelp(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setPanel]);

  return <div className="editor-shell">
    <header className="topbar"><button className="brand" onClick={() => setPanel('editor')}>ATOMIZER <span>Motion Lab</span></button><nav className="nav-actions"><button onClick={() => setPlaying(value => !value)}>{playing ? 'Pause' : 'Play'}</button><button onClick={() => setShowHelp(value => !value)}>Shortcuts</button><button onClick={() => setPanel('wallpapers')}>Wallpaper Hub</button><button onClick={() => setPanel('scraper')}>Scraper</button><button onClick={() => setPanel('editor')}>Clean Canvas</button></nav></header>
    <aside className="control-panel"><div className="panel-heading"><span>Particle engine</span><span className="status-dot">● Live</span></div><h1>{mode}</h1><p className="muted">Interactive motion environment</p><div className="mode-grid">{modes.map(item => <button key={item} className={mode === item ? 'mode active' : 'mode'} onClick={() => setMode(item)}>{item}</button>)}</div><label>Particles <output>{particles.toLocaleString()}</output><input type="range" min="10000" max="500000" step="10000" value={particles} onChange={event => setParticles(Number(event.target.value))} /></label><label>Speed <output>{speed.toFixed(1)}</output><input type="range" min="0" max="2" step="0.1" value={speed} onChange={event => setSpeed(Number(event.target.value))} /></label><label>Intensity <output>{intensity.toFixed(1)}</output><input type="range" min="0" max="1" step="0.1" value={intensity} onChange={event => setIntensity(Number(event.target.value))} /></label><div className="panel-actions"><button onClick={() => { setMode('Vortex'); setParticles(150000); setSpeed(0.8); setIntensity(0.7); setPlaying(true); }}>Reset</button><button onClick={() => setShowHelp(true)}>Keyboard help</button></div></aside>
    <div className="editor-scene"><MotionScene /></div><footer className="statusbar"><span>{playing ? 'Running' : 'Paused'}</span><span>{particles.toLocaleString()} particles</span><span>GPU renderer ready</span><span>Mode: {mode}</span></footer>
    {showHelp && <div className="modal-backdrop" onClick={() => setShowHelp(false)}><div className="help-modal" onClick={event => event.stopPropagation()}><button className="close" onClick={() => setShowHelp(false)}>×</button><h2>Keyboard shortcuts</h2><p><kbd>Space</kbd> Play / pause</p><p><kbd>H</kbd> Open editor</p><p><kbd>?</kbd> Show shortcuts</p><p><kbd>Esc</kbd> Close dialog</p></div></div>}
  </div>;
}

function ResourcePanel({ type, onClose }: { type: 'wallpapers' | 'scraper'; onClose: () => void }) {
  const [urls, setUrls] = useState('https://wallhaven.cc/search?q=nature\nhttps://unsplash.com/s/photos/space');
  return <div className="resource-backdrop"><section className="resource-panel"><div className="resource-header"><div><span className="eyebrow">Atomizer library</span><h2>{type === 'wallpapers' ? 'Wallpaper Hub' : 'Wallpaper Scraper'}</h2></div><button onClick={onClose}>Close</button></div>{type === 'wallpapers' ? <><div className="filter-row"><input placeholder="Search wallpapers..." /><select defaultValue="all"><option value="all">All sources</option><option>Static</option><option>Live</option><option>4K</option><option>8K</option></select></div><div className="wallpaper-grid">{['Aurora', 'Nebula', 'Synthwave', 'Deep Space', 'Monochrome', 'Ocean'].map((name, index) => <article className="wallpaper-card" key={name}><div className={`wallpaper-preview preview-${index}`} /><div><strong>{name}</strong><small>Preview collection · {index % 2 ? 'Live' : 'Static'}</small></div><button>Preview</button></article>)}</div></> : <><p className="muted">Add one URL per line. The browser can only read sources that allow cross-origin access.</p><textarea value={urls} onChange={event => setUrls(event.target.value)} /><div className="resource-actions"><button className="primary">Search sources</button><button onClick={() => setUrls('')}>Clear</button></div><div className="notice">Use official public APIs when available. Sites that block browser requests need a permitted server-side connector.</div></>}</section></div>;
}

export default function App() { const [opened, setOpened] = useState(false); const [panel, setPanel] = useState<Panel>('editor'); if (!opened) return <MotionScene onOpen={() => setOpened(true)} />; return <div className="app-root"><Editor setPanel={setPanel} />{panel !== 'editor' && <ResourcePanel type={panel} onClose={() => setPanel('editor')} />}</div>; }
