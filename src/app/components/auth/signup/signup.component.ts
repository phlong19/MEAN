import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import AuthService from '../../../services/auth.service';

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

  constructor(public authService: AuthService) {}

  onSignup(form: NgForm) {
    const { username, email, password, confirmPassword } = form.value;
    if (form.invalid || password !== confirmPassword) {
      return;
    }

    console.log(form);
    this.authService.createUser(username, email, password);
  }
}
