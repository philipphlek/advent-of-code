// https://adventofcode.com/2015/day/1

import * as fs from 'fs'

const DIRECTION_LOOKUP = {
  '(': 1,
  ')': -1
}

const part1 = (file: string) => {
  const directions = fs.readFileSync(file, 'utf-8')

  let floor = 0
  for (let i = 0; i < directions.length; i++) {
    floor += DIRECTION_LOOKUP[directions[i]]
  }
  return floor
}

console.log(part1('input.txt'))
