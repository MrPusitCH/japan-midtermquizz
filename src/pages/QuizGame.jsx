import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Card from '../components/Card'
import Button from '../components/Button'
import QuizCard from '../components/QuizCard'
import ProgressBar from '../components/ProgressBar'
import { weekQuizData } from '../data/quizData'

const QuizGame = ({ week, onBack }) => {
  const [questions] = useState(weekQuizData[week] || [])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [showResult, setShowResult] = useState(false)

  const currentQuestion = questions[currentIndex]

  const handleAnswer = (index, isCorrect) => {
    setAnswered(true)
    setSelectedIndex(index)
    if (isCorrect) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setAnswered(false)
      setSelectedIndex(null)
    } else {
      setShowResult(true)
    }
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
            <Button onClick={onBack} className="w-full">
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
        <ProgressBar current={currentIndex + 1} total={questions.length} score={score} />
        
        <AnimatePresence mode="wait">
          <QuizCard
            key={currentIndex}
            question={currentQuestion.question}
            choices={currentQuestion.choices}
            correctIndex={currentQuestion.correct}
            onAnswer={handleAnswer}
            answered={answered}
            selectedIndex={selectedIndex}
          />
        </AnimatePresence>

        {answered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 space-y-3"
          >
            <Button onClick={handleNext} className="w-full">
              {currentIndex < questions.length - 1 ? 'ข้อต่อไป →' : 'ดูผลลัพธ์'}
            </Button>
            <Button onClick={onBack} variant="secondary" className="w-full">
              ← กลับ
            </Button>
          </motion.div>
        )}
      </Card>
    </div>
  )
}

export default QuizGame
