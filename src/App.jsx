import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import WeekSelect from './pages/WeekSelect'
import QuizGame from './pages/QuizGame'
import HiraganaSelect from './pages/HiraganaSelect'
import FlashCardGame from './pages/FlashCardGame'
import SoundToggle from './components/SoundToggle'
import { initBGM } from './utils/sound'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedWeek, setSelectedWeek] = useState(null)
  const [selectedLevel, setSelectedLevel] = useState(null)
  const [showMusicPrompt, setShowMusicPrompt] = useState(true)

  useEffect(() => {
    // Show music prompt on first load
    const hasSeenPrompt = localStorage.getItem('musicPromptSeen')
    if (hasSeenPrompt) {
      setShowMusicPrompt(false)
    }
  }, [])

  const handleMusicChoice = (playMusic) => {
    localStorage.setItem('musicPromptSeen', 'true')
    setShowMusicPrompt(false)
    
    if (playMusic) {
      const bgm = initBGM()
      bgm.play()
    }
  }

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
      {/* Music Prompt Modal */}
      <AnimatePresence>
        {showMusicPrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full text-center sakura-shadow"
            >
              <div className="text-6xl mb-4">🎵</div>
              <h2 className="text-3xl font-bold text-purple-700 mb-4">
                เปิดเพลงประกอบไหมคะ?
              </h2>
              <p className="text-gray-600 mb-6">
                Sousou no Frieren - Time Flows Ever Onward
              </p>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleMusicChoice(true)}
                  className="flex-1 bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold py-4 px-6 rounded-2xl shadow-lg"
                >
                  🔊 เปิดเพลง
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleMusicChoice(false)}
                  className="flex-1 bg-gray-200 text-gray-700 font-bold py-4 px-6 rounded-2xl"
                >
                  🔇 ไม่เปิด
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Sakura Petals */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl"
            initial={{ y: -100, x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), rotate: 0 }}
            animate={{
              y: typeof window !== 'undefined' ? window.innerHeight + 100 : 1000,
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              rotate: 360,
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default App
