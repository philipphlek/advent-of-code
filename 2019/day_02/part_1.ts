// https://adventofcode.com/2019/day/2

import * as fs from 'fs'

const part1 = (file: string) => {
  const nums = fs
    .readFileSync(file, 'utf-8')
    .split(',')
    .map((num) => Number(num))
  nums[1] = 12
  nums[2] = 2

  for (let i = 0; i < nums.length; i += 4) {
    const opcode = nums[i]
    const firstPos = nums[i + 1]
    const secondPos = nums[i + 2]
    const newPos = nums[i + 3]
    if (opcode === 1) {
      nums[newPos] = nums[firstPos] + nums[secondPos]
    } else if (opcode === 2) {
      nums[newPos] = nums[firstPos] * nums[secondPos]
    } else if (opcode === 99) {
      return nums[0]
    }
  }
}

console.log(part1('input.txt'))
