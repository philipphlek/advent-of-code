// https://adventofcode.com/2019/day/1

import * as fs from 'fs'

const calculateFuel = (fuel: number): number => Math.floor(fuel / 3) - 2

const part2 = (file: string) => {
  const lines = fs.readFileSync(file, 'utf-8').split(/[\n\r]+/)

  let sum = 0
  for (let i = 0; i < lines.length; i++) {
    const mass = Number(lines[i])
    let currFuel = calculateFuel(mass)
    while (currFuel > 0) {
      sum += currFuel
      currFuel = calculateFuel(currFuel)
    }
  }
  return sum
}

console.log(part2('input.txt'))
