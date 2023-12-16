// https://adventofcode.com/2023/day/15

import * as fs from 'fs'

const solve = (file: string) => {
  const steps = fs.readFileSync(file, 'utf-8').split(',')

  let sum = 0
  for (let i = 0; i < steps.length; i++) {
    let currVal = 0
    const str = steps[i]
    for (let j = 0; j < steps[i].length; j++) {
      currVal = ((currVal + str.charCodeAt(j)) * 17) % 256
    }
    sum += currVal
  }
  return sum
}

console.log(solve('input.txt'))
