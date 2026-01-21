import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const LoadingScreen = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => onLoadComplete(), 500)
          return 100
        }
        return prev + 2
      })
    }, 30)

    return () => clearInterval(interval)
  }, [onLoadComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-kawaii-pink via-kawaii-cream to-kawaii-blue"
    >
      {/* Floating Sakura */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl"
            initial={{ 
              y: -100, 
              x: Math.random() * window.innerWidth,
              rotate: 0,
              opacity: 0.7
            }}
            animate={{
              y: window.innerHeight + 100,
              rotate: 360,
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "linear"
            }}
          >
            🌸
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', duration: 1 }}
          className="mb-8"
        >
          <div className="text-9xl mb-4">🎌</div>
          <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 mb-2">
            Japanese Learning
          </h1>
          <p className="text-3xl text-purple-600 font-bold japanese-font">
            日本語学習ゲーム
          </p>
        </motion.div>

        {/* Animated Cat */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-8xl my-8"
        >
          🐱
        </motion.div>

        {/* Progress Bar */}
        <div className="w-80 mx-auto">
          <div className="bg-white/50 backdrop-blur-sm rounded-full h-6 overflow-hidden border-4 border-white shadow-lg">
            <motion.div
              className="h-full bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="text-2xl font-bold text-purple-700 mt-4">
            {progress}%
          </p>
        </div>

        {/* Loading Text */}
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="mt-8 text-xl text-purple-600 font-medium"
        >
          読み込み中... Loading...
        </motion.div>

        {/* Japanese Icons */}
        <div className="flex justify-center gap-6 mt-8 text-5xl">
          <motion.span
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0 }}
          >
            🌸
          </motion.span>
          <motion.span
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
          >
            ⛩️
          </motion.span>
          <motion.span
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
          >
            🍡
          </motion.span>
          <motion.span
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
          >
            🎎
          </motion.span>
        </div>
      </div>

      {/* Footer Credit */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-8 text-center"
      >
        <p className="text-lg text-purple-600 font-medium">
          Developed by <span className="font-bold text-pink-600">Pusit</span>
        </p>
        <p className="text-sm text-purple-500 mt-1">
          Made with 💖 and 🌸
        </p>
      </motion.div>
    </motion.div>
  )
}

export default LoadingScreen
