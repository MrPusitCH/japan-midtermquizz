import { motion } from 'framer-motion'
import Card from '../components/Card'
import Button from '../components/Button'
import { getAllLessons } from '../utils/lessonParser'

const LessonSelect = ({ onNavigate, onSelectLesson }) => {
  const lessons = getAllLessons()

  const handleLessonClick = (lesson) => {
    onSelectLesson(lesson)
    onNavigate('modeSelect')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-4xl w-full">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring' }}
        >
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-4 text-center">
            📚 Select Lesson
          </h1>
          <p className="text-xl text-purple-600 mb-8 text-center font-bold">
            เลือกบทเรียน
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {lessons.map((lesson) => (
              <motion.button
                key={lesson.lesson}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleLessonClick(lesson)}
                className="p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl border-3 border-purple-300 hover:border-purple-500 transition-all text-left"
              >
                <div className="text-2xl font-bold text-purple-700 mb-2">
                  Lesson {lesson.lesson}
                </div>
                <div className="text-lg japanese-font text-gray-700 mb-1">
                  {lesson.title_jp}
                </div>
                <div className="text-sm text-gray-600">
                  {lesson.sentences.length} sentences
                </div>
              </motion.button>
            ))}
          </div>

          <Button onClick={() => onNavigate('home')} variant="secondary" className="w-full">
            ← กลับหน้าหลัก
          </Button>
        </motion.div>
      </Card>
    </div>
  )
}

export default LessonSelect
