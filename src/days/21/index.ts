import { readFileSync } from 'node:fs';
import { PriorityQueue } from '@datastructures-js/priority-queue';

const input = readFileSync('./src/days/21/input.txt', 'utf-8').split(/\r?\n/);

const PAD1 = ['789', '456', '123', ' 0A'];
const PAD2 = [' ^A', '<v>'];

const getPad1 = ([r, c]: number[]) => {
  if (r < 0 || r >= PAD1.length || c < 0 || c >= PAD1[r].length) {
    return null;
  } else if (PAD1[r][c] === ' ') {
    return null;
  }
  return PAD1[r][c];
};

const getPad2 = ([r, c]: number[]) => {
  if (r < 0 || r >= PAD2.length || c < 0 || c >= PAD2[r].length) {
    return null;
  } else if (PAD2[r][c] === ' ') {
    return null;
  }
  return PAD2[r][c]
};

const applyPad1 = (p, move) => {
  if (move === 'A') {
    return [ p, getPad1(p) ];
  } else if (move === '<') {
    return [ [p[0], p[1] - 1], null ];
  } else if (move === '^') {
    return [ [p[0] - 1, p[1]], null];
  } else if (move === '>') {
    return [ [p[0], p[1] + 1], null];
  } else if (move === 'v') {
    return [ [p[0] + 1, p[1]], null];
  }
};

const applyPad2 = (p, move) => {
  if (move === 'A') {
    return [p, getPad2(p)];
  } else if (move === '<') {
    return [ [p[0], p[1] - 1], null ];
  } else if (move === '^') {
    return [ [p[0] - 1, p[1]], null ];
  } else if (move === '>') {
    return [ [p[0], p[1] + 1], null ];
  } else if (move === 'v') {
    return [ [p[0] + 1, p[1]], null ];
  }
};

const DP: Record<string, number> = {};

const cost = (ch: string, prev: string, pads: number) => {
  const key = `${ch},${prev},${pads}`;
  if (DP[key]) return DP[key];
  if (pads === 0) return 1;
  
  const start = { '^': [0, 1], '<': [1, 0], 'v': [1, 1], '>': [1, 2], 'A': [0, 2] }[prev];
  const Q = PriorityQueue.fromArray([ [0, start, 'A', '', ''] ], (a, b) => {
    if (a[0] < b[0]) return -1;
    else if (a[0] > b[0]) return 1;
    return 0;
  });
  const SEEN = new Map<string, number>();

  while (Q.size()) {
    const [d, p, prev, out, path] = Q.dequeue();
    
    if (getPad2(p) == null) continue;
    if (out === ch) {
      DP[key] = d;
      return d;
    } else if (out.length > 0) {
      continue;
    }
    const seenKey = `${p[0]},${p[1]},${prev}`;
    if (SEEN.has(seenKey)) continue;
    SEEN.set(seenKey, d);

    for (const move of ['^', '<', 'v', '>', 'A']) {
      const [newP, output] = applyPad2(p, move);
      const costMove = cost(move, prev, pads - 1);
      const newD = d + costMove;
      const newPath = path;
      let newOut = out;
      if (output != null) {
        newOut = newOut = output;
      }
      Q.enqueue([newD, newP, move, newOut, newPath]);
    }
  
  }

}

const solve = (code, pads) => {
  // dist, pad1, pad2, out, path
  const start = [ [0, [3, 2], 'A', '', ''] ];
  const Q = PriorityQueue.fromArray(start, (a, b) => {
    if (a[0] < b[0]) return -1;
    else if (a[0] > b[0]) return 1;
    return 0;
  });
  const SEEN = new Map<string, number>();

  while (Q.size()) {
    const [d, pad1, pad2, out, path] = Q.dequeue();
    
    if (out === code) return d;
    if (!code.startsWith(out)) continue;
    if (!getPad1(pad1)) continue;

    const key = `${pad1[0]},${pad1[1]},${pad2},${out}`;
    if (SEEN.has(key)) continue;
    SEEN.set(key, d);

    for (const move of ['^', '<', 'v', '>', 'A']) {
      // const newP1 = [...pad1];
      let newOut = out;
      const [newPad1, output] = applyPad1(pad1, move);
      if (output != null) {
        newOut = out + output;
      }
      const c = cost(move, pad2, pads);
      const newPath = path;
      Q.enqueue([d + 1, newPad1, move, newOut, newPath]);
    }
  }
};

export const day21 = () => {
  return [231564, 281212077733592];

  let p1 = 0;
  let p2 = 0;
  for (let i = 0; i < input.length; i++) {
    const s1 = solve(input[i], 2);
    const s2 = solve(input[i], 25);
    const n = parseInt(input[i]);
    p1 += (n * s1);
    p2 += (n * s2);
  }

  return [p1, p2];
};
