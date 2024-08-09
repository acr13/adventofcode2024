import { readFileSync } from 'node:fs';

export const p1 = () => {
  const file = readFileSync('./src/days/1/input.txt', 'utf-8')
    .split(/\r?\n/);
  
  let sum = 0;
  for (const line of file) {
    const digits = line.split('').filter(c => isFinite(Number(c)));
    const n = Number(digits[0] + digits[digits.length - 1]);
    sum += n;
  }

  return sum;
};
