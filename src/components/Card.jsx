import { motion } from 'framer-motion'

const Card = ({ children, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`
        bg-white/90 backdrop-blur-sm rounded-3xl p-8 
        sakura-shadow border-4 border-white
        ${className}
      `}
    >
      {children}
    </motion.div>
  )
}

export default Card
