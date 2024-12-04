import { readFileSync } from 'node:fs';

const getGrid = () => readFileSync('./src/days/4/input.txt', 'utf-8')
  .split(/\r?\n/)
  .map(line => line.split(''));

const findXMAS = (grid: string[][], r: number, c: number) => {
  const DIRS = [[-1, 0], [0, 1], [1, 0], [0, -1], [-1, -1], [-1, 1], [1, -1], [1, 1]];
  const words = [];

  for (const [dr, dc] of DIRS) {
    let rr = r;
    let cc = c;
    let word = grid[r][c];
    // try and go this direction three times
    for (let i = 0; i < 3; i++) {
      rr += dr;
      cc += dc;
      
      if (rr >= 0 && rr < grid.length && cc >= 0 && cc < grid[0].length) {
        word = word + grid[rr][cc];
      }
    }

    words.push(word)
  }

  return words.filter(word => word === 'XMAS').length
};

const isXMAS2 = (grid: string[][], r: number, c: number) => {
  const words = [];

  // need SM or MS in each word, doesnt matter
  words.push( grid[r - 1][c - 1] + grid[r + 1][c + 1]);
  words.push( grid[r - 1][c + 1] + grid[r + 1][c - 1]);

  return words.filter(word => word === 'MS' || word === 'SM').length === 2
}

export const p1 = () => {
  const grid = getGrid();
  const R = grid.length;
  const C = grid[0].length;
  let n = 0;

  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      if (grid[r][c] === 'X') {
        n += findXMAS(grid, r, c);
      }
    }
  }

  return n;
};

export const p2 = () => {
  const grid = getGrid();
  const R = grid.length;
  const C = grid[0].length;
  let n = 0;

  for (let r = 1; r < R - 1; r++) {
    for (let c = 1; c < C - 1; c++) {
      if (grid[r][c] === 'A' && isXMAS2(grid, r, c)) {
        n++;
      }
    }
  }

  return n;
}