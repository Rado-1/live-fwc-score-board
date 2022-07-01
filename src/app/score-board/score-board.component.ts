import { ChangeDetectionStrategy, Component, Optional } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Match } from '../core/models/match';
import { ScoreBoardService } from '../core/services/score-board.service';
import { MatchDetailComponent } from '../match-detail/match-detail.component';
import { MatchFinishConfirmComponent } from '../match-finish-confirm/match-finish-confirm.component';

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScoreBoardComponent {
  displayedColumns: string[] = [
    'home',
    'homeScore',
    'away',
    'awayScore',
    'actions',
  ];

  constructor(
    public scoreBoardService: ScoreBoardService,
    @Optional() public popupDialog: MatDialog
  ) {}

  startMatch() {
    const dialogRef = this.popupDialog.open(MatchDetailComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.scoreBoardService.startGame(result.homeTeam, result.awayTeam);
      }
    });
  }

  updateScore(match: Match) {
    const dialogRef = this.popupDialog.open(MatchDetailComponent, {
      data: match,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.scoreBoardService.updateScore(result);
      }
    });
  }

  finishMatch(match: Match) {
    const dialogRef = this.popupDialog.open(MatchFinishConfirmComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.scoreBoardService.finishGame(match);
      }
    });
  }
}
