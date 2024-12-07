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

function isGridLoop(grid: string[][], guardStartCoord: number[]): boolean {
  const totalDistinctPosVisited = new Set<string>()
  let currGuardPosIndex = 0
  let row = guardStartCoord[0]
  let col = guardStartCoord[1]
  while (isCoordInBounds(grid, row, col)) {
    if (
      totalDistinctPosVisited.has(
        JSON.stringify({
          pos: GUARD_POSITION_LOOKUP[currGuardPosIndex],
          coord: [row, col],
        })
      )
    ) {
      return true
    }

    totalDistinctPosVisited.add(
      JSON.stringify({
        pos: GUARD_POSITION_LOOKUP[currGuardPosIndex],
        coord: [row, col],
      })
    )

    let [rowChange, colChange] = getGuardMoveDirection(currGuardPosIndex)

    // guard reached outside map
    if (!isCoordInBounds(grid, row + rowChange, col + colChange)) {
      return false
    }

    let newRowChange = rowChange
    let newColChange = colChange
    // if guard hits an obstacle, change directions
    while (grid[row + newRowChange][col + newColChange] === '#') {
      currGuardPosIndex = (currGuardPosIndex + 1) % GUARD_POSITION_LOOKUP.length
      const newMoveDirection = getGuardMoveDirection(currGuardPosIndex)
      newRowChange = newMoveDirection[0]
      newColChange = newMoveDirection[1]
    }

    row += newRowChange
    col += newColChange
  }

  return false
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

  /**
    Post Discussion Notes:
    - instead of brute force checking every possibility, you only need to check the path of the guards original path
  */
  let totalNewObstacleLoop = 0
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (['^', '#'].includes(grid[row][col])) {
        continue
      }
      grid[row][col] = '#'
      if (isGridLoop(grid, guardStartCoord)) {
        totalNewObstacleLoop++
      }
      grid[row][col] = '.'
    }
  }

  return totalNewObstacleLoop
}

console.log(solve('input.txt'))
