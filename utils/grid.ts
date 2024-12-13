export type Coord = [x: number, y: number]

export function createGrid(lines: string[]): string[][] {
  const grid: string[][] = []

  for (let x = 0; x < lines.length; x++) {
    grid[x] = []
    for (let y = 0; y < lines[0].length; y++) {
      grid[x][y] = lines[x][y]
    }
  }

  return grid
}

export function printGrid(grid: string[][]) {
  let result = ''
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      result += grid[i][j]
    }
    result += '\n'
  }

  console.log(result)
}
