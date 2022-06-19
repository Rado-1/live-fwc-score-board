import { TestBed } from '@angular/core/testing';

import { ScoreBoardServiceService } from './score-board-service.service';

describe('ScoreBoardServiceService', () => {
  let service: ScoreBoardServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScoreBoardServiceService);
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
