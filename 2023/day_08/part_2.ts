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

const getStepsToZPerVal = (startVals: string[], traversalLookup: Record<string, [string, string]>, instructions: string[]): number[] => {
  const targetComparator = (val: string) => val.endsWith('Z')
  let stepTracker = Array(startVals.length).fill(0)
  let steps = 0
  let currVals = [...startVals]
  let i = 0
  /*
    Post Discussion Note:
    Could've done it brute force similar to part 1 and looped until all values ended with Z but takes too long
  */
  while (!stepTracker.every(num => num !== 0)) {
    if (i === instructions.length) {
      i = 0
    }
    const nextInstruction = INSTRUCTION_INDEX_LOOKUP[instructions[i++]]
    for (let j = 0; j < currVals.length; j++) {
      const val = currVals[j]
      if (stepTracker[j] === 0) {
        if (targetComparator(val)) {
          stepTracker[j] = steps
        } else {
          currVals[j] = traversalLookup[currVals[j]][nextInstruction]
        }
      }
      }
    steps++
  }
  return stepTracker  
}

/* 
  Post Discussion Note:
  - LCM problem
  - Find the # of steps needed per combination then finding the least common multiple which is the
  lowest possible number that can be divisible by both numbers
*/
const lcm = (nums: number[]) => {
  const greatestCommonDivisor = (x: number, y: number): number => (!y ? x : greatestCommonDivisor(y, x % y))
  const leastCommonMultiplier = (x: number, y: number): number => (x * y) / greatestCommonDivisor(x, y)
  return nums.reduce((a, b) => leastCommonMultiplier(a, b))
}

const part2 = (file: string) => {
  const lines = fs.readFileSync(file, 'utf-8').split(/[\n\r]+/)

  const instructions: string[] = lines[0].split('')
  const traversalLookup = setupTraversalLookup(lines)
  const startValues = Object.keys(traversalLookup).filter(val => val.endsWith('A'))
  const stepTracker = getStepsToZPerVal(startValues, traversalLookup, instructions)
  return lcm(stepTracker)
}

console.log(part2('input.txt'))
