// https://adventofcode.com/2024/day/11

import * as fs from 'fs'

function transformStonesHelper(stone: number): number[] {
  if (stone === 0) return [1]

  const stoneStr = String(stone)
  if (stoneStr.length % 2 === 0) {
    return [
      +stoneStr.substring(0, stoneStr.length / 2),
      +stoneStr.substring(stoneStr.length / 2),
    ]
  }

  return [stone * 2024]
}

function transformStones(stones: number[], blinks: number) {
  for (let i = 0; i < blinks; i++) {
    const currStones = [...stones]

    for (let j = 0; j < currStones.length; j++) {
      const [stone1, stone2] = transformStonesHelper(currStones[j])
      stones[j] = stone1
      !isNaN(stone2) && stones.push(stone2)
    }
  }
}

function solve(file: string) {
  const lines = fs.readFileSync(file, 'utf-8').split(/[\n\r]+/)

  const stones = lines[0].split(' ').map((stone) => +stone)
  transformStones(stones, 25)

  return stones.length
}

console.log(solve('input.txt'))
