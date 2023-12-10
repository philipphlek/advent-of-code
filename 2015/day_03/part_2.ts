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

  let santaCoord: Coordinate = [0, 0]
  let roboCoord: Coordinate = [0, 0]
  let visitedCoord: Record<string, number> = {
    [JSON.stringify(santaCoord)]: 2,
  }
  for (let i = 0; i < moves.length; i++) {
    let currCoord = i % 2 === 0 ? roboCoord : santaCoord
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
    if (i % 2 === 0) {
      roboCoord = currCoord
    } else {
      santaCoord = currCoord
    }
  }
  return Object.keys(visitedCoord).length
}

console.log(solve('input.txt'))
