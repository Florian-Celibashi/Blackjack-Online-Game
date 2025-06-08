import React from 'react'

function PlayerHand({ hand }) {
    return (
        <div className="player-hand fixed bottom-18 left-1/2 transform -translate-x-1/2 h-48 w-auto flex flex-col items-center">
            <h2 className="text-xl font-bold mb-2">Your Hand:</h2>
            <div className="cards flex flex-row-reverse justify-center items-center space-x-reverse space-x-2 h-full">
                {hand.map((card, index) => {
                    const filename = `${card.rank}_of_${card.suit}.svg`
                    const imagePath = `/assets/svg-cards/${filename}`
                    return (
                        <div key={index} className="card">
                            <img src={imagePath} alt={`${card.rank} of ${card.suit}`} className="w-36 h-auto" />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default PlayerHand