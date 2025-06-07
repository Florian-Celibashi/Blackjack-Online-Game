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
    const isBust = handValue > 21;

    return {
        deck: deckCopy,
        playerHand: newPlayerHand,
        isBust
    };
}

export function stand() {
    console.log("Stand called");
}