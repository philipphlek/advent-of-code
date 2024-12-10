// https://adventofcode.com/2024/day/10

import * as fs from 'fs'

type Coord = [x: number, y: number]
type Direction = 'up' | 'down' | 'left' | 'right'

function printGrid(grid: string[][]) {
  let result = ''
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      result += grid[i][j]
    }
    result += '\n'
  }

  console.log(result)
}

function getPotentialTrailStarts(grid: string[][]): Coord[] {
  const potentialTrailStarts: Coord[] = []

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const cell = grid[i][j]
      if (cell === '0') {
        potentialTrailStarts.push([i, j])
      }
    }
  }

  return potentialTrailStarts
}

function isCoordValid([x, y]: Coord, grid: string[][]): boolean {
  return x >= 0 && x < grid.length && y >= 0 && y < grid[0].length
}

function getNewCoord([x, y]: Coord, dir: Direction): Coord {
  const lookup: Record<Direction, Coord> = {
    up: [x - 1, y],
    down: [x + 1, y],
    left: [x, y - 1],
    right: [x, y + 1],
  }
  return lookup[dir]
}

type GetTrailHeadCountHelperParams = {
  height: number
  coord: Coord
  grid: string[][]
  endTrailTracker: Set<string>
}

function getTrailHeadCountHelper({
  height,
  coord,
  grid,
  endTrailTracker,
}: GetTrailHeadCountHelperParams): number {
  const [x, y] = coord

  if (!isCoordValid(coord, grid) || +grid[x][y] !== height) {
    return 0
  }

  if (+grid[x][y] === height && height === 9) {
    if (endTrailTracker.has(JSON.stringify([x, y]))) {
      return 0
    }
    endTrailTracker.add(JSON.stringify([x, y]))
    return 1
  }

  height++

  return (
    getTrailHeadCountHelper({
      height,
      coord: getNewCoord(coord, 'up'),
      grid,
      endTrailTracker,
    }) +
    getTrailHeadCountHelper({
      height,
      coord: getNewCoord(coord, 'down'),
      grid,
      endTrailTracker,
    }) +
    getTrailHeadCountHelper({
      height,
      coord: getNewCoord(coord, 'left'),
      grid,
      endTrailTracker,
    }) +
    getTrailHeadCountHelper({
      height,
      coord: getNewCoord(coord, 'right'),
      grid,
      endTrailTracker,
    })
  )
}

function getTrailHeadCount(trailStarts: Coord[], grid: string[][]): number {
  let trailHeadCount = 0

  for (const trailStart of trailStarts) {
    const endTrailTracker: Set<string> = new Set()
    trailHeadCount += getTrailHeadCountHelper({
      height: 0,
      coord: trailStart,
      grid,
      endTrailTracker,
    })
  }

  return trailHeadCount
}

function solve(file: string) {
  const lines = fs.readFileSync(file, 'utf-8').split(/[\n\r]+/)

  const grid: string[][] = []

  for (let i = 0; i < lines.length; i++) {
    grid[i] = []
    for (let j = 0; j < lines[i].length; j++) {
      grid[i][j] = lines[i][j]
    }
  }

  printGrid(grid)

  const potentialTrailStarts = getPotentialTrailStarts(grid)
  const trailHeadCount = getTrailHeadCount(potentialTrailStarts, grid)

  return trailHeadCount
}

console.log(solve('input.txt'))
