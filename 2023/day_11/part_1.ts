// https://adventofcode.com/2023/day/11

import * as fs from 'fs'

type Coordinate = [number, number]

const createRealUniverse = (grid: string[][]): string[][] => {
  let galaxyRowTracker: number[] = Array(grid.length).fill(0)
  let galaxyColTracker: number[] = Array(grid[0].length).fill(0)
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === '#') {
        galaxyRowTracker[i]++
        galaxyColTracker[j]++
      }
    }
  }

  let newGrid: string[][] = []
  let extraRows = 0
  for (let i = 0; i < galaxyRowTracker.length; i++) {
    newGrid.push([])
    for (let j = 0; j < galaxyColTracker.length; j++) {
      if (galaxyColTracker[j] > 0) {
        newGrid[i + extraRows].push(grid[i][j])
      } else {
        newGrid[i + extraRows].push('.', '.')
      }
    }
    if (galaxyRowTracker[i] === 0) {
      newGrid.push([...newGrid[i + extraRows]])
      extraRows++
    }
  }
  return newGrid
}

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

const getDistance = ([x1, y1]: Coordinate, [x2, y2]: Coordinate): number => {
  return Math.abs(x2 - x1) + Math.abs(y2 - y1)
}

const getTotalShortestDistance = (galaxyCoordList: Coordinate[]): number => {
  let total = 0
  for (let i = 0; i < galaxyCoordList.length; i++) {
    const coord1 = galaxyCoordList[i]
    for (let j = i + 1; j < galaxyCoordList.length; j++) {
      const coord2 = galaxyCoordList[j]
      total += getDistance(coord1, coord2)
    }
  }
  return total
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

/*
  Part 1 was brute forced, creating the new universe using the expansion ratio, then calculating all coordinate combination distances
*/
const solve = (file: string) => {
  const grid = fs
    .readFileSync(file, 'utf-8')
    .split(/[\n\r]+/)
    .map((line) => line.split(''))

  const newGrid = createRealUniverse(grid)
  const galaxyCoordList = getGalaxyCoords(newGrid)
  return getTotalShortestDistance(galaxyCoordList)
}

console.log(solve('input.txt'))
