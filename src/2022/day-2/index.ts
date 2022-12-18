import { input } from './input';

enum OpponentsPlay {
  Rock = 'A',
  Paper = 'B',
  Scissors = 'C',
}

enum MyPlay {
  Rock = 'X',
  Paper = 'Y',
  Scissors = 'Z',
}

enum Score {
  A = 1,
  B = 2,
  C = 3,
  X = 1,
  Y = 2,
  Z = 3,
  Lose = 0,
  Draw = 3,
  Win = 6,
}

enum StrategyGuide {
  X = 'Lose',
  Y = 'Draw',
  Z = 'Win',
}

type Game = [OpponentsPlay, MyPlay];

class ScoreCalculator {
  private readonly rounds: Game[];

  constructor(input: string) {
    this.rounds = this.processGames(input);
  }

  private processGames(games: string): Game[] {
    return games
      .trim()
      .split('\n')
      .reduce<Game[]>((arr, game) => {
        const [opponentsPlay, myPlay] = game.split(' ') as Game;
        arr.push([opponentsPlay, myPlay]);
        return arr;
      }, []);
  }

  private getScoreOfGame([opponentsPlay, myPlay]: Game): number {
    if (Score[opponentsPlay] === Score[myPlay]) return Score.Draw;

    if (
      (opponentsPlay === OpponentsPlay.Rock && myPlay === MyPlay.Paper) ||
      (opponentsPlay === OpponentsPlay.Paper && myPlay === MyPlay.Scissors) ||
      (opponentsPlay === OpponentsPlay.Scissors && myPlay === MyPlay.Rock)
    )
      return Score.Win;

    return Score.Lose;
  }

  private getMyPlayScore(myPlay: Game[1]): number {
    switch (myPlay) {
      case MyPlay.Rock:
        return Score[MyPlay.Rock];
      case MyPlay.Paper:
        return Score[MyPlay.Paper];
      case MyPlay.Scissors:
        return Score[MyPlay.Scissors];
      default:
        return 0;
    }
  }

  private win(opponentsPlay: Game[0]): MyPlay {
    switch (opponentsPlay) {
      case OpponentsPlay.Paper:
        return MyPlay.Scissors;
      case OpponentsPlay.Rock:
        return MyPlay.Paper;
      case OpponentsPlay.Scissors:
        return MyPlay.Rock;
    }
  }

  private lose(opponentsPlay: Game[0]): MyPlay {
    switch (opponentsPlay) {
      case OpponentsPlay.Paper:
        return MyPlay.Rock;
      case OpponentsPlay.Rock:
        return MyPlay.Scissors;
      case OpponentsPlay.Scissors:
        return MyPlay.Paper;
    }
  }

  private draw(opponentsPlay: Game[0]): MyPlay {
    switch (opponentsPlay) {
      case OpponentsPlay.Paper:
        return MyPlay.Paper;
      case OpponentsPlay.Rock:
        return MyPlay.Rock;
      case OpponentsPlay.Scissors:
        return MyPlay.Scissors;
    }
  }

  private decideMyPlayAccordingToStrategyGuide([
    opponentsPlay,
    myPlay,
  ]: Game): MyPlay {
    switch (StrategyGuide[myPlay]) {
      case StrategyGuide.X:
        return this.lose(opponentsPlay);
      case StrategyGuide.Y:
        return this.draw(opponentsPlay);
      case StrategyGuide.Z:
        return this.win(opponentsPlay);
    }
  }

  public calculateMyScore(): number {
    return this.rounds.reduce((score, round) => {
      score += this.getScoreOfGame(round);
      score += this.getMyPlayScore(round[1]);
      return score;
    }, 0);
  }

  public calculateMyScoreAccordingToStrategyGuide(): number {
    return this.rounds.reduce((score, [opponentsPlay, myPlay]) => {
      score += Score[StrategyGuide[myPlay]];
      score += this.getMyPlayScore(
        this.decideMyPlayAccordingToStrategyGuide([opponentsPlay, myPlay])
      );
      return score;
    }, 0);
  }
}

const scoreCalculator = new ScoreCalculator(input);

console.log(scoreCalculator.calculateMyScore());
console.log(scoreCalculator.calculateMyScoreAccordingToStrategyGuide());
