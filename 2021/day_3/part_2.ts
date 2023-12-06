import * as fs from 'fs'

const processBitCriteria = (criteriaType: CriteraType, position: number, lines: string[]) => {
  if (lines.length === 1) {
    return lines
  }

  let bitNumCountTracker: [number, number] = [0, 0]
  for (let i = 0; i < lines.length; i++) {
    const bitNum = Number(lines[i].split('')[position])
    bitNumCountTracker[bitNum]++
  }

  const [zeroCount, oneCount] = bitNumCountTracker
  const zeroStartLines = lines.filter(line => line.startsWith('0', position))
  const oneStartLines = lines.filter(line => line.startsWith('1', position))

  if (zeroCount > oneCount) {
    return criteriaType === CriteraType.OXYGEN_GENERATOR ? 
      processBitCriteria(criteriaType, position + 1, zeroStartLines) : 
      processBitCriteria(criteriaType, position + 1, oneStartLines)
  } else if (zeroCount < oneCount) {
    return criteriaType === CriteraType.OXYGEN_GENERATOR ? 
      processBitCriteria(criteriaType, position + 1, oneStartLines) : 
      processBitCriteria(criteriaType, position + 1, zeroStartLines)
  } else {
    return criteriaType === CriteraType.OXYGEN_GENERATOR ? 
      processBitCriteria(criteriaType, position + 1, oneStartLines) : 
      processBitCriteria(criteriaType, position + 1, zeroStartLines)
  }
}

enum CriteraType {
  OXYGEN_GENERATOR = 'Oxygen Generator',
  CARBON_SCRUBBER = 'Carbon Scrubber',
}

const part2 = (file: string) => {
  const lines = fs.readFileSync(file, 'utf-8').split(/[\n\r]+/)
  const oxygenGeneratorLines = processBitCriteria(CriteraType.OXYGEN_GENERATOR, 0, lines)
  const carbonScrubberLines = processBitCriteria(CriteraType.CARBON_SCRUBBER, 0, lines)

  return parseInt(oxygenGeneratorLines[0], 2) * parseInt(carbonScrubberLines[0], 2)
}

console.log(part2('input.txt'))
