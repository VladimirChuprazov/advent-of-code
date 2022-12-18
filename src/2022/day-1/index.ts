import { input } from './input';

class CaloriesProccessor {
  public readonly backpacks: number[];

  constructor(input: string) {
    this.backpacks = this.processBackpacks(input);
  }

  private calcSumOfCaloriesInBackpack(backpack: string): number {
    return backpack
      .split('\n')
      .reduce((calories, calorie) => calories + Number(calorie), 0);
  }

  private processBackpacks(input: string): number[] {
    return input
      .split('\n\n')
      .reduce<number[]>(
        (calories, backpack) => [
          ...calories,
          this.calcSumOfCaloriesInBackpack(backpack),
        ],
        []
      );
  }

  public getCaloriesOfBackpackWithMostCalories(): number {
    return Math.max(...this.backpacks);
  }

  public getCaloriesOfTopThreeBackpacksWithTheMostCalories(): number {
    const topThreeBackpacks = this.backpacks.sort((a, b) => b - a).slice(0, 3);
    return topThreeBackpacks.reduce(
      (calories, backpack) => calories + backpack,
      0
    );
  }
}

const caloriesProccessor = new CaloriesProccessor(input);

console.log(caloriesProccessor.getCaloriesOfBackpackWithMostCalories());
console.log(
  caloriesProccessor.getCaloriesOfTopThreeBackpacksWithTheMostCalories()
);
