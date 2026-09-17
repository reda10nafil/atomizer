import axios from 'axios';
import { Wallpaper } from '../types';

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY || 'demo-key';
const UNSPLASH_BASE_URL = 'https://api.unsplash.com';

export async function scrapeUnsplash(maxResults = 100) {
  const results: Wallpaper[] = [];
  
  const queries = [
    'nature wallpaper',
    'space wallpaper',
    'abstract wallpaper',
    'minimal wallpaper',
    'landscape wallpaper',
    'dark wallpaper',
    '4k wallpaper',
    '8k wallpaper',
  ];
  
  for (const query of queries) {
    try {
      const response = await axios.get(`${UNSPLASH_BASE_URL}/search/photos`, {
        params: {
          query,
          per_page: Math.min(maxResults / queries.length, 30),
          orientation: 'landscape',
          order_by: 'popular',
        },
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      });
      
      const photos = response.data.results;
      
      for (const photo of photos) {
        const wallpaper: Wallpaper = {
          id: photo.id,
          title: photo.description || photo.alt_description || 'Untitled',
          description: photo.description,
          url: photo.links.html,
          downloadUrl: photo.links.download,
          thumbnailUrl: photo.urls.thumb,
          previewUrl: photo.urls.regular,
          originalUrl: photo.urls.full,
          width: photo.width,
          height: photo.height,
          resolution: `${photo.width}x${photo.height}`,
          aspectRatio: `${photo.width / photo.height}`,
          fileSizeBytes: photo.width * photo.height * 3, // Estimate
          format: photo.format === 'jpg' ? 'jpg' : 'jpeg',
          isLive: false,
          source: 'unsplash',
          sourceUrl: 'https://unsplash.com',
          author: photo.user.name,
          authorUrl: photo.user.links.html,
          tags: photo.tags?.map((t: any) => t.title) || [],
          categories: ['wallpaper', 'photo'],
          colors: photo.color ? [photo.color] : [],
          dominantColor: photo.color,
          views: photo.views || 0,
          downloads: photo.downloads || 0,
          likes: photo.likes || 0,
          rating: 0,
          uploadedAt: photo.created_at,
          scrapedAt: new Date().toISOString(),
          license: photo.license,
          licenseUrl: photo.links.download, // Unsplash license
          isNSFW: false,
          isVerified: photo.user.verified || false,
        };
        
        results.push(wallpaper);
      }
      
      console.log(`✅ Scraped ${photos.length} from Unsplash for "${query}"`);
      
    } catch (error: any) {
      console.error(`❌ Error scraping Unsplash for "${query}":`, error.response?.data || error.message);
    }
  }
  
  console.log(`✅ Total: ${results.length} wallpapers from Unsplash`);
  return results;
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  scrapeUnsplash(50).then((results) => {
    console.log(`Total: ${results.length} wallpapers`);
  });
}
