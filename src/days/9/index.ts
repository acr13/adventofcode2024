import { read, readFileSync } from 'node:fs';

const input = readFileSync('./src/days/9/input.txt', 'utf-8');
const L = input.length;

export const run = (p2 = false) => {
  const A = [];
  const SPACE: number[][] = [];
  let fileId = 0;
  const FINAL: (number | null)[] = [];
  let pos = 0;
  let answer = 0;

  for (let i = 0; i < L; i++) {
    const c = input.charAt(i);
    const numberC = Number(c);

    if (i % 2 === 0) {
      if (p2) {
        A.push([pos, numberC, fileId]);
      }
      for (let j = 0; j < numberC; j++) {
        FINAL.push(fileId)
        if (!p2) {
          A.push([pos, 1, fileId]);
        }
        pos++;
      }
      fileId++;
    } else {
      SPACE.push([pos, numberC]);
      for (let j = 0; j < numberC; j++) {
        FINAL.push(null);
        pos++;
      }
    }
  }

  A.reverse();

  for (const [pos, sz, fileId] of A) {
    for (let spaceIdx = 0; spaceIdx < SPACE.length; spaceIdx++) {
      const [spacePos, spaceSz] = SPACE[spaceIdx];

      if (spacePos < pos && sz <= spaceSz) {
        for (let j = 0; j < sz; j++) {
          FINAL[pos + j] = null;
          FINAL[spacePos + j] = fileId
        }
        SPACE[spaceIdx] = [spacePos + sz, spaceSz - sz];
        break;
      }
    }
  }

  for (let i = 0; i < FINAL.length; i++) {
    if (FINAL[i] !== null) {
      answer += i * FINAL[i];
    }
  }

  return answer;
};

export const p1 = () => run();

export const p2 = () => run(true);
