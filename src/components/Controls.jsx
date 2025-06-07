import { useEffect } from 'react'
import { hit, stand } from '../game/blackjackLogic'  // make sure these functions exist in your blackjackLogic.js

function Controls() {

    useEffect(() => {
        function handleKeyDown(event) {
            if (event.key.toLowerCase() === 'h') {
                hit();
            } else if (event.key.toLowerCase() === 's') {
                stand();
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    return (
        <div className="controls">
            <button onClick={hit}>Hit (H)</button>
            <button onClick={stand}>Stand (S)</button>
        </div>
    )
}

export default Controls