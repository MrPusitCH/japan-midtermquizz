# 🚀 Quick Start Guide

## Step 1: Install Dependencies

```bash
npm install
```

This will install:
- React & React DOM
- Vite (build tool)
- Tailwind CSS (styling)
- Framer Motion (animations)
- Howler (sound library)
- Lottie React (optional animations)

## Step 2: Start Development Server

```bash
npm run dev
```

The app will open at `http://localhost:5173`

## Step 3: Explore the Game

### Home Screen
- Choose between Week Quiz Mode or Hiragana Flash Card Mode
- Enjoy the animated cat mascot and floating sakura petals

### Week Quiz Mode
1. Select a week (1, 2, 3, 4, 5, or 8)
2. Answer multiple choice questions
3. Get instant feedback with animations
4. View your final score

### Hiragana Flash Card Mode
1. Select a level (1, 2, or 3)
2. Click the card to flip and see the reading
3. Choose the correct reading from 4 options
4. Progress through all characters

## 🎨 Features to Try

- **Hover Effects**: Hover over buttons to see them bounce
- **Sound Toggle**: Click the speaker icon (top-right) to toggle sounds
- **Animations**: Watch for success stars ⭐ and error shakes ❌
- **Progress Bar**: Track your progress through each quiz

## 🛠 Customization

### Change Colors
Edit `tailwind.config.js` - look for the `kawaii` color scheme

### Add More Questions
Edit `src/data/quizData.js` - add new weeks or questions

### Add More Hiragana
Edit `src/data/hiraganaData.js` - add new levels or characters

## 📦 Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder, ready to deploy!

## 🎵 Adding Real Background Music

1. Add MP3 files to `public/sounds/bgm.mp3`
2. Update `src/utils/sound.js` to use Howler.js
3. Example:
```js
import { Howl } from 'howler'

const bgm = new Howl({
  src: ['/sounds/bgm.mp3'],
  loop: true,
  volume: 0.5
})

export const toggleBGM = () => {
  if (bgm.playing()) {
    bgm.pause()
  } else {
    bgm.play()
  }
}
```

## 🐛 Troubleshooting

### Port already in use?
```bash
npm run dev -- --port 3000
```

### Dependencies not installing?
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build errors?
Make sure you have Node.js 16+ installed:
```bash
node --version
```

---

Happy Learning! 🎌✨
