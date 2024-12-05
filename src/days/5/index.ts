import { readFileSync } from 'node:fs';

const parseInput = () => {
  const input = readFileSync('./src/days/5/input.txt', 'utf-8').split(/\r?\n/);
  const rules: Record<string, Set<number>> = {};
  const updates: number[][] = [];
  let parseRules = true;

  for (let i = 0; i < input.length; i++) {
    if (input[i] === '') {
      parseRules = false;
      continue;
    }

    if (parseRules) {
      const [left, right] = input[i].split('|');
      if (!rules[left]) rules[left] = new Set();
      rules[left].add(Number(right));
    } else {
      updates.push(input[i].split(',').map(Number));
    }
  }

  return { rules, updates };
};

export const run = () => {
  const { rules, updates } = parseInput();
  let p1 = 0;
  let p2 = 0;

  for (let i = 0; i < updates.length; i++) {
    const update = updates[i];
    let valid = true;

    for (let j = 0; j < update.length; j++) {
      let curr = update[j];
      // if we have no rules AND we are not the last element, something is wrong
      if (!rules[curr] && j < update.length - 1) valid = false;

      for (let k = j + 1; k < update.length; k++) {
        if (!valid) break;
        if (!rules[curr].has(update[k])) {
          valid = false;
        }
      } 
    }

    if (valid) {
      const mid = Math.floor(update.length / 2);
      p1 += Number(update[mid]);
    } else {
      // find the mid value by looking at middle number of rules
      const numberOfRules = update.map(n => rules[n]?.size || 0)
      const sorted = [...numberOfRules].sort((a, b) => a - b);
      const midIdx = Math.floor(update.length / 2);

      p2 += update[numberOfRules.findIndex(x => x === sorted[midIdx])];
    }
  }

  return [p1, p2]
};

