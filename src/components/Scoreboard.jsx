function Scoreboard({ wins, losses, streak }) {
    return (
        <div
            className="fixed bottom-12 left-12 z-[9999] bg-black/30 rounded-xl shadow-lg text-white 
            text-md md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 
            mb-12 lg:mb-18 xl:mb-24 
            p-2 lg:p-3 xl:p-4"
        >
            <p>Wins: {wins}</p>
            <p>Losses: {losses}</p>
            <p>Streak: {streak}</p>
        </div>
    )
}

export default Scoreboard
