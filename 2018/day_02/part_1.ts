// https://adventofcode.com/2018/day/2

import * as fs from 'fs'

const part1 = (file: string) => {
  const lines = fs.readFileSync(file, 'utf-8').split(/[\n\r]+/)

  let numTracker: Record<number, number> = {
    2: 0,
    3: 0,
  }
  for (let i = 0; i < lines.length; i++) {
    let letterTracker: Record<string, number> = {}
    const letters = lines[i].split('')
    for (let j = 0; j < letters.length; j++) {
      const letter = letters[j]
      if (!letterTracker[letter]) {
        letterTracker[letter] = 1
      } else {
        letterTracker[letter]++
      }
    }

    const counts = Object.values(letterTracker)
    if (counts.includes(2)) {
      numTracker[2]++
    }
    if (counts.includes(3)) {
      numTracker[3]++
    }
  }
  return Object.values(numTracker).reduce((product, curr) => product * curr, 1)
}

console.log(part1('input.txt'))
