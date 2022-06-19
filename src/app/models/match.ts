/**
 * Match interface used to represent a single match data.
 */
export interface Match {
  homeTeam: string;
  awayTeam: string;
  homeTeamScore: number;
  awayTeamScore: number;

  /** Timestamp of match creation. Serves as unique id and is also used for
   * ordering a score board. */
  timestamp: number;
}

/**
 * Score board represented as an array of matches.
 */
export type ScoreBoard = Match[];

/**
 * Empty score board.
 */
export const EMPTY_SCORE_BOARD: ScoreBoard = [];
