// Create a standard 52-card deck
export function createDeck() {
    const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    const ranks = [
        'ace', '2', '3', '4', '5', '6', '7',
        '8', '9', '10', 'jack', 'queen', 'king'
    ];

    const deck = [];

    for (let suit of suits) {
        for (let rank of ranks) {
            deck.push({ suit, rank });
        }
    }

    return deck;
}

// Shuffle deck using Fisher-Yates algorithm
export function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}
