import { motion } from 'motion/react'
import { Play, Pause, Monitor, Settings, Github } from 'lucide-react'
import { useAtomizerStore } from '../store/useAtomizerStore'

export function Header() {
  const { isPlaying, togglePlay, toggleUI } = useAtomizerStore()

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-4"
    >
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
          Atomizer
        </h1>
        <span className="text-xs text-muted-foreground px-2 py-1 glass rounded">
          v0.1.0
        </span>
      </div>

      <div className="flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={togglePlay}
          className="p-2 glass rounded-lg hover:bg-white/10 transition-colors"
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleUI}
          className="p-2 glass rounded-lg hover:bg-white/10 transition-colors"
          title="Toggle UI"
        >
          <Settings size={20} />
        </motion.button>

        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="https://github.com/reda10nafil/atomizer"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 glass rounded-lg hover:bg-white/10 transition-colors"
          title="GitHub"
        >
          <Github size={20} />
        </motion.a>
      </div>
    </motion.header>
  )
}
