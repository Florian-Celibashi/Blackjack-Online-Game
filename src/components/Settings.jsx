import { useState, useEffect } from 'react'
import { FaCog } from 'react-icons/fa'
import Modal from './Modal'
import { supabase } from '../supabaseClient'

export default function Settings({
    playerId,
    onUsernameChange,
    currentUsername,
    wins,
    losses,
    streak,
    setWins,
    setLosses,
    setStreak,
    showScoreboard,
    setShowScoreboard,
    showControls,
    setShowControls,
    playAmbiance,
    setPlayAmbiance,
    playSfx,
    setPlaySfx,
    onOpenChange = () => { }
}) {
    const [open, setOpen] = useState(false)
    const [username, setUsername] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [usernameSuccess, setUsernameSuccess] = useState('')
    const [statsError, setStatsError] = useState('')
    const [statsSuccess, setStatsSuccess] = useState('')

    useEffect(() => {
        if (usernameError || usernameSuccess) {
            const timeout = setTimeout(() => {
                setUsernameError('');
                setUsernameSuccess('');
            }, 3000);
            return () => clearTimeout(timeout);
        }
    }, [usernameError, usernameSuccess]);

    useEffect(() => {
        if (statsError || statsSuccess) {
            const timeout = setTimeout(() => {
                setStatsError('');
                setStatsSuccess('');
            }, 3000);
            return () => clearTimeout(timeout);
        }
    }, [statsError, statsSuccess]);

    useEffect(() => {
        if (open) {
            setUsername(currentUsername)
        } else {
            setUsername('')
            setUsernameError('')
            setUsernameSuccess('')
            setStatsError('')
            setStatsSuccess('')
        }
        onOpenChange(open)
    }, [open, currentUsername, onOpenChange])

    async function handleUsernameChange() {
        setUsernameError('')
        setUsernameSuccess('')
        const name = username.trim()
        if (name.length < 3 || name.length > 12) {
            setUsernameError('Username must be between 3 and 12 characters.')
            return
        }
        try {
            const resp = await fetch(`https://www.purgomalum.com/service/containsprofanity?text=${encodeURIComponent(name)}`)
            const txt = await resp.text()
            if (txt === 'true') {
                setUsernameError('Username contains profanity.')
                return
            }
        } catch (e) {
            // ignore network errors, treat as pass
        }

        const { data } = await supabase
            .from('blackjack_players')
            .select('id')
            .ilike('username', name)
        if (data && data.some((p) => p.id !== playerId)) {
            setUsernameError('Username already taken.')
            return
        }

        const { error: updateError } = await supabase
            .from('blackjack_players')
            .update({ username: name })
            .eq('id', playerId)
        if (updateError) {
            setUsernameError('Failed to update username.')
        } else {
            onUsernameChange(name)
            setUsernameSuccess('Username updated!')
        }
    }

    async function handleResetStats() {
        setStatsError('')
        setStatsSuccess('')
        const { error: updateError } = await supabase
            .from('blackjack_players')
            .update({ win_count: 0, loss_count: 0, streak: 0 })
            .eq('id', playerId)
        if (!updateError) {
            setWins(0)
            setLosses(0)
            setStreak(0)
            setStatsSuccess('Stats reset!')
        } else {
            setStatsError('Failed to reset stats.')
        }
    }

    return (
        <div>
            <button
                className="fixed top-6 right-6 text-gray-500 hover:text-gray-600 text-3xl md:text-4xl lg:text-5xl xl:text-6xl z-[9999] hover:scale-110 transition-transform"
                onClick={() => setOpen(true)}
                aria-label="Settings"
            >
                <FaCog />
            </button>
            <Modal isOpen={open} onClose={() => setOpen(false)} title="Settings">
                <div className="space-y-6 h-[35vh] w-[35vw] max-w-xl text-white">
                    <div>
                        <label className="block mb-2 text-lg">Username</label>
                        <input
                            className="w-3/5 text-black bg-gray-200 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <button
                            className="mt-2 ml-5 w-1/5 bg-blue-800 hover:bg-blue-900 text-white px-3 py-1 rounded"
                            onClick={handleUsernameChange}
                        >
                            Update
                        </button>
                        <div className="mt-4 min-h-[1.8rem]">
                            <p
                                className={`text-red-500 ${usernameError ? 'fade-out' : 'opacity-0'}`}
                            >
                                {usernameError}
                            </p>
                            <p
                                className={`text-green-500 ${usernameSuccess ? 'fade-out' : 'opacity-0'}`}
                            >
                                {usernameSuccess}
                            </p>
                        </div>
                    </div>
                    <div className="flex space-x-16">
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={showScoreboard}
                                onChange={(e) => setShowScoreboard(e.target.checked)}
                            />
                            <span>Show Scoreboard</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={showControls}
                                onChange={(e) => setShowControls(e.target.checked)}
                            />
                            <span>Show Controls</span>
                        </div>
                    </div>
                    <div className="flex space-x-16">
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={playAmbiance}
                                onChange={(e) => setPlayAmbiance(e.target.checked)}
                            />
                            <span>Ambiance Music</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={playSfx}
                                onChange={(e) => setPlaySfx(e.target.checked)}
                            />
                            <span>Sound Effects</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button
                            className="w-2/5 bg-red-800 hover:bg-red-900 text-white px-3 py-1 rounded"
                            onClick={handleResetStats}
                        >
                            Reset Stats
                        </button>
                        <div className="min-h-[1.8rem] w-40">
                            <p
                                className={`text-red-500 ${statsError ? 'fade-out' : 'opacity-0'}`}
                            >
                                {statsError}
                            </p>
                            <p
                                className={`text-green-500 ${statsSuccess ? 'fade-out' : 'opacity-0'}`}
                            >
                                {statsSuccess}
                            </p>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

