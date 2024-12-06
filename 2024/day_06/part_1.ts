// https://adventofcode.com/2024/day/6

import * as fs from 'fs'

const GUARD_POSITION_LOOKUP = ['^', '>', 'v', '<']
const GUARD_MOVE_DIRECTION_LOOKUP = {
  '^': [-1, 0],
  '>': [0, 1],
  v: [1, 0],
  '<': [0, -1],
}

function getGuardMoveDirection(guardPosIndex: number): number[] {
  const guardPos = GUARD_POSITION_LOOKUP[guardPosIndex]
  return GUARD_MOVE_DIRECTION_LOOKUP[guardPos]
}

function isCoordInBounds(grid: string[][], row: number, col: number): boolean {
  return row >= 0 && row < grid.length && col >= 0 && col < grid[0].length
}

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

function getTotalDistinctPosVisited(
  grid: string[][],
  guardStartCoord: number[]
): number {
  const totalDistinctPosVisited = new Set<string>()
  let currGuardPosIndex = 0
  let row = guardStartCoord[0]
  let col = guardStartCoord[1]
  while (isCoordInBounds(grid, row, col)) {
    totalDistinctPosVisited.add(JSON.stringify([row, col]))

    let [rowChange, colChange] = getGuardMoveDirection(currGuardPosIndex)

    // guard reached outside map
    if (!isCoordInBounds(grid, row + rowChange, col + colChange)) {
      return totalDistinctPosVisited.size
    }

    // if guard hits an obstacle, change directions
    if (grid[row + rowChange][col + colChange] === '#') {
      currGuardPosIndex = (currGuardPosIndex + 1) % GUARD_POSITION_LOOKUP.length
      const [newRowChange, newColChange] =
        getGuardMoveDirection(currGuardPosIndex)
      rowChange = newRowChange
      colChange = newColChange
    }

    row += rowChange
    col += colChange
  }

  return totalDistinctPosVisited.size
}

function solve(file: string) {
  const lines = fs.readFileSync(file, 'utf-8').split(/[\n\r]+/)

  const grid: string[][] = []
  const guardStartingPos = GUARD_POSITION_LOOKUP[0]
  let guardStartCoord = [-1, -1]

  for (let row = 0; row < lines.length; row++) {
    const coords = lines[row].split('')
    grid[row] = coords
    const potentialGuardStartCol = coords.indexOf(guardStartingPos)
    if (potentialGuardStartCol > -1) {
      guardStartCoord = [row, potentialGuardStartCol]
    }
  }

  return getTotalDistinctPosVisited(grid, guardStartCoord)
}

console.log(solve('input.txt'))
