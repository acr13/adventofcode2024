const input = [70949, 6183, 4, 3825336, 613971, 0, 15, 182]
  .reduce<Record<string, number>>((acc, val) => {
    acc[val] ??= 0;
    acc[val]++;
    return acc;
  }, {});

const blink = (stones: Record<string, number>, count: number) => {
  for (let i = 0; i < count; i++) {
    const nextStones: Record<string, number> = {};
    let currStones = Object.keys(stones);

    for (const stone of currStones) {
      if (stone === '0') {
        nextStones[1] = stones[stone];
      } else if (stone.length % 2 === 0) {
        const left = Number(stone.slice(0, stone.length / 2));
        const right = Number(stone.slice(stone.length / 2));

        nextStones[left] = stones[stone] + (nextStones[left] || 0);
        nextStones[right] = stones[stone] + (nextStones[right] || 0);
      } else {
        nextStones[Number(stone) * 2024] = stones[stone] + (nextStones[Number(stone) * 2024] || 0);
      }
    }

    stones = nextStones;
  }

  return stones;
};

export const p1 = () => {
  const stones = blink(input, 25);
  return Object.keys(stones).reduce((sum, key) => sum + stones[key], 0);
};

export const p2 = () => {
  const stones = blink(input, 75);
  return Object.keys(stones).reduce((sum, key) => sum + stones[key], 0);
};
