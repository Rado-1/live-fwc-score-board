import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TEST_SCORE_BOARD } from '../data/test-score-board';
import {
  Match,
  ScoreBoard,
  EMPTY_SCORE_BOARD,
  isMatchValid,
} from '../models/match';

@Injectable({
  providedIn: 'root',
})
export class ScoreBoardService {
  private scoreBoardSubject: BehaviorSubject<ScoreBoard>;
  /** public score board update emitter */
  scoreBoard$: Observable<ScoreBoard>;

  constructor() {
    // initialize emitter
    this.scoreBoardSubject = new BehaviorSubject<ScoreBoard>(
      // this.sortBoard(TEST_SCORE_BOARD)
      EMPTY_SCORE_BOARD
    );
    this.scoreBoard$ = this.scoreBoardSubject.asObservable();
  }

  /**
   * Starts a game. Home and away teams must be specified and different. In the
   * case of success updated score board is emitted asynchronously.
   *
   * @param homeTeam Home team.
   * @param awayTeam Away team.
   * @returns Created match if the game was successfully started, null if wrong inputs
   */
  startGame(homeTeam: string, awayTeam: string): Match | null {
    const newMatch = {
      homeTeam,
      awayTeam,
      homeTeamScore: 0,
      awayTeamScore: 0,
      timestamp: Date.now(),
    };

    if (isMatchValid(newMatch)) {
      this.emit([...this.scoreBoardSubject.getValue(), newMatch]);
      return newMatch;
    } else {
      return null;
    }
  }

  /**
   * Finishes the specified match (game). Updated score board is emitted
   * asynchronously. If the match is not present in score board, the original
   * score board is emitted.
   *
   * @param match Match to be finished.
   */
  finishGame(match: Match) {
    this.emit(this.removeMatch(match));
  }

  /**
   * Updates score of a match. Updated score board is emitted asynchronously.
   * If the match is not present in score board, the original score board is
   * emitted.
   *
   * @param match Match with updated score.
   * @returns true if the match is correct, false otherwise
   */
  updateScore(match: Match): boolean {
    if (isMatchValid(match)) {
      this.emit([...this.removeMatch(match), match]);
      return true;
    } else {
      return false;
    }
  }

  private emit(scoreBoard: ScoreBoard) {
    this.scoreBoardSubject.next(this.sortBoard(scoreBoard));
  }

  private sortBoard(scoreBoard: ScoreBoard): ScoreBoard {
    return scoreBoard.sort((a, b) => {
      const comp =
        b.homeTeamScore + b.awayTeamScore - a.homeTeamScore - a.awayTeamScore;

      return comp !== 0 ? comp : b.timestamp - a.timestamp;
    });
  }

  private removeMatch(match: Match): ScoreBoard {
    const board = this.scoreBoardSubject.getValue();
    const i = board.findIndex((m) => m.timestamp === match.timestamp);

    return i === -1 ? board : [...board.slice(0, i), ...board.slice(i + 1)];
  }
}
