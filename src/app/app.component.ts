import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { isMatchValid, Match } from './models/match';
import { ScoreBoardService } from './services/score-board.service';
import { TEAMS } from './data/teams';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  displayedColumns: string[] = [
    'home',
    'homeScore',
    'away',
    'awayScore',
    'actions',
  ];

  constructor(
    public scoreBoardService: ScoreBoardService,
    public detailDialog: MatDialog
  ) {}

  startMatch() {
    const dialogRef = this.detailDialog.open(DialogMatchDetail);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.scoreBoardService.startGame(result.homeTeam, result.awayTeam);
      }
    });
  }

  updateScore(match: Match) {
    const dialogRef = this.detailDialog.open(DialogMatchDetail, {
      data: match,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.scoreBoardService.updateScore(result);
      }
    });
  }

  finishMatch(match: Match) {
    const dialogRef = this.detailDialog.open(DialogMatchFinishConfirm);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.scoreBoardService.finishGame(match);
      }
    });
  }
}

@Component({
  selector: 'dialog-match-detail',
  templateUrl: 'dialog-match-detail.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogMatchDetail {
  isNew: boolean;
  teams = TEAMS;

  // form controls
  homeTeam = new FormControl('', [Validators.required]);
  awayTeam = new FormControl('', [Validators.required]);
  homeTeamScore = new FormControl(0, [
    Validators.required,
    Validators.pattern('\\d+'),
  ]);
  awayTeamScore = new FormControl(0, [
    Validators.required,
    Validators.pattern('\\d+'),
  ]);

  constructor(
    public dialogRef: MatDialogRef<DialogMatchDetail>,
    @Inject(MAT_DIALOG_DATA) public data: Match
  ) {
    this.isNew = !data;

    // init form controls
    if (this.isNew) {
      // start a game
      this.homeTeamScore.disable();
      this.awayTeamScore.disable();
    } else {
      // edit score
      this.homeTeam.setValue(data.homeTeam);
      this.homeTeam.disable();
      this.awayTeam.setValue(data.awayTeam);
      this.awayTeam.disable();
      this.homeTeamScore.setValue(data.homeTeamScore);
      this.awayTeamScore.setValue(data.awayTeamScore);
    }
  }

  onOk() {
    // create a match data from form controls
    const match = {
      homeTeam: this.homeTeam.value ?? '',
      awayTeam: this.awayTeam.value ?? '',
      homeTeamScore: this.homeTeamScore.value ?? 0,
      awayTeamScore: this.awayTeamScore.value ?? 0,
      timestamp: this.isNew ? Date.now() : this.data.timestamp,
    };

    if (isMatchValid(match)) {
      // submit
      this.dialogRef.close(match);
    } else {
      // show errors
      if (match.homeTeam !== '' && match.homeTeam == match.awayTeam) {
        this.homeTeam.setErrors({ sameTeam: true });
        this.awayTeam.setErrors({ sameTeam: true });
      }

      this.homeTeam.markAsTouched();
      this.awayTeam.markAsTouched();
      this.homeTeamScore.markAsTouched();
      this.awayTeamScore.markAsTouched();
    }
  }
}

@Component({
  selector: 'dialog-match-finish-confirm',
  templateUrl: 'dialog-match-finish-confirm.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogMatchFinishConfirm {
  constructor(public dialogRef: MatDialogRef<DialogMatchFinishConfirm>) {}

  onYes() {
    this.dialogRef.close(true);
  }
}
