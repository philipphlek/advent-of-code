// https://adventofcode.com/2016/day/3

import * as fs from 'fs'

const solve = (file: string) => {
  const lines = fs.readFileSync(file, 'utf-8').split(/[\n\r]+/)

  let count = 0
  for (let i = 0; i < lines.length; i += 3) {
    const line1 = lines[i].split(/\s+/).map((num) => Number(num))
    const line2 = lines[i + 1].split(/\s+/).map((num) => Number(num))
    const line3 = lines[i + 2].split(/\s+/).map((num) => Number(num))
    for (let j = 1; j < 4; j++) {
      const num1 = line1[j]
      const num2 = line2[j]
      const num3 = line3[j]
      if (num1 + num2 > num3 && num1 + num3 > num2 && num2 + num3 > num1) {
        count++
      }
    }
  }
  return count
}

console.log(solve('input.txt'))
