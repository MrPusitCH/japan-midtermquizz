import { motion } from 'framer-motion'

const ProgressBar = ({ current, total, score }) => {
  const percentage = (current / total) * 100

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 mb-6 border-3 border-white">
      <div className="flex justify-between mb-2 text-purple-700 font-bold">
        <span>คะแนน: {score}</span>
        <span>ข้อที่: {current}/{total}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-pink-400 to-purple-400"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  )
}

export default ProgressBar
