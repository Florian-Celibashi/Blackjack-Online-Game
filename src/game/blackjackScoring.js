export function calculateHandValue(hand) {
    let total = 0;
    let aceCount = 0;

    hand.forEach(card => {
        if (['king', 'queen', 'jack'].includes(card.rank)) {
            total += 10;
        } else if (card.rank === 'ace') {
            aceCount += 1;
            total += 11;
        } else {
            total += parseInt(card.rank);
        }
    });

    // Downgrade Aces from 11 to 1 if total exceeds 21
    while (total > 21 && aceCount > 0) {
        total -= 10;
        aceCount -= 1;
    }

    return total;
}