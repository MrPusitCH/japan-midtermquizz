import { useState } from 'react'
import { motion } from 'framer-motion'
import { playSound } from '../utils/sound'
import { animateCardEnter, animateCorrectAnswer, animateWrongAnswer } from '../utils/anime-effects'
import Button from './Button'

const FlashCard = ({ character, reading, choices, onAnswer, difficulty = 'normal' }) => {
  const [flipped, setFlipped] = useState(false)
  const [answered, setAnswered] = useState(false)
  const [selected, setSelected] = useState(null)
  const [tempSelected, setTempSelected] = useState(null)
  const [typedAnswer, setTypedAnswer] = useState('')

  const handleFlip = () => {
    playSound('flip')
    setFlipped(!flipped)
  }

  const handleChoice = (choice, index) => {
    if (!answered) {
      playSound('click')
      setTempSelected({ choice, index })
    }
  }

  const handleConfirm = () => {
    if (difficulty === 'hard') {
      // Hard mode: check typed answer
      if (typedAnswer.trim() && !answered) {
        const isCorrect = typedAnswer.trim().toLowerCase() === reading.toLowerCase()
        playSound(isCorrect ? 'correct' : 'wrong')
        setAnswered(true)
        
        const inputElement = document.querySelector('.hard-mode-input')
        if (inputElement) {
          if (isCorrect) {
            animateCorrectAnswer(inputElement)
          } else {
            animateWrongAnswer(inputElement)
          }
        }
        
        onAnswer(isCorrect)
      }
    } else {
      // Normal mode: check selected choice
      if (tempSelected && !answered) {
        const isCorrect = tempSelected.choice === reading
        playSound(isCorrect ? 'correct' : 'wrong')
        setSelected(tempSelected.index)
        setAnswered(true)
        
        const buttonElement = document.querySelector(`[data-choice-index="${tempSelected.index}"]`)
        if (buttonElement) {
          if (isCorrect) {
            animateCorrectAnswer(buttonElement)
          } else {
            animateWrongAnswer(buttonElement)
          }
        }
        
        onAnswer(isCorrect)
      }
    }
  }

  const getChoiceStyle = (choice, index) => {
    if (answered) {
      if (choice === reading) return 'bg-green-200 border-green-400'
      if (selected === index && choice !== reading) return 'bg-red-200 border-red-400'
      return 'bg-gray-100 border-gray-300'
    }
    if (tempSelected && tempSelected.index === index) return 'bg-kawaii-blue border-purple-400 border-4'
    return 'bg-white hover:bg-kawaii-cream border-purple-300'
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
            {character === "り" ? (
              <img src="/images/ri.jpg" alt="り" className="w-48 h-48 object-contain" />
            ) : character === "こ" ? (
              <img src="/images/ko.jpg" alt="こ" className="w-48 h-48 object-contain" />
            ) : character === "き" ? (
              <img src="/images/ki.jpg" alt="き" className="w-48 h-48 object-contain" />
            ) : character === "さ" ? (
              <img src="/images/sa.jpg" alt="さ" className="w-48 h-48 object-contain" />
            ) : (
              <span className="text-9xl" style={{ 
                fontFamily: "'Hiragino Kaku Gothic ProN', 'Yu Gothic', 'Meiryo', 'MS Gothic', sans-serif", 
                fontWeight: 400,
                fontStyle: 'normal'
              }}>{character}</span>
            )}
          </div>
          <div className="absolute w-full h-full bg-gradient-to-br from-kawaii-blue to-kawaii-yellow rounded-3xl flex items-center justify-center border-4 border-white sakura-shadow"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
            <span className="text-5xl font-bold text-purple-700">{reading}</span>
          </div>
        </motion.div>
      </motion.div>

      <div className="w-full max-w-md space-y-3">
        {difficulty === 'normal' ? (
          // Normal Mode: Multiple Choice
          <>
            <div className="grid grid-cols-2 gap-3">
              {choices.map((choice, index) => (
                <motion.button
                  key={index}
                  data-choice-index={index}
                  whileHover={!answered ? { scale: 1.05 } : {}}
                  whileTap={!answered ? { scale: 0.95 } : {}}
                  onClick={() => handleChoice(choice, index)}
                  disabled={answered}
                  className={`
                    p-4 rounded-xl font-bold text-lg border-3 transition-all anime-button
                    ${getChoiceStyle(choice, index)}
                    ${!answered ? 'cursor-pointer' : 'cursor-not-allowed'}
                  `}
                >
                  {choice}
                </motion.button>
              ))}
            </div>

            {!answered && tempSelected && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Button 
                  onClick={handleConfirm}
                  className="w-full"
                >
                  ✓ ยืนยันคำตอบ
                </Button>
              </motion.div>
            )}
          </>
        ) : (
          // Hard Mode: Type Answer
          <>
            <div className="space-y-3">
              <input
                type="text"
                value={typedAnswer}
                onChange={(e) => setTypedAnswer(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleConfirm()}
                disabled={answered}
                placeholder="Type romaji here..."
                className={`
                  hard-mode-input w-full p-4 rounded-xl font-bold text-lg text-center border-3 transition-all
                  ${answered 
                    ? typedAnswer.trim().toLowerCase() === reading.toLowerCase()
                      ? 'bg-green-200 border-green-400'
                      : 'bg-red-200 border-red-400'
                    : 'bg-white border-purple-300 focus:border-purple-500 focus:outline-none'
                  }
                  ${!answered ? 'cursor-text' : 'cursor-not-allowed'}
                `}
                autoFocus
              />
              
              {answered && typedAnswer.trim().toLowerCase() !== reading.toLowerCase() && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center p-3 bg-green-100 rounded-lg border-2 border-green-400"
                >
                  <span className="text-green-700 font-bold">Correct answer: {reading}</span>
                </motion.div>
              )}
            </div>

            {!answered && (
              <Button 
                onClick={handleConfirm}
                disabled={!typedAnswer.trim()}
                className="w-full"
              >
                ✓ ยืนยันคำตอบ
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default FlashCard
