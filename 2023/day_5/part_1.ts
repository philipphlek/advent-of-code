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

const processMapperOnNum = (map: Record<string, number>, num: number) => {
  for (const [key, val] of Object.entries(map)) {
    const [lowerBound, upperBound] = key.split('-')
    if (Number(lowerBound) <= num && num <= Number(upperBound)) {
      return num + Number(val)
    }
  }
  return num
}

const part1 = (file: string) => {
  const lines = fs.readFileSync(file, 'utf-8').split('\n')

  let numList: number[] = lines[0].split(': ')[1].split(' ').map(num => Number(num))
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

  for (const map of maps) {
    numList = numList.map(num => processMapperOnNum(map, num))
  }
  return Math.min(...numList)
}

console.log(part1('input.txt'))
