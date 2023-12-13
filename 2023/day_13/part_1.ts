// https://adventofcode.com/2023/day/13

import * as fs from 'fs'

enum LineOfReflection {
  Vertical = 'V',
  Horizontal = 'H',
}
const getReflectionCount = (lines: string[], lof: LineOfReflection): number => {
  const rowCount = lines.length
  const colCount = lines[0].length
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
            ? lines[i][curr1] !== lines[i][curr2]
            : lines[curr1][i] !== lines[curr2][i]
        ) {
          isMatch = false
          break
        }
      }
      curr1--
      curr2++
    }
    if (isMatch) {
      const total = start1 + 1
      return lofVerticalCheck ? total : 100 * total
    }
    start1++
    start2++
  }
  return 0
}

const solve = (file: string) => {
  const patterns = fs.readFileSync(file, 'utf-8').split('\r\n\r\n')

  let totalSum = 0
  for (const pattern of patterns) {
    const lines = pattern.split(/[\n\r]+/)
    let count = getReflectionCount(lines, LineOfReflection.Vertical)
    if (count === 0) {
      count = getReflectionCount(lines, LineOfReflection.Horizontal)
    }
    totalSum += count
  }
  return totalSum
}

console.log(solve('input.txt'))
