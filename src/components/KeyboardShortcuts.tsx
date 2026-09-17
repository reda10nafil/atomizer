import { motion } from 'motion/react'
import { X } from 'lucide-react'
import { useAtomizerStore } from '../store/useAtomizerStore'

const shortcuts = [
  { key: 'Space', action: 'Play/Pause' },
  { key: 'R', action: 'Reset settings' },
  { key: 'F', action: 'Toggle fullscreen' },
  { key: 'S', action: 'Take screenshot' },
  { key: 'H', action: 'Show/hide shortcuts' },
  { key: 'U', action: 'Toggle UI' },
  { key: '1-9', action: 'Switch mode' },
  { key: '+/-', action: 'Adjust particle count' },
  { key: 'Arrow keys', action: 'Rotate view' },
  { key: 'Scroll', action: 'Zoom in/out' },
  { key: 'Ctrl+K', action: 'Command palette' },
  { key: 'Ctrl+S', action: 'Save preset' },
  { key: 'Ctrl+O', action: 'Load preset' },
  { key: 'Ctrl+Shift+S', action: 'Save high-res screenshot' },
  { key: 'Esc', action: 'Close modals' },
]

export function KeyboardShortcuts() {
  const { showShortcuts, toggleShortcuts } = useAtomizerStore()

  if (!showShortcuts) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      onClick={toggleShortcuts}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="glass rounded-xl max-w-2xl w-full max-h-[80vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Keyboard Shortcuts</h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleShortcuts}
              className="p-2 glass rounded-lg hover:bg-white/10"
            >
              <X size={20} />
            </motion.button>
          </div>

          <div className="grid gap-3">
            {shortcuts.map((shortcut) => (
              <div
                key={shortcut.action}
                className="flex items-center justify-between p-3 glass rounded-lg"
              >
                <span className="text-muted-foreground">{shortcut.action}</span>
                <kbd className="px-3 py-1 glass rounded font-mono text-sm">
                  {shortcut.key}
                </kbd>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 glass rounded-lg">
            <p className="text-sm text-muted-foreground">
              💡 <strong>Tip:</strong> Click anywhere outside this modal to close it.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
