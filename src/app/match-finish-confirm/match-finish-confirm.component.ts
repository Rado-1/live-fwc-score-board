import { ChangeDetectionStrategy, Component, Optional } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-match-finish-confirm',
  templateUrl: './match-finish-confirm.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatchFinishConfirmComponent {
  constructor(
    @Optional() public dialogRef: MatDialogRef<MatchFinishConfirmComponent>
  ) {}

  onYes() {
    this.dialogRef.close(true);
  }
}
