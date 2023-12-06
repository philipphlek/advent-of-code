import * as fs from 'fs'

const isSymbolCell = (cell: string) => isNaN(Number(cell)) && cell !== '.'

const isPartNumber = (
  grid: string[][],
  rowIndex: number, 
  colIndexBounds: [number, number],
): boolean => { // Post Discussion Note: if we didn't convert to grid and left it as line strings, we could slice the line and regex match on /[^\d\.]/ to see if there's a match of not a digit and not a '.'
  const rowCheckIndexBounds: [number, number] = [
    rowIndex - 1 < 0 ? 0 : rowIndex - 1, 
    rowIndex + 1  > grid.length - 1 ? grid.length - 1 : rowIndex + 1
  ]
  const colCheckIndexBounds: [number, number] = [
    colIndexBounds[0] - 1 < 0 ? 0 : colIndexBounds[0] - 1, 
    colIndexBounds[1] + 1 > grid[0].length - 1  ? grid[0].length - 1 : colIndexBounds[1] + 1
  ]
  
  // check left side
  for (let row = rowCheckIndexBounds[0]; row < rowCheckIndexBounds[1] + 1; row++) { // Post Discussion Note: currently checking all diagonal cells twice because of index overlap
    if (isSymbolCell(grid[row][colCheckIndexBounds[0]])) {
      return true
    }
  }
  
  // check top side
  for (let col = colCheckIndexBounds[0]; col < colCheckIndexBounds[1] + 1; col++) {
    if (isSymbolCell(grid[rowCheckIndexBounds[0]][col])) {
      return true
    }
  }

  // check right side
  for (let row = rowCheckIndexBounds[0]; row < rowCheckIndexBounds[1] + 1; row++) {
    if (isSymbolCell(grid[row][colCheckIndexBounds[1]])) {
      return true
    }
  }

  // check bottom side
  for (let col = colCheckIndexBounds[0]; col < colCheckIndexBounds[1] + 1; col++) {
    if (isSymbolCell(grid[rowCheckIndexBounds[1]][col])) {
      return true
    }
  }

  return false
}

const isEndOfTestNum = (grid: string[][], rowIndex: number, nextColIndex: number): boolean => {
  if (nextColIndex >= grid[rowIndex].length) {
    return true
  }
  const nextCell = grid[rowIndex][nextColIndex]
  return isNaN(Number(nextCell))
}

const part1 = (file: string) => {
  const lines = fs.readFileSync(file, 'utf-8').split('\n')

  const grid: string[][] = []
  for (let i = 0; i < lines.length; i++) {
    grid.push(lines[i].split(''))
  }
  
  const partNumbers: number[] = []
  for (let row = 0; row < grid.length; row++) {
    let testNumValue = -1
    const testNumRowIndex = row
    let testNumColIndexBounds: [number, number] = [-1, -1]

    const resetTestState = () => {
      testNumColIndexBounds = [-1, -1]
      testNumValue = -1
    }

    for (let col = 0; col < grid[row].length; col++) {
      const parsedNum = Number(grid[row][col])
      if (isNaN(parsedNum)) {
        resetTestState()
        continue
      } else {
        testNumColIndexBounds = [testNumColIndexBounds[0] === -1 ? col : testNumColIndexBounds[0], col]
        testNumValue = testNumValue === -1 ? parsedNum : Number(`${testNumValue}${parsedNum}`)
      }
      const nextColIndex = col + 1
      if (isEndOfTestNum(grid, row, nextColIndex)) {
        if (isPartNumber(grid, testNumRowIndex, testNumColIndexBounds)) {
          partNumbers.push(testNumValue)
        }
        resetTestState()
        col++ // skip next cell since we know it's not numeric
      }
    }
  }
  return partNumbers.reduce((acc, curr) => acc + curr, 0)
}

console.log(part1('input.txt'))
