import { readFileSync } from 'node:fs';
import { off } from 'node:process';

const grid = readFileSync('./src/days/20/input.txt', 'utf-8').split(/\r?\n/).map(line => line.split(''));
const DELTAS = [ [-1, 0], [1, 0], [0, 1], [0, -1] ];
const R = grid.length;
const C = grid[0].length;

const getOffsets = (n: number) => {
  const offsets = [];
  for (let r = -n; r <= n; r++) {
    for (let c = -n; c <= n; c++) {
      if (r === 0 && c === 0) continue;
      const md = Math.abs(r) + Math.abs(c);
      if (md <= n) {
        offsets.push([r, c, md]);
      }
    }
  }
  return offsets;
};

const floodFill = (grid: string[][]) => {
  let end: number[] = [];
  const filled: string[][] = [];
  for (let r = 0; r < R; r++) {
    const row = [];
    for (let c = 0; c < C; c++) {
      row.push(grid[r][c]);
      if (grid[r][c] === 'E') {
        end = [r, c];
      }
    }
    filled.push(row);
  }

  const Q: number[][] = [[end[0], end[1], 0]];
  const coords = [];

  while (Q.length) {
    const [r, c, steps] = Q.shift();

    if (Number.isInteger(filled[r][c])) continue;
    filled[r][c] = steps;
    coords.push([r, c]);

    DELTAS.forEach(([dr, dc]) => {
      const [rr, cc] = [r + dr, c + dc];
      if (rr >= 0 && rr < R && cc >= 0 && cc < C && (filled[rr][cc] === '.' || filled[rr][cc] === 'S')) {
        Q.push([rr, cc, steps + 1])
      }
    });
  }

  return { filled, coords };
};

const cheats = (filled, coords, offsets) => {
  let sum = 0;

  for (const [r, c] of coords) {
    let cheats = 0;
    const n = Number(filled[r][c]);
    const threshold = n - 100;

    for (const [dr, dc, md] of offsets) {
      const [rr, cc] = [dr + r, dc + c];
      if (
        rr >= 0 && rr < R && cc >= 0 && cc < C &&
          filled[rr][cc] !== '#' &&
          (threshold - md) >= filled[rr][cc]
      ) {
        cheats++;
      }
    }

    sum += cheats;
  }

  return sum;
};

const p1 = (filled, coords) => {
  const offsets = getOffsets(2);
  return cheats(filled, coords, offsets);
};

const p2 = (filled, coords) => {
  const offsets = getOffsets(20);
  return cheats(filled, coords, offsets);
};

export const day20 = () => {
  const { filled, coords } = floodFill(grid);
  return [p1(filled, coords), p2(filled, coords)];
};
