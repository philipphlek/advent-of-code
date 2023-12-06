// https://adventofcode.com/2022/day/1

import * as fs from 'fs'

const part1 = (file: string) => {
  const lines = fs.readFileSync(file, 'utf-8').split('\n')

  let maxElfCalories = 0
  let currElfCalories = 0
  for (let i = 0; i < lines.length; i++) {
    const calories = parseInt(lines[i])
    if (!isNaN(calories)) {
      currElfCalories += calories
    } else {
      maxElfCalories = Math.max(maxElfCalories, currElfCalories)
      currElfCalories = 0
    }
  }
  maxElfCalories = Math.max(maxElfCalories, currElfCalories)
  return maxElfCalories
}

console.log(part1('input.txt'))
