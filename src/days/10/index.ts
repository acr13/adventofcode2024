import { readFileSync } from 'node:fs';

const grid = readFileSync('./src/days/10/input.txt', 'utf-8')
  .split(/\r?\n/)
  .map(line => line.split('').map(Number));
const R = grid.length;
const C = grid[0].length;

const getAdjCells = (grid, r, c) => {
  return [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ].map(([rr, cc]) => [rr + r, cc + c])
  .filter(([rr, cc]) => rr >= 0 && rr < R && cc >= 0 && cc < C && grid[rr][cc] - grid[r][c] === 1);
};

export const p1 = () => {
  let p1 = 0;

  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      if (grid[r][c] === 0) {
        const SEEN = new Set();
        let moves = [ [r, c] ]

        while (moves.length) {
          // console.log(moves);
          const [rr, cc] = moves.shift();

          if (SEEN.has(`${rr},${cc}`)) continue;
          SEEN.add(`${rr},${cc}`);
          if (grid[rr][cc] === 9) p1++;

          const next = getAdjCells(grid, rr, cc);
          // console.log('next', next);
          next.forEach(([r, c]) => moves.push([r, c]));
        }
      }
    }
  }

  return p1;
};

export const p2 = () => {
  let p2 = 0;

  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      if (grid[r][c] === 0) {

      }
    }
  }

  return p2;
};
