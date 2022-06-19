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
 * Validates a match.
 *
 * @param match Validated match.
 * @returns true if valid, false otherwise.
 */
export function isMatchValid(match: Match): boolean {
  return (
    match.homeTeam !== match.awayTeam && // home team different from away team
    Number.isInteger(match.homeTeamScore) && // home score is integer
    match.homeTeamScore >= 0 && // home score is not negative
    Number.isInteger(match.awayTeamScore) && // away score is integer
    match.awayTeamScore >= 0 // away score is not negative
  );
}

/**
 * Score board represented as an array of matches.
 */
export type ScoreBoard = Match[];

/**
 * Empty score board.
 */
export const EMPTY_SCORE_BOARD: ScoreBoard = [];
