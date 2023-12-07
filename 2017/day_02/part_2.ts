// https://adventofcode.com/2017/day/2

import * as fs from 'fs'

const part2 = (file: string) => {
  const lines = fs.readFileSync(file, 'utf-8').split(/[\n\r]+/)

  let checkSums: number[] = []
  for (let i = 0; i < lines.length; i++) {
    const nums = lines[i].split(/\s+/)
    for (let j = 0; j < nums.length; j++) {
      if (checkSums[i]) {
        break
      }
      const num1 = Number(nums[j])
      for (let k = 0; k < nums.length; k++) {
        const num2 = Number(nums[k])
        if (j === k) {
          continue
        } else if (num1 % num2 === 0) {
          checkSums.push(num1 / num2)
          break
        } else if (num2 % num1 === 0) {
          checkSums.push(num2 / num1)
          break
        }
      }
    }
  }
  return checkSums.reduce((sum, curr) => sum + curr, 0)
}

console.log(part2('input.txt'))
