import { useState, useEffect } from 'react'
import './App.css'
import { getOrCreatePlayer } from './playerManager'

function App() {
  const [count, setCount] = useState(0)
  const [playerId, setPlayerId] = useState(null)
  useEffect(() => {
    async function init() {
      const id = await getOrCreatePlayer()
      setPlayerId(id)
    }
    init()
  }, [])


  return (
    <div></div>
  )
}

export default App
