import { useState, useEffect, useRef } from 'react'
import './App.css'
import { getOrCreatePlayer } from './playerManager'
import DealerHand from './components/DealerHand'
import PlayerHand from './components/PlayerHand'
import Message from './components/Message'
import Controls from './components/Controls'
import Leaderboard from './components/Leaderboard'
import Scoreboard from './components/Scoreboard'
import Tutorial from './components/Tutorial'
import Settings from './components/Settings'
import { startGame, hit, dealerTurn } from './game/blackjackLogic'
import { supabase } from './supabaseClient'

const GAME_STATE_KEY = 'blackjack_game_state'

function App() {
  const [playerId, setPlayerId] = useState(null)
  const [playerHand, setPlayerHand] = useState([])
  const [dealerHand, setDealerHand] = useState([])
  const [gameState, setGameState] = useState('player_turn')
  const [deck, setDeck] = useState([])
  const [wins, setWins] = useState(0)
  const [losses, setLosses] = useState(0)
  const [streak, setStreak] = useState(0)
  const [currentStreak, setCurrentStreak] = useState(0)
  const [autoOpenTutorial, setAutoOpenTutorial] = useState(false)
  const [username, setUsername] = useState('')
  const [showScoreboard, setShowScoreboard] = useState(true)
  const [showControls, setShowControls] = useState(true)
  const [playAmbiance, setPlayAmbiance] = useState(false)
  const [playSfx, setPlaySfx] = useState(true)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const prevGameState = useRef(null)
  const ambianceRef = useRef(null)

  useEffect(() => {
    ambianceRef.current = new Audio('/audio/casino_ambiance.wav')
    ambianceRef.current.loop = true
    if (playAmbiance) {
      ambianceRef.current.play()
    }
    return () => {
      ambianceRef.current.pause()
    }
  }, [])

  useEffect(() => {
    if (!ambianceRef.current) return
    if (playAmbiance) {
      ambianceRef.current.play()
    } else {
      ambianceRef.current.pause()
    }
  }, [playAmbiance])

  const playCardSound = () => {
    if (playSfx) {
      const sfx = new Audio('/audio/card_draw.mp3')
      sfx.play()
    }
  }

  useEffect(() => {
    async function init() {
      const { player, isNew } = await getOrCreatePlayer()
      setPlayerId(player.id)
      setWins(player.win_count ?? 0)
      setLosses(player.loss_count ?? 0)
      setStreak(player.streak ?? 0)
      setUsername(player.username ?? '')
      if (isNew) {
        setAutoOpenTutorial(true)
      }

      const saved = localStorage.getItem(GAME_STATE_KEY)
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          setDeck(parsed.deck || [])
          setPlayerHand(parsed.playerHand || [])
          setDealerHand(parsed.dealerHand || [])
          setGameState(parsed.gameState || 'player_turn')
          return
        } catch {
          // ignore invalid saved state
        }
      }

      const { deck, playerHand, dealerHand, result } = startGame()
      setDeck(deck)
      setPlayerHand(playerHand)
      setDealerHand(dealerHand)
      setGameState(result ?? 'player_turn')
    }
    init()
  }, [])

  const handleHit = () => {
    const { deck: newDeck, playerHand: newPlayerHand, result } = hit(deck, playerHand);
    setDeck(newDeck);
    setPlayerHand(newPlayerHand);
    playCardSound()

    if (result) {
      setGameState(result);
    }
  }

  function handleStand() {
    setGameState('dealer_turn');
  }

  const startNewRound = () => {
    const { deck, playerHand, dealerHand, result } = startGame();
    setDeck(deck);
    setPlayerHand(playerHand);
    setDealerHand(dealerHand);
    setGameState(result ?? 'player_turn');
  };

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.code === 'Space' && gameState !== 'player_turn' && gameState !== 'dealer_turn') {
        startNewRound();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  useEffect(() => {
    if (gameState === 'dealer_turn') {
      const { deck: newDeck, dealerHand: newDealerHand, result } = dealerTurn(
        deck,
        dealerHand,
        playerHand,
      )

      const draws = newDealerHand.slice(dealerHand.length)

      if (draws.length === 0) {
        setDeck(newDeck)
        setGameState(result)
        return
      }

      draws.forEach((card, i) => {
        setTimeout(() => {
          setDealerHand(prev => [...prev, card])
          playCardSound()

          if (i === draws.length - 1) {
            setDeck(newDeck)
            setGameState(result)
          }
        }, (i + 1) * 1200)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState])

  useEffect(() => {
    async function updateStats() {
      if (!playerId) return;
      if (prevGameState.current === gameState) return;

      prevGameState.current = gameState;

      if (['player_busts', 'dealer_wins'].includes(gameState)) {
        const newLosses = losses + 1;
        const { data, error } = await supabase
          .from('blackjack_players')
          .update({ loss_count: newLosses })
          .eq('id', playerId)
          .select('loss_count')
          .single();
        if (!error && data) {
          setLosses(data.loss_count);
        }
        setCurrentStreak(0);
      } else if (['player_wins', 'dealer_busts'].includes(gameState)) {
        const newWins = wins + 1;
        const newStreakCount = currentStreak + 1;
        const updates = { win_count: newWins };
        if (newStreakCount > streak) {
          updates.streak = newStreakCount;
        }
        const { data, error } = await supabase
          .from('blackjack_players')
          .update(updates)
          .eq('id', playerId)
          .select('win_count, streak')
          .single();
        if (!error && data) {
          setWins(data.win_count);
          if (data.streak !== undefined) {
            setStreak(data.streak);
          }
        }
        setCurrentStreak(newStreakCount);
      }
    }

    updateStats();
  }, [gameState, playerId, losses, wins, currentStreak, streak]);

  useEffect(() => {
    if (!deck.length) return
    const state = {
      deck,
      playerHand,
      dealerHand,
      gameState,
    }
    localStorage.setItem(GAME_STATE_KEY, JSON.stringify(state))
  }, [deck, playerHand, dealerHand, gameState])

  return (
    <div className="App relative">
      <Tutorial initialOpen={autoOpenTutorial} />
      <Leaderboard />
      {showScoreboard && (
        <Scoreboard wins={wins} losses={losses} streak={streak} />
      )}
      <Message gameState={gameState} />
      <PlayerHand hand={playerHand} />
      <Controls
        onHit={handleHit}
        onStand={handleStand}
        gameState={gameState}
        disabled={settingsOpen}
        hidden={!showControls}
      />
      <DealerHand hand={dealerHand} gameState={gameState} />
      <Settings
        playerId={playerId}
        onUsernameChange={setUsername}
        currentUsername={username}
        wins={wins}
        losses={losses}
        streak={streak}
        setWins={setWins}
        setLosses={setLosses}
        setStreak={setStreak}
        showScoreboard={showScoreboard}
        setShowScoreboard={setShowScoreboard}
        showControls={showControls}
        setShowControls={setShowControls}
        playAmbiance={playAmbiance}
        setPlayAmbiance={setPlayAmbiance}
        playSfx={playSfx}
        setPlaySfx={setPlaySfx}
        onOpenChange={setSettingsOpen}
      />
    </div>
  )
}

export default App

