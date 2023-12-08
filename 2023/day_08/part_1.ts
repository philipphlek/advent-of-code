// https://adventofcode.com/2023/day/8

import * as fs from 'fs'

const INSTRUCTION_INDEX_LOOKUP = {
  'L': 0,
  'R': 1
}

const setupTraversalLookup = (lines: string[]): Record<string, [string, string]> => {
  const traversalLookup: Record<string, [string, string]> = {}
  for (let i = 1; i < lines.length; i++) {
    const [val, nextVals] = lines[i].split(' = ')
    const [leftVal, rightVal] = nextVals.slice(1, nextVals.length - 1).split(', ')
    traversalLookup[val] = [leftVal, rightVal]
  }
  return traversalLookup
}

const getTotalStepsToZZZ = (startVal: string, traversalLookup: Record<string, [string, string]>, instructions: string[]): number => {
  const targetVal = 'ZZZ'
  let steps = 0
  let currVal = startVal
  let i = 0
  while (currVal !== targetVal) {
    if (i === instructions.length) {
      i = 0
    }
    const nextInstruction = INSTRUCTION_INDEX_LOOKUP[instructions[i++]]
    currVal = traversalLookup[currVal][nextInstruction]
    steps++
  }
  return steps  
}

const part1 = (file: string) => {
  const lines = fs.readFileSync(file, 'utf-8').split(/[\n\r]+/)

  const instructions: string[] = lines[0].split('')
  const traversalLookup = setupTraversalLookup(lines)
  const startVal = 'AAA'
  const totalSteps = getTotalStepsToZZZ(startVal, traversalLookup, instructions)
  return totalSteps
}

console.log(part1('input.txt'))
