import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-timeout-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './timeout-dialog.component.html',
  styleUrl: './timeout-dialog.component.scss',
})
export class TimeoutDialogComponent {
  readonly dialogRef = inject(MatDialogRef<TimeoutDialogComponent>);
  readonly data = inject<{ name?: string }>(MAT_DIALOG_DATA);

  constructor(private router: Router) {}

  toLoginPage() {
    this.dialogRef.close();
    this.router.navigate(['/login']);
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
