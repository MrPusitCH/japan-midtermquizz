import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Card from '../components/Card'
import Button from '../components/Button'
import ProgressBar from '../components/ProgressBar'
import { generateMultipleChoiceBlanks, getAllWordsFromLessonWithMeanings, tokenizeRomajiWithMeanings, shuffleArray } from '../utils/lessonParser'
import { playSound } from '../utils/sound'
import { animateCorrectAnswer, animateWrongAnswer } from '../utils/anime-effects'

const LessonQuiz = ({ onNavigate, selectedLesson, selectedMode }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [answered, setAnswered] = useState(false)
  const [showHints, setShowHints] = useState(true)
  
  // Easy mode states
  const [selectedAnswers, setSelectedAnswers] = useState([])
  const [blankData, setBlankData] = useState(null)
  const [allLessonWords, setAllLessonWords] = useState([])
  
  // Hard mode states
  const [selectedTokens, setSelectedTokens] = useState([])
  const [availableTokens, setAvailableTokens] = useState([])

  const sentences = selectedLesson?.sentences || []
  const currentSentence = sentences[currentIndex]

  useEffect(() => {
    if (selectedLesson && selectedMode === 'easy') {
      const words = getAllWordsFromLessonWithMeanings(selectedLesson.sentences)
      setAllLessonWords(words)
    }
  }, [selectedLesson, selectedMode])

  useEffect(() => {
    if (currentSentence) {
      if (selectedMode === 'easy') {
        const data = generateMultipleChoiceBlanks(currentSentence.romaji, allLessonWords, 2)
        setBlankData(data)
        setSelectedAnswers(new Array(data.blanks.length).fill(null))
      } else {
        const tokens = tokenizeRomajiWithMeanings(currentSentence.romaji)
        setAvailableTokens(shuffleArray(tokens))
        setSelectedTokens([])
      }
      setAnswered(false)
    }
  }, [currentIndex, currentSentence, selectedMode, allLessonWords])

  const handleEasyModeSubmit = () => {
    if (answered) return
    
    const allSelected = selectedAnswers.every(answer => answer !== null)
    if (!allSelected) return

    const isCorrect = selectedAnswers.every((answer, index) => 
      answer === blankData.blanks[index].correctAnswer
    )

    playSound(isCorrect ? 'correct' : 'wrong')
    setAnswered(true)
    if (isCorrect) setScore(score + 1)

    setTimeout(() => handleNext(), 2000)
  }

  const handleSelectAnswer = (blankIndex, choice) => {
    if (answered) return
    const newAnswers = [...selectedAnswers]
    newAnswers[blankIndex] = choice.word
    setSelectedAnswers(newAnswers)
  }

  const getChoiceStyle = (blankIndex, choice) => {
    if (!answered) {
      return selectedAnswers[blankIndex] === choice.word
        ? 'bg-purple-200 border-purple-500 border-4'
        : 'bg-white hover:bg-purple-50 border-purple-300'
    }

    const blank = blankData.blanks[blankIndex]
    if (choice.word === blank.correctAnswer) {
      return 'bg-green-200 border-green-500'
    }
    if (selectedAnswers[blankIndex] === choice.word && choice.word !== blank.correctAnswer) {
      return 'bg-red-200 border-red-500'
    }
    return 'bg-gray-100 border-gray-300'
  }

  const handleHardModeSubmit = () => {
    if (answered) return
    if (selectedTokens.length !== availableTokens.length + selectedTokens.length) return

    const userSentence = selectedTokens.map(t => t.word).join(' ')
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
      setAvailableTokens(availableTokens.filter(t => t.word !== token.word))
    } else {
      setAvailableTokens([...availableTokens, token])
      setSelectedTokens(selectedTokens.filter(t => t.word !== token.word))
    }
  }

  const handleReset = () => {
    const tokens = tokenizeRomajiWithMeanings(currentSentence.romaji)
    setAvailableTokens(shuffleArray(tokens))
    setSelectedTokens([])
  }

  const handleShowAnswer = () => {
    if (selectedMode === 'easy') {
      const correctAnswers = blankData.blanks.map(blank => blank.correctAnswer)
      setSelectedAnswers(correctAnswers)
    } else {
      const tokens = tokenizeRomajiWithMeanings(currentSentence.romaji)
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
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-2">
                <div></div>
                <Button 
                  onClick={() => setShowHints(!showHints)} 
                  variant="secondary" 
                  size="sm"
                >
                  {showHints ? '🙈 Hide Hints' : '👁️ Show Hints'}
                </Button>
              </div>
              
              <div className="bg-white p-6 rounded-xl border-3 border-purple-300">
                <p className="text-2xl font-mono text-gray-800 mb-6 whitespace-pre-wrap leading-relaxed">
                  {blankData?.blankedSentence}
                </p>
                
                {blankData?.blanks.map((blank, blankIndex) => (
                  <div key={blankIndex} className="mb-6">
                    <p className="text-lg font-bold text-purple-700 mb-3">
                      Blank [{blank.blankNumber}]:
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {blank.choices.map((choice, choiceIndex) => (
                        <motion.button
                          key={choiceIndex}
                          data-choice={`${blankIndex}-${choiceIndex}`}
                          whileHover={!answered ? { scale: 1.05 } : {}}
                          whileTap={!answered ? { scale: 0.95 } : {}}
                          onClick={() => handleSelectAnswer(blankIndex, choice)}
                          disabled={answered}
                          className={`
                            p-4 rounded-xl border-3 transition-all text-left
                            ${getChoiceStyle(blankIndex, choice)}
                            ${!answered ? 'cursor-pointer' : 'cursor-not-allowed'}
                          `}
                        >
                          <div className="font-mono text-lg font-bold">{choice.word}</div>
                          {showHints && choice.meaning_th && (
                            <div className="text-sm text-gray-600 mt-1">({choice.meaning_th})</div>
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {answered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`p-4 rounded-xl ${
                    selectedAnswers.every((answer, index) => 
                      answer === blankData.blanks[index].correctAnswer
                    ) ? 'bg-green-100 border-2 border-green-500' : 'bg-red-100 border-2 border-red-500'
                  }`}
                >
                  <p className="font-bold text-lg mb-2">
                    {selectedAnswers.every((answer, index) => 
                      answer === blankData.blanks[index].correctAnswer
                    ) ? '✓ Correct!' : '✗ Incorrect'}
                  </p>
                  {!selectedAnswers.every((answer, index) => 
                    answer === blankData.blanks[index].correctAnswer
                  ) && (
                    <div className="text-gray-700">
                      <p className="font-bold mb-1">Correct answers:</p>
                      {blankData.blanks.map((blank, index) => (
                        <p key={index}>
                          [{blank.blankNumber}]: {blank.correctAnswer}
                        </p>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              <div className="flex gap-3">
                {!answered && (
                  <>
                    <Button 
                      onClick={handleEasyModeSubmit} 
                      disabled={selectedAnswers.some(answer => answer === null)}
                      className="flex-1"
                    >
                      ✓ Check Answer
                    </Button>
                    <Button onClick={handleShowAnswer} variant="secondary" className="flex-1">
                      💡 Show Answer
                    </Button>
                  </>
                )}
                <Button onClick={handleSkip} variant="secondary" className="flex-1">
                  ⏭️ {answered ? 'Next' : 'Skip'}
                </Button>
              </div>
              
              <Button onClick={() => onNavigate('modeSelect')} variant="secondary" className="w-full mt-4">
                ← Back to Mode Selection
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-600">Your Answer:</p>
                <Button 
                  onClick={() => setShowHints(!showHints)} 
                  variant="secondary" 
                  size="sm"
                >
                  {showHints ? '🙈 Hide Hints' : '👁️ Show Hints'}
                </Button>
              </div>
              <div className="bg-purple-50 p-4 rounded-xl border-2 border-purple-300 min-h-[100px]">
                <div className="flex flex-wrap gap-2">
                  {selectedTokens.map((token, index) => (
                    <motion.button
                      key={`selected-${index}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      onClick={() => handleTokenClick(token, false)}
                      disabled={answered}
                      className="px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 text-left"
                    >
                      <div className="font-mono font-bold">{token.word}</div>
                      {showHints && token.meaning_th && (
                        <div className="text-xs opacity-90">({token.meaning_th})</div>
                      )}
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
                      className="px-3 py-2 bg-white border-2 border-gray-300 rounded-lg hover:border-purple-400 disabled:opacity-50 text-left"
                    >
                      <div className="font-mono font-bold">{token.word}</div>
                      {showHints && token.meaning_th && (
                        <div className="text-xs text-gray-600">({token.meaning_th})</div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {answered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`p-4 rounded-xl ${
                    selectedTokens.map(t => t.word).join(' ') === currentSentence.romaji
                      ? 'bg-green-100 border-2 border-green-500'
                      : 'bg-red-100 border-2 border-red-500'
                  }`}
                >
                  <p className="font-bold text-lg mb-2">
                    {selectedTokens.map(t => t.word).join(' ') === currentSentence.romaji ? '✓ Correct!' : '✗ Incorrect'}
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
                  ⏭️ {answered ? 'Next' : 'Skip'}
                </Button>
              </div>
              
              <Button onClick={() => onNavigate('modeSelect')} variant="secondary" className="w-full mt-4">
                ← Back to Mode Selection
              </Button>
            </div>
          )}
        </motion.div>
      </Card>
    </div>
  )
}

export default LessonQuiz
