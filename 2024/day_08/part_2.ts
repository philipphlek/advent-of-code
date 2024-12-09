// https://adventofcode.com/2024/day/8

import * as fs from 'fs'

type Coords = [row: number, col: number]

function isCoordsValid([row, col]: Coords, grid: string[][]) {
  return row >= 0 && row < grid.length && col >= 0 && col < grid[0].length
}

function getCoordDiff([row1, col1]: Coords, [row2, col2]: Coords): Coords {
  return [row2 - row1, col2 - col1]
}

function calculateAntinodeCoords(
  coord1: Coords,
  coord2: Coords,
  grid: string[][]
): Coords[] {
  const [rowDiff, colDiff] = getCoordDiff(coord2, coord1)
  const antinodeCoords: Coords[] = []

  let row = coord1[0]
  let col = coord1[1]
  while (isCoordsValid([row + rowDiff, col + colDiff], grid)) {
    row += rowDiff
    col += colDiff
    antinodeCoords.push([row, col])
  }

  row = coord2[0]
  col = coord2[1]
  while (isCoordsValid([row - rowDiff, col - colDiff], grid)) {
    row -= rowDiff
    col -= colDiff
    antinodeCoords.push([row, col])
  }

  return antinodeCoords
}

function getUniqueAntinodeCoords(
  antennaCoords: Record<string, Coords[]>,
  grid: string[][]
): Set<string> {
  const uniqueAntinodeCoords: Set<string> = new Set()
  Object.values(antennaCoords).forEach((coords) => {
    for (let i = 0; i < coords.length - 1; i++) {
      const coord1 = coords[i]
      uniqueAntinodeCoords.add(JSON.stringify(coord1))
      for (let j = i + 1; j < coords.length; j++) {
        const coord2 = coords[j]
        const antinodeCoords = calculateAntinodeCoords(coord1, coord2, grid)
        antinodeCoords.forEach((antinodeCoord) => {
          uniqueAntinodeCoords.add(JSON.stringify(antinodeCoord))
        })
      }
    }
    uniqueAntinodeCoords.add(JSON.stringify(coords[coords.length - 1]))
  })

  return uniqueAntinodeCoords
}

function getAntennaCoords(grid: string[][]): Record<string, Coords[]> {
  const antennaCoords: Record<string, Coords[]> = {}
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const cell = grid[row][col]
      if (cell !== '.') {
        if (!(cell in antennaCoords)) {
          antennaCoords[cell] = []
        }
        antennaCoords[cell].push([row, col])
      }
    }
  }
  return antennaCoords
}

function printGrid(grid: string[][], uniqueAntinodeCoords: Set<string>) {
  for (const antinodeCoord of uniqueAntinodeCoords) {
    const [row, col] = JSON.parse(antinodeCoord)
    grid[row][col] = '#'
  }

  let result = ''
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      result += grid[i][j]
    }
    result += '\n'
  }

  console.log(result)
}

function solve(file: string) {
  const lines = fs.readFileSync(file, 'utf-8').split(/[\n\r]+/)

  const grid: string[][] = []
  for (let row = 0; row < lines.length; row++) {
    grid[row] = []
    for (let col = 0; col < lines[row].length; col++) {
      grid[row][col] = lines[row][col]
    }
  }

  const antennaCoords = getAntennaCoords(grid)
  const uniqueAntinodeCoords = getUniqueAntinodeCoords(antennaCoords, grid)

  printGrid(grid, uniqueAntinodeCoords)
  return uniqueAntinodeCoords.size
}

console.log(solve('input.txt'))
