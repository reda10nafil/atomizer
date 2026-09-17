import { useState } from 'react';
import { Settings, HelpCircle, Download, Maximize2, RotateCcw, Play, Pause } from 'lucide-react';

export function Header() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  return <header className="flex items-center justify-between p-4 border-b border-white/10"><div className="flex items-center gap-3"><h1 className="text-xl font-bold">ATOMIZER</h1><span className="text-xs text-muted-foreground">Particle Engine</span></div><div className="flex items-center gap-2"><button onClick={() => setIsPlaying(value => !value)}>{isPlaying ? <Pause size={18} /> : <Play size={18} />}</button><button onClick={() => setShowSettings(value => !value)}><Settings size={18} /></button><button title="Help"><HelpCircle size={18} /></button><button title="Download"><Download size={18} /></button><button title="Fullscreen"><Maximize2 size={18} /></button><button title="Reset"><RotateCcw size={18} /></button>{showSettings && <div role="dialog">Settings</div>}</div></header>;
}
