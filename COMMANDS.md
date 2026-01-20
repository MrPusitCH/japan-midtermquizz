# 🛠 Useful Commands

## Development

### Start Development Server
```bash
npm run dev
```
Opens at `http://localhost:5173`

### Start with Custom Port
```bash
npm run dev -- --port 3000
```

### Start with Network Access
```bash
npm run dev -- --host
```
Access from other devices on your network

## Building

### Production Build
```bash
npm run build
```
Output: `dist/` folder

### Preview Production Build
```bash
npm run preview
```
Test the production build locally

### Build with Source Maps
```bash
npm run build -- --sourcemap
```

## Package Management

### Install Dependencies
```bash
npm install
```

### Install Specific Package
```bash
npm install package-name
```

### Install Dev Dependency
```bash
npm install -D package-name
```

### Update All Packages
```bash
npm update
```

### Check for Outdated Packages
```bash
npm outdated
```

### Audit Security
```bash
npm audit
npm audit fix
```

### Clean Install
```bash
rm -rf node_modules package-lock.json
npm install
```

## Code Quality

### Format with Prettier (if installed)
```bash
npx prettier --write "src/**/*.{js,jsx,css}"
```

### Lint with ESLint (if installed)
```bash
npx eslint src/
```

### Type Check (if using TypeScript)
```bash
npx tsc --noEmit
```

## Testing (if tests added)

### Run Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm test -- --watch
```

### Run Tests with Coverage
```bash
npm test -- --coverage
```

## Git Commands

### Initialize Git
```bash
git init
```

### Add All Files
```bash
git add .
```

### Commit Changes
```bash
git commit -m "Initial commit"
```

### Create GitHub Repo and Push
```bash
git remote add origin https://github.com/username/repo.git
git branch -M main
git push -u origin main
```

## Deployment

### Deploy to Vercel
```bash
npm i -g vercel
vercel
```

### Deploy to Netlify
```bash
npm i -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

### Deploy to GitHub Pages
```bash
npm install -D gh-pages
npm run deploy
```

## Maintenance

### Clear Vite Cache
```bash
rm -rf node_modules/.vite
```

### Clear npm Cache
```bash
npm cache clean --force
```

### Reinstall Everything
```bash
rm -rf node_modules package-lock.json dist
npm install
```

## Useful Vite Commands

### Analyze Bundle Size
```bash
npm run build -- --mode analyze
```

### Build with Debug Info
```bash
npm run build -- --debug
```

### Force Optimize Dependencies
```bash
npm run dev -- --force
```

## Environment Variables

### Create .env File
```bash
echo "VITE_APP_TITLE=My App" > .env
```

### Load Different Env Files
```bash
npm run dev -- --mode staging
```
Loads `.env.staging`

## Package Scripts

### Add Custom Script to package.json
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "npm run build && vercel --prod"
  }
}
```

## Debugging

### Run with Debug Logs
```bash
DEBUG=vite:* npm run dev
```

### Check Node Version
```bash
node --version
```

### Check npm Version
```bash
npm --version
```

### List Installed Packages
```bash
npm list --depth=0
```

### Check Package Info
```bash
npm info react
```

## Performance

### Analyze Bundle
```bash
npm run build
npx vite-bundle-visualizer
```

### Check Build Size
```bash
npm run build
du -sh dist/
```

### Lighthouse Audit
```bash
npm run build
npm run preview
# Then open Chrome DevTools > Lighthouse
```

## Quick Fixes

### Port Already in Use
```bash
# Kill process on port 5173
npx kill-port 5173
```

### Module Not Found
```bash
npm install
```

### Build Fails
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Vite Not Working
```bash
npm install -D vite@latest
```

## Useful One-Liners

### Count Lines of Code
```bash
find src -name "*.jsx" -o -name "*.js" | xargs wc -l
```

### Find TODO Comments
```bash
grep -r "TODO" src/
```

### List All Components
```bash
ls -1 src/components/
```

### Check Bundle Size
```bash
npm run build && ls -lh dist/assets/
```

## Development Workflow

### Typical Day
```bash
# Morning
git pull
npm install  # if package.json changed
npm run dev

# During development
# ... make changes ...
# ... test in browser ...

# Before commit
npm run build  # ensure it builds
git add .
git commit -m "Add feature X"
git push

# Deploy
vercel  # or your deployment command
```

### Feature Branch Workflow
```bash
git checkout -b feature/new-quiz-mode
# ... make changes ...
git add .
git commit -m "Add new quiz mode"
git push -u origin feature/new-quiz-mode
# Create PR on GitHub
```

## Troubleshooting Commands

### Check if Port is Available
```bash
netstat -ano | findstr :5173  # Windows
lsof -i :5173                 # Mac/Linux
```

### Clear Everything and Start Fresh
```bash
rm -rf node_modules package-lock.json dist .vite
npm install
npm run dev
```

### Check for Syntax Errors
```bash
npm run build
```

### Verify Dependencies
```bash
npm list
```

## Quick Reference

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm install` | Install dependencies |
| `npm update` | Update packages |
| `npm audit` | Check security |
| `vercel` | Deploy to Vercel |
| `git push` | Push to GitHub |

---

## Keyboard Shortcuts (in Browser)

| Shortcut | Action |
|----------|--------|
| `Ctrl + Shift + R` | Hard refresh |
| `F12` | Open DevTools |
| `Ctrl + Shift + C` | Inspect element |
| `Ctrl + Shift + M` | Toggle device toolbar |
| `Ctrl + Shift + I` | Open DevTools |

---

Save this file for quick reference! 📚✨
