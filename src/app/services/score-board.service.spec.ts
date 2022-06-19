import { TestBed } from '@angular/core/testing';
import { ScoreBoardService } from './score-board.service';

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

  it('should avoid starting incorrect game', () => {
    // avoid entering match with the same team
    expect(service.startGame('Argentina', 'Argentina')).toBeNull();
  });

  it('should allow to update match score', (done) => {
    // successfully create match
    let match = service.startGame('Argentina', 'Belgium');
    expect(match).toBeTruthy();

    // successfully update score
    match = { ...match!, homeTeamScore: 111, awayTeamScore: 222 };
    expect(service.updateScore(match)).toBeTrue();

    // successfully updated score board - score is updated
    service.scoreBoard$.subscribe((scoreBoard) => {
      const updatedMatch = scoreBoard.find(
        (m) => m.timestamp === match?.timestamp
      );

      expect(updatedMatch?.homeTeamScore).toBe(111);
      expect(updatedMatch?.awayTeamScore).toBe(222);
      done();
    });
  });

  it('should avoid updating incorrect match score', () => {
    // successfully create match
    let match = service.startGame('Argentina', 'Belgium');
    expect(match).toBeTruthy();

    // avoid update match with negative score
    match = { ...match!, homeTeamScore: -3 };
    expect(service.updateScore(match)).toBeFalse();

    // avoid update match with decimal score
    match = { ...match!, homeTeamScore: 1.11 };
    expect(service.updateScore(match)).toBeFalse();
  });

  it('should allow to finish a game', (done) => {
    // successfully create match
    const match = service.startGame('Argentina', 'Belgium');
    expect(match).toBeTruthy();

    // successfully finish game
    service.finishGame(match!);

    // successfully updated score board - the match is removed
    service.scoreBoard$.subscribe((scoreBoard) => {
      expect(scoreBoard).not.toContain(match!);
      done();
    });
  });
});
