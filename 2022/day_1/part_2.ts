import * as fs from 'fs'

const updateTopThreeElfCalories = (currElfCalories: number, topThreeElfCalories: [number, number, number]) => {
  if (currElfCalories > topThreeElfCalories[0]) {
    const caloriesTemp1 = topThreeElfCalories[0]
    const caloriesTemp2 = topThreeElfCalories[1]
    topThreeElfCalories[0] = currElfCalories
    topThreeElfCalories[1] = caloriesTemp1
    topThreeElfCalories[2] = caloriesTemp2
  } else if (currElfCalories > topThreeElfCalories[1]) {
    const caloriesTemp1 = topThreeElfCalories[1]
    topThreeElfCalories[1] = currElfCalories
    topThreeElfCalories[2] = caloriesTemp1
  } else if (currElfCalories > topThreeElfCalories[2]) {
    topThreeElfCalories[2] = currElfCalories
  }
}

const part1 = (file: string) => {
  const lines = fs.readFileSync(file, 'utf-8').split('\n')

  let topThreeElfCalories: [number, number, number] = [0, 0, 0]
  let currElfCalories = 0
  for (let i = 0; i < lines.length; i++) {
    const calories = parseInt(lines[i])
    if (!isNaN(calories)) {
      currElfCalories += calories
    } else {
      updateTopThreeElfCalories(currElfCalories, topThreeElfCalories)
      currElfCalories = 0
    }
  }
  updateTopThreeElfCalories(currElfCalories, topThreeElfCalories)
  return topThreeElfCalories.reduce((sum, curr) => sum + curr, 0)
}

console.log(part1('input.txt'))
