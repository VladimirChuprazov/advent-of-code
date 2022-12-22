import { input } from './input';

type Stack = string[];
type Stacks = Record<string, Stack>;
type StackIndex = Record<number, number>;
interface Operation {
  move: number;
  from: number;
  to: number;
}

const [stacks, operations, stackIndex] = processInput(input);

function processOperations(logs: string): Operation[] {
  return logs.split('\n').map((log) => {
    const a = log.match(/\d+/g)?.map(Number) as number[];
    return {
      move: a[0],
      from: a[1],
      to: a[2],
    };
  });
}

function processStackIndex(stacks: string): StackIndex {
  const rows = stacks.split('\n');

  return rows[rows.length - 1]
    .split('')
    .reduce<StackIndex>((stackIndex, column, index) => {
      if (column !== ' ' && !Number.isNaN(Number(column))) {
        stackIndex[index] = Number(column);
      }
      return stackIndex;
    }, {});
}

function processStacks(stacks: string, stackIndex: StackIndex): Stacks {
  const rows = stacks.split('\n');

  return rows.slice(0, rows.length - 1).reduceRight<Stacks>((stacks, row) => {
    row
      .replaceAll('/[[]]/g', ' ')
      .split('')
      .forEach((column, index) => {
        if (Object.hasOwn(stackIndex, index) && column !== ' ') {
          if (Object.hasOwn(stacks, index)) {
            stacks[index].push(column);
          } else {
            stacks[index] = [column];
          }
        }
      });
    return stacks;
  }, {});
}

function processInput(input: string): [Stacks, Operation[], StackIndex] {
  const [stacks, logs] = input.split('\n\n');
  const processedOperations = processOperations(logs.trim());
  const stackIndex = processStackIndex(stacks);
  const processedStacks = processStacks(stacks, stackIndex);

  return [processedStacks, processedOperations, stackIndex];
}

function applyOperationsWithCrateMover9000(
  stacks: Stacks,
  operations: Operation[]
): Stacks {
  return operations.reduce<Stacks>((operatedStacks, operation) => {
    const fromIndex = Object.keys(stackIndex).find(
      (key) => stackIndex[Number(key)] === operation.from
    );
    const toIndex = Object.keys(stackIndex).find(
      (key) => stackIndex[Number(key)] === operation.to
    );

    if (fromIndex === undefined || toIndex === undefined) return operatedStacks;

    for (let i = 0; i < operation.move; i += 1) {
      const crateToMove = operatedStacks[fromIndex].pop();
      if (crateToMove !== undefined) operatedStacks[toIndex].push(crateToMove);
    }

    return operatedStacks;
  }, structuredClone(stacks));
}

function applyOperationsWithCrateMover9001(
  stacks: Stacks,
  operations: Operation[]
): Stacks {
  return operations.reduce<Stacks>((operatedStacks, operation) => {
    const fromIndex = Object.keys(stackIndex).find(
      (key) => stackIndex[Number(key)] === operation.from
    );
    const toIndex = Object.keys(stackIndex).find(
      (key) => stackIndex[Number(key)] === operation.to
    );

    if (fromIndex === undefined || toIndex === undefined) return operatedStacks;

    const cratesToMove = operatedStacks[fromIndex].splice(
      operatedStacks[fromIndex].length - operation.move,
      operation.move
    );
    operatedStacks[toIndex].push(...cratesToMove);

    return operatedStacks;
  }, structuredClone(stacks));
}

console.log(
  'CrateMover9000: ',
  Object.values(applyOperationsWithCrateMover9000(stacks, operations))
    .map((stack) => stack[stack.length - 1])
    .join('')
);

console.log(
  'CrateMover9001: ',
  Object.values(applyOperationsWithCrateMover9001(stacks, operations))
    .map((stack) => stack[stack.length - 1])
    .join('')
);
