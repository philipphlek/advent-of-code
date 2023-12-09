// https://adventofcode.com/2020/day/2

import * as fs from 'fs'

const solve = (file: string) => {
  const lines = fs.readFileSync(file, 'utf-8').split(/[\n\r]+/)

  let totalPws = 0
  for (let i = 0; i < lines.length; i++) {
    const [range, char, pw] = lines[i].split(' ')
    const [first, second] = range.split('-').map((num) => Number(num))
    const letter = char.substring(0, 1)
    const firstLetter = pw[first - 1]
    const secondLetter = pw[second - 1]
    if (
      (firstLetter === letter && secondLetter !== letter) ||
      (firstLetter !== letter && secondLetter === letter)
    ) {
      totalPws++
    }
  }
  return totalPws
}

console.log(solve('input.txt'))
