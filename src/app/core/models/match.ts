/**
 * Match interface used to represent a single match data.
 */
export interface Match {
  /** Unique match id. Used also for ordering matches in a score board. */
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeTeamScore: number;
  awayTeamScore: number;
}

/**
 * Validates a match.
 */
export function isMatchValid(match: Match): boolean {
  return (
    match.homeTeam !== match.awayTeam &&
    Number.isInteger(match.homeTeamScore) &&
    match.homeTeamScore >= 0 &&
    Number.isInteger(match.awayTeamScore) &&
    match.awayTeamScore >= 0
  );
}
