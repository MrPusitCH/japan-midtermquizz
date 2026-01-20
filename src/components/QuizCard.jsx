import { motion } from 'framer-motion'
import { playSound } from '../utils/sound'

const QuizCard = ({ question, choices, onAnswer, answered, correctIndex, selectedIndex }) => {
  const handleChoice = (index) => {
    if (!answered) {
      const isCorrect = index === correctIndex
      playSound(isCorrect ? 'correct' : 'wrong')
      onAnswer(index, isCorrect)
    }
  }

  const getChoiceStyle = (index) => {
    if (!answered) return 'bg-white hover:bg-kawaii-blue border-kawaii-blue'
    if (index === correctIndex) return 'bg-green-200 border-green-400'
    if (index === selectedIndex && index !== correctIndex) return 'bg-red-200 border-red-400'
    return 'bg-gray-100 border-gray-300'
  }

  return (
    <motion.div
      initial={{ rotateY: 90, opacity: 0 }}
      animate={{ rotateY: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="bg-kawaii-cream p-6 rounded-2xl mb-6 border-4 border-white">
        <h3 className="text-2xl font-bold text-center text-purple-700" dangerouslySetInnerHTML={{ __html: question }} />
      </div>

      <div className="space-y-3">
        {choices.map((choice, index) => (
          <motion.button
            key={index}
            whileHover={!answered ? { scale: 1.02, x: 10 } : {}}
            whileTap={!answered ? { scale: 0.98 } : {}}
            onClick={() => handleChoice(index)}
            disabled={answered}
            className={`
              w-full p-4 rounded-xl border-3 text-left font-medium
              transition-all duration-200 ${getChoiceStyle(index)}
              ${!answered ? 'cursor-pointer' : 'cursor-not-allowed'}
            `}
          >
            {choice}
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}

export default QuizCard
