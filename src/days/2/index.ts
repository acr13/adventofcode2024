import { readFileSync } from 'node:fs';

const getReports = () => {
    return readFileSync('./src/days/2/input.txt', 'utf-8')
      .split(/\r?\n/)
      .map(line => line.split(' ').map(Number));
  };

export const p1 = () => {
  const reports = getReports();
  return reports.map(report => isSafe(report))
    .map(x => x === true ? 1 : 0)
    .reduce<number>((sum, x) => sum + x, 0)
};

const isSafe = (report: number[]): boolean => {
    const diffs = [];

    for (let i = 0; i < report.length - 1; i++) {
      diffs.push(Math.abs(report[i] - report[i + 1]));
    }

    const isIncreasing = report.every((x, i) => (i === 0) || x > report[i - 1]);
    const isDecreasing = report.every((x, i) => (i === 0) || x < report[i - 1]);
    const diffSafe = !diffs.some(x => x < 1 || x > 3); 

    if (diffSafe && (isIncreasing || isDecreasing)) {
      return true;
    }

    return false;
};

export const p2 = () => {
  const reports = getReports();
  let safe = 0;

  for (let i = 0; i < reports.length; i++) {
    if (isSafe(reports[i])) {
      safe++;
    } else {
      for (let j = 0; j < reports[i].length; j++) {
        const clone = [...reports[i]];
        clone.splice(j, 1);
            
        if (isSafe(clone)) {
          safe++;
          break;
        }
      }
    }
  }

  return safe;
};
