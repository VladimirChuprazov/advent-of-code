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

  const firstRangeCoveredBySecondRange =
    firstStart >= secondStart && firstEnd <= secondEnd;
  const secondRangeCoveredByFirstRange =
    firstStart <= secondStart && firstEnd >= secondEnd;

  return firstRangeCoveredBySecondRange || secondRangeCoveredByFirstRange;
}

function checkIfThereIsOverlapBetweenTwoRanges([
  firstRange,
  secondRange,
]: RangePair): boolean {
  const [firstStart, firstEnd] = firstRange;
  const [secondStart, secondEnd] = secondRange;

  if (
    firstStart === secondStart ||
    firstStart === secondEnd ||
    firstEnd === secondStart ||
    firstEnd === secondEnd
  ) {
    return true;
  }

  if (firstStart === secondStart && firstEnd > secondEnd) {
    return true;
  }

  if (firstStart === secondStart && firstEnd < secondEnd) {
    return true;
  }

  if (firstStart > secondStart && firstEnd === secondEnd) {
    return true;
  }

  if (firstStart < secondStart && firstEnd === secondEnd) {
    return true;
  }

  if (firstStart > secondStart && firstEnd < secondEnd) {
    return true;
  }

  if (firstStart < secondStart && firstEnd > secondEnd) {
    return true;
  }

  if (firstStart > secondStart && firstEnd > secondEnd) {
    if (firstStart < secondEnd) {
      return true;
    }
  }

  if (firstStart < secondStart && firstEnd < secondEnd) {
    if (firstEnd > secondStart) {
      return true;
    }
  }

  return false;
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
