// https://adventofcode.com/2020/day/2

import * as fs from 'fs'

const solve = (file: string) => {
  const lines = fs.readFileSync(file, 'utf-8').split(/[\n\r]+/)

  let totalPws = 0
  for (let i = 0; i < lines.length; i++) {
    const [range, char, pw] = lines[i].split(' ')
    const [low, high] = range.split('-').map((num) => Number(num))
    const letter = char.substring(0, 1)
    let count = 0
    for (let j = 0; j < pw.length; j++) {
      if (pw[j] === letter) {
        count++
      }
    }
    if (low <= count && count <= high) {
      totalPws++
    }
  }
  return totalPws
}

console.log(solve('input.txt'))
