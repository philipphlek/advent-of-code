// https://adventofcode.com/2023/day/1

import * as fs from 'fs'
import * as readline from 'readline'

const file = readline.createInterface({
  input: fs.createReadStream('input.txt')
})

const getFirstDigit = (line: string): number | undefined => {
  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    const parsedNum = Number(char) // Post Discussion Note: could use regex /[\d]/ to match digit instead of casting and checking isNaN
    if (!isNaN(parsedNum)) {
      return parsedNum
    }
  }
}

const getSecondDigit = (line: string): number | undefined => {
  for (let i = line.length - 1; i >= 0; i--) {
    const char = line[i]
    const parsedNum = Number(char)
    if (!isNaN(parsedNum)) {
      return parsedNum
    }
  }
}

let result = 0

file.on('line', (line: string) => {
  const firstDigit = getFirstDigit(line)
  const secondDigit = getSecondDigit(line)
  result += Number(`${firstDigit}${secondDigit}`)
})

file.on('close', () => {
  console.log(result)
})
