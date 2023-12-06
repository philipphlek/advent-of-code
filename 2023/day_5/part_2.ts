// https://adventofcode.com/2023/day/5

import * as fs from 'fs'

/*
  Ex.
  seed-to-soil map:
  50 98 2
  52 50 48

  Index 0-based which determines which map you looking at since it's always the same # of maps and same order
  Mapping:
    Key: Source Range Start-Source Range End (check if values are in range)
    Value: Num used to convert the source to destination
  {
    '98-100': -48,
    '50-98: 2
  }
*/
const addSourceToDestinationMapping = (maps: Record<string, number>[], currMapIndex: number, line: string) => {
  const [destination, source, length] = line.split(' ')
  const key = `${Number(source)}-${Number(source) + Number(length) - 1}`
  const val = Number(destination) - Number(source)
  maps[currMapIndex][key] = val
}

const processMapperOnRange = (map: Record<string, number>, range: [number, number]) => {
  let updatedRanges: [number, number][] = [range]

  /*
    Ex.
      Initial Range {55, 67}

      Map 0
        98-99: -48
        50-97: 2

      {55, 67} is below 98-99 so we don't need to modify the ranges
      {55, 67} is within 50-97 so we don't need to modify the ranges
      {57, 69} is new range after applying the mapping

      Map 1
        15-51: -15
        52-53: -15
        0-14: 39
      
      {57, 69} is above 15-55, 52-53, 0-14 so we don't need to modify the ranges
      No applicable mapping

      Map 2
        53-60: -4
        11-52: -11
        0-6: 42
        7-10: 50

      {57, 69} intersects with 53-60 so it will create {57, 60}, {61, 69} as the new set of ranges (only 55-67 matters so we ignore {53, 57})
      {57, 60} -> {53, 56} after applying mapping
      {61, 69} has no applicable mapping
  */
  // break up range to match map keys
  for (const [key] of Object.entries(map)) {
    let newRanges: [number, number][] = []
    const [lowerBound, upperBound] = key.split('-')
    const lowerBoundNum = Number(lowerBound)
    const upperBoundNum = Number(upperBound)
    console.log('Mapper ', key)

    for (const range of updatedRanges) {
      console.log('Current Range: ', range)
      const [lowerRange, upperRange] = range
      if (
        lowerBoundNum <= lowerRange && upperRange <= upperBoundNum ||
        upperBoundNum < lowerRange ||
        upperRange < lowerBoundNum
      ) {
        newRanges.push(range)
      } else {
        if (lowerRange < lowerBoundNum) {
          newRanges.push([lowerRange, lowerBoundNum - 1])
          if (upperBoundNum < upperRange) {
            newRanges.push([lowerBoundNum, upperBoundNum])
            newRanges.push([upperBoundNum + 1, upperRange])
          } else {
            newRanges.push([lowerBoundNum, upperRange])
          }
        } else if (lowerBoundNum <= lowerRange) {
          if (upperBoundNum < upperRange) {
            newRanges.push([lowerRange, upperBoundNum])
            newRanges.push([upperBoundNum + 1, upperRange])
          }
        }
      }
    }
    console.log('New Ranges: ', newRanges)
    updatedRanges = Array.from(new Set(newRanges
      .map(range => JSON.stringify(range))))
      .map(range => JSON.parse(range))
  }

  console.log(updatedRanges)

  // Apply mapper to ranges
  for (let i = 0; i < updatedRanges.length; i++) {
    const [lowerRange, upperRange] = updatedRanges[i]
    for (const [key, val] of Object.entries(map)) {
      const [lowerBound, upperBound] = key.split('-')
      const lowerBoundNum = Number(lowerBound)
      const upperBoundNum = Number(upperBound)
      if (lowerBoundNum <= lowerRange && upperRange <= upperBoundNum) {
        updatedRanges[i] = [lowerRange + Number(val), upperRange + Number(val)]
      }
    }
  }
  
  console.log('New Updated Ranges: ', updatedRanges)

  return updatedRanges
}

/*
  Post Discussion Note:
  Initially implemented this problem similar to part 1 storing all seed numbers in a list and trying to update them but ran into memory issues.
  I then changed it to processing each seed num and kept track of the final min location. The execution time was probably going to take over an hour to run due to having to process billions of numbers.
  I then came up with this solution to avoid having to process each individual possible seed and only worried about the upper and lower bounds of each range.
  I tried explaining by thought process in the comment in processMapperOnRange().
  This took a lot of pen/paper work and manual mapping walk throughs to make sure I was handling all range manipulation properly. This took about a sec to run which was a huge time improvement.
*/
const part2 = (file: string) => {
  const lines = fs.readFileSync('input.txt', 'utf-8').split('\n')

  let maps: Record<string, number>[] = []
  let currMapIndex = -1
  for (let i = 2; i < lines.length; i++) {
    if (lines[i] === '') {
      continue
    }
  
    if (lines[i].includes('map')) {
      currMapIndex++
      maps[currMapIndex] = {}
    } else {
      addSourceToDestinationMapping(maps, currMapIndex, lines[i])
    }
  }

  let rangeListByMapper: [number, number][][] = [[]]
  let numList: number[] = lines[0].split(': ')[1].split(' ').map(num => Number(num))
  for (let i = 0; i < numList.length; i += 2) {
    const firstNum = Number(numList[i])
    const secondNum = Number(numList[i + 1])
    rangeListByMapper[0].push([firstNum, firstNum + secondNum - 1])
  }

  console.log('Maps: ', maps)

  for (let i = 0; i < maps.length; i++) {
    console.log('Map ', i)
    for (let j = 0; j < rangeListByMapper[i].length; j++) {
      const range = rangeListByMapper[i][j]
      let updatedRanges = processMapperOnRange(maps[i], range)
      if (!rangeListByMapper[i + 1]) {
        rangeListByMapper[i + 1] = []
      }
      rangeListByMapper[i + 1].push(...updatedRanges)
    }
    // remove dupe ranges
    rangeListByMapper[i + 1] = Array.from(new Set(rangeListByMapper[i + 1]
      .map(range => JSON.stringify(range))))
      .map(range => JSON.parse(range))
  }

  console.log('Range List By Mapper: ', rangeListByMapper)
  console.log(Math.min(...rangeListByMapper[rangeListByMapper.length - 1].map(range => range[0])))
}

part2('input.txt')
