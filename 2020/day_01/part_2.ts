// https://adventofcode.com/2020/day/1

import * as fs from 'fs'

const solve = (file: string) => {
  const lines = fs.readFileSync(file, 'utf-8').split(/[\n\r]+/)

  const targetNum = 2020
  let complementNums: Record<number, number> = {}
  for (let i = 0; i < lines.length; i++) {
    const num1 = Number(lines[i])
    for (let j = i + 1; j < lines.length; j++) {
      const num2 = Number(lines[j])
      const sum = num1 + num2
      const diff = targetNum - sum
      if (!complementNums[diff]) {
        complementNums[num2] = 1
      } else {
        return diff * num1 * num2
      }
    }
  }
}

console.log(solve('input.txt'))
