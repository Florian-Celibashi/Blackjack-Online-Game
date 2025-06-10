import { supabase } from './supabaseClient'

const LOCAL_STORAGE_KEY = 'player_id'

export async function getOrCreatePlayer() {
    let playerId = localStorage.getItem(LOCAL_STORAGE_KEY)

    if (playerId) {
        console.log('Player found in local storage:', playerId)

        const { data, error } = await supabase
            .from('blackjack_players')
            .select()
            .eq('id', playerId)
            .single()

        if (error) {
            console.error('Error fetching player data:', error)
            throw error
        }

        console.log('Loaded player data:', data)
        return { player: data, isNew: false }
    }

    const username = 'Player_' + Math.floor(Math.random() * 100000)

    const { data, error } = await supabase
        .from('blackjack_players')
        .insert([{ username, is_guest: true }])
        .select()

    if (error) {
        console.error('Error creating player:', error)
        throw error
    }

    const player = data[0]
    localStorage.setItem(LOCAL_STORAGE_KEY, player.id)
    console.log('New player created:', player)

    return { player, isNew: true }
}