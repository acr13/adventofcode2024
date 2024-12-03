import { readFileSync } from 'node:fs';

const getInput = () => readFileSync('./src/days/3/input.txt', 'utf-8');

const run = (p2 = false) => {
  // const input = 'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))';
  // const input = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5));`;
  const input = getInput();
  let product = 0;
  let on = true;

  for (let i = 0; i < input.length; i++) {
    if (p2 && input.charAt(i) === 'd' && input.substring(i, i + 4) === 'do()') {
      on = true;
      continue;
    } else if (p2 && input.charAt(i) === 'd' && input.substring(i, i + 7) === "don't()") {
      on = false;
      continue;
    } else if (on && input.charAt(i) === 'm') {
      for (let j = i + 1; j < input.length; j++) {
        // mul(100, 100) === 13
        if (j - i > 13) break;

        if (input.charAt(j) === ')') {
          const s = input.substring(i, j + 1);

          if (s.includes('mul(')) {
            const [_, maybe] = s.split('(');
            const numbers = maybe.replace(')', '').split(',').map(Number);

            if (numbers.length === 2 && numbers.every(x => x > 0 && x < 1000)) {
              product += numbers[0] * numbers[1];
              break;
            }
          }
        }
      }
    }
  }

  return product;
};

export const p1 = () => run();

export const p2 = () => run(true);
