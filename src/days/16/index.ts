import { readFileSync } from 'node:fs';
import { PriorityQueue } from '@datastructures-js/priority-queue'

const DELTAS = [ [-1, 0], [0, 1], [1, 0], [0, -1] ];
const grid = readFileSync('./src/days/16/input.txt', 'utf-8')
  .split(/\r?\n/)
  .map(line => line.split(''));
const R = grid.length;
const C = grid[0].length;

const moves = (grid, r, c, facing, score) => {
  const fwd = [
    DELTAS[facing],
  ].map(([rr, cc]) => [rr + r, cc + c, facing, score + 1])
  .filter(([rr, cc]) => rr >= 0 && rr < R && cc >= 0 && cc < C && grid[rr][cc] !== '#');

  const turns = [
    (facing + DELTAS.length - 1) % DELTAS.length,
    (facing + DELTAS.length + 1) % DELTAS.length,
  ].map(d => [r + DELTAS[d][0], c + DELTAS[d][1], d])
  .filter(([rr, cc, dd]) => rr >= 0 && rr < R && cc >= 0 && cc < C && grid[rr][cc] !== '#')
  .map(([_, __, d]) => [r, c, d, score + 1000]); // dont actually move, just turn

  return [ fwd, turns ].flat();
};

export const day16 = () => {
  let min = Infinity;
  let start = [];
  let end = [];

  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      if (grid[r][c] === 'S') {
        start = [r, c];
      }
      if (grid[r][c] === 'E') {
        end = [r, c];
      }
    }
  }

  let Q = PriorityQueue.fromArray([ [start[0], start[1], 1, 0] ], (a, b) => {
    if (a[3] < b[3]) return -1;
    else if (a[3] > b[3]) return 1;
    return 0;
  });
  let SEEN = new Set();
  const DIST = {};

  while (Q.size()) {
    const [r, c, facing, score] = Q.dequeue();
    if (!DIST[`${r},${c},${facing}`]) DIST[`${r},${c},${facing}`] = score;
    if (SEEN.has(`${r},${c},${facing}`)) continue;

    if (grid[r][c] === 'E') {
      if (score < min) {
        min = score;
      }
    }

    SEEN.add(`${r},${c},${facing}`);

    const next = moves(grid, r, c, facing, score);
    next.forEach(([rr, cc, dd, score]) => {
      Q.enqueue([rr, cc, dd, score]);
    });
  }

  Q = PriorityQueue.fromArray([
    [end[0], end[1], 0, 0], // start with all 4 dirs from end
    [end[0], end[1], 1, 0],
    [end[0], end[1], 2, 0],
    [end[0], end[1], 3, 0],
  ], (a, b) => {
    if (a[3] < b[3]) return -1;
    else if (a[3] > b[3]) return 1;
    return 0;
  });
  SEEN = new Set();
  const DIST2 = {};

  while (Q.size()) {
    const [r, c, facing, score] = Q.dequeue();
    if (!DIST2[`${r},${c},${facing}`]) DIST2[`${r},${c},${facing}`] = score;
    if (SEEN.has(`${r},${c},${facing}`)) continue;
    SEEN.add(`${r},${c},${facing}`);

    const [dr, dc] = DELTAS[(facing + DELTAS.length + 2) % DELTAS.length];
    const [rr, cc] = [dr + r, dc + c];
    if (rr >= 0 && rr < R && cc >= 0 && cc < C && grid[rr][cc] !== '#') {
      Q.enqueue([rr, cc, facing, score + 1]);
    }

    Q.enqueue([r, c, (facing + DELTAS.length - 1) % DELTAS.length, score + 1000]);
    Q.enqueue([r, c, (facing + DELTAS.length + 1) % DELTAS.length, score + 1000]);
  }

  const OK = new Set();
  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      for (let d = 0; d < DELTAS.length; d++) {
        const key = `${r},${c},${d}`;
        if (DIST[key] && DIST2[key] && DIST[key] + DIST2[key] === min) {
          OK.add(`${r},${c}`)
        }
      }
    }
  }

  return [min, OK.size + 1];
};
