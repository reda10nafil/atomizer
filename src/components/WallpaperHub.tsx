import { useState } from 'react';
import { Search, Download } from 'lucide-react';

export function WallpaperHub() {
  const [query, setQuery] = useState('');
  const wallpapers = ['Aurora', 'Nebula', 'Synthwave'];
  return <section><div><Search size={16} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search" /></div><div>{wallpapers.filter(item => item.toLowerCase().includes(query.toLowerCase())).map(item => <article key={item}><strong>{item}</strong><button title="Download"><Download size={16} /></button></article>)}</div></section>;
}
