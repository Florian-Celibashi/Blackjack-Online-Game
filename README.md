# 🃏 Blackjack Web Game  
*A modern, full-stack Blackjack experience built with React, Vite, Tailwind CSS, and Supabase.*
Check it out 👉 [Florian's Blackjack](https://florians-blackjack.vercel.app)

## 💡 Overview  
This project delivers an interactive Blackjack game that runs entirely in the browser. It combines responsive UI, smooth animations, persistent player data, and online leaderboards — all backed by Supabase.  

**Key technologies:**  
- **Frontend:** React + Vite + Tailwind CSS  
- **Backend:** Supabase (PostgreSQL, Auth, Realtime)  
- **Tooling:** ESLint, Prettier, Vite build pipeline  

`App.jsx` serves as the game controller — managing state for the deck, hands, and game flow while rendering UI modules such as the tutorial, controls, scoreboard, leaderboard, and settings.

---

## ♣️ Core Game Logic  
All core mechanics live under `src/game/`:
- **`deck.js`** – Generates and shuffles a standard 52-card deck.  
- **`blackjackScoring.js`** – Evaluates hand values with proper ace adjustments.  
- **`blackjackLogic.js`** – Manages dealing, hits, stands, and dealer AI with outcome evaluation.

During gameplay, `App.jsx` calls `startGame`, `hit`, and `dealerTurn` to update state and animations, determine round outcomes, and trigger persistence updates.

---

## 🃏 UI Components  
- **`PlayerHand.jsx` / `DealerHand.jsx`** – Render card visuals using SVG assets; dealer cards stay hidden until reveal.  
- **`Controls.jsx`** – Hit/Stand buttons and keyboard shortcuts.  
- **`Message.jsx`** – Context-sensitive game prompts (“Press space to play again”).  
- **Overlays:** Tutorial modal, Scoreboard (win/loss/streaks), and Leaderboard (Supabase-fetched rankings).  
- **`Settings.jsx`** – Username editing, audio/UI toggles, stat resets, and notification feedback.

---

## 🧩 Player Persistence & Backend Integration  
Player data and stats persist across sessions via **Supabase** and **localStorage**:
- **`playerManager.js`** – Handles anonymous user creation, lookup, and storage.  
- **`supabaseClient.js`** – Initializes the Supabase connection.  
- **`supabaseHelpers.js`** – Provides reusable functions for stat updates and leaderboard queries.  

In-progress rounds (deck, hand states, etc.) are cached locally. When a round ends, Supabase updates win/loss/streak counters atomically while tracking streaks locally to prevent duplicate writes.

---

## 🔊 Audio & Styling  
- Ambient background music and card-draw SFX controlled in `App.jsx`.  
- Audio assets stored under `/audio/`.  
- Tailwind animations and a casino-themed backdrop enhance immersion.

---

## ⚙️ Tooling & Development  
- **Vite** for lightning-fast dev server and bundling.  
- **ESLint + React plugin** for code consistency.  
- **Tailwind v4** utility styling pipeline.  
- **npm scripts:**  
  ```bash
  npm run dev      # Start development server
  npm run build    # Build for production
  npm run preview  # Preview local build
  npm run lint     # Run ESLint
  ```

---

## 🚀 Future Enhancements  
- Online multiplayer via Supabase Realtime or WebSockets  
- Expanded audio engine and animations  
- User authentication (email or OAuth)  
- Achievement system and seasonal leaderboards