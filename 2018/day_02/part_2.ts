// https://adventofcode.com/2018/day/2

import * as fs from 'fs'

const part2 = (file: string) => {
  const lines = fs.readFileSync(file, 'utf-8').split(/[\n\r]+/)

  for (let i = 0; i < lines[0].length; i++) {
    let idTracker: Record<string, number> = {}
    for (let j = 0; j < lines.length; j++) {
      const firstPart = lines[j].slice(0, i)
      const secondPart = lines[j].slice(i + 1, lines[j].length)
      const newId = firstPart + secondPart
      if (!idTracker[newId]) {
        idTracker[newId] = 1
      } else {
        return newId
      }
    }
  }
}

console.log(part2('input.txt'))
