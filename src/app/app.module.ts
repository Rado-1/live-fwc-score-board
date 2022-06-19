import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';

import {
  AppComponent,
  DialogMatchDetail,
  DialogMatchFinishConfirm,
} from './app.component';

@NgModule({
  declarations: [AppComponent, DialogMatchDetail, DialogMatchFinishConfirm],
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
