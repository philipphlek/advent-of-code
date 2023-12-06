// https://adventofcode.com/2022/day/2

import * as fs from 'fs'

enum Shape {
  Rock = 'Rock',
  Paper = 'Paper',
  Scissors = 'Scissors',
}

const WINNING_COMBINATIONS: Record<Shape, Shape> = {
  [Shape.Rock]: Shape.Paper,
  [Shape.Paper]: Shape.Scissors,
  [Shape.Scissors]: Shape.Rock,
}

const SHAPE_POINTS: Record<Shape, number> = {
  [Shape.Rock]: 1,
  [Shape.Paper]: 2,
  [Shape.Scissors]: 3,
}

const OPP_SHAPE_LOOKUP: Record<string, Shape> = {
  'A': Shape.Rock,
  'B': Shape.Paper,
  'C': Shape.Scissors
}

const MY_SHAPE_LOOKUP: Record<string, Shape> = {
  'X': Shape.Rock,
  'Y': Shape.Paper,
  'Z': Shape.Scissors
}

const part1 = (file: string) => {
  const lines = fs.readFileSync(file, 'utf-8').split(/[\n\r]+/)
  
  let score = 0
  for (let i = 0; i < lines.length; i++) {
    const [opp, my] = lines[i].split(' ')
    const oppShape: Shape = OPP_SHAPE_LOOKUP[opp]
    const myShape: Shape = MY_SHAPE_LOOKUP[my]

    const isWin = WINNING_COMBINATIONS[oppShape] === myShape
    const isLose = WINNING_COMBINATIONS[myShape] === oppShape
    if (isWin) {
      score += SHAPE_POINTS[myShape] + 6
    } else if (isLose) {
      score += SHAPE_POINTS[myShape]
    } else {
      score += SHAPE_POINTS[myShape] + 3
    }
  }
  return score
}

console.log(part1('input.txt'))
