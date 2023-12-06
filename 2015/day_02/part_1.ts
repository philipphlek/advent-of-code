// https://adventofcode.com/2015/day/2

import * as fs from 'fs'

const part1 = (file: string) => {
  const lines = fs.readFileSync(file, 'utf-8').split(/[\n\r]+/)

  let total = 0
  for (let i = 0; i < lines.length; i++) {
    const dimensions = lines[i].split('x')
    const l = Number(dimensions[0])
    const w = Number(dimensions[1])
    const h = Number(dimensions[2])
    const sides = [l * w, w * h, h * l]
    const min = Math.min(sides[0], sides[1], sides[2])

    total += (2 * sides[0]) + (2 * sides[1]) + (2 * sides[2]) + min
  }
  return total
}

console.log(part1('input.txt'))
