import { motion } from 'framer-motion'
import Card from '../components/Card'
import Button from '../components/Button'

const ModeSelect = ({ onNavigate, selectedLesson, onSelectMode }) => {
  const handleModeSelect = (mode) => {
    onSelectMode(mode)
    onNavigate('lessonQuiz')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring' }}
        >
          <h2 className="text-4xl font-black text-purple-700 mb-2">
            Lesson {selectedLesson?.lesson}
          </h2>
          <p className="text-xl japanese-font text-gray-700 mb-6">
            {selectedLesson?.title_jp}
          </p>
          
          <h3 className="text-3xl font-bold text-purple-600 mb-8">
            🎯 Select Mode
          </h3>

          <div className="space-y-4 mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleModeSelect('easy')}
              className="w-full p-6 bg-gradient-to-r from-green-400 to-blue-400 text-white rounded-2xl shadow-lg"
            >
              <div className="text-3xl mb-2">😊 Easy Mode</div>
              <div className="text-lg">Fill in the Blanks</div>
              <div className="text-sm opacity-90">เติมคำในช่องว่าง</div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleModeSelect('hard')}
              className="w-full p-6 bg-gradient-to-r from-red-400 to-pink-400 text-white rounded-2xl shadow-lg"
            >
              <div className="text-3xl mb-2">🔥 Hard Mode</div>
              <div className="text-lg">Arrange the Sentence</div>
              <div className="text-sm opacity-90">เรียงประโยคให้ถูกต้อง</div>
            </motion.button>
          </div>

          <Button onClick={() => onNavigate('lessonSelect')} variant="secondary" className="w-full">
            ← เปลี่ยนบทเรียน
          </Button>
        </motion.div>
      </Card>
    </div>
  )
}

export default ModeSelect
