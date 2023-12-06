// https://adventofcode.com/2015/day/2

import * as fs from 'fs'

const part2 = (file: string) => {
  const lines = fs.readFileSync(file, 'utf-8').split(/[\n\r]+/)

  let total = 0
  for (let i = 0; i < lines.length; i++) {
    const dimensions = lines[i].split('x')
    const l = Number(dimensions[0])
    const w = Number(dimensions[1])
    const h = Number(dimensions[2])
    const max = Math.max(l, w, h)
    
    total += (2 * l) + (2 * w) + (2 * h) - (2 * max)
    total += l * w * h
  }
  return total
}

console.log(part2('input.txt'))
