import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Card from '../components/Card'
import Button from '../components/Button'
import ProgressBar from '../components/ProgressBar'
import { sentenceData } from '../data/sentenceData'
import { playSound } from '../utils/sound'
import { animateCorrectAnswer, animateWrongAnswer } from '../utils/anime-effects'

const SentencePracticeGame = ({ onNavigate }) => {
  const [questions] = useState(() => {
    return [...sentenceData].sort(() => Math.random() - 0.5)
  })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const currentQuestion = questions[currentIndex]

  const handleOptionClick = (option, index) => {
    if (answered) return
    
    playSound('click')
    setSelectedOption(index)
  }

  const handleConfirm = () => {
    if (selectedOption === null || answered) return

    const selectedWord = currentQuestion.options[selectedOption]
    const isCorrect = selectedWord.japanese === currentQuestion.correct_word

    playSound(isCorrect ? 'correct' : 'wrong')
    setAnswered(true)
    
    if (isCorrect) {
      setScore(score + 1)
    }

    const buttonElement = document.querySelector(`[data-option-index="${selectedOption}"]`)
    if (buttonElement) {
      if (isCorrect) {
        animateCorrectAnswer(buttonElement)
      } else {
        animateWrongAnswer(buttonElement)
      }
    }

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1)
        setSelectedOption(null)
        setAnswered(false)
      } else {
        setShowResult(true)
      }
    }, 2000)
  }

  const getOptionStyle = (index) => {
    if (!answered) {
      return selectedOption === index
        ? 'bg-purple-200 border-purple-500 border-4'
        : 'bg-white hover:bg-purple-50 border-purple-300'
    }

    const option = currentQuestion.options[index]
    if (option.japanese === currentQuestion.correct_word) {
      return 'bg-green-200 border-green-500'
    }
    if (selectedOption === index && option.japanese !== currentQuestion.correct_word) {
      return 'bg-red-200 border-red-500'
    }
    return 'bg-gray-100 border-gray-300'
  }

  const percentage = Math.round((score / questions.length) * 100)

  if (showResult) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring' }}
          >
            <h2 className="text-5xl font-black text-purple-700 mb-6">🎉 ผลลัพธ์</h2>
            <div className="text-6xl mb-4">
              {percentage >= 80 ? '🌟' : percentage >= 60 ? '👍' : '💪'}
            </div>
            <p className="text-4xl font-bold text-pink-600 mb-2">
              {score}/{questions.length}
            </p>
            <p className="text-3xl text-purple-600 mb-8">
              {percentage}% - {percentage >= 80 ? 'เก่งมาก!' : percentage >= 60 ? 'ดีมาก!' : 'ลองใหม่อีกครั้งนะ!'}
            </p>
            <Button onClick={() => onNavigate('home')} className="w-full">
              กลับเมนูหลัก
            </Button>
          </motion.div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-3xl w-full">
        <div className="flex justify-between items-center mb-6">
          <Button onClick={() => onNavigate('home')} variant="secondary" size="sm">
            ← กลับหน้าหลัก
          </Button>
          <div className="text-purple-600 font-bold">
            คะแนน: {score}/{questions.length}
          </div>
        </div>

        <ProgressBar current={currentIndex + 1} total={questions.length} />

        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-purple-600 mb-4">
              เติมคำให้สมบูรณ์
            </h3>
            <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-6 rounded-2xl mb-4">
              <p className="text-3xl font-bold text-gray-800 mb-2 japanese-font">
                {currentQuestion.sentence_with_blank}
              </p>
              <p className="text-lg text-gray-600">
                {currentQuestion.sentence_romaji}
              </p>
            </div>
            <p className="text-xl text-gray-600">
              {currentQuestion.thai_translation}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {currentQuestion.options.map((option, index) => (
              <motion.button
                key={index}
                data-option-index={index}
                whileHover={!answered ? { scale: 1.05 } : {}}
                whileTap={!answered ? { scale: 0.95 } : {}}
                onClick={() => handleOptionClick(option, index)}
                disabled={answered}
                className={`
                  p-4 rounded-xl border-3 transition-all anime-button
                  ${getOptionStyle(index)}
                  ${!answered ? 'cursor-pointer' : 'cursor-not-allowed'}
                `}
              >
                <div className="text-2xl font-bold japanese-font mb-1">
                  {option.japanese}
                </div>
                <div className="text-sm text-gray-600">
                  {option.romaji}
                </div>
              </motion.button>
            ))}
          </div>

          <AnimatePresence>
            {!answered && selectedOption !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <Button onClick={handleConfirm} className="w-full">
                  ✓ ยืนยันคำตอบ
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </Card>
    </div>
  )
}

export default SentencePracticeGame
