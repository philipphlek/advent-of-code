// https://adventofcode.com/2017/day/1

import * as fs from 'fs'

const part1 = (file: string) => {
  const digits = fs.readFileSync(file, 'utf-8')
  const numMatch: number[] = []
  for (let i = 0; i < digits.length; i++) {
    const start = i
    const end = i + 1 === digits.length ? 0 : i + 1
    if (digits[start] === digits[end]) {
      numMatch.push(Number(digits[start]))
    }
  }
  return numMatch.reduce((sum, curr) => sum + curr, 0)
}

console.log(part1('input.txt'))
