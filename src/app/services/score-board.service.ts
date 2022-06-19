import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Match, ScoreBoard } from '../models/match';

@Injectable({
  providedIn: 'root',
})
export class ScoreBoardService {
  /** public score board update emitter */
  scoreBoard$ = new Observable<ScoreBoard>();

  constructor() {}

  /**
   * Starts a game. Home and away teams must be specified and different. In the
   * case of success updated score board is emitted asynchronously.
   *
   * @param homeTeam Home team.
   * @param awayTeam Away team.
   * @returns Created match if the game was successfully started, null if wrong inputs
   */
  startGame(homeTeam: string, awayTeam: string): Match | null {
    throw 'not implemented';
  }

  /**
   * Finishes the specified match (game). Updated score board is emitted
   * asynchronously. If the match is not present in score board, the original
   * score board is emitted.
   *
   * @param match Match to be finished.
   */
  finishGame(match: Match) {
    throw 'not implemented';
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
    throw 'not implemented';
  }
}
