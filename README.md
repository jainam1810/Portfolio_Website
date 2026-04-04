# Jainam Varia - Portfolio Website

A modern glassmorphism portfolio built with **React**, **Tailwind CSS v4**, and **Lucide Icons**, featuring aurora backgrounds, liquid blob animations, scroll-triggered reveals, a typewriter hero, and a hidden easter egg.

**Live:** [jv-techfolio.netlify.app](https://jv-techfolio.netlify.app/)

---

## Features

- **Glassmorphism UI:** Frosted glass cards with blur, transparency, and subtle borders throughout
- **Aurora Background:** 4 animated gradient blobs that drift and pulse across the viewport
- **Liquid Morphing Blobs:** Organic shape-shifting blobs with continuous border-radius animation
- **Typewriter Hero:** Cycles through 5 taglines with realistic typing and deleting speeds
- **Scroll Reveal Animations:** - Sections fade/slide in on scroll using Intersection Observer
- **Scroll Progress Bar:** - Gradient rainbow bar at the top tracks page scroll position
- **Loading Screen:** Animated "JV" logo with gradient fill bar on initial load
- **Active Nav Highlighting:** Current section auto-highlights in the navbar while scrolling
- **Back-to-Top Button:** Floating glass button appears after scrolling down
- **Company Logos:** Real logos for Amazon, KIFS, Sorneshia, Oron Trade, Prodigy InfoTech
- **Language Proficiency Bars:** Animated fill bars triggered on scroll (English, Hindi, Gujarati, Marathi, Punjabi, French)
- **Voice Feature:** Captain America audio clip with play/pause and animated audio bars
- **Contact Form:** Functional form powered by EmailJS (sends real emails)
- **Fully Responsive:** Mobile hamburger menu, adaptive grids, touch-friendly
- **Hidden Easter Egg:** A cricket-themed fireworks show with sound effects

---

## 🏏 Easter Egg

- **Desktop:** Press `↑ ↑ ↓ ↓ ← → ← → B A` (Konami Code)
- **Mobile:** Tap the screen 5 times within 3 seconds

A cricket bat swings, hits a ball, and the screen explodes into a full fireworks show with boom sound effects via Web Audio API.

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| Framework | React 19 |
| Styling | Tailwind CSS v4 |
| Icons | Lucide React |
| Email | EmailJS |
| Audio | Web Audio API + MP3 |
| Deployment | Netlify, Vercel |

---

## Project Structure

```
Portfolio_Website/
├── public/
│   ├── index.html
│   ├── profile.jpg              # Profile photo
│   ├── Captain_audio.mp3        # Voice clip
│   ├── amazon-logo.png          # Company logos
│   ├── Kifs-logo.PNG
│   ├── Oron_Logo.png
│   ├── Sorneshia-Logo.jpg
│   ├── Somaiya-Logo.jpg
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── App.js                   # Main portfolio component
│   ├── index.js                 # Entry point
│   ├── index.css                # Tailwind import + base styles
│   ├── Prodigy_Logo.jpg         # Imported in App.js
│   └── Somaiya-Logo.jpg         # Imported in App.js
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- npm

### Installation

```bash
# Clone the repo
git clone https://github.com/jainam1810/Portfolio_Website.git

# Navigate to project
cd Portfolio_Website

# Install dependencies
npm install

# Start dev server
npm start
```

Opens at [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

The `build/` folder is ready to deploy.

---

## 🌐 Deployment (Netlify)

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com) → **Add new site** → **Import from Git**
3. Select your repo
4. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `build`
5. Click **Deploy** — your site is live!

---

## 📬 Contact

- **LinkedIn:** [linkedin.com/in/jainamvaria](https://www.linkedin.com/in/jainamvaria/)
- **GitHub:** [github.com/jainam1810](https://github.com/jainam1810)
- **Email:** jainamvaria1010@gmail.com
- **WhatsApp:** [wa.me/447544504854](https://wa.me/447544504854)
- **Instagram:** [@jai_varia_19](https://www.instagram.com/jai_varia_19/)

---

## 📜 License

© 2026 Jainam Varia. All Rights Reserved.
