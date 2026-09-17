# Atomizer Wallpaper Scraper

Advanced wallpaper scraper using Crawlee + Playwright for aggregating wallpapers from multiple sources.

## 🚀 Features

- **Multi-Site Scraping**: Wallhaven, Unsplash, Pexels, and more
- **Real-time Search**: Netflix-style UI with instant results
- **Advanced Filters**: By site, resolution, orientation, color, tags
- **Live Wallpaper Support**: Wallpaper Engine integration ready
- **API-First**: RESTful API for frontend integration
- **Caching**: 5-minute cache for faster repeated searches
- **Scalable**: Queue-based architecture with concurrency control

## 📦 Installation

```bash
cd apps/scraper
npm install
```

### Environment Variables

Create `.env` file:

```env
# Scraper API
SCRAPER_PORT=3001

# Unsplash API (get free key at https://unsplash.com/developers)
UNSPLASH_ACCESS_KEY=your_access_key_here

# Optional: Proxy for scraping
PROXY_URL=http://proxy.example.com:8080
PROXY_USERNAME=username
PROXY_PASSWORD=password
```

## 🎯 Usage

### Start API Server

```bash
# Development
npm run dev

# Production
npm run build
npm start
```

API will be available at `http://localhost:3001`

### API Endpoints

#### Search Wallpapers
```
GET /api/search?q=nature&sites=wallhaven,unsplash&limit=50
```

Parameters:
- `q` - Search query
- `sites` - Comma-separated site IDs
- `limit` - Results per page (default: 50)
- `offset` - Pagination offset
- `sortBy` - relevance | views | likes | date
- `sortOrder` - asc | desc

#### Get Wallpaper by ID
```
GET /api/wallpaper/:id
```

#### Download Wallpaper
```
GET /api/download/:id
```

#### Get Available Sites
```
GET /api/sites
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "wallhaven",
      "name": "Wallhaven",
      "url": "https://wallhaven.cc",
      "enabled": true,
      "types": ["static"]
    }
  ]
}
```

### Run Individual Scrapers

```bash
# Scrape Wallhaven
npm run scrape:wallhaven

# Scrape Unsplash
npm run scrape:unsplash

# Scrape Pexels
npm run scrape:pexels

# Scrape all sites
npm run scrape:all
```

## 🏗️ Architecture

```
src/
├── scrapers/
│   ├── wallhaven.ts    # Wallhaven.cc scraper
│   ├── unsplash.ts     # Unsplash API integration
│   ├── pexels.ts       # Pexels API integration
│   └── run-all.ts      # Run all scrapers
├── server.ts           # Express API server
├── types.ts            # TypeScript types
└── index.ts            # Entry point
```

## 🔧 Adding New Sites

1. Create new scraper in `src/scrapers/`:

```typescript
// src/scrapers/newsite.ts
import { Wallpaper } from '../types';

export async function scrapeNewSite(maxResults = 100) {
  const results: Wallpaper[] = [];
  
  // Your scraping logic here
  
  return results;
}
```

2. Add to `server.ts` search endpoint

3. Add site to `/api/sites` response

## 📊 Supported Sites

| Site | Type | API/Scrape | Status |
|------|------|------------|--------|
| Wallhaven | Static | Scrape | ✅ |
| Unsplash | Static | API | ✅ |
| Pexels | Static | API | 🔄 |
| Pixabay | Static | API | ⏳ |
| Wallpaper Engine | Live | Scrape | ⏳ |
| Wallpaper Abyss | Static | Scrape | ⏳ |

## 🎨 Frontend Integration

React component example:

```tsx
import { WallpaperSearch } from './components/WallpaperSearch';

function App() {
  return (
    <div className="w-full h-full">
      <WallpaperSearch />
    </div>
  );
}
```

## ⚠️ Legal & Ethics

- Respect `robots.txt` of each site
- Add delays between requests
- Use official APIs when available
- Don't overload servers
- Check terms of service
- Attribute authors properly

## 🐛 Troubleshooting

### Scraping fails
- Check if site is accessible
- Verify selectors haven't changed
- Increase timeout
- Try different user agent

### API returns empty
- Check cache (5 min TTL)
- Verify query parameters
- Check site availability

### Rate limiting
- Add proxy rotation
- Increase delays
- Reduce concurrency

## 📈 Performance Tips

- Use caching (Redis in production)
- Implement request queue
- Add retry logic
- Use headless browsers sparingly
- Prefer official APIs

## 🚀 Next Steps

- [ ] Add Pexels scraper
- [ ] Add Pixabay scraper
- [ ] Wallpaper Engine integration
- [ ] Database storage (SQLite/PostgreSQL)
- [ ] Redis caching
- [ ] Background scraping jobs
- [ ] User accounts & favorites
- [ ] Advanced image search (colors, composition)

## 📄 License

MIT License - See main repository

---

**Built with** ❤️ **using Crawlee + Playwright**
