import { motion } from 'framer-motion'
import Card from '../components/Card'
import Button from '../components/Button'

const Home = ({ onNavigate }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.8 }}
        >
          <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-4">
            🎌 Japanese Learning
          </h1>
          <p className="text-2xl text-purple-600 mb-8 font-bold">เกมเรียนภาษาญี่ปุ่น</p>
        </motion.div>

        <motion.div
          className="text-8xl mb-8"
          animate={{ 
            rotate: [0, 10, -10, 10, 0],
            scale: [1, 1.1, 1, 1.1, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1
          }}
        >
          🐱
        </motion.div>

        <div className="space-y-4">
          <Button 
            onClick={() => onNavigate('weekSelect')}
            className="w-full text-xl"
          >
            📝 Week Quiz Mode
          </Button>
          <Button 
            onClick={() => onNavigate('flashcard')}
            variant="secondary"
            className="w-full text-xl"
          >
            🔤 Hiragana Flash Card Mode
          </Button>
        </div>

        <motion.div
          className="mt-8 flex justify-center gap-4 text-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.span animate={{ y: [0, -10, 0] }} transition={{ duration: 1, repeat: Infinity }}>🌸</motion.span>
          <motion.span animate={{ y: [0, -10, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}>⛩️</motion.span>
          <motion.span animate={{ y: [0, -10, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}>🍡</motion.span>
        </motion.div>
      </Card>
    </div>
  )
}

export default Home
