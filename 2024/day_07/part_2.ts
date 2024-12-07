// https://adventofcode.com/2024/day/7

import * as fs from 'fs'

function calculatePotentialVals(
  runningTotal: number,
  nums: number[],
  potentialVals: number[]
) {
  if (!nums.length) {
    potentialVals.push(runningTotal)
    return
  }

  calculatePotentialVals(runningTotal + nums[0], nums.slice(1), potentialVals) // add path
  calculatePotentialVals(runningTotal * nums[0], nums.slice(1), potentialVals) // mult path
  calculatePotentialVals(
    +`${runningTotal}${nums[0]}`,
    nums.slice(1),
    potentialVals
  ) // concate path
}

function isEquationValid(testVal: number, nums: number[]): boolean {
  const potentialVals: number[] = []
  calculatePotentialVals(nums[0], nums.slice(1), potentialVals)

  return potentialVals.includes(testVal)
}

function solve(file: string) {
  const lines = fs.readFileSync(file, 'utf-8').split(/[\n\r]+/)

  let totalCalibrationSum = 0

  for (const line of lines) {
    const equation = line.split(': ')
    const testVal = +equation[0]
    const nums = equation[1].split(' ').map((num) => +num)

    if (isEquationValid(testVal, nums)) {
      totalCalibrationSum += testVal
    }
  }

  return totalCalibrationSum
}

console.log(solve('input.txt'))
