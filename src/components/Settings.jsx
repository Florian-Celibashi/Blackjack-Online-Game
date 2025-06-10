import { useState, useEffect } from 'react'
import { FaCog } from 'react-icons/fa'
import Modal from './Modal'
import { supabase } from '../supabaseClient'

export default function Settings({
    playerId,
    onUsernameChange,
    wins,
    losses,
    streak,
    setWins,
    setLosses,
    setStreak,
    showScoreboard,
    setShowScoreboard,
    showControls,
    setShowControls
}) {
    const [open, setOpen] = useState(false)
    const [username, setUsername] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    useEffect(() => {
        if (!open) {
            setUsername('')
            setError('')
            setSuccess('')
        }
    }, [open])

    async function handleUsernameChange() {
        setError('')
        setSuccess('')
        const name = username.trim()
        if (name.length < 3 || name.length > 12) {
            setError('Username must be between 3 and 12 characters.')
            return
        }
        try {
            const resp = await fetch(`https://www.purgomalum.com/service/containsprofanity?text=${encodeURIComponent(name)}`)
            const txt = await resp.text()
            if (txt === 'true') {
                setError('Username contains profanity.')
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
            setError('Username already taken.')
            return
        }

        const { error: updateError } = await supabase
            .from('blackjack_players')
            .update({ username: name })
            .eq('id', playerId)
        if (updateError) {
            setError('Failed to update username.')
        } else {
            onUsernameChange(name)
            setSuccess('Username updated!')
        }
    }

    async function handleResetStats() {
        const { error: updateError } = await supabase
            .from('blackjack_players')
            .update({ win_count: 0, loss_count: 0, streak: 0 })
            .eq('id', playerId)
        if (!updateError) {
            setWins(0)
            setLosses(0)
            setStreak(0)
            setSuccess('Stats reset!')
        } else {
            setError('Failed to reset stats.')
        }
    }

    return (
        <div>
            <button
                className="fixed top-12 right-12 text-white text-3xl z-[9999]"
                onClick={() => setOpen(true)}
                aria-label="Settings"
            >
                <FaCog />
            </button>
            <Modal isOpen={open} onClose={() => setOpen(false)} title="Settings">
                <div className="space-y-4 w-64 text-white">
                    <div>
                        <label className="block mb-1 text-lg">Change Username</label>
                        <input
                            className="w-full text-black px-2 py-1 rounded"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <button
                            className="mt-2 bg-blue-700 hover:bg-blue-800 text-white px-3 py-1 rounded"
                            onClick={handleUsernameChange}
                        >
                            Update
                        </button>
                    </div>
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
                    <button
                        className="bg-red-700 hover:bg-red-800 text-white px-3 py-1 rounded"
                        onClick={handleResetStats}
                    >
                        Reset Stats
                    </button>
                    {error && <p className="text-red-500">{error}</p>}
                    {success && <p className="text-green-500">{success}</p>}
                </div>
            </Modal>
        </div>
    )
}
