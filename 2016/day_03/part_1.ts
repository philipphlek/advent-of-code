// https://adventofcode.com/2016/day/3

import * as fs from 'fs'

const solve = (file: string) => {
  const lines = fs.readFileSync(file, 'utf-8').split(/[\n\r]+/)

  let count = 0
  for (let i = 0; i < lines.length; i++) {
    const [, num1, num2, num3] = lines[i].split(/\s+/).map((num) => Number(num))
    if (num1 + num2 > num3 && num1 + num3 > num2 && num2 + num3 > num1) {
      count++
    }
  }
  return count
}

console.log(solve('input.txt'))
