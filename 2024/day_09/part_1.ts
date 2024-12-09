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

function getCheckSum(diskLayout: (string | number)[]) {
  let checkSum = 0
  let rightIndex = diskLayout.length - 1

  for (let i = 0; i <= rightIndex; i++) {
    const block = diskLayout[i]
    if (block !== '.') {
      checkSum += i * +block
    } else {
      checkSum += i * +diskLayout[rightIndex--]
      while (diskLayout[rightIndex] === '.') {
        rightIndex--
      }
    }
  }

  return checkSum
}

function solve(file: string) {
  const lines = fs.readFileSync(file, 'utf-8').split(/[\n\r]+/)

  const diskMap = lines[0]
  const diskLayout = convertDiskLayout(diskMap)
  const checkSum = getCheckSum(diskLayout)

  return checkSum
}

console.log(solve('input.txt'))
