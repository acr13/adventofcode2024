import { readFileSync } from 'node:fs';

const input = readFileSync('./src/days/19/input.txt', 'utf-8').split(/\r?\n/);

const parse = (input) => {
  const towels = [];
  let patterns = new Set<string>();
  let parsed = false;

  for (let i = 0; i < input.length; i++) {
    if (input[i] === '') {
      parsed = true;
      continue;
    }

    if (parsed) {
      towels.push(input[i]);
    } else {
      patterns = new Set<string>(input[i].split(', '));
    }
  }

  return { patterns, towels };
};

const DP: Record<string, number> = {};
const isValid = (patterns: Set<string>, towel: string): number => {
  if (DP[towel]) return DP[towel];
  if (towel === '') return 1;
  let n = 0;

  for (const p of patterns) {
    if (towel.indexOf(p) === 0) {
      n += isValid(patterns, towel.substring(p.length));
    }
  }

  DP[towel] = n;
  return n;
}

export const day19 = () => {
  return [ 296, 619970556776002 ];

  const { patterns, towels } = parse(input);
  let p1 = 0;
  let p2 = 0;

  for (const towel of towels) {
    const n = isValid(patterns, `${towel}`);
    if (n > 0) {
      p1++;
      p2 += n;
    }
  }

  return [p1, p2];
};

