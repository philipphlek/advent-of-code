// https://adventofcode.com/2024/day/3

import * as fs from 'fs'

const ENABLE_INSTRUCTION_LENGTH = 4 // ex. do()
const DISABLE_INSTRUCTION_LENGTH = 7 // ex. don't()
const SHORTEST_INSTRUCTION_CHAR_LENGTH = 8 // ex. mul(2,4)

type ProcessStat = {
  isCurrDisabled: boolean
  sum: number
}

function getMultiplicationSum(line: string, isDisabled: boolean): ProcessStat {
  let sum = 0
  let isCurrDisabled = isDisabled
  for (let i = 0; i < line.length; i++) {
    if (isCurrDisabled) {
      // fast forward until you find 'd'
      while (i < line.length && line[i] !== 'd') i++
    }

    if (line[i] === 'd') {
      // enable if sequential chars are correct for do()
      if (
        (i <= line.length - (ENABLE_INSTRUCTION_LENGTH + SHORTEST_INSTRUCTION_CHAR_LENGTH)) &&
        (line[i + 1] === 'o') &&
        (line[i + 2] === '(') &&
        (line[i + 3] === ')')
      ) {
        isCurrDisabled = false
        i += ENABLE_INSTRUCTION_LENGTH - 1
      } 
      // enable if sequential chars are correct for don't()
      else if (
        (i <= line.length - (DISABLE_INSTRUCTION_LENGTH + SHORTEST_INSTRUCTION_CHAR_LENGTH)) &&
        (line[i + 1] === 'o') &&
        (line[i + 2] === 'n') &&
        (line[i + 3] === "'") &&
        (line[i + 4] === 't') &&
        (line[i + 5] === '(') &&
        (line[i + 6] === ')')
      ) {
        isCurrDisabled = true
        i += DISABLE_INSTRUCTION_LENGTH - 1
      }
      continue
    }

    // fast forward until you find 'm' or 'd'
    while (i < line.length && !['m', 'd'].includes(line[i])) {
      i++
    }

    if (line[i] === 'd') {
      i--
      continue
    }

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
  return { isCurrDisabled, sum }
}

function solve(file: string) {
  const lines = fs.readFileSync(file, 'utf-8').split(/[\n\r]+/)

  let result = 0
  let isDisabled = false
  for (const line of lines) {
    const { sum, isCurrDisabled } = getMultiplicationSum(line, isDisabled)
    isDisabled = isCurrDisabled
    result += sum
  }
  return result
}

console.log(solve('input.txt'))
