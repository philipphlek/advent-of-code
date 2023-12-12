// https://adventofcode.com/2023/day/10

import * as fs from 'fs'

type Coordinate = [x: number, y: number]
enum Direction {
  N = 'N',
  S = 'S',
  E = 'E',
  W = 'W'
}

const DIRECTION_COORD_LOOKUP: Record<Direction, Coordinate> = {
  [Direction.N]: [-1, 0],
  [Direction.S]: [1, 0],
  [Direction.E]: [0, 1],
  [Direction.W]: [0, -1],
}

const VALID_ADJ_CONNECTOR_LOOKUP: Record<string, Partial<Record<Direction, string[]>>> = {
  '|': {
    [Direction.N]: ['|', '7', 'F'],
    [Direction.S]: ['|', 'L', 'J'],
  },
  '-': {
    [Direction.E]: ['-', 'J', '7'],
    [Direction.W]: ['-', 'L', 'F'],
  },
  'L': {
    [Direction.N]: ['|', '7', 'F'],
    [Direction.E]: ['-', 'J', '7'],
  },
  'J': {
    [Direction.N]: ['|', '7', 'F'],
    [Direction.W]: ['-', 'L', 'F'],
  },
  '7': {
    [Direction.S]: ['|', 'L', 'J'],
    [Direction.W]: ['-', 'L', 'F'],
  },
  'F': {
    [Direction.S]: ['|', 'L', 'J'],
    [Direction.E]: ['-', 'J', '7'],
  },
}

const PREVIOUS_DIRECTION_LOOKUP: Record<Direction, Direction> = {
  [Direction.N]: Direction.S,
  [Direction.S]: Direction.N,
  [Direction.E]: Direction.W,
  [Direction.W]: Direction.E,

}
const getValidNextDirections = (tile: string): Direction[] => Object.keys(VALID_ADJ_CONNECTOR_LOOKUP[tile]) as Direction[]

const getPotentialValidAdjConnectors = (direction: Direction): string[] => 
  Array.from(new Set(Object.values(VALID_ADJ_CONNECTOR_LOOKUP)
    .flatMap((lookup) => lookup[direction]))) as string[]

const getStartCoord = (tiles: string[][]): Coordinate => {
  let startCoord: Coordinate = [-1, -1]
  for (let i = 0; i < tiles.length; i++) {
    for (let j = 0; j < tiles[i].length; j++) {
      if (tiles[i][j] === 'S') {
        startCoord = [i, j]
      }
    }
  }
  return startCoord
}

const getTotalLoopDistance = ([startX, startY]: Coordinate, tiles: string[][]): number => {
  const directionChecks: Direction[] = [Direction.N, Direction.S, Direction.E, Direction.W]

  // get potential start tiles and adj coords
  let potentialStartTiles: string[] = []
  let directionTracker: Direction[] = []
  let potentialAdjCoord: Coordinate[] = []
  for (let i = 0; i < directionChecks.length; i++) {
    const direction = directionChecks[i]
    const [x, y] = DIRECTION_COORD_LOOKUP[direction]
    const [adjX, adjY] = [startX + x, startY + y]
    const adjTile = tiles[adjX][adjY]
    if (getPotentialValidAdjConnectors(direction).includes(adjTile)) {
      directionTracker.push(PREVIOUS_DIRECTION_LOOKUP[direction])
      potentialStartTiles.push(adjTile)
      potentialAdjCoord.push([adjX, adjY])
    }
  }

  // trace all potential adj coords to find loop back to startCoord and keep track of tile count
  let countTracker: number[] = Array(potentialAdjCoord.length).fill(0)
  for (let i = 0; i < potentialAdjCoord.length; i++) {
    let currCoord = potentialAdjCoord[i]
    countTracker[i]++
    let validLoop = true
    let prevDirection = directionTracker[i]
    while (validLoop) {
      const [currX, currY] = currCoord
      const currTile = tiles[currX][currY]
      const validNextDirection = getValidNextDirections(currTile).filter(direction => direction !== prevDirection)[0]
      const [nextX, nextY] = DIRECTION_COORD_LOOKUP[validNextDirection]
      const [adjX, adjY] = [currX + nextX, currY + nextY]
      const adjTile = tiles[adjX][adjY]
      if (adjX === startX && adjY === startY) {
        return ++countTracker[i] / 2
      } else if (getPotentialValidAdjConnectors(validNextDirection).includes(adjTile)) {
        countTracker[i]++
        currCoord = [adjX, adjY]
        prevDirection = PREVIOUS_DIRECTION_LOOKUP[validNextDirection]
      } else {
        validLoop = false
      }
    }
  }
  return -1
}

const solve = (file: string) => {
  const tiles = fs.readFileSync(file, 'utf-8').split(/[\n\r]+/).map(line => line.split(''))

  const startCoord: Coordinate = getStartCoord(tiles) 
  const count = getTotalLoopDistance(startCoord, tiles)
  return count
}

console.log(solve('input.txt'))
