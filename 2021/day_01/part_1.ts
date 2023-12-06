// https://adventofcode.com/2021/day/1

import * as fs from 'fs'

const part1 = (file: string) => {
  const lines = fs.readFileSync(file, 'utf-8').split('\n')

  let increaseCount = 0
  let prevNum: number | null = null
  for (let i = 0; i < lines.length; i++) {
    const currNum = Number(lines[i])
    if (prevNum === null) {
      prevNum = currNum
      continue
    }
    if (currNum > prevNum) {
      increaseCount++
    }
    prevNum = currNum
  }
  return increaseCount
}

console.log(part1('input.txt'))
