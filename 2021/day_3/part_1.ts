// https://adventofcode.com/2021/day/3

import * as fs from 'fs'

const incrementBitNumCount = (bitNumCountTracker: [number, number][], index: number, bitNum: number) => {
  if (!bitNumCountTracker[index]) {
    bitNumCountTracker[index] = [0, 0]
  }
  bitNumCountTracker[index][bitNum]++
}

const getDecimalRates = (bitNumCountTracker: [number, number][]): [number, number] => {
  let gammaRateBinary: number[] = []
  let epsilonRateBinary: number[] = []
  for (let i = 0; i < bitNumCountTracker.length; i++) {
    const [zeroCount, oneCount] = bitNumCountTracker[i]
    gammaRateBinary.push(zeroCount > oneCount ? 0 : 1)
    epsilonRateBinary.push(zeroCount > oneCount ? 1 : 0)
  }
  return [parseInt(gammaRateBinary.join(''), 2), parseInt(epsilonRateBinary.join(''), 2)]
}

const part1 = (file: string) => {
  const lines = fs.readFileSync(file, 'utf-8').split(/[\n\r]+/)
  
  let bitNumCountTracker: [number, number][] = []
  for (let i = 0; i < lines.length; i++) {
    const bitNums = lines[i].split('')
    for (let j = 0; j < bitNums.length; j++) {
      const bitNum = Number(bitNums[j])
      incrementBitNumCount(bitNumCountTracker, j, bitNum)
    }
  }

  const [gammaDecimalRate, epsilonDecimalRate] = getDecimalRates(bitNumCountTracker)
  return gammaDecimalRate * epsilonDecimalRate
}

console.log(part1('input.txt'))
