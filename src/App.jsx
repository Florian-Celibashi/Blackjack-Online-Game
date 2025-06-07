import { useState, useEffect } from 'react'
import './App.css'
import { getOrCreatePlayer } from './playerManager'
import PlayerHand from './components/PlayerHand'
import Message from './components/Message'
import Controls from './components/Controls'
import { startGame, hit } from './game/blackjackLogic'

function App() {
  const [playerId, setPlayerId] = useState(null)
  const [playerHand, setPlayerHand] = useState([])
  const [dealerHand, setDealerHand] = useState([])
  const [gameState, setGameState] = useState('setup')
  const [deck, setDeck] = useState([])

  useEffect(() => {
    async function init() {
      const player = await getOrCreatePlayer()
      setPlayerId(player.id)

      const { deck, playerHand, dealerHand } = startGame()
      setDeck(deck)
      setPlayerHand(playerHand)
      setDealerHand(dealerHand)
      setGameState('player_turn')
    }
    init()
  }, [])

  const handleHit = () => {
    const { deck: newDeck, playerHand: newPlayerHand, isBust } = hit(deck, playerHand)
    setDeck(newDeck)
    setPlayerHand(newPlayerHand)

    if (isBust) {
      setGameState('player_bust')
    }
  }

  return (
    <div className="App">
      <Message gameState={gameState} />
      <PlayerHand hand={playerHand} />
      <Controls onHit={handleHit} gameState={gameState} />
    </div>
  )
}

export default App
