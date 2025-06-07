import { createDeck, shuffleDeck } from './deck'

let deck = []
let playerHand = []
let dealerHand = []

export function startGame() {
    deck = shuffleDeck(createDeck())
    playerHand = [deck.pop(), deck.pop()]
    dealerHand = [deck.pop(), deck.pop()]

    return {
        playerHand,
        dealerHand,
        remainingDeck: deck
    }
}

export function hit() {
    console.log("Hit called");
}

export function stand() {
    console.log("Stand called");
}