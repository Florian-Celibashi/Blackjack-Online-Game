import React from 'react'

function Message({ gameState, username }) {
    let message = 'Your turn, press (H) to Hit or (S) to Stand.'

    if (gameState === 'player_busts') {
        message = 'You bust! Press space to play again.'
    } else if (gameState === 'dealer_wins') {
        message = 'You lose! Press space to play again.'
    } else if (gameState === 'player_wins') {
        message = 'You win! Press space to play again.'
    } else if (gameState === 'tie') {
        message = "It's a tie! Press space to play again."
    } else if (gameState === 'dealer_busts') {
        message = 'Dealer busts! Press space to play again.'
    }
    else if (gameState === 'multiplayerWin' && username) {
        message = `${username} wins!`
    }

    return (
        <div className="game-message flex justify-center items-center fixed inset-0">
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-semibold p-3 lg:p-4 xl:p-6 bg-black/30 rounded-xl">{message}</p>
        </div>
    )
}

export default Message
