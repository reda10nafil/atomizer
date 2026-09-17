import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Search, Filter, Download, Eye, Star, Maximize, X, Heart, ExternalLink } from 'lucide-react'
import { Wallpaper } from '../types'

const SCRAPER_API = 'http://localhost:3001/api'

export function WallpaperSearch() {
  const [query, setQuery] = useState('')
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([])
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState<Wallpaper | null>(null)
  const [filters, setFilters] = useState({
    sites: ['wallhaven', 'unsplash'],
    isLive: false,
    sortBy: 'relevance' as const,
  })
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        searchWallpapers(query)
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [query])

  async function searchWallpapers(q: string) {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        q,
        sites: filters.sites.join(','),
        limit: '50',
      })

      const response = await fetch(`${SCRAPER_API}/search?${params}`)
      const data = await response.json()

      if (data.success) {
        setWallpapers(data.data)
      }
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setLoading(false)
    }
  }

  async function downloadWallpaper(wp: Wallpaper) {
    try {
      const response = await fetch(wp.downloadUrl)
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${wp.title.replace(/\s+/g, '-')}.${wp.format}`
      a.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download error:', error)
    }
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-gray-900 to-black">
      {/* Search Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search wallpapers..."
              className="w-full pl-12 pr-4 py-3 bg-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFilters(!showFilters)}
            className={`p-3 rounded-lg transition-colors ${
              showFilters ? 'bg-blue-600' : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            <Filter size={20} />
          </motion.button>
        </div>

        {/* Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-4 flex-wrap"
          >
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={filters.sites.includes('wallhaven')}
                onChange={(e) => {
                  const sites = e.target.checked
                    ? [...filters.sites, 'wallhaven']
                    : filters.sites.filter((s) => s !== 'wallhaven')
                  setFilters({ ...filters, sites })
                }}
                className="rounded"
              />
              Wallhaven
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={filters.sites.includes('unsplash')}
                onChange={(e) => {
                  const sites = e.target.checked
                    ? [...filters.sites, 'unsplash']
                    : filters.sites.filter((s) => s !== 'unsplash')
                  setFilters({ ...filters, sites })
                }}
                className="rounded"
              />
              Unsplash
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={filters.isLive}
                onChange={(e) => setFilters({ ...filters, isLive: e.target.checked })}
                className="rounded"
              />
              Live Wallpapers Only
            </label>
          </motion.div>
        )}
      </div>

      {/* Results Grid */}
      <div className="flex-1 overflow-y-auto p-6">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-400">Searching...</p>
            </div>
          </div>
        ) : wallpapers.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Search size={64} className="mx-auto text-gray-600 mb-4" />
              <p className="text-xl text-gray-400 mb-2">No wallpapers found</p>
              <p className="text-gray-500">Try a different search term</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {wallpapers.map((wp, idx) => (
              <motion.div
                key={wp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.05, zIndex: 10 }}
                className="group relative aspect-video bg-gray-800 rounded-lg overflow-hidden cursor-pointer"
                onClick={() => setSelected(wp)}
              >
                <img
                  src={wp.previewUrl}
                  alt={wp.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h3 className="text-white text-sm font-medium truncate mb-1">{wp.title}</h3>
                    <div className="flex items-center justify-between text-xs text-gray-300">
                      <span>{wp.resolution}</span>
                      <span className="flex items-center gap-1">
                        <Download size={12} />
                        {wp.downloads ? (wp.downloads / 1000).toFixed(1) + 'k' : '0'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Live Badge */}
                {wp.isLive && (
                  <div className="absolute top-2 right-2 px-2 py-1 bg-red-600 rounded text-xs font-bold">
                    LIVE
                  </div>
                )}
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
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-gray-900 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-gray-900 p-4 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-xl font-bold">{selected.title}</h2>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => downloadWallpaper(selected)}
                  className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                  title="Download"
                >
                  <Download size={20} />
                </motion.button>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href={selected.sourceUrl}
                  target="_blank"
                  className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                  title="View on source"
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
              />

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">Resolution</div>
                  <div className="text-lg font-medium">{selected.resolution}</div>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">Format</div>
                  <div className="text-lg font-medium uppercase">{selected.format}</div>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">Source</div>
                  <div className="text-lg font-medium capitalize">{selected.source}</div>
                </div>
                {selected.author && (
                  <div className="bg-white/5 p-4 rounded-lg">
                    <div className="text-sm text-gray-400 mb-1">Author</div>
                    <div className="text-lg font-medium">{selected.author}</div>
                  </div>
                )}
                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">Downloads</div>
                  <div className="text-lg font-medium">
                    {selected.downloads ? selected.downloads.toLocaleString() : '0'}
                  </div>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">Likes</div>
                  <div className="text-lg font-medium">
                    {selected.likes ? selected.likes.toLocaleString() : '0'}
                  </div>
                </div>
              </div>

              {selected.tags.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-semibold mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selected.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-white/10 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
