import { readFileSync } from 'node:fs';

const input = readFileSync('./src/days/17/input.txt', 'utf-8').split(/\r?\n/);

// FFS the % operator returns negative numbers if X is negative in javascript
// https://web.archive.org/web/20090717035140if_/javascript.about.com/od/problemsolving/a/modulobug.htm
const mod = (x: number, n: number) => ((x % n) + n) % n;

const parse = () => {
  const registers: Record<string, number> = {};
  let instructions: number[] = [];
  let parsedRegisters = false;

  for (const line of input) {
    if (line === '') {
      parsedRegisters = true;
      continue;
    }

    if (parsedRegisters) {
      const[_, numbers] = line.split('Program: ');
      instructions = numbers.split(',').map(Number);
    } else {
      const [_, right] = line.split('Register ');
      const [r, v] = right.split(': ');
      registers[r] = Number(v);
    }
  }

  return { registers, instructions };
};

export const run = (registers: Record<string, number>, instructions: number[]) => {
  const out = [];
  let i = 0;

  while (instructions[i] != null) {
    const opcode = instructions[i];
    const operand = instructions[i + 1];
    let combo;
    let jumped = false;

    if (operand >= 0 && operand <= 3) combo = operand;
    if (operand === 4) combo = registers['A'];
    if (operand === 5) combo = registers['B'];
    if (operand === 6) combo = registers['C'];

    if (opcode === 0) {
      registers['A'] = Math.trunc(registers['A'] / Math.pow(2, combo));
    } else if (opcode === 1) {
      registers['B'] = (registers['B'] ^ operand) >>> 0;
    } else if (opcode === 2) {
      registers['B'] = mod(combo, 8);
    } else if (opcode === 3) {
      if (registers['A'] !== 0) {
        i = operand;
        jumped = true;
      }
    } else if (opcode === 4) {
      registers['B'] = (registers['B'] ^ registers['C']) >>> 0;
    } else if (opcode === 5) {
      out.push(mod(combo, 8));
    } else if (opcode === 6) {
      registers['B'] = Math.trunc(registers['A'] / Math.pow(2, combo));
    } else if (opcode === 7) {
      registers['C'] = Math.trunc(registers['A'] / Math.pow(2, combo));
    }

    if (!jumped) i += 2;
  }

  return out.join(',');
};


export const day17 = () => {
  const { registers, instructions } = parse();
  const p1 = run({...registers}, instructions);

  const Q = [ ['', 0] ];
  while (Q.length) {
    const [result, length] = Q.shift();

    if (length === instructions.length) {
      return [p1, parseInt(result, 2)];
    }

    const from = parseInt(result + '000', 2);
    const to = parseInt(result + '111', 2);
    const expect = instructions.slice((length + 1) * -1).join(',');

    for (let a = from; a <= to; a++) {
      const newRegisters = { ...registers, A: a };
      const out = run(newRegisters, instructions);
      if (out === expect) {
        Q.push([a.toString(2), length + 1]);
      }
    }
  }
};
