import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Card from '../components/Card'
import Button from '../components/Button'
import FlashCard from '../components/FlashCard'
import ProgressBar from '../components/ProgressBar'
import { hiraganaData } from '../data/hiraganaData'

const FlashCardGame = ({ onBack }) => {
  console.log('FlashCardGame rendered!')
  
  // รวมตัวอักษรทั้งหมดจาก 2 levels
  const allCards = [...hiraganaData[1], ...hiraganaData[2]]
  console.log('All cards:', allCards.length)
  
  // สุ่มลำดับตัวอักษร
  const [cards] = useState(() => {
    return [...allCards].sort(() => Math.random() - 0.5)
  })
  
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const currentCard = cards[currentIndex]
  
  const generateChoices = (card) => {
    const wrongChoices = allCards
      .filter(c => c.reading !== card.reading)
      .map(c => c.reading)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
    
    return [...wrongChoices, card.reading].sort(() => Math.random() - 0.5)
  }

  const [choices, setChoices] = useState(() => generateChoices(cards[0]))

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1)
    }
    
    setTimeout(() => {
      if (currentIndex < cards.length - 1) {
        setCurrentIndex(currentIndex + 1)
      } else {
        setShowResult(true)
      }
    }, 1500)
  }

  useEffect(() => {
    if (currentCard) {
      setChoices(generateChoices(currentCard))
    }
  }, [currentIndex])

  const percentage = Math.round((score / cards.length) * 100)

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
              {score}/{cards.length}
            </p>
            <p className="text-3xl text-purple-600 mb-4">
              {percentage}% - {percentage >= 80 ? 'เก่งมาก!' : percentage >= 60 ? 'ดีมาก!' : 'ลองใหม่อีกครั้งนะ!'}
            </p>
            <p className="text-lg text-gray-600 mb-8">
              ทำครบทั้งหมด {cards.length} ตัวอักษร!
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
        <ProgressBar current={currentIndex + 1} total={cards.length} score={score} />
        
        <FlashCard
          key={currentIndex}
          character={currentCard.char}
          reading={currentCard.reading}
          choices={choices}
          onAnswer={handleAnswer}
        />

        <div className="mt-6">
          <Button onClick={onBack} variant="secondary" className="w-full">
            ← ย้อนกลับ
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default FlashCardGame
