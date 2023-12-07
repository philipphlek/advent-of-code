// https://adventofcode.com/2016/day/2

import * as fs from 'fs'

type Coordinate = [number, number]

const KEYPAD = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
]

const INSTRUCTION_CHANGE_LOOKUP: Record<string, Coordinate> = {
  'U': [-1, 0],
  'D': [1, 0],
  'L': [0, -1],
  'R': [0, 1],
}

const part1 = (file: string) => {
  const lines = fs.readFileSync(file, 'utf-8').split(/[\n\r]+/)
  
  let code = ''
  let currCoord: Coordinate = [1, 1]
  let position = KEYPAD[currCoord[0]][currCoord[1]]
  for (let i = 0; i < lines.length; i++) {
    const instructions = lines[i].split('')
    for (const instruction of instructions) {
      const [xChange, yChange] = INSTRUCTION_CHANGE_LOOKUP[instruction]
      const [currX, currY] = currCoord
      const updatedX = currX + xChange
      const updatedY = currY + yChange
      if (0 <= updatedX && updatedX < KEYPAD[0].length && 0 <= updatedY && updatedY < KEYPAD.length) {
        currCoord = [updatedX, updatedY]
        position = KEYPAD[currCoord[0]][currCoord[1]]
      }
    }
    code += position
  }

  return code
}

console.log(part1('input.txt'))
