import { createDeck, shuffleDeck } from './deck'
import { calculateHandValue } from './blackjackScoring'

export function startGame() {
    const deck = shuffleDeck(createDeck());
    const playerHand = [deck.pop(), deck.pop()];
    const dealerHand = [deck.pop(), deck.pop()];

    return {
        deck,
        playerHand,
        dealerHand
    };
}

export function hit(deck, playerHand) {
    const deckCopy = [...deck];
    const newCard = deckCopy.pop();
    const newPlayerHand = [...playerHand, newCard];
    const handValue = calculateHandValue(newPlayerHand);

    let result = null;
    if (handValue > 21) {
        result = 'player_busts';
    } else if (handValue === 21) {
        result = 'dealer_turn';
    }

    return {
        deck: deckCopy,
        playerHand: newPlayerHand,
        result
    };
}

export function dealerTurn(deck, dealerHand, playerHand) {
    let deckCopy = [...deck];
    let dealerHandCopy = [...dealerHand];

    while (calculateHandValue(dealerHandCopy) < 17) {
        const newCard = deckCopy.pop();
        dealerHandCopy.push(newCard);
    }

    const dealerValue = calculateHandValue(dealerHandCopy);
    const playerValue = calculateHandValue(playerHand);

    let result = '';
    if (dealerValue > 21) {
        result = 'dealer_busts';
    } else if (dealerValue > playerValue) {
        result = 'dealer_wins';
    } else if (dealerValue < playerValue) {
        result = 'player_wins';
    } else {
        result = 'tie';
    }

    return {
        deck: deckCopy,
        dealerHand: dealerHandCopy,
        result
    };
}