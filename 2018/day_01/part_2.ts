// https://adventofcode.com/2018/day/1

import * as fs from 'fs'

const part2 = (file: string) => {
  const lines = fs.readFileSync(file, 'utf-8').split(/[\n\r]+/)

  let frequencyTracker: Record<number, number> = {
    0: 1,
  }
  let frequency = 0
  let i = 0
  while (frequencyTracker[frequency] < 2) {
    if (i === lines.length) {
      i = 0
    }
    frequency += parseInt(lines[i++])
    if (!frequencyTracker[frequency]) {
      frequencyTracker[frequency] = 1
    } else {
      frequencyTracker[frequency]++
    }
  }
  return frequency
}

console.log(part2('input.txt'))
