import { readFileSync } from 'node:fs';

const getGrid = () => readFileSync('./src/days/6/input.txt', 'utf-8')
  .split(/\r?\n/)
  .map(line => line.split(''));

const DELTAS = [[-1, 0], [0, 1], [1, 0], [0, -1]];
const grid = getGrid();
const R = grid.length;
const C = grid[0].length;

export const run = () => {
  let p1 = 0;
  let p2 = 0;
  
  let startR = -1;
  let startC = -1;

  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      if (grid[r][c] === '^') {
        startR = r;
        startC = c;
        break;
      }
    }
  }

  for (let obR = 0; obR < R; obR++) {
    for (let obC = 0; obC < C; obC++) {
      const visited = new Set();
      const visitedP2 = new Set();
      let d = 0;
      let r = startR;
      let c = startC;
      // console.log(obR, obC);
      
      while (true) {
        if (visitedP2.has(`${r},${c},${d}`)) {
          p2++;
          break;
        }

        visitedP2.add(`${r},${c},${d}`)
        visited.add(`${r},${c}`);
        let rr = r + DELTAS[d][0];
        let cc = c + DELTAS[d][1];
        // console.log(rr, cc);

        if (rr < 0 || cc < 0 || rr >= R || cc >= C) {
          if (grid[obR][obC] === '#') {
            // console.log('p1:', visited.size);
            p1 = visited.size;
          }
          break;
        }

        if (grid[rr][cc] === '#' || (rr === obR && cc === obC)) {
          d = (d + 1) % DELTAS.length;
        } else {
          r = rr;
          c = cc;
        }
      }
    }
  }

  return [p1, p2];
};
