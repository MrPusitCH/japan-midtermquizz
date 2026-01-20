import { useState } from 'react'
import { motion } from 'framer-motion'
import { playSound } from '../utils/sound'

const FlashCard = ({ character, reading, choices, onAnswer }) => {
  const [flipped, setFlipped] = useState(false)
  const [answered, setAnswered] = useState(false)
  const [selected, setSelected] = useState(null)

  const handleFlip = () => {
    playSound('flip')
    setFlipped(!flipped)
  }

  const handleChoice = (choice, index) => {
    if (!answered) {
      const isCorrect = choice === reading
      playSound(isCorrect ? 'correct' : 'wrong')
      setSelected(index)
      setAnswered(true)
      onAnswer(isCorrect)
    }
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <motion.div
        className="w-64 h-64 cursor-pointer perspective-1000"
        onClick={handleFlip}
        whileHover={{ scale: 1.05 }}
      >
        <motion.div
          className="relative w-full h-full"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="absolute w-full h-full bg-gradient-to-br from-kawaii-pink to-kawaii-purple rounded-3xl flex items-center justify-center border-4 border-white sakura-shadow"
            style={{ backfaceVisibility: 'hidden' }}>
            <span className="text-9xl">{character}</span>
          </div>
          <div className="absolute w-full h-full bg-gradient-to-br from-kawaii-blue to-kawaii-yellow rounded-3xl flex items-center justify-center border-4 border-white sakura-shadow"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
            <span className="text-5xl font-bold text-purple-700">{reading}</span>
          </div>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-2 gap-3 w-full max-w-md">
        {choices.map((choice, index) => (
          <motion.button
            key={index}
            whileHover={!answered ? { scale: 1.05 } : {}}
            whileTap={!answered ? { scale: 0.95 } : {}}
            onClick={() => handleChoice(choice, index)}
            disabled={answered}
            className={`
              p-4 rounded-xl font-bold text-lg border-3 transition-all
              ${!answered ? 'bg-white hover:bg-kawaii-cream border-purple-300' : ''}
              ${answered && choice === reading ? 'bg-green-200 border-green-400' : ''}
              ${answered && selected === index && choice !== reading ? 'bg-red-200 border-red-400' : ''}
              ${answered && choice !== reading && selected !== index ? 'bg-gray-100 border-gray-300' : ''}
            `}
          >
            {choice}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export default FlashCard
