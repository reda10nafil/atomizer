import { useState } from 'react';

export interface Wallpaper { id: string; title: string; url: string; tags?: string[]; }
export function WallpaperSearch() {
  const [query, setQuery] = useState('');
  const items: Wallpaper[] = [];
  return <section><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search wallpapers" />{items.map(item => <article key={item.id}><img src={item.url} alt={item.title} />{item.tags?.map((tag: string) => <span key={tag}>{tag}</span>)}</article>)}</section>;
}
