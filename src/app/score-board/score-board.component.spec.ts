import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MatDialogState } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';

import { ScoreBoardService } from '../core/services/score-board.service';
import { MatchDetailComponent } from '../match-detail/match-detail.component';
import { MatchFinishConfirmComponent } from '../match-finish-confirm/match-finish-confirm.component';

import { ScoreBoardComponent } from './score-board.component';

describe('ScoreBoardComponent', () => {
  let component: ScoreBoardComponent;
  let fixture: ComponentFixture<ScoreBoardComponent>;
  let service: ScoreBoardService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScoreBoardComponent],
      imports: [BrowserAnimationsModule, MaterialModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ScoreBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(ScoreBoardService);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should open new match dialog on [Start a game]', () => {
    // open the dialog
    component.startMatch();
    const dialogRef = component.popupDialog.openDialogs[0];

    expect(dialogRef).toBeInstanceOf(MatDialogRef<MatchDetailComponent>);
    expect(dialogRef.getState()).toBe(MatDialogState.OPEN);
  });

  it('should open new match dialog on [Update]', () => {
    // init score board
    const match = service.startGame('Argentina', 'Belgium');

    // open the dialog
    component.updateScore(match);
    const dialogRef = component.popupDialog.openDialogs[0];

    expect(dialogRef).toBeInstanceOf(MatDialogRef<MatchDetailComponent>);
    expect(dialogRef.getState()).toBe(MatDialogState.OPEN);
  });

  it('should open finish confirmation dialog on [Finish]', () => {
    // init score board
    const match = service.startGame('Argentina', 'Belgium');

    // open the dialog
    component.finishMatch(match);
    const dialogRef = component.popupDialog.openDialogs[0];

    expect(dialogRef).toBeInstanceOf(MatDialogRef<MatchFinishConfirmComponent>);
    expect(dialogRef.getState()).toBe(MatDialogState.OPEN);
  });
});
