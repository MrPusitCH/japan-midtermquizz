# 🎮 Game Flow Diagram

## Visual Navigation Map

```
┌─────────────────────────────────────────────────────────────┐
│                         HOME PAGE                            │
│                                                              │
│                    🎌 Japanese Learning                      │
│                      เกมเรียนภาษาญี่ปุ่น                     │
│                                                              │
│                          🐱                                  │
│                   (Animated Mascot)                          │
│                                                              │
│              ┌──────────────────────────┐                   │
│              │  📝 Week Quiz Mode       │                   │
│              └──────────────────────────┘                   │
│                          │                                   │
│              ┌──────────────────────────┐                   │
│              │  🔤 Hiragana Flash Card  │                   │
│              └──────────────────────────┘                   │
│                                                              │
│                    🌸 ⛩️ 🍡                                  │
│                 (Floating Icons)                             │
└─────────────────────────────────────────────────────────────┘
                    │                    │
                    │                    │
        ┌───────────┘                    └───────────┐
        │                                            │
        ▼                                            ▼
┌──────────────────┐                    ┌──────────────────┐
│  WEEK SELECTION  │                    │ LEVEL SELECTION  │
│                  │                    │                  │
│  ┌────┬────┬────┐│                    │  ┌────┬────┬────┐│
│  │ W1 │ W2 │ W3 ││                    │  │ L1 │ L2 │ L3 ││
│  └────┴────┴────┘│                    │  └────┴────┴────┘│
│  ┌────┬────┬────┐│                    │                  │
│  │ W4 │ W5 │ W8 ││                    │   ← กลับ         │
│  └────┴────┴────┘│                    └──────────────────┘
│                  │                              │
│   ← กลับ         │                              │
└──────────────────┘                              │
        │                                         │
        │                                         │
        ▼                                         ▼
┌──────────────────┐                    ┌──────────────────┐
│   QUIZ GAME      │                    │  FLASH CARD GAME │
│                  │                    │                  │
│  ┌─────────────┐ │                    │  ┌─────────────┐ │
│  │ Progress Bar│ │                    │  │ Progress Bar│ │
│  │ Score: 0    │ │                    │  │ Score: 0    │ │
│  │ ข้อที่: 1/4 │ │                    │  │ ข้อที่: 1/14│ │
│  └─────────────┘ │                    │  └─────────────┘ │
│                  │                    │                  │
│  ┌─────────────┐ │                    │  ┌─────────────┐ │
│  │  Question   │ │                    │  │             │ │
│  │   Card      │ │                    │  │      あ     │ │
│  └─────────────┘ │                    │  │             │ │
│                  │                    │  │  (Click to  │ │
│  ┌─────────────┐ │                    │  │    Flip)    │ │
│  │ A. Choice 1 │ │                    │  └─────────────┘ │
│  ├─────────────┤ │                    │                  │
│  │ B. Choice 2 │ │                    │  ┌───┬───┬───┬──┐│
│  ├─────────────┤ │                    │  │ a │ i │ u │e ││
│  │ C. Choice 3 │ │                    │  └───┴───┴───┴──┘│
│  ├─────────────┤ │                    │                  │
│  │ D. Choice 4 │ │                    │   ← กลับ         │
│  └─────────────┘ │                    └──────────────────┘
│                  │                              │
│  [ข้อต่อไป →]   │                              │
│   ← กลับ         │                              │
└──────────────────┘                              │
        │                                         │
        │                                         │
        ▼                                         ▼
┌──────────────────┐                    ┌──────────────────┐
│  RESULTS PAGE    │                    │  RESULTS PAGE    │
│                  │                    │                  │
│   🎉 ผลลัพธ์     │                    │   🎉 ผลลัพธ์     │
│                  │                    │                  │
│       🌟         │                    │       🌟         │
│                  │                    │                  │
│     4/4          │                    │     14/14        │
│     100%         │                    │     100%         │
│   เก่งมาก!       │                    │   เก่งมาก!       │
│                  │                    │                  │
│ [กลับเมนูหลัก]   │                    │ [กลับเมนูหลัก]   │
└──────────────────┘                    └──────────────────┘
        │                                         │
        └─────────────┬───────────────────────────┘
                      │
                      ▼
                  (Back to HOME)
```

## User Journey

### 🎯 Week Quiz Mode Journey

1. **Home** → Click "📝 Week Quiz Mode"
2. **Week Selection** → Choose Week (1-8)
3. **Quiz Game** → Answer questions
   - See question
   - Click answer
   - Get instant feedback (✅ or ❌)
   - Click "ข้อต่อไป" for next question
4. **Results** → View score and percentage
5. **Home** → Click "กลับเมนูหลัก"

### 🎯 Flash Card Mode Journey

1. **Home** → Click "🔤 Hiragana Flash Card Mode"
2. **Level Selection** → Choose Level (1-3)
3. **Flash Card Game** → Learn characters
   - See hiragana character
   - Click card to flip and see reading
   - Choose correct reading from 4 options
   - Auto-advance to next card
4. **Results** → View score and percentage
5. **Home** → Click "กลับเมนูหลัก"

## Animation Timeline

### Page Load (Home)
```
0.0s: Page fade in (opacity 0 → 1)
0.0s: Title scale up (0 → 1)
0.5s: Mascot appears
0.5s: Buttons fade in
0.5s: Icons start floating
∞:    Sakura petals falling
∞:    Mascot animation loop
```

### Quiz Answer Interaction
```
User clicks answer
↓
0.0s: Play click sound (800Hz)
0.0s: Button scale down (1 → 0.95)
0.1s: Button scale up (0.95 → 1)
0.1s: Check answer
↓
If Correct:
  0.2s: Green background
  0.2s: Play success sound (1000Hz → 1200Hz)
  0.2s: Star animation (⭐ bounce)
  0.5s: Show "ข้อต่อไป" button
↓
If Wrong:
  0.2s: Red background
  0.2s: Play error sound (300Hz)
  0.2s: Shake animation (❌)
  0.2s: Highlight correct answer (green)
  0.5s: Show "ข้อต่อไป" button
```

### Flash Card Flip
```
User clicks card
↓
0.0s: Play flip sound (600Hz)
0.0s: Start 3D rotation
0.3s: Card at 90° (edge view)
0.6s: Card at 180° (back view)
↓
User clicks again
↓
0.0s: Play flip sound
0.6s: Card back to 0° (front view)
```

## State Management

### App State
```javascript
{
  currentPage: 'home' | 'weekSelect' | 'quiz' | 'hiraganaSelect' | 'flashcard',
  selectedWeek: 1-8 | null,
  selectedLevel: 1-3 | null
}
```

### Quiz Game State
```javascript
{
  questions: Array<Question>,
  currentIndex: 0-n,
  score: 0-n,
  answered: boolean,
  selectedIndex: 0-3 | null,
  showResult: boolean
}
```

### Flash Card Game State
```javascript
{
  cards: Array<HiraganaCard>,
  currentIndex: 0-n,
  score: 0-n,
  choices: Array<string>,
  showResult: boolean
}
```

## Component Hierarchy

```
App
├── SoundToggle (fixed position)
├── Sakura Petals (background)
└── Current Page
    ├── Home
    │   ├── Card
    │   ├── Button (Week Quiz)
    │   └── Button (Flash Card)
    │
    ├── WeekSelect
    │   ├── Card
    │   ├── Button × 6 (weeks)
    │   └── Button (back)
    │
    ├── QuizGame
    │   ├── Card
    │   ├── ProgressBar
    │   ├── QuizCard
    │   │   ├── Question
    │   │   └── Choice Buttons × 4
    │   ├── Button (next)
    │   └── Button (back)
    │
    ├── HiraganaSelect
    │   ├── Card
    │   ├── Button × 3 (levels)
    │   └── Button (back)
    │
    └── FlashCardGame
        ├── Card
        ├── ProgressBar
        ├── FlashCard
        │   ├── Character (front)
        │   ├── Reading (back)
        │   └── Choice Buttons × 4
        └── Button (back)
```

## Data Flow

```
User Action → Event Handler → State Update → Re-render → Animation
     ↓              ↓              ↓             ↓           ↓
  Click         onClick()      setState()    React      Framer
  Button        function       updates       renders    Motion
                               state         UI         animates
```

## Sound System Flow

```
User Interaction
      ↓
playSound(type)
      ↓
Switch (type)
      ├─ 'click'   → 800Hz beep
      ├─ 'correct' → 1000Hz + 1200Hz
      ├─ 'wrong'   → 300Hz buzz
      └─ 'flip'    → 600Hz beep
      ↓
Web Audio API
      ↓
Create Oscillator
      ↓
Play Sound
```

## Responsive Breakpoints

```
Mobile (< 640px)
├── Single column layout
├── Smaller fonts
├── Full-width buttons
└── Compact spacing

Tablet (640px - 1024px)
├── 2-column grids
├── Medium fonts
├── Flexible buttons
└── Comfortable spacing

Desktop (> 1024px)
├── 3-column grids
├── Large fonts
├── Max-width containers
└── Generous spacing
```

---

## Quick Reference

### Navigation Paths
- Home → Week Select → Quiz → Results → Home
- Home → Level Select → Flash Card → Results → Home

### Key Interactions
- **Click**: Buttons, choices, cards
- **Hover**: Button scale effect
- **Tap**: Mobile touch support
- **Flip**: Flash card rotation

### Feedback Types
- **Visual**: Color changes (green/red)
- **Audio**: Sound effects
- **Animation**: Bounce, shake, fade
- **Text**: Score, percentage, messages

---

Ready to play! Run `npm run dev` 🎌✨
