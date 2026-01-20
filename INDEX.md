# 📚 Japanese Learning Game - Documentation Index

Welcome to the complete documentation for the Japanese Learning Game! This index will help you find exactly what you need.

## 🚀 Getting Started

### For First-Time Users
1. **[QUICKSTART.md](QUICKSTART.md)** - Get up and running in 5 minutes
   - Installation steps
   - Running the dev server
   - Basic usage guide
   - Quick customization tips

2. **[README.md](README.md)** - Project overview and features
   - What this project does
   - Tech stack
   - Project structure
   - Basic setup

### For Developers
3. **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Complete project breakdown
   - What's been created
   - Content inventory
   - Technical details
   - Success criteria

## 🎨 Design & Features

### Visual Design
4. **[FEATURES.md](FEATURES.md)** - Detailed feature documentation
   - Visual theme and colors
   - Animation specifications
   - Sound system
   - Component architecture
   - Performance metrics

5. **[SHOWCASE.md](SHOWCASE.md)** - Visual mockups and examples
   - Screen mockups (ASCII art)
   - Color palette
   - Animation examples
   - Responsive views
   - Typography scale
   - Interactive states

### User Experience
6. **[GAME_FLOW.md](GAME_FLOW.md)** - Navigation and interaction flows
   - Visual navigation map
   - User journey diagrams
   - Animation timelines
   - State management
   - Component hierarchy
   - Data flow

## 🛠 Development

### Commands & Tools
7. **[COMMANDS.md](COMMANDS.md)** - All useful commands
   - Development commands
   - Build commands
   - Package management
   - Git commands
   - Debugging tools
   - Quick reference table

### Deployment
8. **[DEPLOY.md](DEPLOY.md)** - Deployment guide
   - Vercel deployment
   - Netlify deployment
   - GitHub Pages
   - Firebase Hosting
   - Cloudflare Pages
   - Custom domains
   - Performance optimization
   - Troubleshooting

## 📁 Project Files

### Configuration Files
```
├── package.json           # Dependencies and scripts
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind CSS setup
├── postcss.config.js     # PostCSS configuration
└── .gitignore           # Git ignore rules
```

### Source Code
```
src/
├── components/           # Reusable UI components
│   ├── Button.jsx       # Animated button
│   ├── Card.jsx         # Card wrapper
│   ├── QuizCard.jsx     # Quiz question card
│   ├── FlashCard.jsx    # Flippable flash card
│   ├── ProgressBar.jsx  # Progress indicator
│   └── SoundToggle.jsx  # BGM toggle
│
├── pages/               # Game pages
│   ├── Home.jsx         # Main menu
│   ├── WeekSelect.jsx   # Week selection
│   ├── QuizGame.jsx     # Quiz gameplay
│   ├── HiraganaSelect.jsx # Level selection
│   └── FlashCardGame.jsx  # Flash card gameplay
│
├── data/                # Game content
│   ├── quizData.js      # Quiz questions
│   └── hiraganaData.js  # Hiragana characters
│
├── utils/               # Utilities
│   └── sound.js         # Sound effects
│
├── App.jsx              # Main app component
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## 🎯 Quick Navigation

### I want to...

**...start the project**
→ [QUICKSTART.md](QUICKSTART.md) → Installation & Running

**...understand the features**
→ [FEATURES.md](FEATURES.md) → Feature Documentation

**...see what it looks like**
→ [SHOWCASE.md](SHOWCASE.md) → Visual Mockups

**...understand the flow**
→ [GAME_FLOW.md](GAME_FLOW.md) → Navigation & Interactions

**...deploy the project**
→ [DEPLOY.md](DEPLOY.md) → Deployment Guide

**...find a command**
→ [COMMANDS.md](COMMANDS.md) → Command Reference

**...add content**
→ [README.md](README.md) → Adding Content Section

**...customize colors**
→ [FEATURES.md](FEATURES.md) → Color Palette Section

**...troubleshoot**
→ [COMMANDS.md](COMMANDS.md) → Troubleshooting Section

## 📖 Documentation by Topic

### Content Management
- **Quiz Questions**: `src/data/quizData.js`
- **Hiragana Data**: `src/data/hiraganaData.js`
- **Adding Weeks**: [README.md](README.md) - Adding Content
- **Adding Levels**: [README.md](README.md) - Adding Content

### Styling & Design
- **Color Palette**: [FEATURES.md](FEATURES.md) - Visual Theme
- **Animations**: [FEATURES.md](FEATURES.md) - Animations
- **Typography**: [SHOWCASE.md](SHOWCASE.md) - Typography Scale
- **Responsive**: [SHOWCASE.md](SHOWCASE.md) - Responsive Views

### Components
- **Button**: `src/components/Button.jsx`
- **Card**: `src/components/Card.jsx`
- **QuizCard**: `src/components/QuizCard.jsx`
- **FlashCard**: `src/components/FlashCard.jsx`
- **ProgressBar**: `src/components/ProgressBar.jsx`
- **SoundToggle**: `src/components/SoundToggle.jsx`

### Pages
- **Home**: `src/pages/Home.jsx`
- **Week Select**: `src/pages/WeekSelect.jsx`
- **Quiz Game**: `src/pages/QuizGame.jsx`
- **Hiragana Select**: `src/pages/HiraganaSelect.jsx`
- **Flash Card Game**: `src/pages/FlashCardGame.jsx`

### Technical
- **Sound System**: `src/utils/sound.js`
- **State Management**: [GAME_FLOW.md](GAME_FLOW.md) - State Management
- **Data Flow**: [GAME_FLOW.md](GAME_FLOW.md) - Data Flow
- **Performance**: [FEATURES.md](FEATURES.md) - Performance

## 🎓 Learning Path

### Beginner
1. Read [QUICKSTART.md](QUICKSTART.md)
2. Run `npm run dev`
3. Explore the game
4. Read [README.md](README.md)

### Intermediate
1. Study [FEATURES.md](FEATURES.md)
2. Review [GAME_FLOW.md](GAME_FLOW.md)
3. Explore source code
4. Make small customizations

### Advanced
1. Study component architecture
2. Add new features
3. Optimize performance
4. Deploy to production

## 🔍 Search Guide

### By File Type
- **Markdown Docs**: `*.md` files in root
- **React Components**: `src/components/*.jsx`
- **Pages**: `src/pages/*.jsx`
- **Data**: `src/data/*.js`
- **Config**: `*.config.js` files

### By Feature
- **Animations**: Search for "framer-motion" or "motion."
- **Styling**: Search for "className" or "tailwind"
- **State**: Search for "useState" or "useEffect"
- **Sound**: Search for "playSound" or "sound.js"

### By Topic
- **Colors**: Search for "kawaii" or "#FADADD"
- **Fonts**: Search for "M PLUS" or "Noto Sans"
- **Quiz**: Search for "weekQuizData"
- **Hiragana**: Search for "hiraganaData"

## 📊 Statistics

### Project Size
- **Total Files**: 30+
- **React Components**: 11
- **Data Files**: 2
- **Documentation**: 8 markdown files
- **Lines of Code**: ~2000+

### Content
- **Quiz Questions**: 32 total
  - Week 1: 4 questions
  - Week 2: 3 questions
  - Week 3: 6 questions
  - Week 4: 5 questions
  - Week 5: 7 questions
  - Week 8: 7 questions

- **Hiragana Characters**: 38 total
  - Level 1: 14 characters
  - Level 2: 10 characters
  - Level 3: 14 characters

### Dependencies
- **React**: 18.3.1
- **Vite**: 5.2.11
- **Tailwind CSS**: 3.4.3
- **Framer Motion**: 11.0.0
- **Howler**: 2.2.4
- **Lottie React**: 2.4.0

## 🎯 Common Tasks

### Development
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview build
```

### Adding Content
1. Edit `src/data/quizData.js` for quiz questions
2. Edit `src/data/hiraganaData.js` for characters
3. See [README.md](README.md) for format

### Customizing
1. Colors: Edit `tailwind.config.js`
2. Fonts: Edit `index.html` (Google Fonts)
3. Animations: Edit component files

### Deploying
1. Run `npm run build`
2. Choose platform (Vercel, Netlify, etc.)
3. Follow [DEPLOY.md](DEPLOY.md) guide

## 🆘 Help & Support

### Troubleshooting
- **Build fails**: [COMMANDS.md](COMMANDS.md) - Quick Fixes
- **Port in use**: [COMMANDS.md](COMMANDS.md) - Port Already in Use
- **Dependencies**: [COMMANDS.md](COMMANDS.md) - Clean Install

### Resources
- **React Docs**: https://react.dev
- **Vite Docs**: https://vitejs.dev
- **Tailwind Docs**: https://tailwindcss.com
- **Framer Motion**: https://www.framer.com/motion

## 📝 Checklist

### Before Starting
- [ ] Read [QUICKSTART.md](QUICKSTART.md)
- [ ] Install dependencies (`npm install`)
- [ ] Run dev server (`npm run dev`)
- [ ] Explore the game

### Before Customizing
- [ ] Read [FEATURES.md](FEATURES.md)
- [ ] Understand [GAME_FLOW.md](GAME_FLOW.md)
- [ ] Review component structure
- [ ] Make a backup

### Before Deploying
- [ ] Test all features
- [ ] Run production build
- [ ] Check bundle size
- [ ] Read [DEPLOY.md](DEPLOY.md)
- [ ] Choose platform
- [ ] Deploy!

## 🎉 What's Next?

1. **Run the game**: `npm run dev`
2. **Explore features**: Try both game modes
3. **Customize**: Change colors, add content
4. **Deploy**: Share with the world!
5. **Enhance**: Add new features

## 📞 Quick Reference

| Need | File |
|------|------|
| Quick start | [QUICKSTART.md](QUICKSTART.md) |
| Features | [FEATURES.md](FEATURES.md) |
| Visual guide | [SHOWCASE.md](SHOWCASE.md) |
| Game flow | [GAME_FLOW.md](GAME_FLOW.md) |
| Commands | [COMMANDS.md](COMMANDS.md) |
| Deploy | [DEPLOY.md](DEPLOY.md) |
| Summary | [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) |
| Main docs | [README.md](README.md) |

---

## 🎌 Ready to Start?

```bash
npm run dev
```

Open http://localhost:5173 and enjoy! ✨

---

**Made with 💖 and 🌸 for Japanese learners**

Last Updated: January 2026
