import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';

import { MatchFinishConfirmComponent } from './match-finish-confirm.component';

describe('MatchFinishConfirmComponent', () => {
  let component: MatchFinishConfirmComponent;
  let fixture: ComponentFixture<MatchFinishConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatchFinishConfirmComponent],
      imports: [MaterialModule, BrowserAnimationsModule],
      providers: [{ provide: MatDialogRef, useValue: { close: () => {} } }],
    }).compileComponents();

    fixture = TestBed.createComponent(MatchFinishConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog on [Yes]', () => {
    spyOn(component.dialogRef, 'close');
    component.onYes();
    expect(component.dialogRef.close).toHaveBeenCalledWith(true);
  });
});
