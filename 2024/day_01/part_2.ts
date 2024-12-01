// https://adventofcode.com/2024/day/1

import * as fs from 'fs'

const solve = (file: string) => {
  const lines = fs.readFileSync(file, 'utf-8').split(/[\n\r]+/)

  const leftLocationIds: number[] = []
  const rightLocationIdCounts: { [id: string]: number } = {}

  for (let i = 0; i < lines.length; i++) {
    const [leftLocationId, rightLocationId] = lines[i].split(/\s+/)
    leftLocationIds.push(+leftLocationId)
    rightLocationIdCounts[+rightLocationId] = (rightLocationIdCounts[+rightLocationId] || 0) + 1
  }

  let similarityScore = 0
  for (let i = 0; i < leftLocationIds.length; i++) {
    const leftLocationId = leftLocationIds[i]
    similarityScore += (rightLocationIdCounts[leftLocationId] || 0) * leftLocationId
  }
  return similarityScore
}

console.log(solve('input.txt'))
