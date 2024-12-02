import { readFileSync } from 'node:fs';

const getPairs = () => {
  const left: number[] = [];
  const right: number[] = [];
  const numbers = readFileSync('./src/days/1/input.txt', 'utf-8')
    .split(/\r?\n/)
    .map(line => {
      const pairs = line.split(' ').filter(x => !!x).map(Number);
      left.push(pairs[0]);
      right.push(pairs[1]);
    });

  return [left, right];
};

export const p1 = () => {
  const [left, right] = getPairs();
  const L = left.length;
  left.sort();
  right.sort();

  let sum = 0;

  for (let i = 0; i < L; i++) {
    const diff = Math.abs(left[i] - right[i]);
    sum += diff
  }

  return sum;
};

export const p2 = () => {
  const [left, right] = getPairs();

  const hash: Record<number, number> = {};
  right.forEach(i => {
    if (!hash[i]) hash[i] = 0;
    hash[i]++;
  });

  let product = 0;

  for (let i = 0; i < left.length; i++) {
    const n = hash[left[i]] ?? 0;
    product += left[i] * n;
  }

  return product;
}
