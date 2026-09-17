import { useState } from 'react';
import { Download, Save } from 'lucide-react';

export function PresetManager() {
  const [presets, setPresets] = useState<string[]>(['Aurora', 'Nebula', 'Cyberpunk']);
  const [name, setName] = useState('');
  const savePreset = () => { if (name.trim()) { setPresets(value => [...value, name.trim()]); setName(''); } };
  return <section><div><input value={name} onChange={event => setName(event.target.value)} placeholder="Preset name" /><button onClick={savePreset}><Save size={16} />Save</button></div><div>{presets.map(preset => <button key={preset}>{preset}</button>)}</div><button title="Export"><Download size={16} />Export</button></section>;
}
