import { useState, useEffect } from 'react'
import './App.css'
import { getOrCreatePlayer } from './playerManager'
import PlayerHand from './components/PlayerHand'
import Message from './components/Message'
import Controls from './components/Controls'
import { startGame } from './game/blackjackLogic'

function App() {
  const [playerId, setPlayerId] = useState(null)
  const [playerHand, setPlayerHand] = useState([])
  const [dealerHand, setDealerHand] = useState([])
  const [gameState, setGameState] = useState('playing')

  useEffect(() => {
    async function init() {
      const player = await getOrCreatePlayer()
      setPlayerId(player.id)

      const { playerHand, dealerHand } = startGame()
      setPlayerHand(playerHand)
      setDealerHand(dealerHand)
    }
    init()
  }, [])

  return (
    <div className="App">
      <Message gameState={gameState} />
      <PlayerHand hand={playerHand} />
      <Controls />
    </div>
  )
}

export default App
