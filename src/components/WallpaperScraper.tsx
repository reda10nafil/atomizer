import { useState } from 'react';
import { Search, Download } from 'lucide-react';

export function WallpaperScraper() {
  const [urls, setUrls] = useState('');
  return <section><textarea value={urls} onChange={event => setUrls(event.target.value)} placeholder="One URL per line" /><button title="Search"><Search size={16} />Search</button><p>Only sources with CORS permission can be read in the browser.</p><button title="Download"><Download size={16} />Download</button></section>;
}
