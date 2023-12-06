// https://adventofcode.com/2023/day/2

import * as fs from 'fs'
import * as readline from 'readline'

const file = readline.createInterface({
  input: fs.createReadStream('input.txt')
})

enum CubeColor {
  BLUE = 'blue',
  GREEN = 'green',
  RED = 'red',
}

const MAX_CUBE_LOOKUP: Record<CubeColor, number> = {
  [CubeColor.BLUE]: 14,
  [CubeColor.GREEN]: 13,
  [CubeColor.RED]: 12,
}

const getMaxCubeCounts = (colorGroups: string[]): Record<CubeColor, number> => {
  const cubeCountTracker: Record<CubeColor, number> = {
    [CubeColor.BLUE]: 0,
    [CubeColor.GREEN]: 0,
    [CubeColor.RED]: 0,
  }

  colorGroups.forEach(group => {
    const groupInfo = group.split(' ')
    const cubeCount: number = Number(groupInfo[0])
    const cubeColor: CubeColor = groupInfo[1] as CubeColor
    
    if (cubeCount > cubeCountTracker[cubeColor]) {
      cubeCountTracker[cubeColor] = cubeCount
    }
  })

  return cubeCountTracker
}

let result = 0

file.on('line', (line: string) => {
  const [gameInfo, gameResult] = line.split(': ')
  const [, gameId] = gameInfo.split(' ')
  const gameSets = gameResult.split('; ')
  const colorGroups = gameSets.flatMap(set => set.split(', '))

  const cubeCountTracker: Record<CubeColor, number> = getMaxCubeCounts(colorGroups)

  for (const [cubeColor, cubeCount] of Object.entries(cubeCountTracker)) {
    if (cubeCount > MAX_CUBE_LOOKUP[cubeColor]) {
      return
    }
  }

  result += Number(gameId)
})

file.on('close', () => {
  console.log(result)
})
