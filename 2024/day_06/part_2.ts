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

function getTotalDistinctPosForLoopObstruction(
  grid: string[][],
  guardStartCoord: number[]
): number {
  const totalDistinctPosVisited = new Set<string>()
  const totalDistinctObstacles = new Set<string>()
  let currGuardPosIndex = 0
  let row = guardStartCoord[0]
  let col = guardStartCoord[1]
  while (isCoordInBounds(grid, row, col)) {
    // console.log({row, col, pos: GUARD_POSITION_LOOKUP[currGuardPosIndex]})
    totalDistinctPosVisited.add(
      JSON.stringify({
        currGuardPosIndex,
        currGuardCoord: [row, col],
      })
    )

    let [rowChange, colChange] = getGuardMoveDirection(currGuardPosIndex)

    // guard reached outside map
    if (!isCoordInBounds(grid, row + rowChange, col + colChange)) {
      printGrid(grid)

      return totalDistinctObstacles.size
    }

    // if guard hits an obstacle, change directions
    if (grid[row + rowChange][col + colChange] === '#') {
      currGuardPosIndex = (currGuardPosIndex + 1) % GUARD_POSITION_LOOKUP.length
      const [newRowChange, newColChange] =
        getGuardMoveDirection(currGuardPosIndex)
      rowChange = newRowChange
      colChange = newColChange
    } else {
      // try treating new potential coord as # and change directions,
      // if you have visited there before with the same position, it should be a loop
      let potentialNewGuardPosIndex =
        (currGuardPosIndex + 1) % GUARD_POSITION_LOOKUP.length
      let [newRowChange, newColChange] = getGuardMoveDirection(
        potentialNewGuardPosIndex
      )
      let potentialNewRow = row + newRowChange
      let potentialNewCol = col + newColChange
      const potentialTotalDistinctPosVisited = new Set<string>()
      let potentialObstacleRow = row + rowChange
      let potentialObstacleCol = col + colChange
      while (isCoordInBounds(grid, potentialNewRow, potentialNewCol)) {
        if (
          totalDistinctObstacles.has(
            JSON.stringify({
              potentialObstacleRow,
              potentialObstacleCol,
            })
          )
        ) {
          break
        }
        if (
          totalDistinctPosVisited.has(
            JSON.stringify({
              currGuardPosIndex: potentialNewGuardPosIndex,
              currGuardCoord: [potentialNewRow, potentialNewCol],
            })
          ) ||
          potentialTotalDistinctPosVisited.has(
            JSON.stringify({
              currGuardPosIndex: potentialNewGuardPosIndex,
              currGuardCoord: [potentialNewRow, potentialNewCol],
            })
          )
        ) {
          totalDistinctObstacles.add(
            JSON.stringify({
              potentialObstacleRow,
              potentialObstacleCol,
            })
          )
          grid[potentialObstacleRow][potentialObstacleCol] = '0'
          break
        }

        if (grid[potentialNewRow][potentialNewCol] === '#') {
          potentialNewRow -= newRowChange
          potentialNewCol -= newColChange
          potentialNewGuardPosIndex =
            (potentialNewGuardPosIndex + 1) % GUARD_POSITION_LOOKUP.length
          const newDirection = getGuardMoveDirection(potentialNewGuardPosIndex)
          newRowChange = newDirection[0]
          newColChange = newDirection[1]
        } else {
          potentialTotalDistinctPosVisited.add(
            JSON.stringify({
              currGuardPosIndex: potentialNewGuardPosIndex,
              currGuardCoord: [potentialNewRow, potentialNewCol],
            })
          )
        }

        potentialNewRow += newRowChange
        potentialNewCol += newColChange
      }
    }

    row += rowChange
    col += colChange
  }

  printGrid(grid)

  return totalDistinctObstacles.size
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
  return getTotalDistinctPosForLoopObstruction(grid, guardStartCoord)
}

console.log(solve('input.txt'))
