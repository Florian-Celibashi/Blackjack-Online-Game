

import React from 'react'

function Message({ gameState, username }) {
    let message = 'Your turn, press (H) to Hit or (S) to Stand.'

    if (gameState === 'bust') {
        message = 'You bust! Press space to play again.'
    } else if (gameState === 'lose') {
        message = 'You lose! Press space to play again.'
    } else if (gameState === 'win') {
        message = 'You win! Press space to play again.'
    } else if (gameState === 'tie') {
        message = "It's a tie! Press space to play again."
    } else if (gameState === 'multiplayerWin' && username) {
        message = `${username} wins!`
    }

    return (
        <div className="game-message">
            <p>{message}</p>
        </div>
    )
}

export default Message