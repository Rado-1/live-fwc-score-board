import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TEST_SCORE_BOARD } from '../core/data/test-score-board';
import { MaterialModule } from '../material.module';

import { MatchDetailComponent } from './match-detail.component';

const TEST_MATCH = TEST_SCORE_BOARD[0];

describe('MatchDetailComponent - new match mode', () => {
  let component: MatchDetailComponent;
  let fixture: ComponentFixture<MatchDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatchDetailComponent],
      imports: [MaterialModule, BrowserAnimationsModule, ReactiveFormsModule],
      providers: [{ provide: MatDialogRef, useValue: { close: () => {} } }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(MatchDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should open for new match', () => {
    // check default values
    expect(component.homeTeam.value).toBe('');
    expect(component.awayTeam.value).toBe('');
    expect(component.homeTeamScore.value).toBe(0);
    expect(component.awayTeamScore.value).toBe(0);
  });

  it('should return a new match on [Ok] and correct inputs', () => {
    // set form control values
    component.homeTeam.setValue(TEST_MATCH.homeTeam);
    component.awayTeam.setValue(TEST_MATCH.awayTeam);
    component.sameTeamChecker();

    // pressing Ok button closes dialog with returned value
    spyOn(component.dialogRef, 'close');
    component.onOk();
    expect(component.dialogRef.close).toHaveBeenCalledWith({
      homeTeam: TEST_MATCH.homeTeam,
      awayTeam: TEST_MATCH.awayTeam,
      homeTeamScore: 0,
      awayTeamScore: 0,
      id: 0,
    });
  });

  it('should NOT return a new match on [Ok] with same teams', () => {
    // set form control values
    component.homeTeam.setValue(TEST_MATCH.homeTeam);
    component.awayTeam.setValue(TEST_MATCH.homeTeam);
    component.sameTeamChecker();

    // form should be invalid
    expect(component.form.valid).toBeFalse();

    // pressing Ok button should not close the dialog
    spyOn(component.dialogRef, 'close');
    component.onOk();
    expect(component.dialogRef.close).not.toHaveBeenCalled();
  });

  it('should NOT return a new match on [Ok] with unspecified teams', () => {
    // form should be invalid
    expect(component.form.valid).toBeFalse();

    // pressing Ok button should not close the dialog
    spyOn(component.dialogRef, 'close');
    component.onOk();
    expect(component.dialogRef.close).not.toHaveBeenCalled();
  });
});

describe('MatchDetailComponent - edit match mode', () => {
  let component: MatchDetailComponent;
  let fixture: ComponentFixture<MatchDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatchDetailComponent],
      imports: [MaterialModule, BrowserAnimationsModule, ReactiveFormsModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: TEST_MATCH },
        { provide: MatDialogRef, useValue: { close: () => {} } },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(MatchDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should open for editing match', () => {
    // check default values
    expect(component.homeTeam.value).toBe(TEST_MATCH.homeTeam);
    expect(component.awayTeam.value).toBe(TEST_MATCH.awayTeam);
    expect(component.homeTeamScore.value).toBe(TEST_MATCH.homeTeamScore);
    expect(component.awayTeamScore.value).toBe(TEST_MATCH.awayTeamScore);
  });

  it('should update existing match on [Ok] and correct values', () => {
    // pressing Ok button closes dialog with returned value
    spyOn(component.dialogRef, 'close');
    component.onOk();
    expect(component.dialogRef.close).toHaveBeenCalledWith(TEST_MATCH);
  });

  it('should NOT update existing match on [Ok] with negative score', () => {
    // set form control values
    component.homeTeamScore.setValue(-22);

    // form should be invalid
    expect(component.form.valid).toBeFalse();

    // pressing Ok button should not close the dialog
    spyOn(component.dialogRef, 'close');
    component.onOk();
    expect(component.dialogRef.close).not.toHaveBeenCalled();
  });

  it('should NOT update existing match on [Ok] with decimal score', () => {
    // set form control values
    component.homeTeamScore.setValue(12.34);

    // form should be invalid
    expect(component.form.valid).toBeFalse();

    // pressing Ok button should not close the dialog
    spyOn(component.dialogRef, 'close');
    component.onOk();
    expect(component.dialogRef.close).not.toHaveBeenCalled();
  });
});
