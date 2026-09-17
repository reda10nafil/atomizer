import { PlaywrightCrawler, ProxyConfiguration } from '@crawlee/playwright';
import { Wallpaper } from '../types';

export async function scrapeWallhaven(maxPages = 5, maxResults = 100) {
  const results: Wallpaper[] = [];
  
  const crawler = new PlaywrightCrawler({
    maxRequestsPerCrawl: maxPages * 20,
    maxConcurrency: 3,
    requestHandler: async ({ page, request, log, pushData }) => {
      try {
        // Wait for grid to load
        await page.waitForSelector('.wall-list', { timeout: 10000 });
        
        // Extract wallpapers from grid
        const wallpapers = await page.evaluate(() => {
          const items = document.querySelectorAll('.wall-list .wall-box');
          
          return Array.from(items).map((item) => {
            const img = item.querySelector('img');
            const link = item.querySelector('a.preview');
            const meta = item.querySelector('.wall-info');
            
            if (!img || !link) return null;
            
            const title = img.getAttribute('alt') || 'Untitled';
            const thumbnailUrl = img.getAttribute('data-src') || img.src;
            const url = link.getAttribute('href') || '';
            
            // Extract resolution from data attribute or text
            const resolutionMatch = thumbnailUrl.match(/\d+x\d+/);
            const resolution = resolutionMatch ? resolutionMatch[0] : 'Unknown';
            const [width, height] = resolution.split('x').map(Number);
            
            // Extract tags
            const tagElements = item.querySelectorAll('.tag');
            const tags = Array.from(tagElements).map(tag => tag.textContent?.trim() || '');
            
            // Extract colors
            const colorElement = item.querySelector('.color');
            const dominantColor = colorElement 
              ? (colorElement as HTMLElement).style.backgroundColor 
              : undefined;
            
            return {
              id: url.split('/').pop() || crypto.randomUUID(),
              title,
              url: `https://wallhaven.cc${url}`,
              downloadUrl: `https://wallhaven.cc${url}`,
              thumbnailUrl: thumbnailUrl.startsWith('http') ? thumbnailUrl : `https:${thumbnailUrl}`,
              previewUrl: thumbnailUrl.replace('/th/', '/w/').replace('.jpg', '.jpg'),
              originalUrl: thumbnailUrl.replace('/th/', '/original/'),
              width: width || 1920,
              height: height || 1080,
              resolution,
              aspectRatio: width && height ? `${width/height}` : '16:9',
              format: 'jpg' as const,
              isLive: false,
              source: 'wallhaven',
              sourceUrl: 'https://wallhaven.cc',
              tags: tags.filter(t => t),
              categories: ['wallpaper'],
              colors: dominantColor ? [dominantColor] : [],
              dominantColor,
              views: 0,
              downloads: 0,
              likes: 0,
              rating: 0,
              scrapedAt: new Date().toISOString(),
              isNSFW: item.classList.contains('general') === false,
              isVerified: false,
            };
          }).filter(Boolean);
        });
        
        results.push(...wallpapers.filter((w): w is Wallpaper => w !== null));
        
        log.info(`Scraped ${wallpapers.length} wallpapers from ${request.url}`);
        
      } catch (error) {
        log.error(`Error scraping ${request.url}:`, error);
      }
    },
    failedRequestHandler: async ({ request, log }) => {
      log.error(`Failed to scrape ${request.url}`);
    },
  });

  // Start crawling
  const baseUrl = 'https://wallhaven.cc/search?q=';
  const queries = ['', 'nature', 'space', 'abstract', 'cyberpunk', 'minimal', 'landscape'];
  
  for (const query of queries) {
    await crawler.addRequests(
      Array.from({ length: maxPages }, (_, i) => ({
        url: `${baseUrl}${encodeURIComponent(query)}&page=${i + 1}`,
        userData: { query, page: i + 1 },
      }))
    );
  }

  await crawler.run();
  
  console.log(`✅ Scraped ${results.length} wallpapers from Wallhaven`);
  return results;
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  scrapeWallhaven(3, 50).then((results) => {
    console.log(`Total: ${results.length} wallpapers`);
  });
}
