# Blackjack Online – Clean casino-grade Blackjack

## 🧭 Overview
- Web-based Blackjack table built with React + Vite.
- Focus on correct casino rules, responsive chip tray, and tactile animations.
- Persists player profiles, bankroll, and streaks through Supabase plus local storage.

## ✨ Key Features
- **Casino-accurate rules** including dealer soft 17 logic, blackjack checks, bust/tie states handled in `src/game/blackjackLogic.js`.
- **Betting & chip management** with configurable wagers, bankroll tracking, and leaderboard-friendly stats.
- **Modular UI**: table, hands, controls, tutorial, and scoreboard are standalone React components for easy reuse.
- **Persistent progression**: automatic player registration, Supabase-backed streaks, and local resume for in-progress rounds.
- **Immersive feedback**: animated card reveals, space-bar quick reset, ambiance loop, and toggleable sound effects.

## 🧰 Tech Stack
- **Environment / Tooling**
  - Node.js + npm
  - Vite dev server & bundler
  - ESLint (React, Hooks, Refresh plugins)
- **Frameworks**
  - React 19 with functional components & hooks
  - Tailwind CSS 4 for utility-first styling
- **Libraries**
  - @headlessui/react for accessible overlays
  - react-icons for iconography
- **Services**
  - Supabase (PostgreSQL + REST) for player storage & leaderboards
  - LocalStorage for round persistence

## 🧩 Architecture Overview
- **Game Core (`src/game/`)**
  - `deck.js`, `blackjackScoring.js`, and `blackjackLogic.js` compose the shuffle/deal/hit/dealer AI pipeline.
- **State Orchestration (`src/App.jsx`)**
  - Central hook-driven controller wiring the deck, hands, messages, settings, audio, and persistence.
- **UI Modules (`src/components/`)**
  - Presentation-only React components such as `PlayerHand`, `DealerHand`, `Controls`, `Message`, `Leaderboard`, `Scoreboard`, `Tutorial`, and `Settings`.
- **Player Services (`src/playerManager.js`, `src/supabaseClient.js`, `src/supabaseHelpers.js`)**
  - Create/lookup players, connect to Supabase, and wrap leaderboard/stat queries.
- **Assets (`src/audio/`, `public/`)**
  - Casino ambiance loops and card/SVG assets consumed by the UI layer.

## ⚙️ Setup & Installation
```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Build for production
npm run build
```

## 🔐 Configuration
Create a `.env` or `.env.local` file at the project root with your Supabase credentials:
```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=public-anon-key
```
These values are read by `src/supabaseClient.js` to bootstrap the database client.

## 🚀 Usage Examples
- **Play locally**: visit the Vite dev URL (usually `http://localhost:5173`), enter a username in Settings, adjust chip bet, then use Hit/Stand controls.
- **Keyboard shortcuts**: press <kbd>Space</kbd> after a round to instantly re-deal.
- **Audio toggles**: open Settings to enable/disable ambiance and card SFX.

## 🗂️ Folder Structure
```
Blackjack-Online-Game/
├── public/               # Static assets and favicon
├── src/
│   ├── App.jsx           # Root controller
│   ├── components/       # UI modules (Hands, Controls, Message, etc.)
│   ├── game/             # Deck, scoring, and blackjack logic
│   ├── audio/            # Ambiance + SFX
│   ├── playerManager.js  # Player creation & storage helpers
│   ├── supabaseClient.js # Supabase connection
│   └── supabaseHelpers.js# Leaderboard/stat utilities
├── package.json          # Scripts & dependencies
└── vite.config.js        # Build configuration
```

## 🔮 Future Improvements
- Live multiplayer tables powered by Supabase Realtime or WebSockets.
- Dealer voiceovers, richer particle/card animations, and bet feedback.
- Advanced betting options (split, double down, insurance) with chip tray UI.
- Account-bound achievements and seasonal leaderboard resets.
