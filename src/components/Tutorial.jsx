import { useState, useEffect } from 'react';
import Modal from './Modal';

function Tutorial({ initialOpen = false }) {
    const [isOpen, setIsOpen] = useState(initialOpen);

    useEffect(() => {
        if (initialOpen) {
            setIsOpen(true);
        }
    }, [initialOpen]);

    return (
        <div>
            <button
                className="fixed top-6 left-6 z-[9999] bg-black/30 hover:bg-black/60 text-white rounded-full w-6 h-6 md:w-9 md:h-9 lg:w-12 lg:h-12 xl:w-15 xl:h-15 flex items-center justify-center text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-semibold border border-white"
                onClick={() => setIsOpen(true)}
            >
                ?
            </button>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="How to Play">
                <div className="space-y-2 text-left"><br />
                    <p>The goal is to get as close to 21 as possible without going over.</p>
                    <p>Press <strong>Hit</strong> (or the <code>H</code> key) to draw a card.</p>
                    <p>Press <strong>Stand</strong> (or the <code>S</code> key) to end your turn.</p>
                    <p>The dealer will draw cards until reaching 17 or higher.</p>
                    <p>After a round ends, press the <code>Spacebar</code> to start a new one.</p>
                    <p>Try to climb at the top of the leaderboard and have fun!</p><br />
                </div>
            </Modal>
        </div>
    );
}

export default Tutorial;
