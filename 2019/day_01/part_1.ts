// https://adventofcode.com/2019/day/1

import * as fs from 'fs'

const part1 = (file: string) => {
  const lines = fs.readFileSync(file, 'utf-8').split(/[\n\r]+/)

  let sum = 0
  for (let i = 0; i < lines.length; i++) {
    const mass = Number(lines[i])
    sum += Math.floor(mass / 3) - 2
  }
  return sum
}

console.log(part1('input.txt'))
