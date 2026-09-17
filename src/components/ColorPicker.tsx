import { motion } from 'motion/react'
import { useAtomizerStore } from '../store/useAtomizerStore'
import { Check } from 'lucide-react'

const presetColors = [
  '#00a8ff', '#00d2ff', '#0097e6', '#005b96', '#002f4b',
  '#ff6b6b', '#ff8787', '#fa5252', '#e03131', '#c92a2a',
  '#51cf66', '#69db7c', '#8ce99a', '#a3d9a5', '#b2f2bb',
  '#fcc419', '#ffd43b', '#ffec99', '#ffe066', '#ffc933',
  '#da77f2', '#be4bdb', '#9c36b5', '#862e9f', '#5f3dc4',
  '#ffffff', '#f8f9fa', '#e9ecef', '#dee2e6', '#ced4da',
  '#868e96', '#495057', '#343a40', '#212529', '#000000',
]

export function ColorPicker() {
  const { primaryColor, secondaryColor, backgroundColor, setPrimaryColor, setSecondaryColor, setBackgroundColor } = useAtomizerStore()

  return (
    <div className="space-y-4 p-4">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Primary Color</h3>
        <div className="grid grid-cols-7 gap-2">
          {presetColors.map((color) => (
            <motion.button
              key={color}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPrimaryColor(color)}
              className={`w-8 h-8 rounded-lg border-2 transition-all ${
                primaryColor === color ? 'border-white scale-110' : 'border-transparent'
              }`}
              style={{ backgroundColor: color }}
            >
              {primaryColor === color && <Check size={16} className="text-white drop-shadow" />}
            </motion.button>
          ))}
        </div>
        <input
          type="color"
          value={primaryColor}
          onChange={(e) => setPrimaryColor(e.target.value)}
          className="w-full h-10 rounded cursor-pointer"
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Secondary Color</h3>
        <div className="grid grid-cols-7 gap-2">
          {presetColors.map((color) => (
            <motion.button
              key={color}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSecondaryColor(color)}
              className={`w-8 h-8 rounded-lg border-2 transition-all ${
                secondaryColor === color ? 'border-white scale-110' : 'border-transparent'
              }`}
              style={{ backgroundColor: color }}
            >
              {secondaryColor === color && <Check size={16} className="text-white drop-shadow" />}
            </motion.button>
          ))}
        </div>
        <input
          type="color"
          value={secondaryColor}
          onChange={(e) => setSecondaryColor(e.target.value)}
          className="w-full h-10 rounded cursor-pointer"
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Background</h3>
        <div className="grid grid-cols-7 gap-2">
          {presetColors.map((color) => (
            <motion.button
              key={color}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setBackgroundColor(color)}
              className={`w-8 h-8 rounded-lg border-2 transition-all ${
                backgroundColor === color ? 'border-white scale-110' : 'border-transparent'
              }`}
              style={{ backgroundColor: color }}
            >
              {backgroundColor === color && <Check size={16} className="text-white drop-shadow" />}
            </motion.button>
          ))}
        </div>
        <input
          type="color"
          value={backgroundColor}
          onChange={(e) => setBackgroundColor(e.target.value)}
          className="w-full h-10 rounded cursor-pointer"
        />
      </div>
    </div>
  )
}
