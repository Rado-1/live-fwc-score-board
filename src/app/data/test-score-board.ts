import { ScoreBoard } from '../models/score-board';

/** Unordered testing score board. */
export const TEST_SCORE_BOARD: ScoreBoard = [
  {
    homeTeam: 'Mexico',
    homeTeamScore: 0,
    awayTeam: 'Canada',
    awayTeamScore: 5,
    id: 1,
  },
  {
    homeTeam: 'Spain',
    homeTeamScore: 10,
    awayTeam: 'Brazil',
    awayTeamScore: 2,
    id: 2,
  },
  {
    homeTeam: 'Germany',
    homeTeamScore: 2,
    awayTeam: 'France',
    awayTeamScore: 2,
    id: 3,
  },
  {
    homeTeam: 'Uruguay',
    homeTeamScore: 6,
    awayTeam: 'Italy',
    awayTeamScore: 6,
    id: 4,
  },
  {
    homeTeam: 'Argentina',
    homeTeamScore: 3,
    awayTeam: 'Australia',
    awayTeamScore: 1,
    id: 5,
  },
];

/** Ordered testing score board. */
export const TEST_SCORE_BOARD_ORDERED: ScoreBoard = [
  {
    homeTeam: 'Uruguay',
    homeTeamScore: 6,
    awayTeam: 'Italy',
    awayTeamScore: 6,
    id: 4,
  },
  {
    homeTeam: 'Spain',
    homeTeamScore: 10,
    awayTeam: 'Brazil',
    awayTeamScore: 2,
    id: 2,
  },
  {
    homeTeam: 'Mexico',
    homeTeamScore: 0,
    awayTeam: 'Canada',
    awayTeamScore: 5,
    id: 1,
  },
  {
    homeTeam: 'Argentina',
    homeTeamScore: 3,
    awayTeam: 'Australia',
    awayTeamScore: 1,
    id: 5,
  },
  {
    homeTeam: 'Germany',
    homeTeamScore: 2,
    awayTeam: 'France',
    awayTeamScore: 2,
    id: 3,
  },
];
