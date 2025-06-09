import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeoutDialogComponent } from './timeout-dialog.component';

describe('TimeoutDialogComponent', () => {
  let component: TimeoutDialogComponent;
  let fixture: ComponentFixture<TimeoutDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeoutDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeoutDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
