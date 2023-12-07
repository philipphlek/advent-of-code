// https://adventofcode.com/2017/day/2

import * as fs from 'fs'

const part1 = (file: string) => {
  const lines = fs.readFileSync(file, 'utf-8').split(/[\n\r]+/)

  let checkSums: number[] = []
  for (let i = 0; i < lines.length; i++) {
    const nums = lines[i].split(/\s+/)
    let largest = Number(nums[0])
    let smallest = Number(nums[0])
    for (let j = 1; j < nums.length; j++) {
      const currNum = Number(nums[j])
      if (currNum > largest) {
        largest = currNum
      } else if (currNum < smallest) {
        smallest = currNum
      }
    }
    checkSums.push(largest - smallest)
  }
  return checkSums.reduce((sum, curr) => sum + curr, 0)
}

console.log(part1('input.txt'))
