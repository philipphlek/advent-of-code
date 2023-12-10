// https://adventofcode.com//day/

import * as fs from 'fs'

const solve = (file: string) => {
  const lines = fs.readFileSync(file, 'utf-8').split(/[\n\r]+/)

  for (let i = 0; i < lines.length; i++) {}
}

console.log(solve('input.txt'))
