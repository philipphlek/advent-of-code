// https://adventofcode.com/2022/day/3

import * as fs from 'fs'

const ITEM_TYPE_PRIORITY =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

function getTypeCounts(
  rucksack: string,
  overallTypeCount: Record<string, number>
) {
  let typeCount: Record<string, number> = {}
  for (const type of rucksack) {
    if (!typeCount[type]) {
      typeCount[type] = 1
      overallTypeCount[type] = (overallTypeCount[type] || 0) + 1
    }
  }
}

function solve(file: string) {
  const lines = fs.readFileSync(file, 'utf-8').split(/[\n\r]+/)

  let sum = 0
  let overallTypeCount: Record<string, number> = {}
  let elfCount = 0
  for (const rucksack of lines) {
    getTypeCounts(rucksack, overallTypeCount)
    if (++elfCount === 3) {
      elfCount = 0
      const badgeType = Object.entries(overallTypeCount).find(
        ([, typeCount]) => typeCount === 3
      )
      badgeType && (sum += ITEM_TYPE_PRIORITY.indexOf(badgeType[0]) + 1)
      overallTypeCount = {}
    }
  }
  return sum
}

console.log(solve('input.txt'))
