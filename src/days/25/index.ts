import { readFileSync } from 'node:fs';

const input = readFileSync('./src/days/25/input.txt', 'utf-8').split(/\r?\n/);

const parse = () => {
  const locks = [];
  const keys = [];

  let first = true;
  let isLock = true;
  let grid = [];

  for (const line of input) {
    if (line === '') {
      if (isLock) {
        locks.push(grid);
      } else {
        keys.push(grid);
      }

      grid = [];
      first = true;
      continue;
    }
    if (first) {
      if (!line.includes('.')) {
        isLock = true;
      }
      if (!line.includes('#')) {
        isLock = false;
      }
      first = false;
    }

    grid.push(line.split(''));
  }

  return { locks: convertToPins(locks), keys: convertToPins(keys, true) };
};

const convertToPins = (grids, isKey = false) => {
  return grids.map(grid => {
    const R = grid.length;
    const C = grid[0].length;
    const pins = [];

    for (let c = 0; c < C; c++) {
      let p = 0;
      if (isKey) {
        for (let r = R - 2; r >= 0; r--) {
          if (grid[r][c] === '#') p++;
        }
      } else {
        for (let r = 1; r < R; r++) {
          if (grid[r][c] === '#') p++;
        }
      }
      pins.push(p)
    }

    return pins;
  });
};

export const day25 = () => {
  const { locks, keys } = parse();

  let ans = 0;

  for (const key of keys) {
    const target = key.length;

    for (const lock of locks) {
      let valid = true;
      if (key.length !== lock.length) console.error('wtf');

      for (let i = 0; i < key.length; i++) {
        if ((key[i] + lock[i]) > target) {
          valid = false;
        }
      }

      if (valid) ans++;
    }
  }

  return [ans];
};
