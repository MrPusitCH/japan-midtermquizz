import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toggleBGM, isBGMPlaying } from '../utils/sound'

const SoundToggle = () => {
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    setIsPlaying(isBGMPlaying())
  }, [])

  const handleToggle = () => {
    toggleBGM()
    setIsPlaying(isBGMPlaying())
  }

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleToggle}
      className="fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg border-2 border-purple-300"
    >
      <span className="text-2xl">{isPlaying ? '🔊' : '🔇'}</span>
    </motion.button>
  )
}

export default SoundToggle
