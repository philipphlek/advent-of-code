// https://adventofcode.com/2024/day/1

import * as fs from 'fs'

const solve = (file: string) => {
  const lines = fs.readFileSync(file, 'utf-8').split(/[\n\r]+/)

  const leftLocationIds: number[] = []
  const rightLocationIds: number[] = []

  for (let i = 0; i < lines.length; i++) {
    const [leftLocationId, rightLocationId] = lines[i].split(/\s+/)
    leftLocationIds.push(+leftLocationId)
    rightLocationIds.push(+rightLocationId)
  }

  leftLocationIds.sort()
  rightLocationIds.sort()

  let totalDistance = 0
  for (let i = 0; i < leftLocationIds.length; i++) {
    const leftLocationId = leftLocationIds[i]
    const rightLocationId = rightLocationIds[i]
    const diff = Math.abs(leftLocationId - rightLocationId)
    totalDistance += diff
  }
  return totalDistance
}

console.log(solve('input.txt'))
