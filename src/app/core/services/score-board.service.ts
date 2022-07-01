import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Match, isMatchValid } from '../models/match';
import { ScoreBoard, EMPTY_SCORE_BOARD } from '../models/score-board';

@Injectable({
  providedIn: 'root',
})
export class ScoreBoardService {
  private newMatchId = 1;
  private scoreBoardSubject: BehaviorSubject<ScoreBoard>;
  /** An Observable emitting all changes of score board. */
  scoreBoard$: Observable<ScoreBoard>;

  constructor() {
    this.scoreBoardSubject = new BehaviorSubject<ScoreBoard>(EMPTY_SCORE_BOARD);
    this.scoreBoard$ = this.scoreBoardSubject.asObservable();
  }

  /**
   * Starts a game.
   *
   * @param homeTeam Home team.
   * @param awayTeam Away team.
   * @returns Created match if the game was successfully started.
   * @throws Error if the same teams provided.
   */
  startGame(homeTeam: string, awayTeam: string): Match {
    let newMatch: Match = {
      homeTeam,
      awayTeam,
      homeTeamScore: 0,
      awayTeamScore: 0,
      id: this.newMatchId++,
    };

    if (isMatchValid(newMatch)) {
      this.emit([...this.scoreBoardSubject.getValue(), newMatch]);
      return newMatch;
    } else {
      throw Error('Invalid teams');
    }
  }

  /**
   * Finishes the specified match (game).
   *
   * @param match Match to be finished.
   */
  finishGame(match: Match) {
    this.emit(this.removeMatch(match));
  }

  /**
   * Updates score of a match.
   *
   * @param match Match with updated score.
   * @throws Error if the provided match is invalid.
   */
  updateScore(match: Match) {
    if (isMatchValid(match)) {
      this.emit([...this.removeMatch(match), match]);
    } else {
      throw Error('Invalid match');
    }
  }

  private emit(scoreBoard: ScoreBoard) {
    this.scoreBoardSubject.next(this.sortBoard(scoreBoard));
  }

  private sortBoard(scoreBoard: ScoreBoard): ScoreBoard {
    return scoreBoard.sort((a, b) => {
      const comp =
        b.homeTeamScore + b.awayTeamScore - a.homeTeamScore - a.awayTeamScore;

      return comp !== 0 ? comp : b.id - a.id;
    });
  }

  private removeMatch(match: Match): ScoreBoard {
    const board = this.scoreBoardSubject.getValue();
    const i = board.findIndex((m) => m.id === match.id);

    return i === -1 ? board : [...board.slice(0, i), ...board.slice(i + 1)];
  }
}
