import { readFileSync } from 'node:fs';

const input = readFileSync('./src/days/13/input.txt', 'utf-8').split(/\r?\n/);
const groups: number[][] = [ [] ];

for (const line of input) {
  if (line === '') {
    groups.push([]);
    continue;
  }

  line.match(/\d+/g)
    .map(Number)
    .forEach(n => groups[groups.length - 1].push(n));
}

/*
implementation of formula:
a1 * y = b1 * x + c1
a2 * y = b2 * x + c2
x = (a1 * c2 - a2 * c1) / (a2 * b1 - a1 * b2)
y = (b1 * x + c1) / a1
*/
const intersection = (a1, b1, c1, a2, b2, c2) => {
  const a = (a1 * c2 - a2 * c1) / (a2 * b1 - a1 * b2);
  const b = (b1 * a + c1) / a1;
  if ([a, b].every((d) => d > 0 && Number.isInteger(d))) return [a, b];
};

const solve = (s) => {
  return groups.reduce((acc, [ax, ay, bx, by, px, py]) => {
    const r = intersection(bx, -1 * ax, px + s, by, -1 * ay, py + s);
    return r ? r[0] * 3 + r[1] + acc : acc;
  }, 0);
}

export const p1 = () => solve(0);

export const p2 = () => solve(10000000000000);
