import express from 'express';
import cors from 'cors';
import { scrapeWallhaven } from './scrapers/wallhaven';
import { scrapeUnsplash } from './scrapers/unsplash';
import { Wallpaper, SearchFilters } from './types';

const app = express();
const PORT = process.env.SCRAPER_PORT || 3001;

app.use(cors());
app.use(express.json());

// In-memory cache (use Redis in production)
const cache = new Map<string, { data: Wallpaper[]; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Search wallpapers
app.get('/api/search', async (req, res) => {
  try {
    const filters: SearchFilters = {
      query: req.query.q as string,
      sites: (req.query.sites as string)?.split(',') || ['wallhaven', 'unsplash'],
      limit: parseInt(req.query.limit as string) || 50,
      offset: parseInt(req.query.offset as string) || 0,
    };
    
    const cacheKey = JSON.stringify(filters);
    const cached = cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      console.log('✅ Cache hit');
      return res.json({
        success: true,
        data: cached.data,
        cached: true,
      });
    }
    
    console.log('🔍 Searching with filters:', filters);
    
    const results: Wallpaper[] = [];
    
    // Scrape from selected sites
    if (filters.sites?.includes('wallhaven')) {
      const wallhaven = await scrapeWallhaven(2, 25);
      results.push(...wallhaven);
    }
    
    if (filters.sites?.includes('unsplash')) {
      const unsplash = await scrapeUnsplash(25);
      results.push(...unsplash);
    }
    
    // Apply filters
    let filtered = results;
    
    if (filters.query) {
      const q = filters.query.toLowerCase();
      filtered = filtered.filter(
        (w) =>
          w.title.toLowerCase().includes(q) ||
          w.tags.some((t) => t.toLowerCase().includes(q)) ||
          w.categories.some((c) => c.toLowerCase().includes(q))
      );
    }
    
    if (filters.isLive !== undefined) {
      filtered = filtered.filter((w) => w.isLive === filters.isLive);
    }
    
    // Sort
    filtered.sort((a, b) => {
      if (filters.sortBy === 'views') return (b.views || 0) - (a.views || 0);
      if (filters.sortBy === 'likes') return (b.likes || 0) - (a.likes || 0);
      if (filters.sortBy === 'date') return new Date(b.uploadedAt || 0).getTime() - new Date(a.uploadedAt || 0).getTime();
      return 0;
    });
    
    if (filters.sortOrder === 'asc') {
      filtered.reverse();
    }
    
    // Pagination
    const paginated = filtered.slice(filters.offset, filters.offset + (filters.limit || 50));
    
    // Cache results
    cache.set(cacheKey, {
      data: paginated,
      timestamp: Date.now(),
    });
    
    res.json({
      success: true,
      data: paginated,
      total: filtered.length,
      cached: false,
    });
    
  } catch (error: any) {
    console.error('❌ Search error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Get wallpaper by ID
app.get('/api/wallpaper/:id', async (req, res) => {
  try {
    // In production, fetch from database
    res.json({
      success: true,
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Download wallpaper
app.get('/api/download/:id', async (req, res) => {
  try {
    // Proxy download in production
    res.json({
      success: true,
      message: 'Download endpoint - implement proxy in production',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Get available sites
app.get('/api/sites', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: 'wallhaven',
        name: 'Wallhaven',
        url: 'https://wallhaven.cc',
        enabled: true,
        types: ['static'],
      },
      {
        id: 'unsplash',
        name: 'Unsplash',
        url: 'https://unsplash.com',
        enabled: true,
        types: ['static'],
      },
      {
        id: 'pexels',
        name: 'Pexels',
        url: 'https://pexels.com',
        enabled: true,
        types: ['static'],
      },
      {
        id: 'wallpaper-engine',
        name: 'Wallpaper Engine',
        url: 'https://steamcommunity.com/workshop/browse/?appid=431960',
        enabled: false,
        types: ['live'],
      },
    ],
  });
});

// Get scraping progress
app.get('/api/progress', (req, res) => {
  res.json({
    success: true,
    data: {
      totalScraped: cache.size,
      lastUpdate: new Date().toISOString(),
    },
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Scraper API running on http://localhost:${PORT}`);
  console.log(`📊 Health: http://localhost:${PORT}/health`);
  console.log(`🔍 Search: http://localhost:${PORT}/api/search?q=nature`);
});

export default app;
