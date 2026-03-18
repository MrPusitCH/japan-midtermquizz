// Parse lesson data from japan_final.txt
import lessonDataRaw from '../data/japan_final.txt?raw'
import { getTokenWithMeaning, getThaiMeaning } from './vocabularyMapper'

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

// Tokenize romaji sentence for Hard Mode with Thai meanings
export const tokenizeRomajiWithMeanings = (romaji) => {
  const tokens = romaji.match(/\S+/g) || []
  return tokens.map(token => getTokenWithMeaning(token))
}

// Tokenize romaji sentence for Hard Mode (without meanings)
export const tokenizeRomaji = (romaji) => {
  const tokens = romaji.match(/\S+/g) || []
  return tokens
}

// Get all unique words from lesson sentences (for distractors) with meanings
export const getAllWordsFromLessonWithMeanings = (sentences) => {
  const allWords = []
  sentences.forEach(sentence => {
    const tokens = tokenizeRomaji(sentence.romaji)
    tokens.forEach(token => {
      const cleanToken = token.replace(/[.,!?]/g, '')
      if (cleanToken.length > 2) {
        const meaning = getThaiMeaning(cleanToken)
        allWords.push({
          word: cleanToken,
          meaning_th: meaning
        })
      }
    })
  })
  
  // Remove duplicates based on word
  const uniqueWords = []
  const seenWords = new Set()
  allWords.forEach(item => {
    if (!seenWords.has(item.word)) {
      seenWords.add(item.word)
      uniqueWords.push(item)
    }
  })
  
  return uniqueWords
}

// Get all unique words from lesson sentences (for distractors)
export const getAllWordsFromLesson = (sentences) => {
  const allWords = []
  sentences.forEach(sentence => {
    const tokens = tokenizeRomaji(sentence.romaji)
    tokens.forEach(token => {
      const cleanToken = token.replace(/[.,!?]/g, '')
      if (cleanToken.length > 2) {
        allWords.push(cleanToken)
      }
    })
  })
  return [...new Set(allWords)]
}

// Generate multiple-choice blanks for Easy Mode with Thai meanings
export const generateMultipleChoiceBlanks = (romaji, allLessonWords, numBlanks = 2) => {
  const tokens = tokenizeRomaji(romaji)
  
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
  
  const numToBlank = Math.min(numBlanks, validTokens.length)
  const shuffled = [...validTokens].sort(() => Math.random() - 0.5)
  const tokensToBlank = shuffled.slice(0, numToBlank)
  
  let blankedSentence = romaji
  const blanks = []
  
  tokensToBlank.forEach((token, blankIndex) => {
    const cleanToken = token.replace(/[.,!?]/g, '')
    const index = blankedSentence.indexOf(token)
    
    if (index !== -1) {
      blankedSentence = blankedSentence.replace(token, `[${blankIndex + 1}]`)
      
      // Get correct answer with meaning
      const correctAnswer = {
        word: cleanToken,
        meaning_th: getThaiMeaning(cleanToken)
      }
      
      // Generate distractors from lesson words with meanings
      const distractors = allLessonWords
        .filter(item => item.word !== cleanToken && item.word.length >= 3)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
      
      // Create choices array with correct answer and distractors
      const choices = shuffleArray([correctAnswer, ...distractors])
      
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
