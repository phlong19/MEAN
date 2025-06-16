import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import AuthService from '../../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private _snackbar = inject(MatSnackBar);
  readonly dialog = inject(MatDialog);
  constructor(public authService: AuthService) {}

  onLogin(form: NgForm) {
    this.authService
      .login(form.value.email, form.value.password)
      .subscribe((message) =>
        this._snackbar.open(message, undefined, { duration: 5000 })
      );
  }
}
