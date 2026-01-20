# 🎌 Japanese Learning Game - React Version

A cute Japanese-themed learning game built with React, featuring Week Quiz Mode and Hiragana Flash Card Mode.

## ✨ Features

- **Japanese Kawaii Theme** with pastel colors (pink, cream, blue, yellow)
- **Smooth Animations** using Framer Motion
- **Sound Effects** for interactions
- **Two Game Modes:**
  - 📝 Week Quiz Mode (Weeks 1-5, 8)
  - 🔤 Hiragana Flash Card Mode (3 Levels)
- **Floating Sakura Petals** background animation
- **Progress Tracking** with score and progress bar
- **Responsive Design** with Tailwind CSS

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install
```

### Run Development Server

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## 🎨 Tech Stack

- **React 18** - UI Framework
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Google Fonts** - M PLUS Rounded 1c & Noto Sans JP

## 📁 Project Structure

```
src/
├── components/
│   ├── Button.jsx          # Animated button component
│   ├── Card.jsx            # Card wrapper with kawaii styling
│   ├── QuizCard.jsx        # Quiz question card
│   ├── FlashCard.jsx       # Flippable flash card
│   ├── ProgressBar.jsx     # Progress indicator
│   └── SoundToggle.jsx     # BGM toggle button
├── pages/
│   ├── Home.jsx            # Main menu
│   ├── WeekSelect.jsx      # Week selection
│   ├── QuizGame.jsx        # Quiz game page
│   ├── HiraganaSelect.jsx  # Level selection
│   └── FlashCardGame.jsx   # Flash card game page
├── data/
│   ├── quizData.js         # Quiz questions data
│   └── hiraganaData.js     # Hiragana characters data
├── utils/
│   └── sound.js            # Sound effects utility
├── App.jsx                 # Main app component
├── main.jsx               # Entry point
└── index.css              # Global styles
```

## 🎮 Game Modes

### Week Quiz Mode
- Select from Weeks 1, 2, 3, 4, 5, or 8
- Multiple choice questions
- Instant feedback with animations
- Score tracking and results

### Hiragana Flash Card Mode
- 3 difficulty levels
- Flippable cards showing character and reading
- Multiple choice answers
- Progressive learning

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize the kawaii color palette:
```js
kawaii: {
  pink: '#FADADD',
  cream: '#FFF6E5',
  blue: '#CDEFFF',
  yellow: '#FFF3B0',
  purple: '#E5D4FF',
}
```

### Fonts
Fonts are loaded from Google Fonts in `index.html`. Current fonts:
- M PLUS Rounded 1c (main)
- Noto Sans JP (Japanese text)

## 📝 Adding Content

### Add New Quiz Week
Edit `src/data/quizData.js`:
```js
weekQuizData[6] = [
  {
    question: "Your question here",
    choices: ["A. option1", "B. option2", "C. option3", "D. option4"],
    correct: 0 // index of correct answer
  }
]
```

### Add New Hiragana Level
Edit `src/data/hiraganaData.js`:
```js
hiraganaData[4] = [
  { char: "あ", reading: "a" },
  // ... more characters
]
```

## 🔊 Sound System

The game includes simple sound effects using Web Audio API:
- Click sounds for buttons
- Success sound for correct answers
- Error sound for wrong answers
- Flip sound for flash cards

To add real background music, integrate Howler.js and update `src/utils/sound.js`.

## 📱 Browser Support

- Modern browsers with ES6+ support
- Chrome, Firefox, Safari, Edge (latest versions)

## 🎯 Future Enhancements

- [ ] Add Howler.js for real background music
- [ ] Implement Lottie animations
- [ ] Add dark/light theme toggle
- [ ] Star rating system
- [ ] Level unlocking mechanism
- [ ] Review wrong answers feature
- [ ] Local storage for progress saving

## 📄 License

MIT License - Feel free to use for learning purposes!

---

Made with 💖 and 🌸 for Japanese learners
