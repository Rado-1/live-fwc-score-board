import { TestBed } from '@angular/core/testing';
import {
  TEST_SCORE_BOARD,
  TEST_SCORE_BOARD_ORDERED,
} from '../data/test-score-board';
import { Match } from '../models/match';
import { ScoreBoard } from '../models/score-board';
import { ScoreBoardService } from './score-board.service';

// auxiliary function to flatten score board for comparison
const makeFlatten = (sb: ScoreBoard) =>
  sb
    .map((m: Match) => [
      m.homeTeam,
      m.awayTeam,
      m.homeTeamScore,
      m.awayTeamScore,
    ])
    .flat();

describe('ScoreBoardService', () => {
  let service: ScoreBoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScoreBoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should allow to start a game', (done) => {
    // successfully start game
    const newMatch = service.startGame('Argentina', 'Belgium');
    expect(newMatch).toBeTruthy();

    // successfully updated score board - contains the new match
    service.scoreBoard$.subscribe((scoreBoard) => {
      expect(scoreBoard).toContain(newMatch!);
      done();
    });
  });

  it('should avoid starting game with same teams', () => {
    expect(() => service.startGame('Argentina', 'Argentina')).toThrowError(
      'Invalid teams'
    );
  });

  it('should allow to update match score', (done) => {
    // start game
    let match = service.startGame('Argentina', 'Belgium');

    // successfully update score
    match = { ...match!, homeTeamScore: 111, awayTeamScore: 222 };
    expect(service.updateScore(match)).toBeUndefined();

    // successfully updated score board - score is updated
    service.scoreBoard$.subscribe((scoreBoard) => {
      const updatedMatch = scoreBoard.find((m) => m.id === match?.id);

      expect(updatedMatch?.homeTeamScore).toBe(111);
      expect(updatedMatch?.awayTeamScore).toBe(222);
      done();
    });
  });

  it('should avoid updating negative match score', () => {
    // start game
    let match = service.startGame('Argentina', 'Belgium');

    // error expected
    match = { ...match!, homeTeamScore: -3 };
    expect(() => service.updateScore(match)).toThrowError('Invalid match');
  });

  it('should avoid updating decimal match score', () => {
    // start game
    let match = service.startGame('Argentina', 'Belgium');

    // error expected
    match = { ...match!, homeTeamScore: 1.11 };
    expect(() => service.updateScore(match)).toThrowError('Invalid match');
  });

  it('should allow to finish a game', (done) => {
    // start game
    const match = service.startGame('Argentina', 'Belgium');

    // finish game
    service.finishGame(match!);

    // successfully updated score board - the match is removed
    service.scoreBoard$.subscribe((scoreBoard) => {
      expect(scoreBoard).not.toContain(match!);
      done();
    });
  });

  it('should correctly order matches in score board', (done) => {
    // start games
    TEST_SCORE_BOARD.forEach((match) => {
      const m: Match = {
        ...service.startGame(match.homeTeam, match.awayTeam),
        homeTeamScore: match.homeTeamScore,
        awayTeamScore: match.awayTeamScore,
      };

      service.updateScore(m);
    });

    service.scoreBoard$.subscribe((scoreBoard) => {
      expect(makeFlatten(scoreBoard)).toEqual(
        makeFlatten(TEST_SCORE_BOARD_ORDERED)
      );
      done();
    });
  });
});
