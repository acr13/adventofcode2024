import { readFileSync } from "node:fs";

const input = readFileSync('./src/days/15/input.txt', 'utf-8').split(/\r?\n/);
const DELTAS: Record<string, number[]> = { '^': [-1, 0], '>': [0, 1], 'v': [1, 0], '<': [0, -1] };

const parseInput = () => {
  const instrs: string[] = [];
  let grid: string[][] = [];
  let parseInstrs = false;

  for (const line of input) {
    if (line === '') {
      parseInstrs = true;
      continue;
    }

    if (!parseInstrs) {
      grid.push(line.split(''));
    } else {
      instrs.push(...line.split(''));
    }
  }

  return { grid, instrs };
};

const solve = (p2 = false) => {
  let { grid, instrs } = parseInput();
  let R = grid.length;
  let C = grid[0].length;

  const BIG_GRID: string[][] = [];
  if (p2) {
    for (let r = 0; r < R; r++) {
      const row: string[] = [];
      for (let c = 0; c < C; c++) {
        if (grid[r][c] === '#') {
          row.push('#');
          row.push('#');
        } else if (grid[r][c] === 'O') {
          row.push('[');
          row.push(']');
        } else if (grid[r][c] === '.') {
          row.push('.');
          row.push('.');
        } else if (grid[r][c] === '@') {
          row.push('@');
          row.push('.');
        }
      }
      BIG_GRID.push(row);
    }

    grid = BIG_GRID;
    C *= 2;
  }

  let curr: number[] = [];

  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      if (grid[r][c] === '@') {
        curr = [r, c]
        grid[r][c] = '.'; 
        break;
      }
    }
  }

  let [r, c] = curr;

  for (const inst of instrs) {
    const [dr, dc] = DELTAS[inst];
    let [rr, cc] = [r + dr, c + dc];

    if (grid[rr][cc] === '#') continue;
    else if (grid[rr][cc] === '.') {
      r = rr;
      c = cc;
    } else if (grid[rr][cc] === 'O' || grid[rr][cc] === '[' || grid[rr][cc] === ']') {
      const Q = [ [r,c] ];
      const SEEN = new Set<string>();
      let ok = true;

      while (Q.length) {
        const [rr, cc] = Q.shift();
        if (SEEN.has(`${rr},${cc}`)) continue;
        SEEN.add(`${rr},${cc}`);
        let [rrr, ccc] = [rr + dr, cc + dc];
        
        if (grid[rrr][ccc] === '#') {
          ok = false;
          break;
        }
        if (grid[rrr][ccc] === 'O') {
          Q.push([rrr, ccc]);
        } else if (grid[rrr][ccc] === '[') {
          Q.push([rrr, ccc]);
          Q.push([rrr, ccc + 1]);
        } else if (grid[rrr][ccc] === ']') {
          Q.push([rrr, ccc]);
          Q.push([rrr, ccc - 1]);
        }
      }

      if (!ok) continue;
      while (SEEN.size > 0) {
        const sorted = [...SEEN].sort();
        for (const key of sorted) {
          const [rr, cc] = key.split(',').map(Number);
          const [rrr, ccc] = [rr + dr, cc + dc];

          if (!SEEN.has(`${rrr},${ccc}`)) {
            grid[rrr][ccc] = grid[rr][cc];
            grid[rr][cc] = '.';
            SEEN.delete(`${rr},${cc}`)
          }
        }
      }

      r += dr;
      c += dc;
    }
  }

  let ans = 0;

  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      if (grid[r][c] === 'O' || grid[r][c] === '[') {
        ans += (100 * r) + c;
      }
    }
  }

  return ans;
};

export const day15 = () => [solve(), solve(true)];