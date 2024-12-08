import { readFileSync } from 'node:fs';

const grid = readFileSync('./src/days/8/input.txt', 'utf-8')
  .split(/\r?\n/)
  .map(line => line.split(''));
const R = grid.length;
const C = grid[0].length;
const POINTS: Record<string, number[][]> = {};

for (let r = 0; r < R; r++) {
  for (let c = 0; c < C; c++) {
    if (grid[r][c] !== '.') {
      if (!POINTS[grid[r][c]]) {
        POINTS[grid[r][c]] = [];
      }

      POINTS[grid[r][c]].push([Number(r), Number(c)]);
    }
  }
}

export const day8 = () => {
  const NODES = new Set();
  const NODES2 = new Set();
  const pointValues = Object.values(POINTS);

  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      for (const vs of Object.values(POINTS)) {
        for (const [r1, c1] of vs) {
          for (const [r2, c2] of vs) {
            if (r1 !== r2 && c1 !== c2) {
              // const r4 = r;
              // const c4 = c;
              const d1 = Math.abs(r - r1) + Math.abs(c - c1);
              const d2 = Math.abs(r - r2) + Math.abs(c - c2);
              const dr1 = r - r1;
              const dr2 = r - r2;
              const dc1 = c - c1;
              const dc2 = c - c2;
             
              if ((d1 === (2*d2) || d2 === (d1*2)) && (r >= 0 && r < R) && (c >= 0 && c < C) && (dr1*dc2 == dc1*dr2)) {
                NODES.add(`${r},${c}`);
              }

              if (r >= 0 && r < R && c >= 0 && c < C && (dr1 * dc2 === dc1 * dr2)) {
                NODES2.add(`${r},${c}`);
              }
            }
          }
        }
      }
    }
  }

  return [NODES.size, NODES2.size]
};
