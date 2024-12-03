// https://adventofcode.com/2024/day/3

import * as fs from 'fs'

const SHORTEST_INSTRUCTION_CHAR_LENGTH = 8 // ex. mul(2,4)

function getMultiplicationSum(line: string): number {
  let sum = 0
  for (let i = 0; i < line.length; i++) {
    // fast forward until you find 'm'
    while (i < line.length && line[i] !== 'm') i++

    /* 
      if not enough characters left in line for potential shortest instruction
      if next sequential chars aren't correct
    */
    if (
      (i > line.length - SHORTEST_INSTRUCTION_CHAR_LENGTH) ||
      (line[i + 1] !== 'u') ||
      (line[i + 2] !== 'l') ||
      (line[i + 3] !== '(')
    ) {
      continue
    } else {
      // fast forward to digits
      i += 4
    }
    
    // find potential digits to first number
    const firstDigits: string[] = []
    while (i < line.length && !isNaN(+line[i])) {
      firstDigits.push(line[i])
      i++
    }

    // if next non number char isn't ','
    if (line[i] !== ',') {
      continue
    } else {
      i++
    }

    // find potential digits to second number
    const secondDigits: string[] = []
    while (i < line.length && !isNaN(+line[i])) {
      secondDigits.push(line[i])
      i++
    }

    // if next non number char isn't ','
    if (line[i] !== ')') {
      continue
    }

    // full instruction completed, so process multiplication
    const num1 = +firstDigits.join('')
    const num2 = +secondDigits.join('')
    sum += (num1 * num2)
  }
  return sum
}

function solve(file: string) {
  const lines = fs.readFileSync(file, 'utf-8').split(/[\n\r]+/)

  let result = 0
  for (const line of lines) {
    result += getMultiplicationSum(line)
  }
  return result
}

console.log(solve('input.txt'))
