import { readFileSync } from 'node:fs';

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array: string[]) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

const input = readFileSync('./src/days/23/input.txt', 'utf-8').split(/\r?\n/);

export const day23 = () => {
  const E: Map<string, Set<string>> = new Map();
  let p1 = 0;

  for (const line of input) {
    const [left, right] = line.split('-');
    if (!E.has(left)) E.set(left, new Set());
    if (!E.has(right)) E.set(right, new Set());

    E.get(left)?.add(right);
    E.get(right)?.add(left);
  }

  const pcs = [...E.keys()].sort();

  for (let i = 0; i < pcs.length; i++) {
    for (let j = i + 1; j < pcs.length; j++) {
      for (let k = j + 1; k < pcs.length; k++) {
        const a = pcs[i];
        const b = pcs[j];
        const c = pcs[k];
        
        if (E.get(b)?.has(a) && E.get(c)?.has(a) && E.get(c)?.has(b)) {
          if (a.startsWith('t') || b.startsWith('t') || c.startsWith('t')) {
            p1++;
          }
        }
      }
    }
  }

  let best: string[] | null = null;
  for (let i = 0; i < 1000; i++) {
    shuffle(pcs);
    const clique: string[] = [];

    for (const a of pcs) {
      let ok = true;
      
      for (const b of clique) {
        if (!E.get(b)?.has(a)) {
          ok = false;
        }
      }

      if (ok) {
        clique.push(a);
      }
    }

    if (!best || clique.length > best.length) {
      best = clique;
    }
  }

  return [p1, best?.sort().join(',')];
};
