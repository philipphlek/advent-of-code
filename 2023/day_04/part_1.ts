// https://adventofcode.com/2023/day/4

import * as fs from 'fs'

const part1 = (file: string) => {
  const lines = fs.readFileSync(file, 'utf-8').split('\n')

  let result = 0
  for (let i = 0; i < lines.length; i++) {
    const [winningNums, currNums] = lines[i].split(': ')[1].split(' | ')
    const winningNumList = winningNums.split(' ') // Post Discussion Note: you can pass in regex into split - .split(/s+/) so don't have to check for empty num captures (single digits have extra spaces)
    const currNumList = currNums.split(' ')
    const numMatchList = winningNumList.filter(num => currNumList.includes(num) && num !== '')
    if (numMatchList.length > 0) {
      result += Math.pow(2, numMatchList.length - 1)
    }
  }
  return result
}

console.log(part1('input.txt'))
