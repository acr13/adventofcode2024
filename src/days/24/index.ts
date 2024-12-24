import { readFileSync } from 'node:fs';

const input = readFileSync('./src/days/24/input.txt', 'utf-8').split(/\r?\n/);
let highestZ = 'z00';

const parse = () => {
  let parsedWires = false;
  const wires: Record<string, number> = {};
  const gates: string[][] = [];

  for (let i = 0; i < input.length; i++) {
    if (input[i] === '') {
      parsedWires = true;
      continue;
    }

    if (!parsedWires) {
      const [wire, val] = input[i].split(': ');
      wires[wire] = Number(val);
    } else {
      const [instr, res] = input[i].split(' -> ');
      const [left, mid, right] = instr.split(' ');

      gates.push([left, mid, right, res]);

      if (res.startsWith('z') && Number(res.substring(1)) > Number(highestZ.substring(1))) {
        highestZ = res;
      }
    }
  }

  return { wires, gates };
};

const run = (wires: Record<string, number>, gates: string[][]) => {
  while (gates.length) {
    const [x, instr, y, z] = gates.shift();

    if (wires[x] == undefined || wires[y] == undefined) {
      gates.push([x, instr, y, z]);
      continue;
    }

    if (instr === 'AND') {
      wires[z] = wires[x] === 1 && wires[y] === 1 ? 1 : 0;
    } else if (instr === 'OR') {
      wires[z] = wires[x] || wires[y];
    } else if (instr === 'XOR') {
      wires[z] = wires[x] ^ wires[y];
    } else {
      console.error(x,instr,y,z);
    }
  }

  return Object.entries(wires)
    .filter(([wire, val]) => wire.startsWith('z'))
    .sort((a, b) => {
      if (a[0] > b[0]) return -1;
      else if (a[0] < b[0]) return 1;
      return 0;
    })
    .map(([_, val]) => val)
    .join('');
};

const wrongWires = (gates: string[][]) => {
  const wrong = new Set();

  for (const [x, instr, y, z] of gates) {
    if (z.startsWith('z') && instr !== 'XOR' && z != highestZ) {
      wrong.add(z);
    }
    if (instr === 'XOR' &&
        !['x', 'y', 'z'].includes(x.charAt(0)) &&
        !['x', 'y', 'z'].includes(y.charAt(0)) &&
        !['x', 'y', 'z'].includes(z.charAt(0))) {
      wrong.add(z);
    }
    if (instr === 'AND' && ![x,y].includes('x00')) {
      for (const [x2, instr2, y2, z2] of gates) {
        if ((z === x2 || z === y2) && instr2 !== 'OR') {
          wrong.add(z);
        }
      }
    }
    if (instr === 'XOR') {
      for (const [x2, instr2, y2, z2] of gates) {
        if ((z === x2 || z === y) && instr2 === 'OR') {
          wrong.add(z);
        }
      }
    }
  }

  return wrong;
};


export const day24 = () => {
  const { wires, gates } = parse();  
  const wrong = wrongWires(gates);
  const p1 = run(wires, gates);
  
  return [parseInt(p1, 2), [...wrong].sort().join(',')];
};

