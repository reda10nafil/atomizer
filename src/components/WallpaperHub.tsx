import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Download, Star, Eye, Monitor, Sparkles, Search, Filter } from 'lucide-react'
import { WallpaperItem } from '../types'

// Mock data - in production, this would come from API
const mockWallpapers: WallpaperItem[] = [
  {
    id: '1',
    title: 'Aurora Borealis 8K',
    author: 'NatureLover',
    thumbnail: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400',
    preview: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800',
    downloadUrl: '#',
    resolution: '7680×�320',
    category: 'Nature',
    tags: ['aurora', 'night', 'sky', '8k'],
    downloads: 15420,
    rating: 4.9,
    source: 'wallpaper-abyss',
    isLive: false,
    fileSize: '12.5 MB',
  },
  {
    id: '2',
    title: 'Cyberpunk City Live',
    author: 'NeonDreams',
    thumbnail: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=400',
    preview: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800',
    downloadUrl: '#',
    resolution: '3840×²160',
    category: 'Sci-Fi',
    tags: ['cyberpunk', 'city', 'neon', 'live'],
    downloads: 28350,
    rating: 4.8,
    source: 'wallpaper-engine',
    isLive: true,
    fileSize: '45.2 MB',
  },
  {
    id: '3',
    title: 'Mountain Lake 4K',
    author: 'EarthViews',
    thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400',
    preview: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800',
    downloadUrl: '#',
    resolution: '3840×²160',
    category: 'Nature',
    tags: ['mountain', 'lake', 'reflection', '4k'],
    downloads: 19230,
    rating: 4.7,
    source: 'wallpaper-abyss',
    isLive: false,
    fileSize: '8.3 MB',
  },
  {
    id: '4',
    title: 'Abstract Particles Live',
    author: 'MotionMaster',
    thumbnail: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=400',
    preview: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800',
    downloadUrl: '#',
    resolution: '3840×²160',
    category: 'Abstract',
    tags: ['particles', 'abstract', 'colorful', 'live'],
    downloads: 32100,
    rating: 4.9,
    source: 'wallpaper-engine',
    isLive: true,
    fileSize: '28.7 MB',
  },
  {
    id: '5',
    title: 'Space Nebula 8K',
    author: 'CosmicArt',
    thumbnail: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400',
    preview: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800',
    downloadUrl: '#',
    resolution: '7680×³320',
    category: 'Space',
    tags: ['space', 'nebula', 'stars', '8k'],
    downloads: 41500,
    rating: 5.0,
    source: 'wallpaper-abyss',
    isLive: false,
    fileSize: '18.9 MB',
  },
  {
    id: '6',
    title: 'Ocean Waves Live',
    author: 'SeaScapes',
    thumbnail: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=400',
    preview: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800',
    downloadUrl: '#',
    resolution: '3840×²160',
    category: 'Nature',
    tags: ['ocean', 'waves', 'beach', 'live'],
    downloads: 25670,
    rating: 4.8,
    source: 'lively',
    isLive: true,
    fileSize: '52.1 MB',
  },
]

const categories = ['All', 'Nature', 'Sci-Fi', 'Abstract', 'Space', 'Animals', 'Cars', 'Games', 'Movies']

export function WallpaperHub() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [showLiveOnly, setShowLiveOnly] = useState(false)
  const [selectedWallpaper, setSelectedWallpaper] = useState<WallpaperItem | null>(null)

  const filteredWallpapers = mockWallpapers.filter((wp) => {
    const matchesCategory = selectedCategory === 'All' || wp.category === selectedCategory
    const matchesSearch = wp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         wp.tags.some(tag => tag.includes(searchQuery.toLowerCase()))
    const matchesLive = !showLiveOnly || wp.isLive
    return matchesCategory && matchesSearch && matchesLive
  })

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Monitor className="text-primary" />
          Wallpaper Hub
        </h2>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search wallpapers..."
            className="w-full pl-10 pr-4 py-2 glass rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mb-3">
          <Filter size={16} className="text-muted-foreground" />
          <label className="flex items-center gap-2 text-xs cursor-pointer">
            <input
              type="checkbox"
              checked={showLiveOnly}
              onChange={(e) => setShowLiveOnly(e.target.checked)}
              className="rounded"
            />
            <span className="flex items-center gap-1">
              <Sparkles size={12} className="text-primary" />
              Live only
            </span>
          </label>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-primary text-white'
                  : 'glass hover:bg-white/10'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-2 gap-4">
          {filteredWallpapers.map((wp) => (
            <motion.div
              key={wp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className="glass rounded-lg overflow-hidden cursor-pointer group"
              onClick={() => setSelectedWallpaper(wp)}
            >
              <div className="relative aspect-video">
                <img
                  src={wp.thumbnail}
                  alt={wp.title}
                  className="w-full h-full object-cover"
                />
                {wp.isLive && (
                  <div className="absolute top-2 right-2 px-2 py-1 bg-primary/80 rounded text-xs flex items-center gap-1">
                    <Sparkles size={12} />
                    LIVE
                  </div>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Download className="text-white" size={32} />
                </div>
              </div>
              <div className="p-3">
                <h3 className="text-sm font-medium truncate">{wp.title}</h3>
                <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Download size={12} />
                      {(wp.downloads / 1000).toFixed(1)}k
                    </span>
                    <span className="flex items-center gap-1">
                      <Star size={12} className="text-yellow-400" />
                      {wp.rating.toFixed(1)}
                    </span>
                  </div>
                  <span>{wp.resolution}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Preview Modal */}
      {selectedWallpaper && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedWallpaper(null)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="glass rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <img
                src={selectedWallpaper.preview}
                alt={selectedWallpaper.title}
                className="w-full rounded-lg mb-4"
              />
              <h2 className="text-2xl font-bold mb-2">{selectedWallpaper.title}</h2>
              <p className="text-muted-foreground mb-4">by {selectedWallpaper.author}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="glass p-3 rounded">
                  <div className="text-xs text-muted-foreground">Resolution</div>
                  <div className="font-medium">{selectedWallpaper.resolution}</div>
                </div>
                <div className="glass p-3 rounded">
                  <div className="text-xs text-muted-foreground">File Size</div>
                  <div className="font-medium">{selectedWallpaper.fileSize}</div>
                </div>
                <div className="glass p-3 rounded">
                  <div className="text-xs text-muted-foreground">Downloads</div>
                  <div className="font-medium">{selectedWallpaper.downloads.toLocaleString()}</div>
                </div>
                <div className="glass p-3 rounded">
                  <div className="text-xs text-muted-foreground">Rating</div>
                  <div className="font-medium flex items-center gap-1">
                    <Star size={14} className="text-yellow-400" />
                    {selectedWallpaper.rating.toFixed(1)}
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mb-4">
                {selectedWallpaper.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 glass rounded text-xs">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={selectedWallpaper.downloadUrl}
                  className="flex-1 bg-primary text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2"
                >
                  <Download size={20} />
                  Download
                </motion.a>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 glass rounded-lg font-medium"
                >
                  <Star size={20} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
