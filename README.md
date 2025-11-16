# Blackjack Online Game · Multiplayer Casino Challenge
## https://florians-blackjack.vercel.app

## 🧭 Overview
- Browser-based blackjack game with smooth animations, ambient audio, and streak tracking.
- Persists player stats through Supabase so every session feels connected.
- Built for quick rounds, responsive on desktop/mobile, and friendly to new players via guided tutorial.

## ✨ Key Features
- **Interactive gameplay:** Hit/stand controls, keyboard shortcuts, and animated dealer turns.
- **Persistent profiles:** Supabase-backed player records with wins, losses, and best streak.
- **Scoreboard & leaderboard:** Toggleable overlays to compare performance and track progress.
- **Immersive audio:** Casino ambiance loop and card-draw SFX with per-player toggles.
- **Onboarding tutorial:** Auto-opens for first-time users; accessible anytime from settings.
- **Configurable UI:** Show/hide HUD widgets, manage sound, and restart rounds instantly.

## 🧰 Tech Stack
### Environment & Tooling
- Node.js + npm
- Vite for dev server/build pipeline
- ESLint for static analysis

### Frameworks
- React 19 with functional components and hooks
- Tailwind CSS 4 (via `@tailwindcss/vite`) for utility-first styling

### Libraries
- Headless UI for accessible dialogs/modals
- React Icons for visual flourishes

### Services
- Supabase (PostgreSQL + Auth) for player persistence

## 🧩 Architecture Overview
- **App Shell (`src/App.jsx`):** Coordinates state (hands, deck, stats, audio), orchestrates lifecycle hooks, and renders core UI modules.
- **Game Logic (`src/game/blackjackLogic.js`):** Encapsulates deck generation, dealing, hit handling, dealer AI, and result resolution.
- **Player Management (`src/playerManager.js` + `supabaseHelpers.js`):** Fetches/creates player rows, syncs streaks, and abstracts Supabase queries.
- **UI Components (`src/components/`):** Modular React components (DealerHand, PlayerHand, Controls, Scoreboard, Leaderboard, Settings, Tutorial) keep presentation isolated from logic.
- **Audio Assets (`src/audio/`):** Ambient + SFX files referenced through React refs for controlled playback.
- **Entry Point (`src/main.jsx`):** Mounts the React app and injects Tailwind/global styles.

## ⚙️ Setup & Installation
```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Build for production
npm run build
```

## 🔧 Configuration
Create `.env` in the project root:
```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=public-anon-key
```
Additional tips:
- Ensure the Supabase project has a `blackjack_players` table with `id`, `username`, `win_count`, `loss_count`, and `streak` columns.
- Grant insert/select/update permissions to the anon role or use row-level security policies that match your needs.

## 📁 Folder Structure
```
Blackjack-Online-Game/
├─ public/               # Static assets served by Vite
├─ src/
│  ├─ components/        # Dealer/Player hands, controls, HUD widgets
│  ├─ game/              # blackjackLogic.js and related utilities
│  ├─ audio/             # Ambient + SFX files
│  ├─ App.jsx            # Root component
│  ├─ playerManager.js   # Player creation + persistence
│  ├─ supabaseClient.js  # Supabase client bootstrap
│  └─ supabaseHelpers.js # Shared DB helpers
├─ package.json
├─ vite.config.js
└─ README.md
```

## 🔮 Future Improvements
- Online multiplayer tables with synchronized rounds.
- Advanced betting system with chips, insurance, and split mechanics.
- Mobile-native gestures (swipe to hit/stand) and haptics.
- Rich analytics dashboard with history charts and achievements.
