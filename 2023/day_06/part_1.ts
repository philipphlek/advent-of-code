// https://adventofcode.com/2023/day/6

import * as fs from 'fs'

const part1 = (file: string) => {
  const lines = fs.readFileSync(file, 'utf-8').split(/[\n\r]+/)
  
  const times = lines[0].split(/:\s+/)[1].split(/\s+/)
  const distances = lines[1].split(/:\s+/)[1].split(/\s+/)

  let result = 1
  for (let i = 0; i < times.length; i++) {
    const maxTime = Number(times[i])
    const recordDistance = Number(distances[i])

    const middleNum = maxTime / 2
    const isMiddleNumInt = Number.isInteger(middleNum)
    let leftNum = isMiddleNumInt ? middleNum : Math.floor(middleNum)
    let rightNum =  isMiddleNumInt ? middleNum : Math.floor(middleNum) + 1
    let product = isMiddleNumInt ? Math.pow(middleNum, 2) : leftNum * rightNum
    let potentialWins = product > recordDistance ? isMiddleNumInt ? 1 : 2 : 0 // can't reuse match when leftNum and rightNum is same so you only get 1 win 
    
    while (product > recordDistance) { // highest product is towards middle so you can work
      product = --leftNum * ++rightNum
      if (product > recordDistance) {
        potentialWins += 2 // 2 wins per match because of complement numbers
      }
    }
    result *= potentialWins
  }
  return result
}

console.log(part1('input.txt'))
