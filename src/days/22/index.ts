import { readFileSync } from 'node:fs';

const input = readFileSync('./src/days/22/input.txt', 'utf-8').split(/\r?\n/);

// FFS the % operator returns negative numbers if X is negative in javascript
// https://web.archive.org/web/20090717035140if_/javascript.about.com/od/problemsolving/a/modulobug.htm
const mod = (x: number, n: number) => ((x % n) + n) % n;

const mixAndPrune = (secret: number, n: number) => mod((n ^ secret), 16777216);

const secret = (n: number) => {
  const one = mixAndPrune(n, n * 64)
  const two = mixAndPrune(one, Math.floor(one / 32));
  return mixAndPrune(two, two * 2048);
};

const prices = (n: number) => {
  const prices = [n];
  let x = n;
  for (let i = 0; i < 2000; i++) {
    x = secret(x);
    prices.push(x);
  }
  return prices
};

const getScores = (P, deltas) => {
  const scores: Record<string, number> = {};
  for (let i = 0; i < deltas.length - 3; i++) {
    const key = `${deltas[i]},${deltas[i+1]},${deltas[i+2]},${deltas[i+3]}`;
    if (!scores[key]) scores[key] = P[i+4];
  }
  return scores;
}

export const day22 = () => {
  let p1 = 0;
  const SCORES: Record<string, number> = {};

  for (const line of input) {
    const P = prices(Number(line));
    p1 += P[P.length - 1];
    const ones = P.map(p => p % 10);
    const deltas = ones.map((p, i) => i > 0 ? p - ones[i - 1] : p);
    deltas.shift();
    const scores = getScores(ones, deltas);
    
    for (const [k, v] of Object.entries(scores)) {
      if (!SCORES[k]) {
        SCORES[k] = v;
      } else {
        SCORES[k] += v;
      }
    }
  }

  return [p1, Math.max(...Object.values(SCORES))];
};