# 🎌 Japanese Learning Game - Features Overview

## 🎨 Visual Theme

### Color Palette (Kawaii Pastel)
- **Pink** (#FADADD) - Primary buttons, accents
- **Cream** (#FFF6E5) - Question backgrounds
- **Blue** (#CDEFFF) - Hover states, secondary elements
- **Yellow** (#FFF3B0) - Highlights, flash cards
- **Purple** (#E5D4FF) - Text, borders

### Typography
- **M PLUS Rounded 1c** - Main UI font (rounded, friendly)
- **Noto Sans JP** - Japanese characters (authentic)

### Background
- Gradient blend of pastel colors
- Floating sakura petals (🌸) animation
- Cloud-like radial gradients

## ✨ Animations (Framer Motion)

### Button Interactions
```jsx
whileHover={{ scale: 1.05 }}  // Bounce on hover
whileTap={{ scale: 0.95 }}    // Press effect
```

### Page Transitions
- Fade in/out between pages
- Slide animations for questions
- Smooth opacity changes

### Quiz Feedback
- **Correct Answer**: ⭐ Star bounce + green highlight
- **Wrong Answer**: ❌ Shake animation + red highlight
- **Card Flip**: 3D rotation (180°) for flash cards

### Character Animations
- Animated cat mascot (🐱) on home screen
- Rotating and scaling loop
- Floating Japanese icons (🌸⛩️🍡)

## 🔊 Sound System

### Sound Effects (Web Audio API)
- **Click**: 800Hz beep (0.1s) - Button presses
- **Correct**: 1000Hz → 1200Hz (0.2s) - Success melody
- **Wrong**: 300Hz (0.3s) - Error buzz
- **Flip**: 600Hz (0.15s) - Card flip

### Background Music (Placeholder)
- Toggle button in top-right corner
- 🔊 Playing / 🔇 Muted states
- Ready for Howler.js integration

## 🎮 Game Modes

### 📝 Week Quiz Mode

**Flow:**
1. Home → Week Selection (1,2,3,4,5,8)
2. Quiz Game with progress bar
3. Multiple choice (4 options)
4. Instant feedback with animation
5. Results screen with percentage

**Features:**
- Score tracking
- Progress indicator (X/Total)
- Animated question cards
- Color-coded feedback
- Motivational messages based on score

### 🔤 Hiragana Flash Card Mode

**Flow:**
1. Home → Level Selection (1,2,3)
2. Flash Card Game
3. Click to flip card (character ↔ reading)
4. Choose correct reading from 4 options
5. Auto-advance after answer
6. Results screen

**Features:**
- 3D flip animation
- Random choice generation
- Gradient card backgrounds
- Immediate visual feedback
- Progressive difficulty

## 📊 Progress Tracking

### Progress Bar Component
- Current question number
- Total questions
- Current score
- Animated fill bar (gradient)

### Results Screen
- Final score (X/Total)
- Percentage calculation
- Emoji feedback:
  - 🌟 80%+ : "เก่งมาก!" (Excellent!)
  - 👍 60-79%: "ดีมาก!" (Very Good!)
  - 💪 <60%: "ลองใหม่อีกครั้งนะ!" (Try Again!)

## 🎯 Interactive Elements

### Cards
- White background with transparency
- Rounded corners (3xl = 24px)
- Sakura shadow (pink glow)
- 4px white border
- Backdrop blur effect

### Buttons
- Gradient backgrounds
- Bold, rounded text
- Shadow effects
- Hover scale (1.05x)
- Tap scale (0.95x)
- Sound on click

### Choice Buttons
- Slide animation on hover (translateX)
- Border color changes
- Background color feedback:
  - Default: White
  - Hover: Light blue
  - Correct: Green
  - Wrong: Red
  - Disabled: Gray

## 📱 Responsive Design

### Breakpoints (Tailwind)
- Mobile: < 640px (sm)
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Adaptive Layout
- Flexible card widths (max-w-2xl, max-w-3xl)
- Grid layouts for buttons (2-3 columns)
- Padding adjustments
- Font size scaling

## 🎪 Special Effects

### Floating Sakura Petals
- 10 petals randomly positioned
- Continuous fall animation
- Random delays (0-5s)
- Rotation during fall (0° → 360°)
- Duration: 10-20s per cycle
- Infinite loop

### Mascot Animation
- Cat emoji (🐱) on home screen
- Rotation: -10° ↔ 10°
- Scale: 1.0 ↔ 1.1
- 2s duration with 1s delay
- Infinite repeat

### Page Transitions
- Fade in: opacity 0 → 1
- Slide up: y: 20 → 0
- 0.3s duration
- Smooth easing

## 🛠 Component Architecture

### Reusable Components
1. **Button** - Universal button with variants
2. **Card** - Container with kawaii styling
3. **QuizCard** - Question display with choices
4. **FlashCard** - Flippable character card
5. **ProgressBar** - Score and progress tracker
6. **SoundToggle** - BGM control button

### Page Components
1. **Home** - Main menu with mode selection
2. **WeekSelect** - Week picker grid
3. **QuizGame** - Quiz gameplay logic
4. **HiraganaSelect** - Level picker grid
5. **FlashCardGame** - Flash card gameplay logic

### Data Structure
```js
// Quiz Question
{
  question: "Question text",
  choices: ["A. opt1", "B. opt2", "C. opt3", "D. opt4"],
  correct: 0  // index
}

// Hiragana Character
{
  char: "あ",
  reading: "a"
}
```

## 🚀 Performance

### Optimizations
- Lazy loading with React.lazy (future)
- Memoization with useMemo/useCallback (future)
- Framer Motion's AnimatePresence for smooth unmounting
- CSS transforms for animations (GPU accelerated)
- Minimal re-renders with proper state management

### Bundle Size
- React: ~40KB (gzipped)
- Framer Motion: ~30KB (gzipped)
- Tailwind CSS: ~10KB (purged)
- Total: ~80KB (estimated)

## 🎓 Educational Features

### Immediate Feedback
- Visual (color changes)
- Auditory (sound effects)
- Textual (correct answer shown)

### Progressive Learning
- Multiple difficulty levels
- Varied question types
- Spaced repetition ready

### Motivation
- Score tracking
- Percentage feedback
- Encouraging messages
- Visual rewards (stars, emojis)

---

Built with ❤️ using React, Tailwind CSS, and Framer Motion
