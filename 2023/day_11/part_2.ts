// https://adventofcode.com/2023/day/11

import * as fs from 'fs'

type Coordinate = [number, number]

const getGalaxyCoords = (grid: string[][]): Coordinate[] => {
  let coordList: Coordinate[] = []
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === '#') {
        coordList.push([i, j])
      }
    }
  }
  return coordList
}

const getUniverseRowColTracker = (
  grid: string[][]
): {
  rowTracker: number[]
  colTracker: number[]
} => {
  let rowTracker: number[] = Array(grid.length).fill(0)
  let colTracker: number[] = Array(grid[0].length).fill(0)
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === '#') {
        rowTracker[i]++
        colTracker[j]++
      }
    }
  }
  return {
    rowTracker,
    colTracker,
  }
}

const getDistance = ([x1, y1]: Coordinate, [x2, y2]: Coordinate): number => {
  return Math.abs(x2 - x1) + Math.abs(y2 - y1)
}

const getTotalShortestDistance = (
  galaxyCoordList: Coordinate[],
  rowTracker: number[],
  colTracker: number[],
  expansionRatio: number
): number => {
  let total = 0
  for (let i = 0; i < galaxyCoordList.length; i++) {
    const coord1 = galaxyCoordList[i]
    for (let j = i + 1; j < galaxyCoordList.length; j++) {
      const coord2 = galaxyCoordList[j]
      const minX = Math.min(coord1[0], coord2[0])
      const maxX = Math.max(coord1[0], coord2[0])
      const minY = Math.min(coord1[1], coord2[1])
      const maxY = Math.max(coord1[1], coord2[1])
      const expansionXChange = rowTracker
        .slice(minX + 1, maxX)
        .filter((num) => num === 0)
        .reduce((sum) => (sum += expansionRatio - 1), 0)
      const expansionYChange = colTracker
        .slice(minY + 1, maxY)
        .filter((num) => num === 0)
        .reduce((sum) => (sum += expansionRatio - 1), 0)
      total += getDistance(coord1, coord2) + expansionXChange + expansionYChange
    }
  }
  return total
}

/*
  Part 2 could not use the same method from Part 1 because of the expansion ratio being too high causing grid creation to exceed memory limit.
  Keeping track of which rows and cols have no galaxies and will be expanded. You can add the expansion ratio for each empty row/col within the range
  of 2 given galaxies to the distance itself.
*/
const solve = (file: string) => {
  const grid = fs
    .readFileSync(file, 'utf-8')
    .split(/[\n\r]+/)
    .map((line) => line.split(''))

  const galaxyCoordList = getGalaxyCoords(grid)
  const {rowTracker, colTracker} = getUniverseRowColTracker(grid)
  const expansionRatio = 1000000
  return getTotalShortestDistance(
    galaxyCoordList,
    rowTracker,
    colTracker,
    expansionRatio
  )
}

console.log(solve('input.txt'))
