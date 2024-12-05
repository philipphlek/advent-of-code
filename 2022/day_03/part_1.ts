// https://adventofcode.com/2022/day/3

import * as fs from 'fs'

const ITEM_TYPE_PRIORITY =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

function getCommonType(
  compartment1: string,
  compartment2: string
): string | undefined {
  const typeCount: Record<string, number> = {}
  for (const type of compartment1) {
    typeCount[type] = (typeCount[type] || 0) + 1
  }
  for (const type of compartment2) {
    if (typeCount[type]) return type
  }
}

function solve(file: string) {
  const lines = fs.readFileSync(file, 'utf-8').split(/[\n\r]+/)

  let sum = 0
  for (const line of lines) {
    const compartment1 = line.substring(0, Math.floor(line.length / 2))
    const compartment2 = line.substring(Math.floor(line.length / 2))
    const commonType = getCommonType(compartment1, compartment2)
    commonType && (sum += ITEM_TYPE_PRIORITY.indexOf(commonType) + 1)
  }
  return sum
}

console.log(solve('input.txt'))
