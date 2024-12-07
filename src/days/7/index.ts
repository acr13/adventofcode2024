import { readFileSync } from 'node:fs';

const getInput = () => readFileSync('./src/days/7/input.txt', 'utf-8')
  .split(/\r?\n/);
const input = getInput();

const evaluate = (target: number, runningTarget: number, operators: number[]): boolean => {
  if (operators.length === 0) return target === runningTarget

  const next = operators.shift();

  return evaluate(target, runningTarget + next, [...operators]) ||
    evaluate(target, runningTarget * next, [...operators]);
};

export const evaluateP2 = (target: number, runningTarget: number, operators: number[]): boolean => {
  if (operators.length === 0) return target === runningTarget

  const next = operators.shift();

  return evaluateP2(target, runningTarget + next, [...operators]) ||
    evaluateP2(target, runningTarget * next, [...operators]) ||
    evaluateP2(target, Number(`${runningTarget}${next}`), [...operators]);
};

export const p1 = () => {
  let p1 = 0;

  for (const line of input) {
    const [left, right] = line.split(': ');
    const target = Number(left)
    const operators = right.split(' ').map(Number);
    const first = operators.shift();

    if (evaluate(target, first, [...operators])) {
      p1 += target;
    }
  }

  return p1;
}

export const p2 = () => {
  let p2 = 0;

  for (const line of input) {
    const [left, right] = line.split(': ');
    const target = Number(left)
    const operators = right.split(' ').map(Number);
    const first = operators.shift();

    if (evaluateP2(target, first, [...operators])) {
      p2 += target;
    }
  }

  return p2;
}