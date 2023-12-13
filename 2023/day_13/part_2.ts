// https://adventofcode.com/2023/day/13

import * as fs from 'fs'

enum LineOfReflection {
  Vertical = 'V',
  Horizontal = 'H',
  Unknown = '?',
}
type LoFInfo = {
  count: number
  lof: LineOfReflection
}

const getReflectionCount = (
  grid: string[][],
  lof: LineOfReflection,
  initialLofInfo: LoFInfo | undefined = undefined
): number => {
  const rowCount = grid.length
  const colCount = grid[0].length
  const lofVerticalCheck = lof === LineOfReflection.Vertical

  let start1 = 0
  let start2 = 1
  while (start2 < (lofVerticalCheck ? colCount : rowCount)) {
    let curr1 = start1
    let curr2 = start2
    let isMatch = true
    while (
      isMatch &&
      0 <= curr1 &&
      curr2 < (lofVerticalCheck ? colCount : rowCount)
    ) {
      for (let i = 0; i < (lofVerticalCheck ? rowCount : colCount); i++) {
        lofVerticalCheck ? rowCount : colCount
        if (
          lofVerticalCheck
            ? grid[i][curr1] !== grid[i][curr2]
            : grid[curr1][i] !== grid[curr2][i]
        ) {
          isMatch = false
          break
        }
      }
      curr1--
      curr2++
    }
    const total = start1 + 1
    if (
      (initialLofInfo?.lof !== lof ||
        initialLofInfo?.count !== (lofVerticalCheck ? total : 100 * total)) &&
      isMatch
    ) {
      const total = start1 + 1
      return lofVerticalCheck ? total : 100 * total
    }
    start1++
    start2++
  }
  return 0
}

const getDifferentReflectionCount = (
  initialLofInfo: LoFInfo,
  grid: string[][]
): number => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j] = grid[i][j] === '#' ? '.' : '#'
      let count = getReflectionCount(
        grid,
        LineOfReflection.Vertical,
        initialLofInfo
      )
      if (count === 0) {
        count = getReflectionCount(
          grid,
          LineOfReflection.Horizontal,
          initialLofInfo
        )
      }
      grid[i][j] = grid[i][j] === '#' ? '.' : '#'
      if (count !== 0) {
        return count
      }
    }
  }
  return 0
}

const solve = (file: string) => {
  const patterns = fs.readFileSync(file, 'utf-8').split('\r\n\r\n')

  let totalSum = 0
  for (const pattern of patterns) {
    let initialLofInfo: LoFInfo = {
      count: 0,
      lof: LineOfReflection.Unknown,
    }
    const grid = pattern.split(/[\n\r]+/).map((line) => line.split(''))
    let count = getReflectionCount(grid, LineOfReflection.Vertical)
    if (count === 0) {
      count = getReflectionCount(grid, LineOfReflection.Horizontal)
      initialLofInfo.count = count
      initialLofInfo.lof = LineOfReflection.Horizontal
    } else {
      initialLofInfo.count = count
      initialLofInfo.lof = LineOfReflection.Vertical
    }
    totalSum += getDifferentReflectionCount(initialLofInfo, grid)
  }
  return totalSum
}

console.log(solve('input.txt'))
