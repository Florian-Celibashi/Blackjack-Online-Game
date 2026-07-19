import assert from 'node:assert/strict'
import test from 'node:test'

import { dealerTurn, hit, startGame } from '../src/game/blackjackLogic.js'
import { calculateHandValue } from '../src/game/blackjackScoring.js'
import { createDeck, shuffleDeck } from '../src/game/deck.js'

const card = (rank, suit = 'hearts') => ({ rank, suit })

test('calculateHandValue scores number and face cards', () => {
    assert.equal(calculateHandValue([card('2'), card('9'), card('king')]), 21)
})

test('calculateHandValue preserves a soft ace when the hand is safe', () => {
    assert.equal(calculateHandValue([card('ace'), card('6')]), 17)
})

test('calculateHandValue downgrades aces as needed to avoid a bust', () => {
    assert.equal(calculateHandValue([card('ace'), card('9'), card('5')]), 15)
    assert.equal(calculateHandValue([card('ace'), card('ace'), card('9')]), 21)
    assert.equal(calculateHandValue([card('ace'), card('ace'), card('9'), card('9')]), 20)
})

test('createDeck returns all 52 unique cards', () => {
    const deck = createDeck()
    const uniqueCards = new Set(deck.map(({ rank, suit }) => `${rank}-${suit}`))

    assert.equal(deck.length, 52)
    assert.equal(uniqueCards.size, 52)
    assert.equal(deck.filter(({ rank }) => rank === 'ace').length, 4)
    assert.equal(deck.filter(({ suit }) => suit === 'spades').length, 13)
})

test('shuffleDeck uses the supplied RNG and preserves the deck contents', () => {
    const deck = [card('ace'), card('2'), card('3'), card('4')]
    const originalCards = structuredClone(deck)
    const shuffled = shuffleDeck(deck, () => 0)

    assert.strictEqual(shuffled, deck)
    assert.notDeepEqual(shuffled, originalCards)
    assert.deepEqual(
        shuffled.map(({ rank }) => rank).sort(),
        originalCards.map(({ rank }) => rank).sort(),
    )
})

test('startGame deals two unique cards to each side and leaves 48 cards', () => {
    const game = startGame(() => 0)
    const dealt = [...game.playerHand, ...game.dealerHand]
    const uniqueDealt = new Set(dealt.map(({ rank, suit }) => `${rank}-${suit}`))

    assert.equal(game.deck.length, 48)
    assert.equal(game.playerHand.length, 2)
    assert.equal(game.dealerHand.length, 2)
    assert.equal(uniqueDealt.size, 4)
    assert.ok(game.result === null || game.result === 'dealer_turn')
})

test('hit draws from a copy of the deck without mutating its inputs', () => {
    const deck = [card('2'), card('5')]
    const hand = [card('10'), card('4')]
    const originalDeck = structuredClone(deck)
    const originalHand = structuredClone(hand)
    const result = hit(deck, hand)

    assert.deepEqual(deck, originalDeck)
    assert.deepEqual(hand, originalHand)
    assert.deepEqual(result.deck, [card('2')])
    assert.deepEqual(result.playerHand, [...hand, card('5')])
    assert.equal(result.result, null)
})

test('hit advances a 21 and detects a bust', () => {
    assert.equal(hit([card('ace')], [card('king')]).result, 'dealer_turn')
    assert.equal(hit([card('5')], [card('king'), card('8')]).result, 'player_busts')
})

test('dealerTurn draws until 17 and leaves input arrays unchanged', () => {
    const deck = [card('2')]
    const dealerHand = [card('10'), card('6')]
    const playerHand = [card('10'), card('7')]
    const result = dealerTurn(deck, dealerHand, playerHand)

    assert.deepEqual(deck, [card('2')])
    assert.deepEqual(dealerHand, [card('10'), card('6')])
    assert.deepEqual(result.deck, [])
    assert.deepEqual(result.dealerHand, [...dealerHand, card('2')])
    assert.equal(result.result, 'dealer_wins')
})

test('dealerTurn resolves dealer busts, player wins, and ties', () => {
    assert.equal(
        dealerTurn([card('king')], [card('10'), card('6')], [card('10'), card('7')]).result,
        'dealer_busts',
    )
    assert.equal(
        dealerTurn([], [card('10'), card('7')], [card('10'), card('8')]).result,
        'player_wins',
    )
    assert.equal(
        dealerTurn([], [card('10'), card('7')], [card('9'), card('8')]).result,
        'tie',
    )
})
