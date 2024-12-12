// https://adventofcode.com/2024/day/11

import * as fs from 'fs'

function addStoneToTracker(
  stoneTracker: Record<number, number>,
  stone: number,
  count: number
) {
  if (isNaN(stone)) return

  if (!stoneTracker[stone]) {
    stoneTracker[stone] = count
  } else {
    stoneTracker[stone] += count
  }
}

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

function transformStones(
  stoneTracker: Record<number, number>,
  blinks: number
): Record<number, number> {
  let latestStoneTracker = {...stoneTracker}

  for (let i = 0; i < blinks; i++) {
    const currStoneTracker = {...latestStoneTracker}
    latestStoneTracker = {}

    Object.entries(currStoneTracker).forEach(([stone, count]) => {
      const [stone1, stone2] = transformStonesHelper(+stone)
      addStoneToTracker(latestStoneTracker, stone1, count)
      addStoneToTracker(latestStoneTracker, stone2, count)
    })
  }

  return latestStoneTracker
}

function solve(file: string) {
  const lines = fs.readFileSync(file, 'utf-8').split(/[\n\r]+/)

  const stoneTracker: Record<number, number> = {}
  const stones = lines[0].split(' ').map((stone) => +stone)

  stones.forEach((stone) => {
    if (!stoneTracker[stone]) {
      stoneTracker[stone] = 1
    } else {
      stoneTracker[stone]++
    }
  })

  const latestStoneTracker = transformStones(stoneTracker, 75)
  return Object.values(latestStoneTracker).reduce(
    (sum, count) => sum + count,
    0
  )
}

console.log(solve('input.txt'))
