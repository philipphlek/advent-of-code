// https://adventofcode.com/2015/day/3

import * as fs from 'fs'

type Coordinate = [x: number, y: number]

const COORDINATE_MOVE_LOOKUP: Record<string, Coordinate> = {
  '^': [0, 1],
  v: [0, -1],
  '>': [1, 0],
  '<': [-1, 0],
}

const solve = (file: string) => {
  const moves = fs.readFileSync(file, 'utf-8').split('')

  let currCoord: Coordinate = [0, 0]
  let visitedCoord: Record<string, number> = {
    [JSON.stringify(currCoord)]: 1,
  }
  for (let i = 0; i < moves.length; i++) {
    const [x, y] = COORDINATE_MOVE_LOOKUP[moves[i]]
    const [currX, currY] = currCoord
    const updatedCoord: Coordinate = [currX + x, currY + y]
    currCoord = updatedCoord
    const currCoordStr = JSON.stringify(currCoord)
    if (visitedCoord[currCoordStr]) {
      visitedCoord[currCoordStr]++
    } else {
      visitedCoord[currCoordStr] = 1
    }
  }
  return Object.keys(visitedCoord).length
}

console.log(solve('input.txt'))
