import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { ControlPanel } from './components/ControlPanel';
import { WallpaperHub } from './components/WallpaperHub';
import { WallpaperScraper } from './components/WallpaperScraper';
import { Stats } from './components/Stats';
import './styles/index.css';

type View = 'editor' | 'hub' | 'scraper';

function MotionLanding({ onOpen }: { onOpen: () => void }) {
  return (
    <main className="motion-landing" onClick={onOpen} aria-label="Open Atomizer editor">
      <div className="motion-orbit motion-orbit-one" />
      <div className="motion-orbit motion-orbit-two" />
      <div className="motion-core" />
      <div className="motion-particles" />
      <div className="motion-hint">Click to open Atomizer</div>
    </main>
  );
}

export default function App() {
  const [view, setView] = useState<View | null>(null);
  const [cleanCanvas, setCleanCanvas] = useState(true);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'h') setCleanCanvas((value) => !value);
      if (event.key === 'Escape') setView(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  if (view === null && cleanCanvas) {
    return <MotionLanding onOpen={() => setCleanCanvas(false)} />;
  }

  return (
    <div className="atomizer-app">
      <div className="atomizer-canvas" aria-hidden="true">
        <div className="motion-orbit motion-orbit-one" />
        <div className="motion-orbit motion-orbit-two" />
        <div className="motion-core" />
        <div className="motion-particles" />
      </div>
      <div className="atomizer-ui">
        <Header />
        <div className="atomizer-toolbar">
          <button onClick={() => setView(null)} className="atomizer-button">Editor</button>
          <button onClick={() => setView('hub')} className="atomizer-button">Wallpaper Hub</button>
          <button onClick={() => setView('scraper')} className="atomizer-button">Scraper</button>
          <button onClick={() => setCleanCanvas(true)} className="atomizer-button">Clean Canvas</button>
        </div>
        <div className="atomizer-content">
          {view === 'hub' ? <WallpaperHub /> : view === 'scraper' ? <WallpaperScraper /> : <ControlPanel />}
        </div>
        <Stats />
      </div>
    </div>
  );
}
