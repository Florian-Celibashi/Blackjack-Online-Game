export function calculateHandValue(hand) {
    let total = 0;

    hand.forEach(card => {
        if (['king', 'queen', 'jack'].includes(card.rank)) {
            total += 10;
        } else if (card.rank === 'ace') {
            total += 1;  // For now, Ace counts as 1
        } else {
            total += parseInt(card.rank);
        }
    });

    return total;
}