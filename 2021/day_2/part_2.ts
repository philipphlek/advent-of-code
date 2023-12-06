import * as fs from 'fs'

enum Command {
  FORWARD = 'forward',
  DOWN = 'down',
  UP = 'up',
}

const updatePosition = (
  position: [horizontal: number, depth: number, aim: number], 
  command: Command, 
  numPositions: number
) => {
  switch (command) {
    case Command.FORWARD:
      position[0] += numPositions
      position[1] += (numPositions * position[2])
      break
    case Command.DOWN:
      position[2] += numPositions
      break
    case Command.UP:
      position[2] -= numPositions
      break
  }
}

const part2 = (file: string) => {
  const lines = fs.readFileSync(file, 'utf-8').split('\n')

  let position: [horizontal: number, depth: number, aim: number] = [0, 0, 0]
  for (let i = 0; i < lines.length; i++) {
    const [command, numPositions] = lines[i].split(' ')
    updatePosition(position, command as Command, Number(numPositions))
  }
  return position[0] * position[1]
}

console.log(part2('input.txt'))
