import { useRef } from 'react'
import { motion } from 'motion/react'
import { Upload, Image, X } from 'lucide-react'
import { useAtomizerStore } from '../store/useAtomizerStore'

export function ImageImport() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { imageUrl, setImageUrl, setImageParticles } = useAtomizerStore()

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setImageUrl(url)
      setImageParticles(true)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file)
      setImageUrl(url)
      setImageParticles(true)
    }
  }

  return (
    <div className="p-4 space-y-4">
      <h3 className="text-sm font-semibold">Image Import</h3>
      
      {!imageUrl ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-muted-foreground/30 rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
        >
          <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-sm text-muted-foreground mb-2">
            Drag & drop an image here
          </p>
          <p className="text-xs text-muted-foreground">
            or click to browse (PNG, JPG, WebP)
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </motion.div>
      ) : (
        <div className="relative">
          <img
            src={imageUrl}
            alt="Uploaded"
            className="w-full h-48 object-cover rounded-lg"
          />
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            onClick={() => {
              setImageUrl(null)
              setImageParticles(false)
            }}
            className="absolute top-2 right-2 p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
          >
            <X size={16} />
          </motion.button>
          <div className="mt-2 flex items-center gap-2">
            <Image size={16} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              Image loaded - particles will follow image colors
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
