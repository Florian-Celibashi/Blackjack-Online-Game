import React from 'react'

function PlayerHand({ hand }) {
    return (
        <div className="player-hand fixed bottom-12 left-1/2 transform -translate-x-1/2 w-auto flex flex-col items-center">
            <h2 className="mb-3 text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">Your Hand:</h2>
            <div className="cards flex flex-row justify-center items-center space-x-2 h-full">
                {hand.map((card, index) => {
                    const filename = `${card.rank}_of_${card.suit}.svg`
                    const imagePath = `/assets/svg-cards/${filename}`
                    return (
                        <div key={index} className="card player-card-enter">
                            <img src={imagePath} alt={`${card.rank} of ${card.suit}`} className="w-20 lg:w-30 xl:w-40 2xl:w-50 h-auto" />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default PlayerHand