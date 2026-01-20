import { Howl } from 'howler'

// Background Music
let bgm = null
let bgmPlaying = false

// Initialize BGM with Japanese lo-fi style music
const initBGM = () => {
  if (!bgm) {
    // Using a free Japanese-style lo-fi track
    bgm = new Howl({
      src: ['https://cdn.pixabay.com/audio/2022/05/13/audio_2c4d750ac5.mp3'], // Peaceful Japanese music
      loop: true,
      volume: 0.3,
      html5: true, // Better for streaming
      preload: true
    })
  }
  return bgm
}

// Simple sound effects using Web Audio API (lightweight)
const playBeep = (frequency, duration) => {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.value = frequency
    oscillator.type = 'sine'
    
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + duration)
  } catch (e) {
    console.log('Audio not supported')
  }
}

export const playSound = (type) => {
  switch (type) {
    case 'click':
      playBeep(800, 0.1)
      break
    case 'correct':
      playBeep(1000, 0.2)
      setTimeout(() => playBeep(1200, 0.2), 100)
      break
    case 'wrong':
      playBeep(300, 0.3)
      break
    case 'flip':
      playBeep(600, 0.15)
      break
    default:
      break
  }
}

export const toggleBGM = () => {
  const music = initBGM()
  
  if (bgmPlaying) {
    music.pause()
    bgmPlaying = false
  } else {
    music.play()
    bgmPlaying = true
  }
}

export const isBGMPlaying = () => bgmPlaying

export const stopBGM = () => {
  if (bgm) {
    bgm.stop()
    bgmPlaying = false
  }
}
