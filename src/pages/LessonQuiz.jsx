import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Card from '../components/Card'
import Button from '../components/Button'
import ProgressBar from '../components/ProgressBar'
import { generateBlanks, tokenizeRomaji, shuffleArray } from '../utils/lessonParser'
import { playSound } from '../utils/sound'
import { animateCorrectAnswer, animateWrongAnswer } from '../utils/anime-effects'

const LessonQuiz = ({ onNavigate, selectedLesson, selectedMode }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [answered, setAnswered] = useState(false)
  
  // Easy mode states
  const [userAnswers, setUserAnswers] = useState([])
  const [blankData, setBlankData] = useState(null)
  
  // Hard mode states
  const [selectedTokens, setSelectedTokens] = useState([])
  const [availableTokens, setAvailableTokens] = useState([])

  const sentences = selectedLesson?.sentences || []
  const currentSentence = sentences[currentIndex]

  useEffect(() => {
    if (currentSentence) {
      if (selectedMode === 'easy') {
        const data = generateBlanks(currentSentence.romaji, 2)
        setBlankData(data)
        setUserAnswers(new Array(data.answers.length).fill(''))
      } else {
        const tokens = tokenizeRomaji(currentSentence.romaji)
        setAvailableTokens(shuffleArray(tokens))
        setSelectedTokens([])
      }
      setAnswered(false)
    }
  }, [currentIndex, currentSentence, selectedMode])

  const handleEasyModeSubmit = () => {
    if (answered) return
    
    const allFilled = userAnswers.every(answer => answer.trim() !== '')
    if (!allFilled) return

    const isCorrect = userAnswers.every((answer, index) => 
      answer.trim().toLowerCase() === blankData.answers[index].toLowerCase()
    )

    playSound(isCorrect ? 'correct' : 'wrong')
    setAnswered(true)
    if (isCorrect) setScore(score + 1)

    setTimeout(() => handleNext(), 2000)
  }

  const handleHardModeSubmit = () => {
    if (answered) return
    if (selectedTokens.length !== availableTokens.length + selectedTokens.length) return

    const userSentence = selectedTokens.join(' ')
    const correctSentence = currentSentence.romaji

    const isCorrect = userSentence === correctSentence

    playSound(isCorrect ? 'correct' : 'wrong')
    setAnswered(true)
    if (isCorrect) setScore(score + 1)

    setTimeout(() => handleNext(), 2000)
  }

  const handleNext = () => {
    if (currentIndex < sentences.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setShowResult(true)
    }
  }

  const handleSkip = () => {
    handleNext()
  }

  const handleTokenClick = (token, fromAvailable = true) => {
    if (answered) return
    
    if (fromAvailable) {
      setSelectedTokens([...selectedTokens, token])
      setAvailableTokens(availableTokens.filter(t => t !== token))
    } else {
      setAvailableTokens([...availableTokens, token])
      setSelectedTokens(selectedTokens.filter(t => t !== token))
    }
  }

  const handleReset = () => {
    const tokens = tokenizeRomaji(currentSentence.romaji)
    setAvailableTokens(shuffleArray(tokens))
    setSelectedTokens([])
  }

  const handleShowAnswer = () => {
    if (selectedMode === 'easy') {
      setUserAnswers(blankData.answers)
    } else {
      const tokens = tokenizeRomaji(currentSentence.romaji)
      setSelectedTokens(tokens)
      setAvailableTokens([])
    }
  }

  const percentage = Math.round((score / sentences.length) * 100)

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
              {score}/{sentences.length}
            </p>
            <p className="text-3xl text-purple-600 mb-8">
              {percentage}% - {percentage >= 80 ? 'เก่งมาก!' : percentage >= 60 ? 'ดีมาก!' : 'ลองใหม่อีกครั้งนะ!'}
            </p>
            <div className="space-y-3">
              <Button onClick={() => {
                setCurrentIndex(0)
                setScore(0)
                setShowResult(false)
              }} className="w-full">
                🔄 เล่นอีกครั้ง
              </Button>
              <Button onClick={() => onNavigate('modeSelect')} variant="secondary" className="w-full">
                เปลี่ยนโหมด
              </Button>
              <Button onClick={() => onNavigate('lessonSelect')} variant="secondary" className="w-full">
                เลือกบทเรียนอื่น
              </Button>
            </div>
          </motion.div>
        </Card>
      </div>
    )
  }

  if (!currentSentence) return null

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-4xl w-full">
        <div className="flex justify-between items-center mb-6">
          <div className="text-purple-600 font-bold">
            Lesson {selectedLesson.lesson} - {selectedMode === 'easy' ? 'Easy' : 'Hard'} Mode
          </div>
          <div className="text-purple-600 font-bold">
            Score: {score}/{sentences.length}
          </div>
        </div>

        <ProgressBar current={currentIndex + 1} total={sentences.length} />

        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-6 rounded-2xl mb-6">
            <div className="text-3xl japanese-font font-bold text-gray-800 mb-3">
              {currentSentence.jp}
            </div>
            <div className="text-xl text-gray-700">
              {currentSentence.th}
            </div>
          </div>

          {selectedMode === 'easy' ? (
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-xl border-3 border-purple-300">
                <p className="text-2xl font-mono text-gray-800 mb-4 whitespace-pre-wrap">
                  {blankData?.blankedSentence}
                </p>
                <div className="space-y-3">
                  {blankData?.answers.map((_, index) => (
                    <input
                      key={index}
                      type="text"
                      value={userAnswers[index] || ''}
                      onChange={(e) => {
                        const newAnswers = [...userAnswers]
                        newAnswers[index] = e.target.value
                        setUserAnswers(newAnswers)
                      }}
                      disabled={answered}
                      placeholder={`Blank ${index + 1}`}
                      className="w-full p-3 border-2 border-purple-300 rounded-lg focus:border-purple-500 focus:outline-none disabled:bg-gray-100"
                    />
                  ))}
                </div>
              </div>

              {answered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`p-4 rounded-xl ${
                    userAnswers.every((answer, index) => 
                      answer.trim().toLowerCase() === blankData.answers[index].toLowerCase()
                    ) ? 'bg-green-100 border-2 border-green-500' : 'bg-red-100 border-2 border-red-500'
                  }`}
                >
                  <p className="font-bold text-lg mb-2">
                    {userAnswers.every((answer, index) => 
                      answer.trim().toLowerCase() === blankData.answers[index].toLowerCase()
                    ) ? '✓ Correct!' : '✗ Incorrect'}
                  </p>
                  <p className="text-gray-700">
                    Correct answer: {blankData.answers.join(', ')}
                  </p>
                </motion.div>
              )}

              <div className="flex gap-3">
                {!answered && (
                  <>
                    <Button onClick={handleEasyModeSubmit} className="flex-1">
                      ✓ Check Answer
                    </Button>
                    <Button onClick={handleShowAnswer} variant="secondary" className="flex-1">
                      💡 Show Answer
                    </Button>
                  </>
                )}
                <Button onClick={handleSkip} variant="secondary" className="flex-1">
                  ⏭️ Skip
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-purple-50 p-4 rounded-xl border-2 border-purple-300 min-h-[100px]">
                <p className="text-sm text-gray-600 mb-2">Your Answer:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedTokens.map((token, index) => (
                    <motion.button
                      key={`selected-${index}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      onClick={() => handleTokenClick(token, false)}
                      disabled={answered}
                      className="px-3 py-2 bg-purple-500 text-white rounded-lg font-mono hover:bg-purple-600 disabled:opacity-50"
                    >
                      {token}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border-2 border-gray-300">
                <p className="text-sm text-gray-600 mb-2">Available Words:</p>
                <div className="flex flex-wrap gap-2">
                  {availableTokens.map((token, index) => (
                    <motion.button
                      key={`available-${index}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleTokenClick(token, true)}
                      disabled={answered}
                      className="px-3 py-2 bg-white border-2 border-gray-300 rounded-lg font-mono hover:border-purple-400 disabled:opacity-50"
                    >
                      {token}
                    </motion.button>
                  ))}
                </div>
              </div>

              {answered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`p-4 rounded-xl ${
                    selectedTokens.join(' ') === currentSentence.romaji
                      ? 'bg-green-100 border-2 border-green-500'
                      : 'bg-red-100 border-2 border-red-500'
                  }`}
                >
                  <p className="font-bold text-lg mb-2">
                    {selectedTokens.join(' ') === currentSentence.romaji ? '✓ Correct!' : '✗ Incorrect'}
                  </p>
                  <p className="text-gray-700 font-mono">
                    Correct: {currentSentence.romaji}
                  </p>
                </motion.div>
              )}

              <div className="flex gap-3">
                {!answered && (
                  <>
                    <Button onClick={handleHardModeSubmit} className="flex-1">
                      ✓ Check Answer
                    </Button>
                    <Button onClick={handleReset} variant="secondary" className="flex-1">
                      🔄 Reset
                    </Button>
                    <Button onClick={handleShowAnswer} variant="secondary" className="flex-1">
                      💡 Show Answer
                    </Button>
                  </>
                )}
                <Button onClick={handleSkip} variant="secondary" className="flex-1">
                  ⏭️ Skip
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </Card>
    </div>
  )
}

export default LessonQuiz
