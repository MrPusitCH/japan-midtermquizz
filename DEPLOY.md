# 🚀 Deployment Guide

## Quick Deploy Options

### 1. Vercel (Recommended - Easiest)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or use the Vercel website:
1. Go to [vercel.com](https://vercel.com)
2. Import your Git repository
3. Vercel auto-detects Vite
4. Click Deploy!

### 2. Netlify

```bash
# Build the project
npm run build

# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

Or drag & drop:
1. Run `npm run build`
2. Go to [netlify.com/drop](https://app.netlify.com/drop)
3. Drag the `dist` folder
4. Done!

### 3. GitHub Pages

Add to `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/japanese-game"
}
```

Install gh-pages:
```bash
npm install --save-dev gh-pages
```

Add scripts to `package.json`:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

Update `vite.config.js`:
```js
export default defineConfig({
  plugins: [react()],
  base: '/japanese-game/'  // your repo name
})
```

Deploy:
```bash
npm run deploy
```

### 4. Firebase Hosting

```bash
# Install Firebase CLI
npm i -g firebase-tools

# Login
firebase login

# Initialize
firebase init hosting

# Build
npm run build

# Deploy
firebase deploy
```

### 5. Cloudflare Pages

1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
2. Connect your Git repository
3. Build settings:
   - Build command: `npm run build`
   - Build output: `dist`
4. Deploy!

## Build Configuration

### Environment Variables

Create `.env` file:
```env
VITE_APP_TITLE=Japanese Learning Game
VITE_API_URL=https://your-api.com
```

Access in code:
```js
const title = import.meta.env.VITE_APP_TITLE
```

### Production Build

```bash
npm run build
```

Output: `dist/` folder

Preview build locally:
```bash
npm run preview
```

## Performance Optimization

### 1. Image Optimization

Add images to `public/images/` folder and use:
```jsx
<img src="/images/sakura.png" alt="Sakura" />
```

### 2. Code Splitting

Use React.lazy for route-based splitting:
```jsx
const QuizGame = lazy(() => import('./pages/QuizGame'))
```

### 3. Lighthouse Score

Run audit:
```bash
npm run build
npm run preview
# Open Chrome DevTools > Lighthouse
```

Target scores:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 90+

## Custom Domain

### Vercel
1. Go to Project Settings > Domains
2. Add your domain
3. Update DNS records

### Netlify
1. Go to Domain Settings
2. Add custom domain
3. Configure DNS

## SSL Certificate

All platforms provide free SSL automatically!

## Monitoring

### Analytics

Add Google Analytics to `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Error Tracking

Use Sentry:
```bash
npm install @sentry/react
```

```jsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
});
```

## Troubleshooting

### Build fails?
- Check Node version: `node --version` (need 16+)
- Clear cache: `rm -rf node_modules package-lock.json && npm install`
- Check for TypeScript errors

### 404 on refresh?
Add `_redirects` file to `public/`:
```
/*    /index.html   200
```

Or for Vercel, create `vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

### Assets not loading?
- Check `base` in `vite.config.js`
- Use absolute paths: `/images/logo.png`
- Verify files are in `public/` folder

## Checklist Before Deploy

- [ ] Run `npm run build` successfully
- [ ] Test with `npm run preview`
- [ ] Check all links work
- [ ] Test on mobile devices
- [ ] Verify sound effects work
- [ ] Check animations are smooth
- [ ] Test all quiz weeks
- [ ] Test all hiragana levels
- [ ] Update README with live URL
- [ ] Add meta tags for SEO
- [ ] Test in different browsers

## SEO Optimization

Update `index.html`:
```html
<head>
  <meta name="description" content="Learn Japanese with fun interactive games! Practice Hiragana and quiz yourself on Japanese vocabulary.">
  <meta name="keywords" content="Japanese, learning, hiragana, quiz, education">
  <meta property="og:title" content="Japanese Learning Game">
  <meta property="og:description" content="Interactive Japanese learning game">
  <meta property="og:image" content="/preview.png">
  <meta name="twitter:card" content="summary_large_image">
</head>
```

---

Happy Deploying! 🎌✨
