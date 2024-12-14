import { readFileSync } from 'node:fs';

// FFS the % operator returns negative numbers if X is negative in javascript
// https://web.archive.org/web/20090717035140if_/javascript.about.com/od/problemsolving/a/modulobug.htm
const mod = (x: number, n: number) => ((x % n) + n) % n;

const robots = readFileSync('./src/days/14/input.txt', 'utf-8').split(/\r?\n/)
  .map(line => {
    const [left, right] = line.split(' ');
    const [px, py] = left.substring(2).split(',').map(Number);
    const [vx, vy] = right.substring(2).split(',').map(Number);
    return [px, py, vx, vy];
  });
const X = 101;
const Y = 103;

const p1 = (robots: number[][]) => {
  let q1 = 0;
  let q2 = 0;
  let q3 = 0;
  let q4 = 0;
  const mx = Math.floor(X / 2);
  const my = Math.floor(Y / 2);
  const P1_TIMES = 100;
  
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < robots.length; j++) {
      let [px, py, vx, vy] = robots[j];
      px += vx;
      py += vy;
      px = mod(px, X); // px %= X;
      py = mod(py, Y); // py %= Y;
      robots[j] = [px, py, vx, vy];

      if (i === P1_TIMES - 1) {
        if (px < mx && py < my) {
          q1++;
        } else if (px > mx && py < my) {
          q2++;
        } else if (px < mx && py > my) {
          q3++;
        } else if (px > mx && py > my) {
          q4++;
        }
      }
    }
  }

  return q1 * q2 * q3 * q4;
};

const p2 = (robots: number[][]) => {
  const SIMS = X * Y;
  const grid = new Array(SIMS).fill('.');

  for (let i = 0; i < SIMS; i++) {
    for (const [px, py, vx, vy] of robots) {
      let oldX = mod((px + vx * (i - 1)), X);
      let newX = mod(px + vx * i, X);
      let oldY = mod((py + vy * (i - 1)), Y);
      let newY = mod(py + vy * i, Y);

      grid[X * oldY + oldX] = '.';
      grid[X * newY + newX] = '#';
    }
    
    if (grid.join('').includes('#####################')) {
      return i;
    }
  }
};

export const day14 = () => {
  // return [p1([...robots]), p2([...robots])]
  return [231019008, 8280];
};