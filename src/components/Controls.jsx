import { useEffect, useState } from 'react'
// Controls component handles player actions during their turn with visual press feedback
function Controls({ onHit, onStand, gameState, disabled = false, hidden = false }) {
    const [hitPressed, setHitPressed] = useState(false);
    const [standPressed, setStandPressed] = useState(false);

    useEffect(() => {
        if (disabled) return;

        function handleKeyDown(event) {
            if (gameState !== 'player_turn') return;

            if (event.key.toLowerCase() === 'h') {
                setHitPressed(true);
                onHit();
                setTimeout(() => setHitPressed(false), 75);
            } else if (event.key.toLowerCase() === 's') {
                setStandPressed(true);
                onStand();
                setTimeout(() => setStandPressed(false), 75);
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [onHit, onStand, gameState, disabled]);

    return (
        <div className="fixed bottom-12 right-12 flex flex-col space-y-2">
            {!hidden && (
                <>
                    <button
                        onClick={() => {
                            setHitPressed(true);
                            onHit();
                            setTimeout(() => setHitPressed(false), 75);
                        }}
                        disabled={gameState !== 'player_turn'}
                        className={`
                            px-3 py-1
                            lg:px-4 lg:py-2
                            xl:px-5 xl:py-3
                            2xl:px-6 2xl:py-4
                            text-md md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl
                            w-20 lg:w-30 xl:w-40 2xl:w-50 lg:mb-4 xl:mb-8
                            rounded-3xl shadow-lg text-black font-semibold transition-all border border-black 
                            ${gameState === 'player_turn' ? 'bg-amber-600 hover:bg-amber-700' : 'bg-gray-500 cursor-not-allowed'} ${hitPressed ? 'scale-110' : ''}`}
                    >
                        Hit
                    </button>
                    <button
                        onClick={() => {
                            setStandPressed(true);
                            onStand();
                            setTimeout(() => setStandPressed(false), 75);
                        }}
                        disabled={gameState !== 'player_turn'}
                        className={`
                            px-3 py-1
                            lg:px-4 lg:py-2
                            xl:px-5 xl:py-3
                            2xl:px-6 2xl:py-4
                            text-md md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl
                            w-20 lg:w-30 xl:w-40 2xl:w-50 
                            rounded-3xl shadow-lg text-black font-semibold transition-all border border-black 
                            ${gameState === 'player_turn' ? 'bg-amber-600 hover:bg-amber-700' : 'bg-gray-500 cursor-not-allowed'} ${standPressed ? 'scale-110' : ''}`}
                    >
                        Stand
                    </button>
                </>
            )}
        </div>
    )
}

export default Controls
