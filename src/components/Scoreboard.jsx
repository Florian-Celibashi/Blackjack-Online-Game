function Scoreboard({ wins, losses, streak }) {
    return (
        <div
            className="fixed top-12 right-12 z-[9999] bg-black/60 rounded-xl border border-black shadow-lg text-white text-md md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl px-3 py-1 lg:px-4 lg:py-2 xl:px-5 xl:py-3 2xl:px-6 2xl:py-4"
        >
            <p>Wins: {wins}</p>
            <p>Losses: {losses}</p>
            <p>Streak: {streak}</p>
        </div>
    )
}

export default Scoreboard

