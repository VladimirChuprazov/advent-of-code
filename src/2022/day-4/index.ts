import { input } from './input';

type Range = [number, number];
type RangePair = [Range, Range];

const ranges = processInput(input);

function processInput(ranges: typeof input): RangePair[] {
  return ranges
    .trim()
    .split('\n')
    .map((rangePair) => {
      const ranges = rangePair.split(',');
      const firstRange = ranges[0].split('-');
      const secondRange = ranges[1].split('-');
      return [
        [Number(firstRange[0]), Number(firstRange[1])],
        [Number(secondRange[0]), Number(secondRange[1])],
      ];
    });
}

function checkIfOneOfRangesInPairFullyCoversAnother([
  firstRange,
  secondRange,
]: RangePair): boolean {
  const [firstStart, firstEnd] = firstRange;
  const [secondStart, secondEnd] = secondRange;

  return (
    (firstStart >= secondStart && firstEnd <= secondEnd) ||
    (firstStart <= secondStart && firstEnd >= secondEnd)
  );
}

function checkIfThereIsOverlapBetweenTwoRanges([
  firstRange,
  secondRange,
]: RangePair): boolean {
  const [firstStart, firstEnd] = firstRange;
  const [secondStart, secondEnd] = secondRange;

  return (
    (firstStart <= secondEnd && firstEnd >= secondStart) ||
    (firstEnd >= secondStart && firstStart <= secondEnd)
  );
}

function count(
  ranges: RangePair[],
  predicate: (pair: RangePair) => boolean
): number {
  return ranges.reduce(
    (count, pair) => (predicate(pair) ? (count += 1) : count),
    0
  );
}

console.log([
  count(ranges, checkIfOneOfRangesInPairFullyCoversAnother),
  count(ranges, checkIfThereIsOverlapBetweenTwoRanges),
]);
