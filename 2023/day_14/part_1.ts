// https://adventofcode.com/2023/day/14

import * as fs from 'fs'

enum Direction {
  N = 'N',
  S = 'S',
  E = 'E',
  W = 'W',
}
enum Element {
  RoundRock = 'O',
  CubeRock = '#',
  Empty = '.',
}

const tiltGrid = (direction: Direction, grid: string[][]): number => {
  let totalLoad = 0
  if (direction === Direction.N) {
    for (let col = 0; col < grid[0].length; col++) {
      let emptyRow = -1
      for (let row = 0; row < grid.length; row++) {
        const currElement = grid[row][col]
        if (currElement === Element.Empty && emptyRow === -1) {
          emptyRow = row
        } else if (currElement === Element.RoundRock) {
          if (emptyRow !== -1) {
            grid[emptyRow][col] = Element.RoundRock
            grid[row][col] = Element.Empty
            totalLoad += grid.length - emptyRow
            emptyRow = emptyRow + 1
          } else {
            totalLoad += grid.length - row
          }
        } else if (currElement === Element.CubeRock) {
          emptyRow = -1
        }
      }
    }
  }
  return totalLoad
}

const printGrid = (grid: string[][]) => {
  let str = ''
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      str += grid[i][j]
    }
    str += '\n'
  }
  console.log(str)
}

const solve = (file: string) => {
  const grid = fs
    .readFileSync(file, 'utf-8')
    .split(/[\n\r]+/)
    .map((line) => line.split(''))

  const totalLoad = tiltGrid(Direction.N, grid)
  printGrid(grid)
  return totalLoad
}

console.log(solve('input.txt'))
