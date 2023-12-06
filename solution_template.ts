// https://adventofcode.com/{year}/day/{day}

import * as fs from 'fs'

const part = (file: string) => {
  const lines = fs.readFileSync(file, 'utf-8').split(/[\n\r]+/)

  for (let i = 0; i < lines.length; i++) {

  }
}

console.log(part('input.txt'))
