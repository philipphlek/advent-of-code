// https://adventofcode.com/2024/day/5

import * as fs from 'fs'

function storePageOrderingRules(
  pageOrderingRule: number[],
  pageOrderingRules: Record<number, Set<number>>
) {
  const [firstPage, nextPage] = pageOrderingRule
  if (!(firstPage in pageOrderingRules)) {
    pageOrderingRules[firstPage] = new Set()
  }
  pageOrderingRules[firstPage].add(nextPage)
}

function isPageUpdatesValid(
  pageUpdates: number[],
  pageOrderingRules: Record<number, Set<number>>
): boolean {
  for (let i = 0; i < pageUpdates.length - 1; i++) {
    const page = pageUpdates[i]
    const pageOrderingRule = pageOrderingRules[page]
    const nextPage = pageUpdates[i + 1]
    if (!pageOrderingRule || !pageOrderingRule.has(nextPage)) {
      return false
    }
  }
  return true
}

function getMiddlePageNumbers(pageUpdates: number[]): number {
  return pageUpdates[Math.floor(pageUpdates.length / 2)]
}

function solve(file: string) {
  const lines = fs
    .readFileSync(file, 'utf-8')
    .split(/[\r]+/)
    .map((line) => line.replace(/[\n]+/, ''))

  let isPageOrderingRules = true
  let middlePageNumbersTotal = 0
  const pageOrderingRules: Record<number, Set<number>> = {}

  for (const line of lines) {
    if (line === '') {
      isPageOrderingRules = false
      continue
    }

    if (isPageOrderingRules) {
      const pageOrderingRule = line.split('|').map((page) => +page)
      storePageOrderingRules(pageOrderingRule, pageOrderingRules)
    } else {
      const pageUpdates = line.split(',').map((page) => +page)
      if (isPageUpdatesValid(pageUpdates, pageOrderingRules)) {
        middlePageNumbersTotal += getMiddlePageNumbers(pageUpdates)
      }
    }
  }
  return middlePageNumbersTotal
}

console.log(solve('input.txt'))
