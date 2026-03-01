import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Card from '../components/Card'
import Button from '../components/Button'
import ProgressBar from '../components/ProgressBar'
import { rearrangeData } from '../data/rearrangeData'

const RearrangeGame = ({ onNavigate }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedWords, setSelectedWords] = useState([])
  const [availableWords, setAvailableWords] = useState([])
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState(0)

  useEffect(() => {
    setAvailableWords([...rearrangeData[currentIndex].shuffled_words])
    setSelectedWords([])
    setShowResult(false)
  }, [currentIndex])

  const handleWordClick = (word, fromAvailable = true) => {
    if (fromAvailable) {
      setSelectedWords([...selectedWords, word])
      setAvailableWords(availableWords.filter(w => w !== word))
    } else {
      setAvailableWords([...availableWords, word])
      setSelectedWords(selectedWords.filter(w => w !== word))
    }
  }

  const handleCheck = () => {
    const userAnswer = selectedWords.join(' ')
    const correct = userAnswer === rearrangeData[currentIndex].correct_roomaji
    setIsCorrect(correct)
    setShowResult(true)
    if (correct) setScore(score + 1)
  }

  const handleNext = () => {
    if (currentIndex < rearrangeData.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      alert(`เกมจบแล้ว! คะแนน: ${score + (isCorrect ? 1 : 0)}/${rearrangeData.length}`)
      onNavigate('home')
    }
  }

  const currentQuestion = rearrangeData[currentIndex]

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-3xl w-full">
        <div className="flex justify-between items-center mb-6">
          <Button onClick={() => onNavigate('home')} variant="secondary" size="sm">
            ← กลับหน้าหลัก
          </Button>
          <div className="text-purple-600 font-bold">
            คะแนน: {score}/{rearrangeData.length}
          </div>
        </div>

        <ProgressBar current={currentIndex + 1} total={rearrangeData.length} />

        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-purple-600 mb-4">
              {currentQuestion.japanese}
            </h2>
            <p className="text-xl text-gray-600">{currentQuestion.thai}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold text-purple-600 mb-3">เรียงคำให้ถูกต้อง:</h3>
            <div className="min-h-[80px] p-4 bg-purple-50 rounded-lg border-2 border-purple-200 flex flex-wrap gap-2">
              {selectedWords.map((word, idx) => (
                <motion.button
                  key={`selected-${idx}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  onClick={() => handleWordClick(word, false)}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg font-bold hover:bg-purple-600 transition-colors"
                >
                  {word}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-600 mb-3">คำที่เหลือ:</h3>
            <div className="flex flex-wrap gap-2">
              {availableWords.map((word, idx) => (
                <motion.button
                  key={`available-${idx}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleWordClick(word, true)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300 transition-colors"
                >
                  {word}
                </motion.button>
              ))}
            </div>
          </div>

          <AnimatePresence>
            {showResult && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className={`p-6 rounded-lg mb-6 ${
                  isCorrect ? 'bg-green-100 border-2 border-green-500' : 'bg-red-100 border-2 border-red-500'
                }`}
              >
                <p className={`text-2xl font-bold text-center ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                  {isCorrect ? '✓ ถูกต้อง!' : '✗ ผิด!'}
                </p>
                {!isCorrect && (
                  <p className="text-center mt-2 text-gray-700">
                    คำตอบที่ถูก: <span className="font-bold">{currentQuestion.correct_roomaji}</span>
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex gap-4">
            {!showResult ? (
              <Button
                onClick={handleCheck}
                disabled={selectedWords.length !== currentQuestion.words.length}
                className="flex-1"
              >
                ตรวจคำตอบ
              </Button>
            ) : (
              <Button onClick={handleNext} className="flex-1">
                {currentIndex < rearrangeData.length - 1 ? 'ข้อถัดไป →' : 'จบเกม'}
              </Button>
            )}
          </div>
        </motion.div>
      </Card>
    </div>
  )
}

export default RearrangeGame
