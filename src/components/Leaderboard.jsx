import React, { useState, useEffect } from 'react';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import Modal from './Modal';
import { supabase } from '../supabaseClient';

function Leaderboard() {
    const [isOpen, setIsOpen] = useState(false);
    const [players, setPlayers] = useState([]);
    const [sortColumn, setSortColumn] = useState('win_count');
    const [sortAsc, setSortAsc] = useState(false);

    useEffect(() => {
        const fetchPlayers = async () => {
            const { data, error } = await supabase
                .from('blackjack_players')
                .select('username, win_count, loss_count, streak');

            if (error) {
                console.error('Error fetching leaderboard data:', error);
            } else {
                setPlayers(data);
            }
        };

        if (isOpen) fetchPlayers();
    }, [isOpen]);

    const sortedPlayers = [...players].sort((a, b) => {
        if (sortColumn === 'username') {
            return sortAsc
                ? a.username.localeCompare(b.username)
                : b.username.localeCompare(a.username);
        }
        return sortAsc ? a[sortColumn] - b[sortColumn] : b[sortColumn] - a[sortColumn];
    });

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortAsc((prev) => !prev);
        } else {
            setSortColumn(column);
            setSortAsc(true);
        }
    };

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
                    hover:scale-110 transition-transform"
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
                <div className="relative overflow-y-auto max-h-[60vh] w-[60vw]">
                    <table className="w-full text-left text-sm lg:text-base table-auto border-collapse">
                        <thead className="sticky top-0 z-10 bg-white text-black">
                            <tr>
                                <th
                                    className="px-4 py-2 border border-[#4B5563] w-[40%] cursor-pointer select-none"
                                    onClick={() => handleSort('username')}
                                >
                                    <div className="flex items-center space-x-1">
                                        <span>Username</span>
                                        {sortColumn === 'username' ? (
                                            sortAsc ? <FaSortUp /> : <FaSortDown />
                                        ) : (
                                            <FaSort />
                                        )}
                                    </div>
                                </th>
                                <th
                                    className="px-4 py-2 border border-[#4B5563] w-[20%] cursor-pointer select-none"
                                    onClick={() => handleSort('win_count')}
                                >
                                    <div className="flex items-center space-x-1">
                                        <span>Wins</span>
                                        {sortColumn === 'win_count' ? (
                                            sortAsc ? <FaSortUp /> : <FaSortDown />
                                        ) : (
                                            <FaSort />
                                        )}
                                    </div>
                                </th>
                                <th
                                    className="px-4 py-2 border border-[#4B5563] w-[20%] cursor-pointer select-none"
                                    onClick={() => handleSort('loss_count')}
                                >
                                    <div className="flex items-center space-x-1">
                                        <span>Losses</span>
                                        {sortColumn === 'loss_count' ? (
                                            sortAsc ? <FaSortUp /> : <FaSortDown />
                                        ) : (
                                            <FaSort />
                                        )}
                                    </div>
                                </th>
                                <th
                                    className="px-4 py-2 border border-[#4B5563] w-[20%] cursor-pointer select-none"
                                    onClick={() => handleSort('streak')}
                                >
                                    <div className="flex items-center space-x-1">
                                        <span>Streak Record</span>
                                        {sortColumn === 'streak' ? (
                                            sortAsc ? <FaSortUp /> : <FaSortDown />
                                        ) : (
                                            <FaSort />
                                        )}
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedPlayers.map((player, index) => (
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
        </div >
    );
}

export default Leaderboard;
