import { useState } from 'react'
import { motion } from 'motion/react'
import { Download, ExternalLink, Search, X, Maximize, Image, Loader } from 'lucide-react'

interface Wallpaper {
  id: string
  title: string
  url: string
  thumbnailUrl: string
  originalUrl: string
  width?: number
  height?: number
  resolution?: string
  source: string
}

const EXAMPLE_URLS = `https://wallhaven.cc/search?q=nature
https://wallhaven.cc/search?q=space
https://unsplash.com/s/photos/nature-wallpaper
https://www.pexels.com/search/nature%20wallpaper/`

export function WallpaperScraper() {
  const [urls, setUrls] = useState('')
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([])
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState<Wallpaper | null>(null)
  const [progress, setProgress] = useState({ current: 0, total: 0 })

  async function scrapeUrl(url: string): Promise<Wallpaper[]> {
    try {
      // Use CORS proxy for fetching
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`
      const response = await fetch(proxyUrl)
      const data = await response.json()
      
      if (!data.contents) return []
      
      const html = data.contents
      const results: Wallpaper[] = []
      
      // Extract images from HTML
      const imgRegex = /<img[^>]+src="([^"]+)"/g
      let match
      
      while ((match = imgRegex.exec(html)) !== null) {
        const imgUrl = match[1]
        
        // Filter for wallpaper-like images
        if (imgUrl.match(/\.(jpg|jpeg|png|webp)/i) || 
            imgUrl.includes('wallpaper') ||
            imgUrl.includes('/w/') ||
            imgUrl.includes('/original/')) {
          
          // Try to extract resolution from URL or filename
          const resolutionMatch = imgUrl.match(/(\d+)x(\d+)/)
          const resolution = resolutionMatch 
            ? `${resolutionMatch[1]}x${resolutionMatch[2]}`
            : 'Unknown'
          
          results.push({
            id: crypto.randomUUID(),
            title: `Wallpaper ${results.length + 1}`,
            url: url,
            thumbnailUrl: imgUrl.startsWith('http') ? imgUrl : new URL(imgUrl, url).href,
            originalUrl: imgUrl.startsWith('http') ? imgUrl : new URL(imgUrl, url).href,
            resolution,
            source: new URL(url).hostname,
          })
        }
      }
      
      return results.slice(0, 50) // Limit per URL
    } catch (error) {
      console.error('Error scraping:', error)
      return []
    }
  }

  async function scrapeAll() {
    const urlList = urls.split('\n').filter(u => u.trim())
    if (urlList.length === 0) return
    
    setLoading(true)
    setProgress({ current: 0, total: urlList.length })
    setWallpapers([])
    
    const allWallpapers: Wallpaper[] = []
    
    for (let i = 0; i < urlList.length; i++) {
      const url = urlList[i].trim()
      const results = await scrapeUrl(url)
      allWallpapers.push(...results)
      setProgress({ current: i + 1, total: urlList.length })
    }
    
    setWallpapers(allWallpapers)
    setLoading(false)
  }

  async function downloadImage(url: string, filename: string) {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const imageUrl = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = imageUrl
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(imageUrl)
    } catch (error) {
      console.error('Download error:', error)
    }
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Image className="text-blue-500" size={28} />
          Wallpaper Scraper
        </h2>
        
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Search size={16} />
            <span>Paste wallpaper URLs below (one per line):</span>
          </div>
          
          <textarea
            value={urls}
            onChange={(e) => setUrls(e.target.value)}
            placeholder={EXAMPLE_URLS}
            className="w-full h-32 px-4 py-3 bg-white/5 border border-white/10 rounded-lg 
                     text-white placeholder-gray-500 focus:outline-none focus:ring-2 
                     focus:ring-blue-500 font-mono text-sm resize-none"
          />
          
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={scrapeAll}
              disabled={loading || !urls.trim()}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 
                       disabled:cursor-not-allowed text-white font-medium py-3 px-6 
                       rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader className="animate-spin" size={20} />
                  Scraping... {progress.current}/{progress.total}
                </>
              ) : (
                <>
                  <Search size={20} />
                  Scrape All URLs
                </>
              )}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setUrls(EXAMPLE_URLS)}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg 
                       transition-colors text-sm font-medium"
            >
              Load Examples
            </motion.button>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="flex-1 overflow-y-auto p-6">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Loader className="w-16 h-16 text-blue-500 animate-spin mx-auto mb-4" />
              <p className="text-xl text-gray-400">
                Scraping {progress.total} URLs... ({progress.current} done)
              </p>
              <p className="text-sm text-gray-500 mt-2">
                This may take a minute depending on the sites
              </p>
            </div>
          </div>
        ) : wallpapers.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Image size={64} className="mx-auto text-gray-600 mb-4" />
              <p className="text-xl text-gray-400 mb-2">No wallpapers found yet</p>
              <p className="text-gray-500">Paste URLs above and click "Scrape All"</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {wallpapers.map((wp, idx) => (
              <motion.div
                key={wp.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.05, zIndex: 10 }}
                className="group relative aspect-video bg-gray-800 rounded-lg 
                         overflow-hidden cursor-pointer border border-white/10"
                onClick={() => setSelected(wp)}
              >
                <img
                  src={wp.thumbnailUrl}
                  alt={wp.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMjI1Ij48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIyNSIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIyMCIgZmlsbD0iIzY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIFByZXZpZXc8L3RleHQ+PC9zdmc+'
                  }}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent 
                              opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h3 className="text-white text-xs font-medium truncate mb-1">{wp.title}</h3>
                    <div className="flex items-center justify-between text-xs text-gray-300">
                      <span>{wp.resolution}</span>
                      <span className="text-gray-400 text-xs">{wp.source}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {selected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-900 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-gray-900 p-4 border-b border-white/10 
                          flex items-center justify-between">
              <h2 className="text-xl font-bold">{selected.title}</h2>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => downloadImage(selected.originalUrl, `wallpaper-${selected.id}.jpg`)}
                  className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                  title="Download"
                >
                  <Download size={20} />
                </motion.button>
                
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href={selected.url}
                  target="_blank"
                  className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                  title="View source"
                >
                  <ExternalLink size={20} />
                </motion.a>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelected(null)}
                  className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <X size={20} />
                </motion.button>
              </div>
            </div>

            <div className="p-6">
              <img
                src={selected.originalUrl}
                alt={selected.title}
                className="w-full rounded-lg mb-6"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MDAiIGhlaWdodD0iNDUwIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIzMCIgZmlsbD0iIzY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIE5vdCBBdmFpbGFibGU8L3RleHQ+PC9zdmc+'
                }}
              />

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">Source</div>
                  <div className="text-lg font-medium">{selected.source}</div>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">Resolution</div>
                  <div className="text-lg font-medium">{selected.resolution || 'Unknown'}</div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-600/20 border border-blue-600/30 rounded-lg">
                <p className="text-sm text-blue-200">
                  💡 <strong>Tip:</strong> If the image doesn't load, try opening the source URL 
                  and downloading manually.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
