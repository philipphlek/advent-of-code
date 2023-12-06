import * as fs from 'fs'

const isGearCell = (cell: string) => cell === '*'

const findPotentialGearCoordinates = (
  grid: string[][],
  rowIndex: number, 
  colIndexBounds: [number, number],
): [number, number] | undefined => { // Post Discussion Note: if we didn't convert to grid and left it as line strings, we could slice the line and regex match on /\*/ to see if there's a match of '*'
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
    if (isGearCell(grid[row][colCheckIndexBounds[0]])) {
      return [row, colCheckIndexBounds[0]]
    }
  }
  
  // check top side
  for (let col = colCheckIndexBounds[0]; col < colCheckIndexBounds[1] + 1; col++) {
    if (isGearCell(grid[rowCheckIndexBounds[0]][col])) {
      return [rowCheckIndexBounds[0], col]
    }
  }

  // check right side
  for (let row = rowCheckIndexBounds[0]; row < rowCheckIndexBounds[1] + 1; row++) {
    if (isGearCell(grid[row][colCheckIndexBounds[1]])) {
      return [row, colCheckIndexBounds[1]]
    }
  }

  // check bottom side
  for (let col = colCheckIndexBounds[0]; col < colCheckIndexBounds[1] + 1; col++) {
    if (isGearCell(grid[rowCheckIndexBounds[1]][col])) {
      return [rowCheckIndexBounds[1], col]
    }
  }
}

const updatePotentailGearNumTracker = (potentialGearNumTracker: number[][][], potentialGearCoordinates: [number, number], testNumValue: number) => {
  if (potentialGearCoordinates !== undefined) {
    const [gearRowIndex, gearColIndex] = potentialGearCoordinates
    if (potentialGearNumTracker[gearRowIndex] === undefined) {
      potentialGearNumTracker[gearRowIndex] = []
    }
    if (potentialGearNumTracker[gearRowIndex][gearColIndex] === undefined) {
      potentialGearNumTracker[gearRowIndex][gearColIndex] = [testNumValue]
    } else {
      potentialGearNumTracker[gearRowIndex][gearColIndex].push(testNumValue)
    }
  }
}

const isEndOfTestNum = (grid: string[][], rowIndex: number, nextColIndex: number): boolean => {
  if (nextColIndex >= grid[rowIndex].length) {
    return true
  }
  const nextCell = grid[rowIndex][nextColIndex]
  return isNaN(Number(nextCell))
}

const part2 = (file: string) => {
  const lines = fs.readFileSync(file, 'utf-8').split('\n')

  const grid: string[][] = []
  for (let i = 0; i < lines.length; i++) {
    grid.push(lines[i].split(''))
  }

  /* 
    Post Discussion Note:
    Initial implmenetation was keep track of an array of coordinates and a separate array of numbers associated to that coordinate
    Ex.  
      coord = [
        [0, 1],
        [1, 3],
      ]
      nums = [
        [334],
        [12, 56]
      ]
    Array of coordinates was [number, number][] so to check for overlap, I would have to loop and check each individually
    I could've turned the coordinate into a string such as `${row}|${col}` and easily indexed that way vs needing to loop to compare the coordinates
    I didn't want to loop so I used a 3D array to have direct access to the array of nums by coordinate
  */
  // keep track of array of numbers that are adjacent to a gear at the coordinate of the gear
  let potentialGearNumTracker: number[][][] = []

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
        const potentialGearCoordinates = findPotentialGearCoordinates(grid, testNumRowIndex, testNumColIndexBounds)
        if (potentialGearCoordinates !== undefined) {
          updatePotentailGearNumTracker(potentialGearNumTracker, potentialGearCoordinates, testNumValue)
        }
        resetTestState()
        col++ // skip next cell since we know it's not numeric
      }
    }
  }
  const gearNumbers = potentialGearNumTracker
    .flat()
    .filter(tracker => tracker.length === 2)
    .map(nums => nums[0] * nums[1])
  return gearNumbers.reduce((acc, curr) => curr + acc, 0)
}

console.log(part2('input.txt'))
