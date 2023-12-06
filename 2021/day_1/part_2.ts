import * as fs from 'fs'

const getMeasurementSum = (measurements: number[]): number => {
  return measurements.reduce((sum, curr) => sum + curr, 0)
}

const part2 = (file: string) => {
  const lines = fs.readFileSync(file, 'utf-8').split('\n')

  let increaseCount = 0
  let lastThreeMeasurements: [number, number, number] = [-1, -1, -1]
  for (let i = 0; i < lines.length; i++) {
    if (i < 3) {
      lastThreeMeasurements[i] = parseInt(lines[i])
      continue
    }
    const prevMeasurementSum = getMeasurementSum(lastThreeMeasurements)
    lastThreeMeasurements.shift()
    lastThreeMeasurements.push(parseInt(lines[i]))
    const currMeasurementSum = getMeasurementSum(lastThreeMeasurements)
    if (currMeasurementSum > prevMeasurementSum) {
      increaseCount++
    }
  } 
  return increaseCount
}

console.log(part2('input.txt'))
