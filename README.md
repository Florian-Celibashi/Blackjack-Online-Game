# Blackjack — Browser Casino Game

[![CI](https://github.com/Florian-Celibashi/Blackjack-Online-Game/actions/workflows/ci.yml/badge.svg)](https://github.com/Florian-Celibashi/Blackjack-Online-Game/actions/workflows/ci.yml)

**Live demo:** https://florians-blackjack.vercel.app

## 🧭 Overview

A single-player blackjack experience built with React, Vite, and Supabase. The app combines a testable game engine with persistent guest profiles, a shared leaderboard, responsive controls, and an audio-rich casino interface.

## ✨ Key Features

- **Interactive gameplay:** Hit/stand controls, keyboard shortcuts, and animated dealer turns.
- **Persistent guest profiles:** Supabase-backed usernames, wins, losses, and best streaks.
- **Scoreboard & leaderboard:** Toggleable overlays for personal stats and cross-player rankings.
- **Immersive audio:** Casino ambiance loop and card-draw SFX with per-player toggles.
- **Onboarding tutorial:** Auto-opens for first-time users; accessible anytime from settings.
- **Resumable rounds:** Current hands and game state persist in local storage.
- **Tested game engine:** Automated coverage for scoring, deck operations, dealing, player actions, dealer behavior, and result resolution.

## 🧰 Tech Stack

### Environment & Tooling

- Node.js + npm
- Vite for dev server/build pipeline
- ESLint for static analysis
- Node's built-in test runner for fast unit tests
- GitHub Actions for lint, test, build, and dependency-audit checks

### Frameworks

- React 19 with functional components and hooks
- Tailwind CSS 4 (via `@tailwindcss/vite`) for utility-first styling

### Libraries

- Headless UI for accessible dialogs/modals
- React Icons for visual flourishes

### Services

- Supabase/PostgreSQL for guest-profile persistence and leaderboard data

## 🧩 Architecture Overview

- **App Shell (`src/App.jsx`):** Coordinates state (hands, deck, stats, audio), orchestrates lifecycle hooks, and renders core UI modules.
- **Game Engine (`src/game/`):** Separates hand scoring, deck generation/shuffling, dealing, hit handling, dealer behavior, and result resolution from the React UI.
- **Player Management (`src/playerManager.js` + `supabaseHelpers.js`):** Fetches/creates player rows, syncs streaks, and abstracts Supabase queries.
- **UI Components (`src/components/`):** Modular React components (DealerHand, PlayerHand, Controls, Scoreboard, Leaderboard, Settings, Tutorial) keep presentation isolated from logic.
- **Audio Assets (`src/audio/`):** Ambient + SFX files referenced through React refs for controlled playback.
- **Entry Point (`src/main.jsx`):** Mounts the React app and injects Tailwind/global styles.

## ⚙️ Setup & Installation

```bash
# 1. Install dependencies
npm ci

# 2. Start the development server
npm run dev

# 3. Run lint, tests, and a production build
npm run check
```

## 🔧 Configuration

Create `.env` in the project root:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=public-anon-key
```

Additional tips:

- Ensure the Supabase project has a `blackjack_players` table with `id`, `username`, `win_count`, `loss_count`, and `streak` columns.
- Configure row-level security policies that permit only the guest-profile operations required by the app.

## ✅ Quality Checks

```bash
npm run lint       # Static analysis
npm test           # Pure blackjack-engine unit tests
npm run build      # Production bundle
npm audit --audit-level=high
```

GitHub Actions runs the same checks on every pull request and push to `main`.

## 📁 Folder Structure

```
Blackjack-Online-Game/
├─ .github/workflows/    # Continuous integration
├─ public/               # Static assets served by Vite
├─ src/
│  ├─ components/        # Dealer/Player hands, controls, HUD widgets
│  ├─ game/              # Pure deck, scoring, and round logic
│  ├─ audio/             # Ambient + SFX files
│  ├─ App.jsx            # Root component
│  ├─ playerManager.js   # Player creation + persistence
│  ├─ supabaseClient.js  # Supabase client bootstrap
│  └─ supabaseHelpers.js # Shared DB helpers
├─ test/                  # Node unit tests for the game engine
├─ package.json
├─ vite.config.js
└─ README.md
```

## 🔮 Future Improvements

- Online multiplayer tables with synchronized rounds.
- Advanced betting system with chips, insurance, and split mechanics.
- Mobile-native gestures (swipe to hit/stand) and haptics.
- Rich analytics dashboard with history charts and achievements.
