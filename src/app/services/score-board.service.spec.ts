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

  it('should allow to start a game');

  it('should avoid starting incorrect game');

  it('should allow to update match score');

  it('should avoid updating incorrect match score');

  it('should allow to finish a game');
});
