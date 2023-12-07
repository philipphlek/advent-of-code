// https://adventofcode.com/2017/day/1

import * as fs from 'fs'

const part2 = (file: string) => {
  const digits = fs.readFileSync(file, 'utf-8')
  const numMatch: number[] = []
  const steps = digits.length / 2
  for (let i = 0; i < digits.length; i++) {
    const start = i
    const end = i + steps >= digits.length ? steps - (digits.length - i) : i + steps
    if (digits[start] === digits[end]) {
      numMatch.push(Number(digits[start]))
    }
  }
  return numMatch.reduce((sum, curr) => sum + curr, 0)
}

console.log(part2('input.txt'))
