import { useState, useEffect } from 'react'
import Modal from './Modal'
import { supabase } from '../supabaseClient'

function Settings({
    isOpen,
    onClose,
    playerId,
    currentUsername,
    onUsernameChange,
    scoreboardVisible,
    setScoreboardVisible,
    controlsVisible,
    setControlsVisible,
    onStatsReset
}) {
    const [username, setUsername] = useState(currentUsername || '')
    const [error, setError] = useState('')

    useEffect(() => {
        setUsername(currentUsername || '')
    }, [currentUsername])

    const handleUsernameChange = async () => {
        setError('')
        if (username.length < 3 || username.length > 12) {
            setError('Username must be 3-12 characters.')
            setUsername(currentUsername)
            return
        }
        try {
            const profanityRes = await fetch(
                `https://www.purgomalum.com/service/containsprofanity?text=${encodeURIComponent(username)}`
            )
            const profanity = await profanityRes.text()
            if (profanity === 'true') {
                setError('Username contains profanity.')
                setUsername(currentUsername)
                return
            }
        } catch (e) {
            console.error('Profanity check failed', e)
        }

        const { data: existing, error: dbErr } = await supabase
            .from('blackjack_players')
            .select('id')
            .ilike('username', username)
            .neq('id', playerId)

        if (!dbErr && existing && existing.length > 0) {
            setError('Username already taken.')
            setUsername(currentUsername)
            return
        }

        const { data, error: updateErr } = await supabase
            .from('blackjack_players')
            .update({ username })
            .eq('id', playerId)
            .select('username')
            .single()

        if (!updateErr && data) {
            onUsernameChange(data.username)
        } else {
            setError('Failed to update username.')
            setUsername(currentUsername)
        }
    }

    const handleResetStats = async () => {
        const { error } = await supabase
            .from('blackjack_players')
            .update({ win_count: 0, loss_count: 0, streak: 0 })
            .eq('id', playerId)
        if (!error) {
            onStatsReset()
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Settings">
            <div className="space-y-4 text-center">
                <div>
                    <label className="block mb-2">Change Username</label>
                    <input
                        className="text-black px-2 py-1 rounded-xl"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <button
                        className="ml-2 bg-amber-700 hover:bg-amber-800 text-white px-3 py-1 rounded-xl"
                        onClick={handleUsernameChange}
                    >
                        Save
                    </button>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </div>
                <div>
                    <label className="flex items-center justify-center space-x-2">
                        <input
                            type="checkbox"
                            checked={scoreboardVisible}
                            onChange={(e) => setScoreboardVisible(e.target.checked)}
                        />
                        <span>Show Scoreboard</span>
                    </label>
                </div>
                <div>
                    <label className="flex items-center justify-center space-x-2">
                        <input
                            type="checkbox"
                            checked={controlsVisible}
                            onChange={(e) => setControlsVisible(e.target.checked)}
                        />
                        <span>Show Controls</span>
                    </label>
                </div>
                <div>
                    <button
                        className="bg-red-800 hover:bg-red-900 text-white px-3 py-1 rounded-xl"
                        onClick={handleResetStats}
                    >
                        Reset Stats
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default Settings
