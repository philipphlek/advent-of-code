// https://adventofcode.com/2021/day/2

import * as fs from 'fs'

enum Command {
  FORWARD = 'forward',
  DOWN = 'down',
  UP = 'up',
}

const updatePosition = (
  position: [horizontal: number, depth: number], 
  command: Command, 
  numPositions: number
) => {
  switch (command) {
    case Command.FORWARD:
      position[0] += numPositions
      break
    case Command.DOWN:
      position[1] += numPositions
      break
    case Command.UP:
      position[1] -= numPositions
      break
  }
}

const part1 = (file: string) => {
  const lines = fs.readFileSync(file, 'utf-8').split('\n')

  let position: [horizontal: number, depth: number] = [0, 0]
  for (let i = 0; i < lines.length; i++) {
    const [command, numPositions] = lines[i].split(' ')
    updatePosition(position, command as Command, Number(numPositions))
  }
  return position[0] * position[1]
}

console.log(part1('input.txt'))
