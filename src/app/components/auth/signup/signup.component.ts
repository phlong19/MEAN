import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import AuthService from '../../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  imports: [
    MatStepperModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  isLoading = false;
  private _snackbar = inject(MatSnackBar);

  constructor(public authService: AuthService, private router: Router) {}

  onSignup(form: NgForm) {
    const { username, email, password, confirmPassword } = form.value;
    if (form.invalid || password !== confirmPassword) {
      return;
    }

    this.authService.createUser(username, email, password).subscribe((res) => {
      this._snackbar.open(res.message, undefined, { duration: 5000 });
      this.router.navigate(['/login']);
    });
  }
}
