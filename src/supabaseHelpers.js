import { supabase } from './supabaseClient';

export async function getPlayerStats(userId) {
    const { data, error } = await supabase
        .from('blackjack_players')
        .select('win_count, loss_count, streak')
        .eq('id', userId)
        .single();

    if (error) {
        console.error('Error fetching player stats:', error);
        return null;
    }

    return data;
}

export async function updatePlayerStats(id, updates) {
    console.log('Updating stats for player:', id, updates);
    const { data, error } = await supabase
        .from('blackjack_players')
        .update(updates)
        .eq('id', id)
        .select();

    if (error) {
        console.error('Error updating player stats:', error);
        return null;
    }
    console.log('Successfully updated stats:', data?.[0]);
    return data?.[0];
}

export async function incrementWin(id) {
    return updatePlayerStats(id, {
        win_count: supabase.sql`win_count + 1`,
        streak: supabase.sql`CASE WHEN streak >= 0 THEN streak + 1 ELSE 1 END`
    });
}

export async function incrementLoss(id) {
    return updatePlayerStats(id, {
        loss_count: supabase.sql`loss_count + 1`,
        streak: supabase.sql`CASE WHEN streak <= 0 THEN streak - 1 ELSE -1 END`
    });
}