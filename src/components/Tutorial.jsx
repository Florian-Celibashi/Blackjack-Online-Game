import { useState } from 'react';
import Modal from './Modal';

function Tutorial() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <button
                className="fixed top-4 left-4 z-[9999] bg-black/60 hover:bg-black/80 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg border border-white"
                onClick={() => setIsOpen(true)}
            >
                ?
            </button>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="How to Play">
                <div className="space-y-2 text-left">
                    <p>The goal is to get as close to 21 as possible without going over.</p>
                    <p>Press <strong>Hit</strong> (or the <code>H</code> key) to draw a card.</p>
                    <p>Press <strong>Stand</strong> (or the <code>S</code> key) to end your turn.</p>
                    <p>The dealer will draw cards until reaching 17 or higher.</p>
                    <p>After a round ends, press the <code>Spacebar</code> to start a new one.</p>
                </div>
            </Modal>
        </div>
    );
}

export default Tutorial;
