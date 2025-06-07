import { useEffect } from 'react'

// Controls component handles player actions during their turn
function Controls({ onHit, onStand, gameState }) {

    useEffect(() => {
        function handleKeyDown(event) {
            if (gameState !== 'player_turn') return;

            if (event.key.toLowerCase() === 'h') {
                onHit();
            } else if (event.key.toLowerCase() === 's') {
                onStand();
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [onHit, onStand, gameState])

    return (
        <div className="controls">
            <button onClick={onHit} disabled={gameState !== 'player_turn'}>Hit (H)</button>
            <button onClick={onStand} disabled={gameState !== 'player_turn'}>Stand (S)</button>
        </div>
    )
}

export default Controls