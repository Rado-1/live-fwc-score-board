import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { ScoreBoardComponent } from './score-board/score-board.component';
import { MatchDetailComponent } from './match-detail/match-detail.component';
import { MatchFinishConfirmComponent } from './match-finish-confirm/match-finish-confirm.component';

@NgModule({
  declarations: [
    AppComponent,
    ScoreBoardComponent,
    MatchDetailComponent,
    MatchFinishConfirmComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
