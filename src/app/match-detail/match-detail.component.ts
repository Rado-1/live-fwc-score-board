import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  Optional,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TEAMS } from '../core/data/teams';
import { Match } from '../core/models/match';

@Component({
  selector: 'app-match-detail',
  templateUrl: './match-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatchDetailComponent implements OnInit {
  isNew: boolean;
  teams = TEAMS;

  // detail form and controls
  homeTeam = new FormControl('', Validators.required);
  awayTeam = new FormControl('', Validators.required);
  homeTeamScore = new FormControl(0, [
    Validators.required,
    Validators.pattern('\\d+'),
  ]);
  awayTeamScore = new FormControl(0, [
    Validators.required,
    Validators.pattern('\\d+'),
  ]);
  form = new FormGroup({
    homeTeam: this.homeTeam,
    awayTeam: this.awayTeam,
    homeTeamScore: this.homeTeamScore,
    awayTeamScore: this.awayTeamScore,
  });

  constructor(
    @Optional() public dialogRef: MatDialogRef<MatchDetailComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Match
  ) {
    this.isNew = !data;
  }

  ngOnInit(): void {
    // init form controls
    if (this.isNew) {
      // start a game
      this.homeTeam.setValue('');
      this.awayTeam.setValue('');
      this.homeTeamScore.setValue(0);
      this.awayTeamScore.setValue(0);
      this.homeTeamScore.disable();
      this.awayTeamScore.disable();
    } else {
      // edit score
      this.homeTeam.setValue(this.data.homeTeam);
      this.awayTeam.setValue(this.data.awayTeam);
      this.homeTeamScore.setValue(this.data.homeTeamScore);
      this.awayTeamScore.setValue(this.data.awayTeamScore);
      this.homeTeam.disable();
      this.awayTeam.disable();
    }
  }

  sameTeamChecker() {
    if (
      this.homeTeam.value !== '' &&
      this.homeTeam.value === this.awayTeam.value
    ) {
      this.homeTeam.setErrors({ sameTeam: true });
      this.awayTeam.setErrors({ sameTeam: true });
    } else {
      this.homeTeam.updateValueAndValidity();
      this.awayTeam.updateValueAndValidity();
    }
  }

  onOk() {
    // create a match data from form controls
    const match = {
      homeTeam: this.homeTeam.value ?? '',
      awayTeam: this.awayTeam.value ?? '',
      homeTeamScore: this.homeTeamScore.value ?? 0,
      awayTeamScore: this.awayTeamScore.value ?? 0,
      id: this.isNew ? 0 : this.data.id,
    };

    if (this.form.valid) {
      // submit
      this.dialogRef.close(match);
    } else {
      // show errors
      this.form.markAllAsTouched();
      this.form.updateValueAndValidity();
    }
  }
}
