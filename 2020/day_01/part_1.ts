// https://adventofcode.com/2020/day/1

import * as fs from 'fs'

const solve = (file: string) => {
  const lines = fs.readFileSync(file, 'utf-8').split(/[\n\r]+/)

  const targetNum = 2020
  let complementNums: Record<number, number> = {}
  for (let i = 0; i < lines.length; i++) {
    const num = Number(lines[i])
    const diff = targetNum - num
    if (!complementNums[diff]) {
      complementNums[num] = 1
    } else {
      return num * diff
    }
  }
}

console.log(solve('input.txt'))
