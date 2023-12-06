// https://adventofcode.com/2023/day/6

import * as fs from 'fs'

const part1 = (file: string) => {
  const lines = fs.readFileSync(file, 'utf-8').split(/[\n\r]+/)
  
  const time = lines[0].split(/:\s+/)[1].split(/\s+/).join('')
  const distance = lines[1].split(/:\s+/)[1].split(/\s+/).join('')

  const maxTime = Number(time)
  const recordDistance = Number(distance)

  const middleNum = maxTime / 2
  const isMiddleNumInt = Number.isInteger(middleNum)
  let leftNum = isMiddleNumInt ? middleNum : Math.floor(middleNum)
  let rightNum =  isMiddleNumInt ? middleNum : Math.floor(middleNum) + 1
  let product = leftNum * rightNum
  let potentialWins = product > recordDistance ? isMiddleNumInt ? 1 : 2 : 0 // can't reuse match when leftNum and rightNum is same so you only get 1 win 

  while (product > recordDistance) { // highest product is towards middle so you can work
    product = --leftNum * ++rightNum
    if (product > recordDistance) {
      potentialWins += 2 // 2 wins per match because of complement numbers
    }
  }
  return potentialWins
}

console.log(part1('input.txt'))
