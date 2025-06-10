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

function App() {
  const [playerId, setPlayerId] = useState(null)
  const [playerHand, setPlayerHand] = useState([])
  const [dealerHand, setDealerHand] = useState([])
  const [gameState, setGameState] = useState('player_turn')
  const [deck, setDeck] = useState([])
  const [wins, setWins] = useState(0)
  const [losses, setLosses] = useState(0)
  const [streak, setStreak] = useState(0)
  const [username, setUsername] = useState('')
  const [showScoreboard, setShowScoreboard] = useState(true)
  const [showControls, setShowControls] = useState(true)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const prevGameState = useRef(null)

  useEffect(() => {
    async function init() {
      const player = await getOrCreatePlayer()
      setPlayerId(player.id)
      setWins(player.win_count ?? 0)
      setLosses(player.loss_count ?? 0)
      setStreak(player.streak ?? 0)
      setUsername(player.username ?? '')

      const { deck, playerHand, dealerHand, result } = startGame();
      setDeck(deck);
      setPlayerHand(playerHand);
      setDealerHand(dealerHand);
      setGameState(result ?? 'player_turn');
    }
    init()
  }, [])

  const handleHit = () => {
    const { deck: newDeck, playerHand: newPlayerHand, result } = hit(deck, playerHand);
    setDeck(newDeck);
    setPlayerHand(newPlayerHand);

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
      const { deck: newDeck, dealerHand: newDealerHand, result } = dealerTurn(deck, dealerHand, playerHand);
      setDeck(newDeck);
      setDealerHand(newDealerHand);
      setGameState(result);
    }
  }, [gameState, deck, dealerHand, playerHand]);

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
      } else if (['player_wins', 'dealer_busts'].includes(gameState)) {
        const newWins = wins + 1;
        const { data, error } = await supabase
          .from('blackjack_players')
          .update({ win_count: newWins })
          .eq('id', playerId)
          .select('win_count')
          .single();
        if (!error && data) {
          setWins(data.win_count);
        }
      }
    }

    updateStats();
  }, [gameState, playerId, losses, wins]);

  return (
    <div className="App relative">
      <Tutorial />
      <Leaderboard />
      {showScoreboard && (
        <Scoreboard wins={wins} losses={losses} streak={streak} />
      )}
      <Message gameState={gameState} />
      <PlayerHand hand={playerHand} />
      {showControls && (
        <Controls
          onHit={handleHit}
          onStand={handleStand}
          gameState={gameState}
          disabled={settingsOpen}
        />
      )}
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
        onOpenChange={setSettingsOpen}
      />
    </div>
  )
}

export default App

