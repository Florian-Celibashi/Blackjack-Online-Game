import { supabase } from './supabaseClient'

const LOCAL_STORAGE_KEY = 'player_id'

export async function getOrCreatePlayer() {
    let playerId = localStorage.getItem(LOCAL_STORAGE_KEY)

    if (playerId) {
        console.log('Player found in local storage:', playerId)
        return playerId
    }

    const username = 'Player_' + Math.floor(Math.random() * 100000)

    const { data, error } = await supabase
        .from('blackjack_players')
        .insert([{ username }])
        .select()

    if (error) {
        console.error('Error creating player:', error)
        throw error
    }

    const newPlayer = data[0]
    localStorage.setItem(LOCAL_STORAGE_KEY, newPlayer.id)
    console.log('New player created:', newPlayer.id)

    return newPlayer.id
}