import React, { useState } from 'react';
import Modal from './Modal';

function Leaderboard() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded relative z-[9999]"
                style={{ pointerEvents: 'auto' }}
                onClick={() => setIsOpen(true)}
            >
                Open Popup
            </button>

            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Leaderboard"
            >
                <p>This is your popup content.</p>
            </Modal>
        </div>
    );
}

export default Leaderboard;
