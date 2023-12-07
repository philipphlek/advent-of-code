// https://adventofcode.com/2016/day/1

import * as fs from 'fs'

type Coordinate = [number, number]

enum Direction {
  North = 'North',
  South = 'South',
  East = 'East',
  West = 'West',
}

const DIRECTION_UPDATE_LOOKUP: Record<Direction, Record<string, Direction>> = {
  [Direction.North]: {
    'L': Direction.West,
    'R': Direction.East,
  },
  [Direction.South]: {
    'L': Direction.East,
    'R': Direction.West,
  },
  [Direction.East]: {
    'L': Direction.North,
    'R': Direction.South,
  },
  [Direction.West]: {
    'L': Direction.South,
    'R': Direction.North,
  },
}

const COORDINATE_TO_UPDATE_LOOKUP: Record<Direction, Coordinate> = {
  [Direction.North]: [0, 1],
  [Direction.South]: [0, -1],
  [Direction.East]: [1, 0],
  [Direction.West]: [-1, 0],
}

const updateVisitedCoords = (coordinateTracker: Record<string, number>, visitedCoord: Coordinate) => {
  const key = `${visitedCoord}`
  if (coordinateTracker[key]) {
    coordinateTracker[key]++
  } else {
    coordinateTracker[key] = 1
  }
}

const isVisitedCoord = (coordinateTracker: Record<string, number>, visitedCoord: Coordinate): boolean => coordinateTracker[`${visitedCoord}`] === 2

const calculateBlocksAway = (coord: Coordinate): number => Math.abs(coord[0]) + Math.abs(coord[1])

const part2 = (file: string) => {
  const sequences = fs.readFileSync(file, 'utf-8').split(', ')

  let currCoordinate: Coordinate = [0, 0]
  let currDirection = Direction.North
  let coordinateTracker: Record<string, number> = {}
  for (let i = 0; i < sequences.length; i++) {
    const turn = sequences[i].slice(0, 1)
    const forward = Number(sequences[i].slice(1, sequences[i].length))
    currDirection = DIRECTION_UPDATE_LOOKUP[currDirection][turn]
    const [xToChange, yToChange] = COORDINATE_TO_UPDATE_LOOKUP[currDirection]
    const [xChange, yChange] = [xToChange * forward, yToChange * forward]

    if (xChange !== 0) {
      if (xChange > 0) {
        for (let j = 1; j <= xChange; j++) {
          const visitedCoord: Coordinate = [currCoordinate[0] + j, currCoordinate[1]]
          updateVisitedCoords(coordinateTracker, visitedCoord) 
          if (isVisitedCoord(coordinateTracker, visitedCoord)) {
            return calculateBlocksAway(visitedCoord)
          }
        }
      } else {
        for (let j = -1; j >= xChange; j--) {
          const visitedCoord: Coordinate = [currCoordinate[0] + j, currCoordinate[1]]
          updateVisitedCoords(coordinateTracker, visitedCoord) 
          if (isVisitedCoord(coordinateTracker, visitedCoord)) {
            return calculateBlocksAway(visitedCoord)
          }
        }
      }
    } else {
      if (yChange > 0) {
        for (let j = 1; j <= yChange; j++) {
          const visitedCoord: Coordinate = [currCoordinate[0], currCoordinate[1] + j]
          updateVisitedCoords(coordinateTracker, visitedCoord) 
          if (isVisitedCoord(coordinateTracker, visitedCoord)) {
            return calculateBlocksAway(visitedCoord)
          }
        }
      } else {
        for (let j = -1; j >= yChange; j--) {
          const visitedCoord: Coordinate = [currCoordinate[0], currCoordinate[1] + j]
          updateVisitedCoords(coordinateTracker, visitedCoord) 
          if (isVisitedCoord(coordinateTracker, visitedCoord)) {
            return calculateBlocksAway(visitedCoord)
          }
        }
      }
    }
    currCoordinate = [currCoordinate[0] + xChange, currCoordinate[1] + yChange]
  }
  console.log(coordinateTracker)
}

console.log(part2('input.txt'))
