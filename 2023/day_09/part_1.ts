// https://adventofcode.com/2023/day/9

import * as fs from 'fs'

const getAllSequencesToZero = (starSequence: number[]): number[][] => {
  let sequenceTracker: number[][] = [starSequence]
  let currSequence: number[] = [...starSequence]
  let newSequence: number[] = []
  while (!currSequence.every(num => num === 0)) {
    newSequence = []
    for (let j = 0; j < currSequence.length - 1; j++) {
      if (j === currSequence.length) {
        break
      }
      const diff = currSequence[j + 1] - currSequence[j]
      newSequence.push(diff)
    }
    sequenceTracker.push(newSequence)
    currSequence = newSequence
  }
  return sequenceTracker
}

const updateSequence = (sequenceTracker: number[][]) => {
  let carryVal = 0
  for (let j = sequenceTracker.length - 2; j >= 0; j--) {
    const sequence = sequenceTracker[j]
    const updatedVal = sequence[sequence.length - 1] + carryVal
    sequenceTracker[j].push(updatedVal)
    carryVal = updatedVal
  }
}

const part1 = (file: string) => {
  const lines = fs.readFileSync(file, 'utf-8').split(/[\n\r]+/)
 
  let sum = 0
  for (let i = 0; i < lines.length; i++) {
    const sequence = lines[i].split(' ').map(num => Number(num))
    let sequenceTracker: number[][] = getAllSequencesToZero(sequence)
    updateSequence(sequenceTracker)
    sum += sequenceTracker[0][sequenceTracker[0].length - 1]
  }
  return sum
}

console.log(part1('input.txt'))
