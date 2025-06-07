import React from 'react'

function PlayerHand({ hand }) {
    return (
        <div className="player-hand">
            <h2>Your Hand:</h2>
            <div className="cards">
                {hand.map((card, index) => {
                    const filename = `${card.rank}_of_${card.suit}.svg`
                    const imagePath = `/assets/svg-cards/${filename}`
                    return (
                        <div key={index} className="card">
                            <img src={imagePath} alt={`${card.rank} of ${card.suit}`} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default PlayerHand