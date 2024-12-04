// https://adventofcode.com/2024/day/4

import * as fs from 'fs'

const LEFT_CHECKS = [0, -1]
const TOP_LEFT_CHECKS = [-1, -1]
const TOP_CHECKS = [-1, 0]
const TOP_RIGHT_CHECKS = [-1, 1]
const RIGHT_CHECKS = [0, 1]
const BOTTOM_RIGHT_CHECKS = [1, 1]
const BOTTOM_CHECKS = [1, 0]
const BOTTOM_LEFT_CHECKS = [1, -1]

type IsChecksValidParams = {
  checks: number[]
  grid: string[][]
  row: number
  col: number
  remainingLetters: string
}
function isChecksValid({
  checks,
  grid,
  row,
  col,
  remainingLetters,
}: IsChecksValidParams): boolean {
  for (let i = 0; i < remainingLetters.length; i++) {
    const [rowChange, colChange] = [(i + 1) * checks[0], (i + 1) * checks[1]]
    if (remainingLetters[i] !== grid[row + rowChange][col + colChange]) {
      return false
    }
  }
  return true
}

/*
  Post Discussion Note:
  - Could avoid all the if statements and just checking the bounds on the newRow and newCol in isChecksValid function but
    ends up checking down directions you know would never be valid
  - Could have isChecksValid return 0 or 1 so you can add it to count directly instead of more if statements
  - Could do recursion instead of iteratively
*/
function getWordCount(word: string, grid: string[][]): number {
  if (grid.length < word.length && grid[0].length < word.length) {
    return 0
  }

  const firstLetter = word[0]
  const remainingLetters = word.substring(1)
  let count = 0
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const char = grid[row][col]

      if (char !== firstLetter) {
        continue
      }

      if (
        col - (word.length - 1) >= 0 &&
        isChecksValid({
          checks: LEFT_CHECKS,
          grid,
          row,
          col,
          remainingLetters,
        })
      ) {
        count++
      }

      if (
        row - (word.length - 1) >= 0 &&
        col - (word.length - 1) >= 0 &&
        isChecksValid({
          checks: TOP_LEFT_CHECKS,
          grid,
          row,
          col,
          remainingLetters,
        })
      ) {
        count++
      }

      if (
        row - (word.length - 1) >= 0 &&
        isChecksValid({
          checks: TOP_CHECKS,
          grid,
          row,
          col,
          remainingLetters,
        })
      ) {
        count++
      }

      if (
        row - (word.length - 1) >= 0 &&
        col + (word.length - 1) < grid[row].length &&
        isChecksValid({
          checks: TOP_RIGHT_CHECKS,
          grid,
          row,
          col,
          remainingLetters,
        })
      ) {
        count++
      }

      if (
        col + (word.length - 1) < grid[row].length &&
        isChecksValid({
          checks: RIGHT_CHECKS,
          grid,
          row,
          col,
          remainingLetters,
        })
      ) {
        count++
      }

      if (
        row + (word.length - 1) < grid.length &&
        col + (word.length - 1) < grid[row].length &&
        isChecksValid({
          checks: BOTTOM_RIGHT_CHECKS,
          grid,
          row,
          col,
          remainingLetters,
        })
      ) {
        count++
      }

      if (
        row + (word.length - 1) < grid.length &&
        isChecksValid({
          checks: BOTTOM_CHECKS,
          grid,
          row,
          col,
          remainingLetters,
        })
      ) {
        count++
      }

      if (
        row + (word.length - 1) < grid.length &&
        col - (word.length - 1) >= 0 &&
        isChecksValid({
          checks: BOTTOM_LEFT_CHECKS,
          grid,
          row,
          col,
          remainingLetters,
        })
      ) {
        count++
      }
    }
  }

  return count
}

function solve(file: string) {
  const lines = fs.readFileSync(file, 'utf-8').split(/[\n\r]+/)

  const grid: string[][] = []
  for (let row = 0; row < lines.length; row++) {
    for (let col = 0; col < lines[row].length; col++) {
      if (!grid[row]) {
        grid[row] = []
      }
      grid[row][col] = lines[row][col]
    }
  }

  return getWordCount('XMAS', grid)
}

console.log(solve('input.txt'))
