import { motion } from 'framer-motion'
import { playSound } from '../utils/sound'

const Button = ({ children, onClick, variant = 'primary', className = '', disabled = false }) => {
  const variants = {
    primary: 'bg-gradient-to-r from-pink-400 to-purple-400 text-white',
    secondary: 'bg-white text-purple-600 border-2 border-purple-300',
    success: 'bg-green-400 text-white',
    danger: 'bg-red-400 text-white',
  }

  const handleClick = () => {
    if (!disabled) {
      playSound('click')
      onClick?.()
    }
  }

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className={`
        px-6 py-3 rounded-2xl font-bold text-lg shadow-lg
        transition-all duration-200
        ${variants[variant]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'}
        ${className}
      `}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  )
}

export default Button
