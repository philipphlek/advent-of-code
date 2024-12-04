// https://adventofcode.com/2024/day/4

import * as fs from 'fs'

const TOP_LEFT_CHECKS = [-1, -1]
const TOP_RIGHT_CHECKS = [-1, 1]
const BOTTOM_RIGHT_CHECKS = [1, 1]
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

type IsXFoundParams = {
  midPointSet: Set<string>
  checks: number[]
  row: number
  col: number
}
function isXFound({midPointSet, checks, row, col}: IsXFoundParams): boolean {
  const midPoint = JSON.stringify([row + checks[0], col + checks[1]])
  if (midPointSet.has(midPoint)) {
    return true
  }
  midPointSet.add(midPoint)
  return false
}

function getWordCount(word: string, grid: string[][]): number {
  if (grid.length < word.length && grid[0].length < word.length) {
    return 0
  }

  const midPointSet: Set<string> = new Set()
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
        if (
          isXFound({
            midPointSet,
            checks: TOP_LEFT_CHECKS,
            row,
            col,
          })
        ) {
          count++
        }
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
        if (
          isXFound({
            midPointSet,
            checks: TOP_RIGHT_CHECKS,
            row,
            col,
          })
        ) {
          count++
        }
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
        if (
          isXFound({
            midPointSet,
            checks: BOTTOM_RIGHT_CHECKS,
            row,
            col,
          })
        ) {
          count++
        }
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
        if (
          isXFound({
            midPointSet,
            checks: BOTTOM_LEFT_CHECKS,
            row,
            col,
          })
        ) {
          count++
        }
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

  return getWordCount('MAS', grid)
}

console.log(solve('input.txt'))
