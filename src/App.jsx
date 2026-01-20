import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import WeekSelect from './pages/WeekSelect'
import QuizGame from './pages/QuizGame'
import HiraganaSelect from './pages/HiraganaSelect'
import FlashCardGame from './pages/FlashCardGame'
import SoundToggle from './components/SoundToggle'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedWeek, setSelectedWeek] = useState(null)
  const [selectedLevel, setSelectedLevel] = useState(null)

  const navigateTo = (page, data = null) => {
    if (page === 'quiz' && data) {
      setSelectedWeek(data)
    } else if (page === 'flashcard' && data) {
      setSelectedLevel(data)
    }
    setCurrentPage(page)
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={navigateTo} />
      case 'weekSelect':
        return <WeekSelect onNavigate={navigateTo} onBack={() => setCurrentPage('home')} />
      case 'quiz':
        return <QuizGame week={selectedWeek} onBack={() => setCurrentPage('weekSelect')} />
      case 'hiraganaSelect':
        return <HiraganaSelect onNavigate={navigateTo} onBack={() => setCurrentPage('home')} />
      case 'flashcard':
        return <FlashCardGame level={selectedLevel} onBack={() => setCurrentPage('hiraganaSelect')} />
      default:
        return <Home onNavigate={navigateTo} />
    }
  }

  return (
    <div className="min-h-screen cloud-bg relative overflow-hidden">
      {/* Floating Sakura Petals */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl"
            initial={{ y: -100, x: Math.random() * window.innerWidth, rotate: 0 }}
            animate={{
              y: window.innerHeight + 100,
              x: Math.random() * window.innerWidth,
              rotate: 360,
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            🌸
          </motion.div>
        ))}
      </div>

      <SoundToggle />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default App
