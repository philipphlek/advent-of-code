// https://adventofcode.com/2018/day/1

import * as fs from 'fs'

const part1 = (file: string) => {
  const lines = fs.readFileSync(file, 'utf-8').split(/[\n\r]+/)

  let frequency = 0
  for (let i = 0; i < lines.length; i++) {
    frequency += parseInt(lines[i])
  }
  return frequency
}

console.log(part1('input.txt'))
