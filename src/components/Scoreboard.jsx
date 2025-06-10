function Scoreboard({ wins, losses, streak }) {
    return (
        <div className="fixed top-4 right-4 bg-black/60 rounded-xl px-4 py-2 text-sm lg:text-base">
            <p>Wins: {wins}</p>
            <p>Losses: {losses}</p>
            <p>Streak: {streak}</p>
        </div>
    )
}

export default Scoreboard

