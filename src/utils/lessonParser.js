// Parse lesson data from japan_final.txt
import lessonDataRaw from '../data/japan_final.txt?raw'

export const parseLessonData = () => {
  try {
    const data = JSON.parse(lessonDataRaw)
    return data.lessons
  } catch (error) {
    console.error('Error parsing lesson data:', error)
    return []
  }
}

export const getLessonById = (lessonId) => {
  const lessons = parseLessonData()
  return lessons.find(lesson => lesson.lesson === lessonId)
}

export const getAllLessons = () => {
  return parseLessonData()
}

// Tokenize romaji sentence for Hard Mode
export const tokenizeRomaji = (romaji) => {
  // Split by spaces but keep punctuation attached
  const tokens = romaji.match(/\S+/g) || []
  return tokens
}

// Get all unique words from lesson sentences (for distractors)
export const getAllWordsFromLesson = (sentences) => {
  const allWords = []
  sentences.forEach(sentence => {
    const tokens = tokenizeRomaji(sentence.romaji)
    tokens.forEach(token => {
      // Remove punctuation for comparison
      const cleanToken = token.replace(/[.,!?]/g, '')
      if (cleanToken.length > 2) {
        allWords.push(cleanToken)
      }
    })
  })
  return [...new Set(allWords)] // Remove duplicates
}

// Generate multiple-choice blanks for Easy Mode
export const generateMultipleChoiceBlanks = (romaji, allLessonWords, numBlanks = 2) => {
  const tokens = tokenizeRomaji(romaji)
  
  // Filter out very short tokens and punctuation-only tokens
  const validTokens = tokens.filter(token => {
    const cleanToken = token.replace(/[.,!?]/g, '')
    return cleanToken.length > 2
  })
  
  if (validTokens.length === 0) {
    return { 
      blankedSentence: romaji, 
      blanks: [] 
    }
  }
  
  // Randomly select tokens to blank
  const numToBlank = Math.min(numBlanks, validTokens.length)
  const shuffled = [...validTokens].sort(() => Math.random() - 0.5)
  const tokensToBlank = shuffled.slice(0, numToBlank)
  
  // Create blanked sentence and generate choices for each blank
  let blankedSentence = romaji
  const blanks = []
  
  tokensToBlank.forEach((token, blankIndex) => {
    const cleanToken = token.replace(/[.,!?]/g, '')
    const index = blankedSentence.indexOf(token)
    
    if (index !== -1) {
      blankedSentence = blankedSentence.replace(token, `[${blankIndex + 1}]`)
      
      // Generate distractors from lesson words
      const distractors = allLessonWords
        .filter(word => word !== cleanToken && word.length >= 3)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
      
      // Create choices array with correct answer and distractors
      const choices = shuffleArray([cleanToken, ...distractors])
      
      blanks.push({
        correctAnswer: cleanToken,
        choices: choices,
        blankNumber: blankIndex + 1
      })
    }
  })
  
  return { blankedSentence, blanks }
}

// Shuffle array
export const shuffleArray = (array) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}
