import { readFileSync } from 'node:fs';

const DELTAS = [ [-1, 0], [1, 0], [0, 1], [0, -1] ];
const grid = readFileSync('./src/days/12/input.txt', 'utf-8')
  .split(/\r?\n/)
  .map(line => line.split(''));
const R = grid.length;
const C = grid[0].length;

export const day12 = () => {
  let p1 = 0;
  let p2 = 0;
  const SEEN = new Set();

  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      const key = `${r},${c}`;
      if (!SEEN.has(key)) {
        SEEN.add(key);
        const moves = [ [r, c] ];
        const REGION = new Set();
        const PERIMS: Record<string, Set<string>> = {};
        let perim = 0;

        while (moves.length) {
          const [rr, cc] = moves.pop();

          if (REGION.has(`${rr},${cc}`)) continue;
          REGION.add(`${rr},${cc}`);
          SEEN.add(`${rr},${cc}`);


          for (const [dr, dc] of DELTAS) {
            const [r2, c2] = [dr + rr, dc + cc];
            
            if (r2 >= 0 && r2 < R && c2 >= 0 && c2 < C && grid[r2][c2] === grid[rr][cc]) {
              moves.push([r2, c2])
            } else {
              perim++;

              if (!PERIMS[`${dr},${dc}`]) PERIMS[`${dr},${dc}`] = new Set();
              PERIMS[`${dr},${dc}`].add(`${rr},${cc}`);
            }
          }
        }

        let sides = 0;
        const keys = Object.keys(PERIMS);
        for (const key of keys) {
          const vs = PERIMS[key];
          const SEEN_PERIMS = new Set();

          for (const coord of vs) {
            const [pr, pc] = coord.split(',').map(Number)

            if (!SEEN_PERIMS.has(`${pr},${pc}`)) {
              sides++;
              const Q = [ [pr, pc] ];

              while (Q.length) {
                const [r2, c2] = Q.shift();
                
                if (SEEN_PERIMS.has(`${r2},${c2}`)) continue;
                SEEN_PERIMS.add(`${r2},${c2}`);

                for (const [dr, dc] of DELTAS) {
                  const [rr, cc] = [r2 + dr, c2 + dc]
                  if (vs.has(`${rr},${cc}`))
                    Q.push([rr,cc]);
                }
              }

            }
          }
        }

        p1 += (perim * REGION.size);
        p2 += (sides * REGION.size);
      }
    }
  }

  return [p1, p2];
};
