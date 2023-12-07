// https://adventofcode.com/2023/day/7

import * as fs from 'fs'

type CardHand = [string, string, string, string, string]
enum HandType {
  '5Kind' = '5Kind',
  '4Kind' = '4Kind',
  'Full' = 'Full',
  '3Kind' = '3Kind',
  '2Pair' = '2Pair',
  '1Pair' = '1Pair',
  'High' = 'High'
}
interface HandInfo {
  hand: CardHand,
  strongestHandType: HandType
  strengthOrder: number,
  bid: number
}
const CARD_STRENGTH_ORDER = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J']
const HAND_STRENGTH_ORDER = [
  HandType['5Kind'],
  HandType['4Kind'], 
  HandType.Full, 
  HandType['3Kind'], 
  HandType['2Pair'], 
  HandType['1Pair'], 
  HandType.High,
]

const getCardCounts = (hand: CardHand): Record<string, number>  => {
  let counts: Record<string, number> = {}
  for (const card of hand) {
    if (counts[card]) {
      counts[card]++
    } else {
      counts[card] = 1
    }
  }
  return counts
}

const getPairCount = (counts: number[]): number => {
  let pairCount = 0
  for (const count of counts) {
    if (count === 2) {
      pairCount++
    }
  }
  return pairCount
}

const hasFiveOfAKind = (hand: CardHand): boolean => {
  const cardCounts = getCardCounts(hand)
  const counts = Object.values(cardCounts)
  const jacks = cardCounts['J']
  const hasFiveOfAKind = 
    counts.includes(5) || 
    (jacks === 1 && Math.max(...counts) === 4) || 
    (jacks === 2 && Math.max(...counts) === 3)  ||
    (jacks === 3 && getPairCount(counts) === 1) ||
    (jacks === 4)
  return hasFiveOfAKind
}
const hasFourOfAKind = (hand: CardHand): boolean => {
  const cardCounts = getCardCounts(hand)
  const counts = Object.values(cardCounts)
  const jacks = cardCounts['J']
  const hasFourOfAKind = 
    counts.includes(4) || 
    (jacks === 1 && Math.max(...counts) === 3) || 
    (jacks === 2 && getPairCount(counts) === 2) ||
    jacks === 3
  return hasFourOfAKind
}
const hasFullHouse = (hand: CardHand): boolean => {
  const cardCounts = getCardCounts(hand)
  const counts = Object.values(cardCounts)
  const jacks = cardCounts['J']
  const hasFullHouse = 
    (Math.max(...counts) === 3 && Math.min(...counts) === 2) || 
    ([1, 2].includes(jacks) && getPairCount(counts) === 2)
  return hasFullHouse
}
const hasThreeOfAKind = (hand: CardHand): boolean => {
  const cardCounts = getCardCounts(hand)
  const counts = Object.values(cardCounts)
  const jacks = cardCounts['J']
  const hasThreeOfAKind =
    (Math.max(...counts) === 3 && Math.min(...counts) === 1) ||
    ([1, 2].includes(jacks) && Math.max(...counts) === 2)
  return hasThreeOfAKind
}
const hasTwoPair = (hand: CardHand): boolean => {
  const cardCounts = getCardCounts(hand)
  const counts = Object.values(cardCounts)
  const jacks = cardCounts['J']
  const hasTwoPair = getPairCount(counts) === 2 || (getPairCount(counts) === 1 && jacks === 1)
  return hasTwoPair

}
const hasOnePair = (hand: CardHand): boolean => {
  const cardCounts = getCardCounts(hand)
  const counts = Object.values(cardCounts)
  const jacks = cardCounts['J']
  const hasOnePair = getPairCount(counts) === 1 || (getPairCount(counts) === 0 && jacks === 1)
  return hasOnePair
}

const getStrongestHandType = (hand: CardHand): HandType => {
  if (hasFiveOfAKind(hand))
    return HandType['5Kind']
  if (hasFourOfAKind(hand))
    return HandType['4Kind']
  if (hasFullHouse(hand))
    return HandType.Full
  if (hasThreeOfAKind(hand))
    return HandType['3Kind']
  if (hasTwoPair(hand))
    return HandType['2Pair']
  if (hasOnePair(hand))
    return HandType['1Pair']

  return HandType.High
}

const handTypeAndCardComparator = (handInfo1: HandInfo, handInfo2: HandInfo): number => {
  if (handInfo1.strengthOrder < handInfo2.strengthOrder) {
    return 1
  } else if (handInfo1.strengthOrder > handInfo2.strengthOrder) {
    return -1
  } else {
    for (let i = 0; i < handInfo1.hand.length; i++) {
      const cardOrder1 = CARD_STRENGTH_ORDER.indexOf(handInfo1.hand[i])
      const cardOrder2 = CARD_STRENGTH_ORDER.indexOf(handInfo2.hand[i])
      if (cardOrder1 < cardOrder2) {
        return 1
      } else if (cardOrder1 > cardOrder2) {
        return -1
      }
    }
    return 0
  }
}

const getTotalWinnings = (handInfos: HandInfo[]): number => {
  let total = 0
  for (let i = 0; i < handInfos.length; i++) {
    total += handInfos[i].bid * (i + 1)
  }
  return total
}

const part2 = (file: string) => {
  const lines = fs.readFileSync(file, 'utf-8').split(/[\n\r]+/)
  
  let handInfos: HandInfo[] = []
  for (let i = 0; i < lines.length; i++) {
    const [hand, bid] = lines[i].split(' ')
    const cardHand = hand.split('') as CardHand
    const strongestHandType = getStrongestHandType(cardHand)
    handInfos.push({
      hand: cardHand,
      strongestHandType,
      strengthOrder: HAND_STRENGTH_ORDER.indexOf(strongestHandType), 
      bid: Number(bid),
    })
  }

  handInfos.sort(handTypeAndCardComparator)
  return getTotalWinnings(handInfos)
}

console.log(part2('input.txt'))
