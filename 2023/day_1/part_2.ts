// https://adventofcode.com/2023/day/1

import * as fs from 'fs'
import * as readline from 'readline'

const file = readline.createInterface({
  input: fs.createReadStream('input.txt')
})

const NUMBER_MAP: Record<string, number> = {
  'one': 1,
  'two': 2,
  'three': 3,
  'four': 4,
  'five': 5,
  'six': 6,
  'seven': 7,
  'eight': 8,
  'nine': 9,
}

const getNumberLookup = (line: string, index: number): number | undefined => {
  for (const key in NUMBER_MAP) { // Post Disucssion Note: could check character and only compare against subset of the numbers instead of all
    if (line.startsWith(key, index)) {
      return NUMBER_MAP[key]
    }
  }
}

const getFirstDigit = (line: string): number | undefined => {
  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    const parsedNum = Number(char) // Post Discussion Note: could use regex /[\d]/ to match digit instead of casting and checking isNaN
    if (!isNaN(parsedNum)) {
      return parsedNum
    }

    const number = getNumberLookup(line, i)
    if (number)
      return number
  }
}

const getSecondDigit = (line: string): number | undefined => {
  for (let i = line.length - 1; i >= 0; i--) {
    const char = line[i]
    const parsedNum = Number(char)
    if (!isNaN(parsedNum)) {
      return parsedNum
    }

    const numberLookup = getNumberLookup(line, i)
    if (numberLookup)
      return numberLookup
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
