// https://adventofcode.com/2024/day/2

import * as fs from 'fs'

function isLevelDiffValid(level1: number, level2: number): boolean {
  const diff = Math.abs(level1 - level2)
  return 1 <= diff && diff <= 3
}

function isReportSafe(report: number[], badLevelThreshold: number): boolean {
  let direction: number | undefined
  let prevLevel = report[0]
  for (let i = 1; i < report.length; i++) {
    const level = report[i]

    if (!direction && isLevelDiffValid(prevLevel, level)) {
      direction = prevLevel < level ? 1 : -1
    } else if (
      !isLevelDiffValid(prevLevel, level) ||
      (prevLevel < level && direction !== 1) ||
      (prevLevel > level && direction !== -1)
    ) {
      if (badLevelThreshold === 0) {
        return false
      }
      if (i === report.length - 1) {
        return true
      }

      const newReport1 = report.filter((_, index) => index != i)
      const newReport2 = report.filter((_, index) => index != i - 1)
      const newReport3 = report.filter((_, index) => index != i - 2)
      return (
        isReportSafe(newReport1, 0) ||
        isReportSafe(newReport2, 0) ||
        isReportSafe(newReport3, 0)
      )
    }

    prevLevel = level
  }
  return true
}

function solve(file: string) {
  const lines = fs.readFileSync(file, 'utf-8').split(/[\n\r]+/)

  const reports: number[][] = []
  for (let i = 0; i < lines.length; i++) {
    const report = lines[i].split(' ').map((level) => +level)
    reports.push(report)
  }

  return reports.reduce((acc, curr) => (isReportSafe(curr, 1) ? ++acc : acc), 0)
}

console.log(solve('input.txt'))