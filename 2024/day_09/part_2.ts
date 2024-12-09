// https://adventofcode.com/2024/day/9

import * as fs from 'fs'

function addContentToLayout(
  content: string | number,
  numBlocks: number,
  diskLayout: (string | number)[]
) {
  for (let j = 0; j < numBlocks; j++) {
    diskLayout.push(content)
  }
}

function convertDiskLayout(diskMap: string): (string | number)[] {
  const diskLayout: (string | number)[] = []

  let fileId = 0
  for (let i = 0; i < diskMap.length; i++) {
    const numBlocks = +diskMap[i]
    if (i % 2 === 0) {
      addContentToLayout(fileId++, numBlocks, diskLayout)
    } else {
      addContentToLayout('.', numBlocks, diskLayout)
    }
  }

  return diskLayout
}

function transformDiskLayout(diskLayout: (string | number)[]) {
  let rightIndex = diskLayout.length - 1
  while (rightIndex >= 0) {
    const block = diskLayout[rightIndex]

    if (block === '.') {
      rightIndex--
      continue
    }

    // find number of blocks with same file id
    let totalFileIdBlocks = 0
    while (rightIndex >= 0 && diskLayout[rightIndex] === block) {
      totalFileIdBlocks++
      rightIndex--
    }

    // find free spaces and see file id fits
    let leftIndex = 0
    while (leftIndex < rightIndex) {
      if (diskLayout[leftIndex] === '.') {
        let freeSpaces = 0
        while (
          diskLayout[leftIndex] === '.' &&
          freeSpaces < totalFileIdBlocks
        ) {
          freeSpaces++
          leftIndex++
        }
        if (totalFileIdBlocks === freeSpaces) {
          for (let i = 0; i < freeSpaces; i++) {
            diskLayout[leftIndex - (i + 1)] = block
            diskLayout[rightIndex + (i + 1)] = '.'
          }
          break
        }
      }
      leftIndex++
    }
  }
}

function getCheckSum(diskLayout: (string | number)[]) {
  let checkSum = 0
  let rightIndex = diskLayout.length - 1

  for (let i = 0; i <= rightIndex; i++) {
    const block = diskLayout[i]
    if (block !== '.') {
      checkSum += i * +block
    }
  }

  return checkSum
}

function solve(file: string) {
  const lines = fs.readFileSync(file, 'utf-8').split(/[\n\r]+/)

  const diskMap = lines[0]
  const diskLayout = convertDiskLayout(diskMap)
  transformDiskLayout(diskLayout)
  const checkSum = getCheckSum(diskLayout)

  return checkSum
}

console.log(solve('input.txt'))
