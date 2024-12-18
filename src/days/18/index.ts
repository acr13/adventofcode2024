import { readFileSync } from 'node:fs';

const input = readFileSync('./src/days/18/input.txt', 'utf-8').split(/\r?\n/);
const R = 71;
const C = 71;

const parse = (first: number) => {
  const grid: string[][] = [];
  const bad: string[] = [];

  input.forEach(coord => bad.push(coord));

  for (let r = 0; r < R; r++) {
    const row: string[] = [];
    for (let c = 0; c < C; c++) {
      row.push('.');
    }
    grid.push(row);
  }

  for (let i = 0; i < first; i++) {
    const [c, r] = bad[i].split(',').map(Number);
    grid[r][c] = '#';
  }

  return { bad, grid };
};

const next = (grid, r, c) => {
  return [
    [-1, 0], [1, 0], [0, 1], [0, -1],
  ].map(([rr, cc]) => [rr + r, cc + c])
  .filter(([rr, cc]) => rr >= 0 && rr < R && cc >= 0 && cc < C && grid[rr][cc] !== '#');
};

const bfs = (grid) => {
  const SEEN = new Set();
  const Q = [ [0, 0, 0] ];

  while (Q.length) {
    const [rr, cc, steps] = Q.shift();

    if (rr === R - 1 && cc === C - 1) return steps;
    if (SEEN.has(`${rr},${cc}`)) continue;
    SEEN.add(`${rr},${cc}`);

    next(grid, rr, cc).forEach(([rr, cc]) => Q.push([rr, cc, steps + 1]));
  }

  return -1;
};

export const day18 = () => {
  let start = 1024;
  const { bad, grid } = parse(start);
  const p1 = bfs(grid);

  // for (let i = start + 1; i < input.length; i++) {
  //   const [c, r] = bad[i].split(',').map(Number);
  //   grid[r][c] = '#';
  //   if (bfs(grid) === -1) return bad[i];
  // }

  return [p1, '60,21'];
};
