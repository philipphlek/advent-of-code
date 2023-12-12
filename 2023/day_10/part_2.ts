// https://adventofcode.com/2023/day/10

import * as fs from 'fs'

type Coordinate = [x: number, y: number]
enum Direction {
  N = 'N',
  S = 'S',
  E = 'E',
  W = 'W',
}

const DIRECTION_COORD_LOOKUP: Record<Direction, Coordinate> = {
  [Direction.N]: [-1, 0],
  [Direction.S]: [1, 0],
  [Direction.E]: [0, 1],
  [Direction.W]: [0, -1],
}

const VALID_ADJ_CONNECTOR_LOOKUP: Record<string, Partial<Record<Direction, string[]>>> = {
  '|': {
    [Direction.S]: ['|', 'L', 'J'],
    [Direction.N]: ['|', '7', 'F'],
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

const getPotentialValidAdjPipes = (direction: Direction): string[] => 
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

type MainLoopInfo = {
  updatedTiles: string[][],
  coordOrderList: Coordinate[],
  coordTracker: Record<string, number>
  innerCoordsList: Coordinate[]
}

const findMainLoop = (startCoord: Coordinate, tiles: string[][]): MainLoopInfo => {
  const [startX, startY] = startCoord
  const updatedTiles: string[][] = tiles.map(row => row.map(() => 'x')) // everything will be marked 'x' that's not part of main loop
  const directionChecks: Direction[] = [Direction.S, Direction.E, Direction.N, Direction.W]

  let prevDirection = Direction.N
  let startingAdjCoord: Coordinate = [-1, -1]
  let adjDirections: Direction[] = []
  for (let i = 0; i < directionChecks.length; i++) {
    const direction = directionChecks[i]
    const [x, y] = DIRECTION_COORD_LOOKUP[direction]
    const [adjX, adjY] = [startX + x, startY + y]
    const validCoord = 0 <= adjX && adjX <= updatedTiles.length && 0 <= adjY && adjY <= updatedTiles[0].length
    if (validCoord && getPotentialValidAdjPipes(direction).includes(tiles[adjX][adjY])) {
      if (startingAdjCoord[0] === -1) {
        prevDirection = PREVIOUS_DIRECTION_LOOKUP[direction]
        startingAdjCoord = [adjX, adjY]
      }
      adjDirections.push(direction)
    }
  }

  let sPipe = ''
  for (const pipe of Object.keys(VALID_ADJ_CONNECTOR_LOOKUP)) {
    const adjDir = Object.keys(VALID_ADJ_CONNECTOR_LOOKUP[pipe])
    if (adjDirections.every(dir => adjDir.includes(dir))) {
      sPipe = pipe
    }
  }
  updatedTiles[startX][startY] = sPipe

  let coordOrderList: Coordinate[] = [startCoord, startingAdjCoord]
  let coordTracker: Record<string, number> = {
    [`${startCoord}`]: 1,
    [`${startingAdjCoord}`]: 1
  }
  let currCoord = startingAdjCoord
  let validLoop = true
  while (validLoop) {
    const [currX, currY] = currCoord
    const currPipe = tiles[currX][currY]
    updatedTiles[currX][currY] = currPipe
    const validNextDirection = getValidNextDirections(currPipe).filter(direction => direction !== prevDirection)[0]
    const [nextX, nextY] = DIRECTION_COORD_LOOKUP[validNextDirection]
    const [adjX, adjY] = [currX + nextX, currY + nextY]
    const adjPipe = tiles[adjX][adjY]
    if (adjX === startX && adjY === startY) {
      return {
        updatedTiles,
        coordOrderList,
        coordTracker,
        innerCoordsList: []
      }
    } else if (getPotentialValidAdjPipes(validNextDirection).includes(adjPipe)) {
      currCoord = [adjX, adjY]
      prevDirection = PREVIOUS_DIRECTION_LOOKUP[validNextDirection]
      coordOrderList.push(currCoord)
      coordTracker[`${currCoord}`] = 1
    } else {
      validLoop = false
    }
  }
  return {
    updatedTiles,
    coordOrderList,
    coordTracker,
    innerCoordsList: []
  }
}

const updateTilesInsideMainLoop = (mainLoopInfo: MainLoopInfo) => {
  const {updatedTiles, coordOrderList, coordTracker, innerCoordsList} = mainLoopInfo
  const INSIDE_LOOP_DIRECTIONS = [Direction.N, Direction.E, Direction.S, Direction.W]

  // can start from any main loop bound but we'll choose to start from South
  const lowerBound = Math.max(...coordOrderList.map(([x]) => x))
  const firstLowerBoundCoordIndex = coordOrderList.findIndex(([x]) => x === lowerBound)
  const [startX, startY] = coordOrderList[firstLowerBoundCoordIndex]
  let currPipe = updatedTiles[startX][startY]
  let prevPipeBend = currPipe
  let currInsideLoopDirectionIndex = 0

  let incFactor = 1
  let i = firstLowerBoundCoordIndex + 1
  while (i !== firstLowerBoundCoordIndex) {
    const [nextX, nextY] = coordOrderList[i]
    const nextPipe = updatedTiles[nextX][nextY]
    if (!['-', '|'].includes(nextPipe)) {
      const [x, y] = DIRECTION_COORD_LOOKUP[INSIDE_LOOP_DIRECTIONS[currInsideLoopDirectionIndex]]
      const [updatedX, updatedY] = [nextX + x, nextY + y]
      if (updatedTiles[updatedX][updatedY] === 'x') {
        updatedTiles[updatedX][updatedY] = 'I'
        innerCoordsList.push([updatedX, updatedY])
      }

      if (
        (prevPipeBend === '7' && nextPipe === 'L') ||
        (prevPipeBend === 'L' && nextPipe === '7') ||
        (prevPipeBend === 'F' && nextPipe === 'J') ||
        (prevPipeBend === 'J' && nextPipe === 'F')
      ) {
        incFactor *= -1
      } 
      if (currInsideLoopDirectionIndex + incFactor < 0) {
        currInsideLoopDirectionIndex = INSIDE_LOOP_DIRECTIONS.length - 1
      } else if (currInsideLoopDirectionIndex + incFactor === INSIDE_LOOP_DIRECTIONS.length) {
        currInsideLoopDirectionIndex = 0
      } else {
        currInsideLoopDirectionIndex += incFactor
      }
      prevPipeBend = nextPipe
    }

    const [x, y] = DIRECTION_COORD_LOOKUP[INSIDE_LOOP_DIRECTIONS[currInsideLoopDirectionIndex]]
    const [updatedX, updatedY] = [nextX + x, nextY + y]
    if (updatedTiles[updatedX][updatedY] === 'x') {
      updatedTiles[updatedX][updatedY] = 'I'
      innerCoordsList.push([updatedX, updatedY])
    }

    i = i + 1 === coordOrderList.length ? 
      0 :
      i + 1
  }
}

const printTiles = (mainLoopInfo: MainLoopInfo, mainLoopOnlyFlag: boolean = false) => {
  const {updatedTiles, coordTracker} = mainLoopInfo
  let str = ''
  for (let i = 0; i < updatedTiles.length; i++) {
    for (let j = 0; j < updatedTiles[i].length; j++) {
      if (mainLoopOnlyFlag) {
        if (coordTracker[`${[i, j]}`]) {
          str += updatedTiles[i][j]
        } else {
          str += ' '
        }
      } else {
        str += updatedTiles[i][j]
      }
    }
    str += '\n'
  }
  console.log(str)
}

const getInnerTileCount = (mainLoopInfo: MainLoopInfo): number => {
  const coordChecks = Object.values(DIRECTION_COORD_LOOKUP)
  const {updatedTiles, innerCoordsList} = mainLoopInfo

  for (let i = 0; i < innerCoordsList.length; i++) {
    const [innerX, innerY] = innerCoordsList[i]
    for (let j = 0; j < coordChecks.length; j++) {
      const [x, y] = coordChecks[j]
      const [updatedX, updatedY] = [innerX + x, innerY + y]
      if (updatedTiles[updatedX][updatedY] === 'x'){
        updatedTiles[updatedX][updatedY] = 'I'
        innerCoordsList.push([updatedX, updatedY])
      }
    }
  }
  return innerCoordsList.length
}

const solve = (file: string) => {
  const tiles = fs.readFileSync(file, 'utf-8').split(/[\n\r]+/).map(line => line.split(''))

  const startCoord: Coordinate = getStartCoord(tiles) 
  const mainLoopInfo = findMainLoop(startCoord, tiles)
  updateTilesInsideMainLoop(mainLoopInfo)
  const innerTileCount = getInnerTileCount(mainLoopInfo)
  printTiles(mainLoopInfo)
  return innerTileCount
}

console.log(solve('input.txt'))
