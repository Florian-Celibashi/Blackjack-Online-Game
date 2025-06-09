import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { supabase } from '../supabaseClient';

function Leaderboard() {
    const [isOpen, setIsOpen] = useState(false);
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        const fetchPlayers = async () => {
            const { data, error } = await supabase
                .from('blackjack_players')
                .select('username, win_count, loss_count, streak')
                .order('win_count', { ascending: false });

            if (error) {
                console.error('Error fetching leaderboard data:', error);
            } else {
                setPlayers(data);
            }
        };

        if (isOpen) fetchPlayers();
    }, [isOpen]);

    return (
        <div>
            <div className="fixed bottom-12 left-12 z-[9999]">
                <button
                    className="bg-red-800 hover:bg-red-900 text-white rounded-xl shadow-lg font-semibold transition-all border border-black 
                    px-3 py-1
                    lg:px-4 lg:py-2
                    xl:px-5 xl:py-3
                    2xl:px-6 2xl:py-4
                    text-md md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl
                    active:scale-110 transition-transform"
                    onClick={() => setIsOpen(true)}
                >
                    Leaderboard
                </button>
            </div>

            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Leaderboard"
            >
                <div className="overflow-y-auto max-h-[60vh]">
                    <table className="min-w-full text-left text-sm lg:text-base table-auto border-collapse">
                        <thead>
                            <tr className="bg-white text-black">
                                <th className="px-4 py-2 border border-[#4B5563] w-[40%]">Username</th>
                                <th className="px-4 py-2 border border-[#4B5563] w-[20%]">Wins</th>
                                <th className="px-4 py-2 border border-[#4B5563] w-[20%]">Losses</th>
                                <th className="px-4 py-2 border border-[#4B5563] w-[20%]">Streak</th>
                            </tr>
                        </thead>
                        <tbody>
                            {players.map((player, index) => (
                                <tr
                                    key={index}
                                    className="text-[#E5E7EB] even:bg-[#1a1a1a] odd:bg-[#111111] hover:bg-[#272727] transition"
                                >
                                    <td className="px-4 py-2 border border-[#4B5563]">{player.username}</td>
                                    <td className="px-4 py-2 border border-[#4B5563]">{player.win_count}</td>
                                    <td className="px-4 py-2 border border-[#4B5563]">{player.loss_count}</td>
                                    <td className="px-4 py-2 border border-[#4B5563]">{player.streak}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Modal>
        </div>
    );
}

export default Leaderboard;