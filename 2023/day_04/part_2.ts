// https://adventofcode.com/2023/day/4

import * as fs from 'fs'

const incrementCardCount = (cardCountTracker: number[], cardIndex: number, incrementBy: number = 1) => {
  if (cardCountTracker[cardIndex] === undefined) {
    cardCountTracker[cardIndex] = incrementBy
  } else {
    cardCountTracker[cardIndex] += incrementBy
  }
}

const part2 = (file: string) => {
  const lines = fs.readFileSync(file, 'utf-8').split('\n')

  let cardCountTracker: number[] = []
  for (let i = 0; i < lines.length; i++) {
    incrementCardCount(cardCountTracker, i)
    const [winningNums, currNums] = lines[i].split(': ')[1].split(' | ')
    const winningNumList = winningNums.split(' ') // Post Discussion Note: you can pass in regex into split - .split(/s+/) so don't have to check for empty num captures (single digits have extra spaces)
    const currNumList = currNums.split(' ')
    const numMatchList = winningNumList.filter(num => currNumList.includes(num) && num !== '')
    for (let j = 0; j < numMatchList.length; j++) {
      incrementCardCount(cardCountTracker, (i + j + 1), cardCountTracker[i])
    }
  }
  return cardCountTracker.reduce((sum, currCount) => sum + currCount, 0)
}

console.log(part2('input.txt'))
