import { input } from './input';

enum LowerCasePriority {
  'a' = 1,
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
}

enum UpperCasePriority {
  'A' = 27,
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
}

type LowerCaseItem = keyof typeof LowerCasePriority;
type UpperCaseItem = keyof typeof UpperCasePriority;

type Item = LowerCaseItem | UpperCaseItem;

type Compartment = string;
type Rucksack = [Compartment, Compartment];

type Group = [string, string, string];

class PriorityCalculator {
  private readonly rucksacks: Rucksack[];

  private readonly groupOfThreeRucksacks: Group[];

  constructor(input: string) {
    this.rucksacks = this.processRucksacks(input);
    this.groupOfThreeRucksacks = this.splitRucksacksToGroupsOfthree(input);
  }

  private processRucksacks(input: string): Rucksack[] {
    return input
      .trim()
      .split('\n')
      .reduce<Rucksack[]>((rucksacks, rucksack) => {
        const firstCompartment = rucksack.slice(0, rucksack.length / 2);
        const secondCompartment = rucksack.slice(rucksack.length / 2);
        rucksacks.push([firstCompartment, secondCompartment]);
        return rucksacks;
      }, []);
  }

  private splitRucksacksToGroupsOfthree(input: string): Group[] {
    const ruckasks = input.trim().split('\n');
    const groups: Group[] = [];
    for (let i = 0; i < ruckasks.length; i += 3) {
      groups.push([ruckasks[i], ruckasks[i + 1], ruckasks[i + 2]]);
    }

    return groups;
  }

  private findItemThatAppearsInBothCompartments([
    firstCompartment,
    secondCompartment,
  ]: Rucksack): Item {
    return firstCompartment
      .split('')
      .find((item) => secondCompartment.includes(item)) as Item;
  }

  private getItemPriority(item: Item): number {
    if (item.toUpperCase() === item) {
      return UpperCasePriority[item as UpperCaseItem];
    } else {
      return LowerCasePriority[item as LowerCaseItem];
    }
  }

  private findCommonBadgeForGroup([
    firstBackpack,
    secondBackpack,
    thirdBackpack,
  ]: Group): Item {
    return firstBackpack
      .split('')
      .find(
        (item) => secondBackpack.includes(item) && thirdBackpack.includes(item)
      ) as Item;
  }

  public calcPrioritiesForGroup(): number {
    return this.groupOfThreeRucksacks.reduce((sum, group) => {
      const commonBadge = this.findCommonBadgeForGroup(group);
      sum += this.getItemPriority(commonBadge);
      return sum;
    }, 0);
  }

  public calcPriorities(): number {
    const duplicates = this.rucksacks.map((rucksack) =>
      this.findItemThatAppearsInBothCompartments(rucksack)
    );

    return duplicates.reduce(
      (sum, item) => (sum += this.getItemPriority(item)),
      0
    );
  }
}

const prioritiesCalculator = new PriorityCalculator(input);

console.log(prioritiesCalculator.calcPriorities());
console.log(prioritiesCalculator.calcPrioritiesForGroup());
