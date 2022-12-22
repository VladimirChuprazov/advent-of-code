import { input } from './input';

function findMarker(input: string, size: number): number | undefined {
  const set = new Set<string>();

  for (let i = 0; i < input.length; i += 1) {
    input
      .slice(i, i + size)
      .split('')
      .forEach(set.add, set);

    if (set.size === size) return i + size;

    set.clear();
  }
}

const marker4 = findMarker(input, 4);
const marker14 = findMarker(input, 14);
console.log(marker4, marker14);
